export interface IBet {
    _id: string,
    odds: {
        "1x2": {
            homeWin: number,
            draw: number,
            awayWin: number,
        },
        "double chance": {
            homeOrDraw: number,
            awayOrDraw: number,
            noDraw: number,
        },
        "gg/ngg": {
            gg: number,
            ngg: number,
        },
        "under/over": {
            under: {
                1: number,
                2: number,
                3: number,
                4: number,
                5: number,
            },
            over: {
                1: number,
                2: number,
                3: number,
                4: number,
                5: number,
            }
        },
        "teamGoals": {
            home: {
                under: {
                    1: number,
                    2: number,
                    3: number,
                    4: number,
                    5: number,
                },
                over: {
                    1: number,
                    2: number,
                    3: number,
                    4: number,
                    5: number,
                }
            },
            away: {
                under: {
                    1: number,
                    2: number,
                    3: number,
                    4: number,
                    5: number,
                },
                over: {
                    1: number,
                    2: number,
                    3: number,
                    4: number,
                    5: number,
                }
            }
        
        }
    }
}