// Learning Service for Dhikr App
// Handles user behavior analysis and personalization

// Type definitions
export interface TimeSlot {
    morning: string;
    afternoon: string;
    evening: string;
    night: string;
}

export interface DhikrSession {
    dhikrId: string;
    count: number;
    goal: number;
    completed: boolean;
    startTime: number;
    endTime: number;
    duration: number;
    timeOfDay: number;
    dayOfWeek: number;
    timestamp: number;
}

export interface UserInteraction {
    type: 'goal_change' | 'dhikr_select' | 'reset' | 'increment' | 'time_preference';
    dhikrId?: string;
    timestamp: number;
    timeOfDay: number;
    newGoal?: number;
    oldGoal?: number;
    source?: string;
    confidence?: number;
}

export interface CompletionPattern {
    attempts: number;
    completions: number;
    averageCount: number;
}

export interface GoalHistory {
    goal: number;
    timestamp: number;
    context: {
        timeOfDay: number;
        previousGoal: number;
    };
}

export interface DhikrByTime {
    [timeSlot: string]: {
        [dhikrId: string]: number;
    };
}

export interface LearningData {
    preferences: {
        favoriteTimeSlots: string[];
        preferredGoals: {
            [dhikrId: string]: GoalHistory[];
        };
        completionPatterns: {
            [dhikrId: string]: CompletionPattern;
        };
        dhikrByTime: DhikrByTime;
    };
    analytics: {
        totalSessions: number;
        totalCounts: number;
        averageSessionDuration: number;
        streakDays: number;
        lastActiveDate: string | null;
    };
    recommendations: {
        suggestedGoals: {
            [dhikrId: string]: number;
        };
        preferredDhikr: RecommendedDhikr[];
        nextSessionTime: number | null;
    };
    insights: {
        bestPerformingTimes: string[];
        consistencyScore: number;
        improvementAreas: string[];
    };
    interactions?: UserInteraction[];
}

export interface RecommendedDhikr {
    dhikrId: string;
    count: number;
    confidence: number;
    reason: string;
}

export interface PersonalizedInsights {
    consistency: number;
    bestTime: string;
    improvement: string[];
    streakInfo: {
        current: number;
        longest: number;
    };
    favoritesDhikr: Array<{
        dhikrId: string;
        count: number;
    }>;
    goalOptimization: Array<{
        dhikrId: string;
        tip: string;
    }>;
}

export interface AnalyticsSummary {
    totalSessions: number;
    totalCounts: number;
    averageSessionDuration: number;
    streakDays: number;
    consistency: number;
    favoriteTime: string;
    recentSessions: DhikrSession[];
}

export interface GoalSuggestion {
    goal: number;
    reason: string;
}

export interface TimeRecommendation {
    dhikrId: string;
    confidence: number;
    reason: string;
}

export class DhikrLearningService {
    private readonly storageKey: string = 'dhikr-learning-data';
    private readonly sessionsKey: string = 'dhikr-sessions';

    constructor() {
        this.init();
    }

    private init(): void {
        // Initialize learning data structure if not exists
        if (!localStorage.getItem(this.storageKey)) {
            const initialData: LearningData = {
                preferences: {
                    favoriteTimeSlots: [],
                    preferredGoals: {},
                    completionPatterns: {},
                    dhikrByTime: {},
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

        // Initialize sessions if not exists
        if (!localStorage.getItem(this.sessionsKey)) {
            localStorage.setItem(this.sessionsKey, JSON.stringify([]));
        }
    }

    // Record a dhikr session
    public recordSession(
        dhikrId: string,
        count: number,
        goal: number,
        startTime: number,
        endTime: number
    ): void {
        const data = this.getLearningData();
        if (!data) return;

        const session: DhikrSession = {
            dhikrId,
            count,
            goal,
            completed: count >= goal && goal > 0,
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
    public recordInteraction(
        type: UserInteraction['type'],
        dhikrId?: string,
        data: Partial<UserInteraction> = {}
    ): void {
        const interaction: UserInteraction = {
            type,
            dhikrId,
            timestamp: Date.now(),
            timeOfDay: new Date().getHours(),
            ...data,
        };

        const learningData = this.getLearningData();
        if (!learningData) return;

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
    private learnFromInteraction(interaction: UserInteraction): void {
        const data = this.getLearningData();
        if (!data) return;

        switch (interaction.type) {
            case 'goal_change':
                this.learnGoalPreferences(interaction, data);
                break;
            case 'dhikr_select':
                this.learnDhikrPreferences(interaction, data);
                break;
            case 'time_preference':
                this.learnTimePreferences(interaction, data);
                break;
            case 'increment':
                this.learnUsagePatterns(interaction, data);
                break;
        }

        this.saveLearningData(data);
    }

    // Learn user's goal setting patterns
    private learnGoalPreferences(interaction: UserInteraction, data: LearningData): void {
        if (!interaction.dhikrId || interaction.newGoal === undefined) return;

        const { dhikrId, newGoal, oldGoal } = interaction;

        if (!data.preferences.preferredGoals[dhikrId]) {
            data.preferences.preferredGoals[dhikrId] = [];
        }

        const goalHistory: GoalHistory = {
            goal: newGoal,
            timestamp: Date.now(),
            context: {
                timeOfDay: new Date().getHours(),
                previousGoal: oldGoal || 0,
            },
        };

        data.preferences.preferredGoals[dhikrId].push(goalHistory);

        // Keep only last 10 goal changes per dhikr
        if (data.preferences.preferredGoals[dhikrId].length > 10) {
            data.preferences.preferredGoals[dhikrId] =
                data.preferences.preferredGoals[dhikrId].slice(-10);
        }
    }

    // Learn dhikr selection patterns
    private learnDhikrPreferences(interaction: UserInteraction, data: LearningData): void {
        if (!interaction.dhikrId) return;

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

    // Learn time preferences
    private learnTimePreferences(interaction: UserInteraction, data: LearningData): void {
        const timeSlot = this.getTimeSlot(interaction.timeOfDay);
        
        if (!data.preferences.favoriteTimeSlots.includes(timeSlot)) {
            data.preferences.favoriteTimeSlots.push(timeSlot);
        }
    }

    // Learn usage patterns from increments
    private learnUsagePatterns(interaction: UserInteraction, data: LearningData): void {
        if (!interaction.dhikrId) return;

        const { dhikrId } = interaction;
        const timeSlot = this.getTimeSlot(interaction.timeOfDay);

        // Track dhikr usage by time
        if (!data.preferences.dhikrByTime) {
            data.preferences.dhikrByTime = {};
        }

        if (!data.preferences.dhikrByTime[timeSlot]) {
            data.preferences.dhikrByTime[timeSlot] = {};
        }

        if (!data.preferences.dhikrByTime[timeSlot][dhikrId]) {
            data.preferences.dhikrByTime[timeSlot][dhikrId] = 0;
        }

        data.preferences.dhikrByTime[timeSlot][dhikrId]++;
    }

    // Update analytics based on session data
    private updateAnalytics(session: DhikrSession): void {
        const data = this.getLearningData();
        if (!data) return;

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
    private updatePreferences(session: DhikrSession): void {
        const data = this.getLearningData();
        if (!data) return;

        const timeSlot = this.getTimeSlot(new Date(session.startTime).getHours());

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

        // Track dhikr usage by time
        if (!data.preferences.dhikrByTime) {
            data.preferences.dhikrByTime = {};
        }

        if (!data.preferences.dhikrByTime[timeSlot]) {
            data.preferences.dhikrByTime[timeSlot] = {};
        }

        if (!data.preferences.dhikrByTime[timeSlot][session.dhikrId]) {
            data.preferences.dhikrByTime[timeSlot][session.dhikrId] = 0;
        }

        data.preferences.dhikrByTime[timeSlot][session.dhikrId]++;

        this.saveLearningData(data);
    }

    // Generate personalized recommendations
    public generateRecommendations(): void {
        const data = this.getLearningData();
        if (!data) return;

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
    private generateGoalRecommendations(data: LearningData, sessions: DhikrSession[]): void {
        const dhikrStats: Record<string, {
            attempts: number;
            completions: number;
            averageCompletion: number;
        }> = {};

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
                    (session.goal > 0 ? session.count / session.goal : 0)) /
                stats.attempts;
        });

        // Suggest goals that lead to 80% completion rate
        Object.keys(dhikrStats).forEach((dhikrId) => {
            const stats = dhikrStats[dhikrId];

            if (stats.attempts >= 3) {
                // Need at least 3 attempts for reliable data
                const currentCompletionRate = stats.completions / stats.attempts;

                if (currentCompletionRate < 0.6) {
                    // Suggest lower goal
                    const recentSessions = sessions
                        .filter((s) => s.dhikrId === dhikrId)
                        .slice(-5);
                    if (recentSessions.length > 0) {
                        const avgCount =
                            recentSessions.reduce((sum, s) => sum + s.count, 0) /
                            recentSessions.length;
                        data.recommendations.suggestedGoals[dhikrId] = Math.ceil(
                            avgCount * 1.2
                        );
                    }
                } else if (currentCompletionRate > 0.9) {
                    // Suggest higher goal
                    const recentGoals = sessions
                        .filter((s) => s.dhikrId === dhikrId)
                        .slice(-3);
                    if (recentGoals.length > 0) {
                        const avgGoal =
                            recentGoals.reduce((sum, s) => sum + s.goal, 0) /
                            recentGoals.length;
                        data.recommendations.suggestedGoals[dhikrId] = Math.ceil(
                            avgGoal * 1.3
                        );
                    }
                }
            }
        });
    }

    // Generate dhikr recommendations based on time patterns
    private generateDhikrRecommendations(data: LearningData): void {
        const currentTimeSlot = this.getTimeSlot(new Date().getHours());
        
        if (data.preferences.dhikrByTime && data.preferences.dhikrByTime[currentTimeSlot]) {
            const dhikrByFreq = Object.entries(data.preferences.dhikrByTime[currentTimeSlot])
                .sort(([, a], [, b]) => (b as number) - (a as number))
                .slice(0, 3);
            
            data.recommendations.preferredDhikr = dhikrByFreq.map(([dhikrId, count]) => ({
                dhikrId,
                count: count as number,
                confidence: Math.min((count as number) / 10, 1), // Normalize to 0-1
                reason: `You often practice this dhikr during ${currentTimeSlot}`
            }));
        }
    }

    // Generate time recommendations
    private generateTimeRecommendations(data: LearningData, sessions: DhikrSession[]): void {
        if (sessions.length < 5) return;

        const timeAnalysis: Record<number, { count: number; completions: number }> = {};
        sessions.forEach((session) => {
            const hour = new Date(session.startTime).getHours();
            if (!timeAnalysis[hour]) {
                timeAnalysis[hour] = { count: 0, completions: 0 };
            }
            timeAnalysis[hour].count++;
            if (session.completed) {
                timeAnalysis[hour].completions++;
            }
        });

        const bestTimes = Object.entries(timeAnalysis)
            .map(([hour, stats]) => ({
                hour: parseInt(hour),
                completionRate: stats.completions / stats.count,
                frequency: stats.count,
            }))
            .filter((t) => t.frequency >= 2) // Need at least 2 sessions
            .sort((a, b) => b.completionRate - a.completionRate);

        if (bestTimes.length > 0) {
            data.recommendations.nextSessionTime = bestTimes[0].hour;
        }
    }

    // Get personalized insights
    public getPersonalizedInsights(): PersonalizedInsights {
        const data = this.getLearningData();
        const sessions = this.getSessions();

        if (!data) {
            return {
                consistency: 0,
                bestTime: 'Not enough data',
                improvement: [],
                streakInfo: { current: 0, longest: 0 },
                favoritesDhikr: [],
                goalOptimization: [],
            };
        }

        const insights: PersonalizedInsights = {
            consistency: this.calculateConsistencyScore(sessions),
            bestTime: this.getBestPerformingTime(sessions),
            improvement: this.getImprovementSuggestions(data, sessions),
            streakInfo: {
                current: data.analytics.streakDays,
                longest: this.getLongestStreak(sessions),
            },
            favoritesDhikr: this.getMostUsedDhikr(sessions),
            goalOptimization: this.getGoalOptimizationTips(data),
        };

        return insights;
    }

    // Helper methods
    private getTimeSlot(hour: number): string {
        if (hour >= 5 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 17) return 'afternoon';
        if (hour >= 17 && hour < 21) return 'evening';
        return 'night';
    }

    private updateStreak(sessionTime: number, analytics: LearningData['analytics']): void {
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

        analytics.lastActiveDate = today;
    }

    private calculateConsistencyScore(sessions: DhikrSession[]): number {
        if (sessions.length < 7) return 0;

        const last7Days = sessions.filter(
            (s) => Date.now() - s.timestamp <= 7 * 24 * 60 * 60 * 1000
        );

        const uniqueDays = new Set(
            last7Days.map((s) => new Date(s.timestamp).toDateString())
        ).size;

        return Math.round((uniqueDays / 7) * 100);
    }

    private getBestPerformingTime(sessions: DhikrSession[]): string {
        if (sessions.length < 5) return 'Not enough data';

        const timeAnalysis: Record<string, { total: number; completed: number }> = {};
        sessions.forEach((session) => {
            const timeSlot = this.getTimeSlot(new Date(session.startTime).getHours());
            if (!timeAnalysis[timeSlot]) {
                timeAnalysis[timeSlot] = { total: 0, completed: 0 };
            }
            timeAnalysis[timeSlot].total++;
            if (session.completed) {
                timeAnalysis[timeSlot].completed++;
            }
        });

        const bestTime = Object.entries(timeAnalysis)
            .map(([slot, stats]) => ({
                slot,
                rate: stats.completed / stats.total,
                count: stats.total,
            }))
            .filter((t) => t.count >= 2)
            .sort((a, b) => b.rate - a.rate)[0];

        return bestTime ? bestTime.slot : 'Not enough data';
    }

    private getImprovementSuggestions(data: LearningData, sessions: DhikrSession[]): string[] {
        const suggestions: string[] = [];

        if (sessions.length > 5) {
            const recentSessions = sessions.slice(-10);
            const completionRate = recentSessions.filter(s => s.completed).length / recentSessions.length;

            if (completionRate < 0.5) {
                suggestions.push('Consider setting lower goals to build consistency');
            } else if (completionRate > 0.9) {
                suggestions.push("You're doing great! Consider increasing your goals");
            }

            const consistencyScore = this.calculateConsistencyScore(sessions);
            if (consistencyScore < 50) {
                suggestions.push('Try to practice daily for better consistency');
            }
        }

        return suggestions;
    }

    private getLongestStreak(sessions: DhikrSession[]): number {
        if (sessions.length === 0) return 0;

        let longestStreak = 1;
        let currentStreak = 1;
        
        const sortedSessions = sessions
            .map(s => new Date(s.startTime).toDateString())
            .filter((date, index, arr) => arr.indexOf(date) === index) // Remove duplicates
            .sort();

        for (let i = 1; i < sortedSessions.length; i++) {
            const current = new Date(sortedSessions[i]);
            const previous = new Date(sortedSessions[i - 1]);
            const diffDays = Math.floor((current.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                currentStreak++;
                longestStreak = Math.max(longestStreak, currentStreak);
            } else {
                currentStreak = 1;
            }
        }

        return longestStreak;
    }

    private getMostUsedDhikr(sessions: DhikrSession[]): Array<{ dhikrId: string; count: number }> {
        const dhikrCounts: Record<string, number> = {};
        sessions.forEach((s) => {
            dhikrCounts[s.dhikrId] = (dhikrCounts[s.dhikrId] || 0) + 1;
        });

        return Object.entries(dhikrCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([dhikrId, count]) => ({ dhikrId, count }));
    }

    private getGoalOptimizationTips(data: LearningData): Array<{ dhikrId: string; tip: string }> {
        const tips: Array<{ dhikrId: string; tip: string }> = [];

        Object.entries(data.preferences.completionPatterns || {}).forEach(([dhikrId, pattern]) => {
            if (pattern.attempts >= 5) {
                const completionRate = pattern.completions / pattern.attempts;
                if (completionRate < 0.3) {
                    tips.push({
                        dhikrId,
                        tip: `Consider reducing the goal for this dhikr to ${Math.ceil(pattern.averageCount * 1.1)}`
                    });
                } else if (completionRate > 0.95) {
                    tips.push({
                        dhikrId,
                        tip: `You consistently complete this dhikr! Try increasing the goal.`
                    });
                }
            }
        });

        return tips;
    }

    // Storage methods
    private getLearningData(): LearningData | null {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading learning data:', error);
            return null;
        }
    }

    private saveLearningData(data: LearningData): void {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving learning data:', error);
        }
    }

    public getSessions(): DhikrSession[] {
        try {
            const sessions = localStorage.getItem(this.sessionsKey);
            return sessions ? JSON.parse(sessions) : [];
        } catch (error) {
            console.error('Error loading sessions:', error);
            return [];
        }
    }

    private saveSessions(sessions: DhikrSession[]): void {
        try {
            // Keep only last 500 sessions for performance
            const recentSessions = sessions.slice(-500);
            localStorage.setItem(this.sessionsKey, JSON.stringify(recentSessions));
        } catch (error) {
            console.error('Error saving sessions:', error);
        }
    }

    // Get recommendation for current time
    public getCurrentRecommendation(): TimeRecommendation | null {
        const data = this.getLearningData();
        if (!data) return null;

        const timeSlot = this.getTimeSlot(new Date().getHours());

        if (
            data.preferences.dhikrByTime &&
            data.preferences.dhikrByTime[timeSlot]
        ) {
            const dhikrByFreq = Object.entries(
                data.preferences.dhikrByTime[timeSlot]
            ).sort(([, a], [, b]) => (b as number) - (a as number));

            if (dhikrByFreq.length > 0) {
                return {
                    dhikrId: dhikrByFreq[0][0],
                    confidence: Math.min((dhikrByFreq[0][1] as number) / 10, 1), // Normalize to 0-1
                    reason: `You often practice this dhikr during ${timeSlot}`,
                };
            }
        }

        return null;
    }

    // Get suggested goal for a dhikr
    public getSuggestedGoal(dhikrId: string): GoalSuggestion | null {
        const data = this.getLearningData();
        if (!data) return null;

        if (data.recommendations.suggestedGoals[dhikrId]) {
            return {
                goal: data.recommendations.suggestedGoals[dhikrId],
                reason: 'Based on your completion patterns',
            };
        }

        return null;
    }

    // Get analytics summary
    public getAnalyticsSummary(): AnalyticsSummary {
        const data = this.getLearningData();
        const sessions = this.getSessions();

        if (!data) {
            return {
                totalSessions: 0,
                totalCounts: 0,
                averageSessionDuration: 0,
                streakDays: 0,
                consistency: 0,
                favoriteTime: 'Not enough data',
                recentSessions: [],
            };
        }

        return {
            totalSessions: data.analytics.totalSessions,
            totalCounts: data.analytics.totalCounts,
            averageSessionDuration: Math.round(data.analytics.averageSessionDuration / 1000), // Convert to seconds
            streakDays: data.analytics.streakDays,
            consistency: this.calculateConsistencyScore(sessions),
            favoriteTime: this.getBestPerformingTime(sessions),
            recentSessions: sessions.slice(-10).reverse(), // Last 10 sessions, newest first
        };
    }

    // Reset learning data (for privacy)
    public resetLearningData(): void {
        try {
            localStorage.removeItem(this.storageKey);
            localStorage.removeItem(this.sessionsKey);
            this.init();
        } catch (error) {
            console.error('Error resetting learning data:', error);
        }
    }
}

// Export singleton instance
export const learningService = new DhikrLearningService();
