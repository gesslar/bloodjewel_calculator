const qualities = [
    "raw",
    "rough",
    "uncut",
    "flawed",
    "imperfect",
    "polished",
    "flawless",
    "perfect",
    "luminous",
    "wondrous",
]

const types = [
    "bellicose",
    "catalytic",
    "cerebral",
    "devout",
    "ensorcelled",
    "enthralling",
    "fanatical",
    "mercantile",
    "necromantic",
    "perfidious",
    "savage",
]

const gems = {
    bellicose: [
        {
            name: "max_health", values: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50,]
        },
        {
            name: "natural_armor", values: [0, 1, 1, 2, 2, 3, 3, 4, 4, 5,]
        }
    ],
    catalytic: [
        {
            name: "threat_generation", values: [1, 2, 2, 3, 3, 4, 4, 5, 5, 6,],
        },
        {
            name: "elemental_resist", values: [2, 3, 3, 4, 4, 5, 5, 5, 6, 7,],
        }
    ],
    cerebral: [
        {
            name: "sp_regen", values: [1, 1, 2, 2, 3, 3, 4, 5, 5, 5,],
        },
        {
            name: "intelligence", values: [0, 1, 1, 2, 2, 3, 3, 4, 4, 5,],
        }
    ],
    devout: [
        {
            name: "hp_regen", values: [1, 1, 2, 2, 3, 3, 4, 5, 5, 5,],
        },
        {
            name: "wisdom", values: [0, 1, 1, 2, 2, 3, 3, 4, 4, 5,],
        }
    ],
    ensorcelled: [
        {
            name: "max_sp",
            values: [2, 4, 6, 8, 10, 12, 14, 16, 45, 50,],
        },
        {
            name: "resist_armor",
            values: [0, 1, 1, 2, 2, 3, 3, 4, 5, 6,],
        }
    ],
    enthralling: [
        {
            name: "max_tummy",
            values: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20,],
        },
        {
            name: "luck",
            values: [0, 1, 1, 2, 2, 3, 3, 4, 4, 5,],
        }
    ],
    fanatical: [
        {
            name: "max_ep", values: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30,],
        },
        {
            name: "resist_physical", values: [1, 2, 2, 3, 3, 4, 4, 5, 5, 6,],
        }
    ],
    mercantile: [
        {
            name: "critical_strike", values: [1, 2, 2, 3, 3, 4, 4, 5, 5, 6,],
        },
        {
            name: "rest_regen", values: [0, 2, 2, 4, 4, 6, 6, 8, 8, 10,],
        }
    ],
    necromantic: [
        {
            name: "regen_ep", values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,],
        },
        {
            name: "critical_style", values: [0, 1, 2, 2, 3, 3, 4, 4, 5, 5,],
        }
    ],
    perfidious: [
        {
            name: "max_ep", values: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30,],
        },
        {
            name: "threat_generation", values: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5,],
        }
    ],
    savage: [
        {
            name: "regen_ep", values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,],
        },
        {
            name: "critical_style", values: [0, 1, 2, 2, 3, 3, 4, 4, 5, 5,],
        }
    ]
}
