// Learning Service for Dhikr App
// Handles user behavior analysis and personalization

export class DhikrLearningService {
    constructor() {
        this.storageKey = "dhikr-learning-data";
        this.sessionsKey = "dhikr-sessions";
        this.init();
    }

    init() {
        // Initialize learning data structure if not exists
        if (!localStorage.getItem(this.storageKey)) {
            const initialData = {
                preferences: {
                    favoriteTimeSlots: [],
                    preferredGoals: {},
                    completionPatterns: {},
                },
                analytics: {
                    totalSessions: 0,
                    totalCounts: 0,
                    averageSessionDuration: 0,
                    streakDays: 0,
                    lastActiveDate: null,
                },
                recommendations: {
                    suggestedGoals: {},
                    preferredDhikr: [],
                    nextSessionTime: null,
                },
                insights: {
                    bestPerformingTimes: [],
                    consistencyScore: 0,
                    improvementAreas: [],
                },
            };
            localStorage.setItem(this.storageKey, JSON.stringify(initialData));
        }
    }

    // Record a dhikr session
    recordSession(dhikrId, count, goal, startTime, endTime) {
        const data = this.getLearningData();
        const session = {
            dhikrId,
            count,
            goal,
            completed: count >= goal,
            startTime,
            endTime,
            duration: endTime - startTime,
            timeOfDay: new Date(startTime).getHours(),
            dayOfWeek: new Date(startTime).getDay(),
            timestamp: Date.now(),
        };

        // Store session
        const sessions = this.getSessions();
        sessions.push(session);
        this.saveSessions(sessions);

        // Update analytics
        this.updateAnalytics(session);

        // Update preferences
        this.updatePreferences(session);

        // Generate new recommendations
        this.generateRecommendations();
    }

    // Record user interaction (button clicks, goal changes, etc.)
    recordInteraction(type, dhikrId = null, data = {}) {
        const interaction = {
            type, // 'goal_change', 'dhikr_select', 'reset', 'increment'
            dhikrId,
            timestamp: Date.now(),
            timeOfDay: new Date().getHours(),
            ...data,
        };

        const learningData = this.getLearningData();
        if (!learningData.interactions) {
            learningData.interactions = [];
        }

        learningData.interactions.push(interaction);

        // Keep only last 1000 interactions for performance
        if (learningData.interactions.length > 1000) {
            learningData.interactions = learningData.interactions.slice(-1000);
        }

        this.saveLearningData(learningData);

        // Trigger learning from this interaction
        this.learnFromInteraction(interaction);
    }

    // Learn from conversation patterns (when user changes goals, selects dhikr, etc.)
    learnFromInteraction(interaction) {
        const data = this.getLearningData();

        switch (interaction.type) {
            case "goal_change":
                this.learnGoalPreferences(interaction, data);
                break;
            case "dhikr_select":
                this.learnDhikrPreferences(interaction, data);
                break;
            case "time_preference":
                this.learnTimePreferences(interaction, data);
                break;
        }

        this.saveLearningData(data);
    }

    // Learn user's goal setting patterns
    learnGoalPreferences(interaction, data) {
        const { dhikrId, newGoal, oldGoal } = interaction;

        if (!data.preferences.preferredGoals[dhikrId]) {
            data.preferences.preferredGoals[dhikrId] = [];
        }

        data.preferences.preferredGoals[dhikrId].push({
            goal: newGoal,
            timestamp: Date.now(),
            context: {
                timeOfDay: new Date().getHours(),
                previousGoal: oldGoal,
            },
        });

        // Keep only last 10 goal changes per dhikr
        if (data.preferences.preferredGoals[dhikrId].length > 10) {
            data.preferences.preferredGoals[dhikrId] =
                data.preferences.preferredGoals[dhikrId].slice(-10);
        }
    }

    // Learn dhikr selection patterns
    learnDhikrPreferences(interaction, data) {
        const { dhikrId } = interaction;
        const timeOfDay = new Date().getHours();

        if (!data.preferences.dhikrByTime) {
            data.preferences.dhikrByTime = {};
        }

        const timeSlot = this.getTimeSlot(timeOfDay);
        if (!data.preferences.dhikrByTime[timeSlot]) {
            data.preferences.dhikrByTime[timeSlot] = {};
        }

        if (!data.preferences.dhikrByTime[timeSlot][dhikrId]) {
            data.preferences.dhikrByTime[timeSlot][dhikrId] = 0;
        }

        data.preferences.dhikrByTime[timeSlot][dhikrId]++;
    }

    // Update analytics based on session data
    updateAnalytics(session) {
        const data = this.getLearningData();
        const analytics = data.analytics;

        analytics.totalSessions++;
        analytics.totalCounts += session.count;

        // Update average session duration
        analytics.averageSessionDuration =
            (analytics.averageSessionDuration * (analytics.totalSessions - 1) +
                session.duration) /
            analytics.totalSessions;

        // Update streak
        this.updateStreak(session.startTime, analytics);

        analytics.lastActiveDate = new Date(session.startTime).toDateString();

        this.saveLearningData(data);
    }

    // Update user preferences
    updatePreferences(session) {
        const data = this.getLearningData();
        const timeSlot = this.getTimeSlot(
            new Date(session.startTime).getHours()
        );

        // Track favorite time slots
        if (!data.preferences.favoriteTimeSlots.includes(timeSlot)) {
            data.preferences.favoriteTimeSlots.push(timeSlot);
        }

        // Track completion patterns
        if (!data.preferences.completionPatterns[session.dhikrId]) {
            data.preferences.completionPatterns[session.dhikrId] = {
                attempts: 0,
                completions: 0,
                averageCount: 0,
            };
        }

        const pattern = data.preferences.completionPatterns[session.dhikrId];
        pattern.attempts++;
        if (session.completed) {
            pattern.completions++;
        }
        pattern.averageCount =
            (pattern.averageCount * (pattern.attempts - 1) + session.count) /
            pattern.attempts;

        this.saveLearningData(data);
    }

    // Generate personalized recommendations
    generateRecommendations() {
        const data = this.getLearningData();
        const sessions = this.getSessions();

        // Suggest optimal goals based on completion rates
        this.generateGoalRecommendations(data, sessions);

        // Suggest best dhikr for current time
        this.generateDhikrRecommendations(data);

        // Suggest next session time
        this.generateTimeRecommendations(data, sessions);

        this.saveLearningData(data);
    }

    // Generate goal recommendations based on success patterns
    generateGoalRecommendations(data, sessions) {
        const dhikrStats = {};

        sessions.forEach((session) => {
            if (!dhikrStats[session.dhikrId]) {
                dhikrStats[session.dhikrId] = {
                    attempts: 0,
                    completions: 0,
                    averageCompletion: 0,
                };
            }

            const stats = dhikrStats[session.dhikrId];
            stats.attempts++;
            if (session.completed) {
                stats.completions++;
            }
            stats.averageCompletion =
                (stats.averageCompletion * (stats.attempts - 1) +
                    session.count / session.goal) /
                stats.attempts;
        });

        // Suggest goals that lead to 80% completion rate
        Object.keys(dhikrStats).forEach((dhikrId) => {
            const stats = dhikrStats[dhikrId];
            if (stats.attempts >= 3) {
                // Need at least 3 attempts for reliable data
                const currentCompletionRate =
                    stats.completions / stats.attempts;

                if (currentCompletionRate < 0.6) {
                    // Suggest lower goal
                    const recentSessions = sessions
                        .filter((s) => s.dhikrId === dhikrId)
                        .slice(-5);
                    const avgCount =
                        recentSessions.reduce((sum, s) => sum + s.count, 0) /
                        recentSessions.length;
                    data.recommendations.suggestedGoals[dhikrId] = Math.ceil(
                        avgCount * 1.2
                    );
                } else if (currentCompletionRate > 0.9) {
                    // Suggest higher goal
                    const recentGoals = sessions
                        .filter((s) => s.dhikrId === dhikrId)
                        .slice(-3);
                    const avgGoal =
                        recentGoals.reduce((sum, s) => sum + s.goal, 0) /
                        recentGoals.length;
                    data.recommendations.suggestedGoals[dhikrId] = Math.ceil(
                        avgGoal * 1.3
                    );
                }
            }
        });
    }

    // Get personalized insights
    getPersonalizedInsights() {
        const data = this.getLearningData();
        const sessions = this.getSessions();

        const insights = {
            consistency: this.calculateConsistencyScore(sessions),
            bestTime: this.getBestPerformingTime(sessions),
            improvement: this.getImprovementSuggestions(data, sessions),
            streakInfo: {
                current: data.analytics.streakDays,
                longest: this.getLongestStreak(sessions),
            },
            favoritesDhikr: this.getMostUsedDhikr(sessions),
            goalOptimization: this.getGoalOptimizationTips(data, sessions),
        };

        return insights;
    }

    // Helper methods
    getTimeSlot(hour) {
        if (hour >= 5 && hour < 12) return "morning";
        if (hour >= 12 && hour < 17) return "afternoon";
        if (hour >= 17 && hour < 21) return "evening";
        return "night";
    }

    updateStreak(sessionTime, analytics) {
        const today = new Date(sessionTime).toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();

        if (
            analytics.lastActiveDate === yesterday ||
            analytics.lastActiveDate === today
        ) {
            if (analytics.lastActiveDate !== today) {
                analytics.streakDays++;
            }
        } else if (analytics.lastActiveDate !== today) {
            analytics.streakDays = 1;
        }
    }

    calculateConsistencyScore(sessions) {
        if (sessions.length < 7) return 0;

        const last7Days = sessions.filter(
            (s) => Date.now() - s.timestamp <= 7 * 24 * 60 * 60 * 1000
        );

        const uniqueDays = new Set(
            last7Days.map((s) => new Date(s.timestamp).toDateString())
        ).size;

        return Math.round((uniqueDays / 7) * 100);
    }

    getMostUsedDhikr(sessions) {
        const dhikrCounts = {};
        sessions.forEach((s) => {
            dhikrCounts[s.dhikrId] = (dhikrCounts[s.dhikrId] || 0) + 1;
        });

        return Object.entries(dhikrCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([dhikrId, count]) => ({ dhikrId, count }));
    }

    // Storage methods
    getLearningData() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : null;
    }

    saveLearningData(data) {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    getSessions() {
        const sessions = localStorage.getItem(this.sessionsKey);
        return sessions ? JSON.parse(sessions) : [];
    }

    saveSessions(sessions) {
        // Keep only last 500 sessions for performance
        const recentSessions = sessions.slice(-500);
        localStorage.setItem(this.sessionsKey, JSON.stringify(recentSessions));
    }

    // Get recommendation for current time
    getCurrentRecommendation() {
        const data = this.getLearningData();
        const timeSlot = this.getTimeSlot(new Date().getHours());

        if (
            data.preferences.dhikrByTime &&
            data.preferences.dhikrByTime[timeSlot]
        ) {
            const dhikrByFreq = Object.entries(
                data.preferences.dhikrByTime[timeSlot]
            ).sort(([, a], [, b]) => b - a);

            if (dhikrByFreq.length > 0) {
                return {
                    dhikrId: dhikrByFreq[0][0],
                    confidence: dhikrByFreq[0][1] / 10, // Normalize to 0-1
                    reason: `You often practice this dhikr during ${timeSlot}`,
                };
            }
        }

        return null;
    }

    // Get suggested goal for a dhikr
    getSuggestedGoal(dhikrId) {
        const data = this.getLearningData();

        if (data.recommendations.suggestedGoals[dhikrId]) {
            return {
                goal: data.recommendations.suggestedGoals[dhikrId],
                reason: "Based on your completion patterns",
            };
        }

        return null;
    }

    // Reset learning data (for privacy)
    resetLearningData() {
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.sessionsKey);
        this.init();
    }
}

// Export singleton instance
export const learningService = new DhikrLearningService();
