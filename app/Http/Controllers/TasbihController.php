<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TasbihController extends Controller
{
    public function index()
    {
        return Inertia::render('Home');
    }

    public function tasbih()
    {
        return Inertia::render('Tasbih');
    }

    public function dhikrList()
    {
        $defaultDhikr = [
            [
                'id' => 1,
                'arabic' => 'سُبْحَانَ ٱللَّٰهِ',
                'transliteration' => 'Subhan Allah',
                'meaning' => 'Glory be to Allah',
                'defaultGoal' => 33,
            ],
            [
                'id' => 2,
                'arabic' => 'ٱلْـحَمْدُ لِلَّٰهِ',
                'transliteration' => 'Alhamdulillah',
                'meaning' => 'Praise be to Allah',
                'defaultGoal' => 33,
            ],
            [
                'id' => 3,
                'arabic' => 'ٱللَّٰهُ أَكْبَرُ',
                'transliteration' => 'Allahu Akbar',
                'meaning' => 'Allah is Greatest',
                'defaultGoal' => 34,
            ],
            [
                'id' => 4,
                'arabic' => 'لَا إِلَٰهَ إِلَّا ٱللَّٰهُ',
                'transliteration' => 'La ilaha illa Allah',
                'meaning' => 'There is no god but Allah',
                'defaultGoal' => 100,
            ],
            [
                'id' => 5,
                'arabic' => 'أَسْتَغْفِرُ ٱللَّٰهَ',
                'transliteration' => 'Astaghfirullah',
                'meaning' => 'I seek forgiveness from Allah',
                'defaultGoal' => 100,
            ],
        ];

        return Inertia::render('DhikrList', [
            'dhikrList' => $defaultDhikr
        ]);
    }
}
