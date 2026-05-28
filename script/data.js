const postales = {
    'FIFA': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    'equipos': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
}

var grupos = [
    {
        'codigo': 'FIFA',
        'equipos': [
            {
                'codigo': 'FIFA',
                'nombre': 'FIFA',
                'postales': 'fifa',
                'confederacion': 'FIFA'
            }
        ]
    },
    {
        'codigo': 'A',
        "equipos": [
            {
                'codigo': 'MEX',
                'nombre': 'México',
                'postales': 'equipos',
                'confederacion': 'CONCACAF'
            },
            {
                'codigo': 'RSA',
                'nombre': 'Sudáfrica',
                'postales': 'equipos',
                'confederacion': 'CAF'
            },
            {
                'codigo': 'KOR',
                'nombre': 'Korea del Sur',
                'postales': 'equipos',
                'confederacion': 'AFC'
            },
            {
                'codigo': 'CZE',
                'nombre': 'República Checa',
                'postales': 'equipos',
                'confederacion': 'UEFA'
            }                                    
        ]
    },
    {
        'codigo': 'B',
        'equipos': [
            {
                'codigo': 'CAN',
                'nombre': 'Canadá',
                'postales': 'equipos',
                'confederacion': 'CONCACAF'
            },
            {
                'codigo': 'BIH',
                'nombre': 'Bosnia y Herzegovina',
                'postales': 'equipos',
                'confederacion': 'UEFA'
            },
            {
                'codigo': 'QAT',
                'nombre': 'Catar',
                'postales': 'equipos',
                'confederacion': 'AFC'
            },
            {
                'codigo': 'SUI',
                'nombre': 'Suiza',
                'postales': 'equipos',
                'confederacion': 'UEFA'
            }
        ]
    },
    {
        'codigo': 'C',
        'equipos': [
            {
                'codigo': 'BRA',
                'nombre': 'Brasil',
                'postales': 'equipos',
                'confederacion': 'CONMEBOL'
            },
            {
                'codigo': 'MAR',
                'nombre': 'Marruecos',
                'postales': 'equipos',
                'confederacion': 'CAF'
            },
            {
                'codigo': 'HAI',
                'nombre': 'Haití',
                'postales': 'equipos',
                'confederacion': 'CONCACAF'
            },
            {
                'codigo': 'SCO',
                'nombre': 'Escocia',
                'postales': 'equipos',
                'confederacion': 'UEFA'
            }
        ]
    },
    {
        'codigo': 'D',
        'equipos': [
            {
                'codigo': 'USA',
                'nombre': 'Estados Unidos',
                'postales': 'equipos',
                'confederacion': 'CONCACAF'
            },
            {
                'codigo': 'PAR',
                'nombre': 'Paraguay',
                'postales': 'equipos',
                'confederacion': 'CONMEBOL'
            },
            {
                'codigo': 'AUS',
                'nombre': 'Australia',
                'postales': 'equipos',
                'confederacion': 'AFC'
            },
            {
                'codigo': 'TUR',
                'nombre': 'Turquía',
                'postales': 'equipos',
                'confederacion': 'UEFA'
            }
        ]
    },
    {
        'codigo': 'E',
        'equipos': [
            {
                'codigo': 'GER',
                'nombre': 'Alemania',
                'postales': 'equipos',
                'confederacion': 'UEFA'
            },
            {
                'codigo': 'CUW',
                'nombre': 'Curazao',
                'postales': 'equipos',
                'confederacion': 'CONCACAF'
            },
            {
                'codigo': 'CIV',
                'nombre': 'Costa de Marfil',
                'postales': 'equipos',
                'confederacion': 'CAF'
            },
            {
                'codigo': 'ECU',
                'nombre': 'Ecuador',
                'postales': 'equipos',
                'confederacion': 'CONMEBOL'
            }
        ]
    },
    {
        'codigo': 'F',
        'equipos': [
            {
                'codigo': 'NED',
                'nombre': 'Países Bajos',
                'postales': 'equipos',
                'confederacion': 'UEFA'
            },
            {
                'codigo': 'JPN',
                'nombre': 'Japón',
                'postales': 'equipos',
                'confederacion': 'AFC'
            },
            {
                'codigo': 'SWE',
                'nombre': 'Suecia',
                'postales': 'equipos',
                'confederacion': 'UEFA'
            },
            {
                'codigo': 'TUN',
                'nombre': 'Túnez',
                'postales': 'equipos',
                'confederacion': 'CAF'
            }
        ]
    },
    {
        'codigo': 'G',
        'equipos': [
            {
                'codigo': 'BEL',
                'nombre': 'Bélgica',
                'postales': 'equipos',
                'confederacion': 'UEFA'
            },
            {
                'codigo': 'EGY',
                'nombre': 'Egipto',
                'postales': 'equipos',
                'confederacion': 'CAF'
            },
            {
                'codigo': 'IRN',
                'nombre': 'Irán',
                'postales': 'equipos',
                'confederacion': 'AFC'
            },
            {
                'codigo': 'NZL',
                'nombre': 'Nueva Zelanda',
                'postales': 'equipos',
                'confederacion': 'OFC'
            }
        ]
    },
    {
        'codigo': 'H',
        'equipos': [
            {
                'codigo': 'ESP',
                'nombre': 'España',
                'postales': 'equipos',
                'confederacion': 'UEFA'
            },
            {
                'codigo': 'CPV',
                'nombre': 'Cabo Verde',
                'postales': 'equipos',
                'confederacion': 'CAF'
            },
            {
                'codigo': 'KSA',
                'nombre': 'Arabia Saudita',
                'postales': 'equipos',
                'confederacion': 'AFC'
            },
            {
                'codigo': 'URU',
                'nombre': 'Uruguay',
                'postales': 'equipos',
                'confederacion': 'CONMEBOL'
            }
        ]
    },
    {
        'codigo': 'I',
        'equipos': [
            {
                'codigo': 'FRA',
                'nombre': 'Francia',
                'postales': 'equipos',
                'confederacion': 'UEFA'
            },
            {
                'codigo': 'SEN',
                'nombre': 'Senegal',
                'postales': 'equipos',
                'confederacion': 'CAF'
            },
            {
                'codigo': 'IRQ',
                'nombre': 'Irak',
                'postales': 'equipos',
                'confederacion': 'AFC'
            },
            {
                'codigo': 'NOR',
                'nombre': 'Noruega',
                'postales': 'equipos',
                'confederacion': 'UEFA'
            }
        ]
    },
    {
        'codigo': 'J',
        'equipos': [
            {
                'codigo': 'ARG',
                'nombre': 'Argentina',
                'postales': 'equipos',
                'confederacion': 'CONMEBOL'
            },
            {
                'codigo': 'ALG',
                'nombre': 'Argelia',
                'postales': 'equipos',
                'confederacion': 'CAF'
            },
            {
                'codigo': 'AUT',
                'nombre': 'Austria',
                'postales': 'equipos',
                'confederacion': 'UEFA'
            },
            {
                'codigo': 'JOR',
                'nombre': 'Jordania',
                'postales': 'equipos',
                'confederacion': 'AFC'
            }
        ]
    },
    {
        'codigo': 'K',
        'equipos': [
            {
                'codigo': 'POR',
                'nombre': 'Portugal',
                'postales': 'equipos',
                'confederacion': 'UEFA'
            },
            {
                'codigo': 'COD',
                'nombre': 'Rep. Dem. del Congo',
                'postales': 'equipos',
                'confederacion': 'CAF'
            },
            {
                'codigo': 'UZB',
                'nombre': 'Uzbekistán',
                'postales': 'equipos',
                'confederacion': 'AFC'
            },
            {
                'codigo': 'COL',
                'nombre': 'Colombia',
                'postales': 'equipos',
                'confederacion': 'CONMEBOL'
            }
        ]
    },
    {
        'codigo': 'L',
        'equipos': [
            {
                'codigo': 'ENG',
                'nombre': 'Inglaterra',
                'postales': 'equipos',
                'confederacion': 'UEFA'
            },
            {
                'codigo': 'CRO',
                'nombre': 'Croacia',
                'postales': 'equipos',
                'confederacion': 'UEFA'
            },
            {
                'codigo': 'GHA',
                'nombre': 'Ghana',
                'postales': 'equipos',
                'confederacion': 'CAF'
            },
            {
                'codigo': 'PAN',
                'nombre': 'Panamá',
                'postales': 'equipos',
                'confederacion': 'CONCACAF'
            }
        ]
    }
]

// export var postalesPegadas = {
//     'FIFA': [1, 2, 4, 6, 9],
//     'MEX': [1, 2, 3, 6, 9, 10, 15, 19],
//     'RSA': [1, 2, 4, 8, 14, 18],
//     'KOR': [3, 9, 10, 13, 14, 17],
//     'CZE': [5, 6, 15, 20],
//     'CAN': [2, 5, 9, 14, 17, 19],
//     'BIH': [3, 4, 6, 17, 20],
//     'QAT': [1, 3, 7, 8, 9, 12, 13, 14, 19],
//     'SUI': [1, 3, 4, 7, 11, 15, 17],
//     'BRA': [2, 6, 7, 12, 13, 14, 17],
//     'MAR': [1, 3, 7, 8, 11, 12, 17, 18],
//     'HAI': [3, 6, 10, 19],
//     'SCO': [2, 3, 4, 6, 12, 14, 15],
//     'USA': [2, 10, 15, 16, 19],
//     'PAR': [3, 4, 5, 9, 12, 14, 18],
//     'AUS': [2, 5, 9, 11, 12, 16, 17],
//     'TUR': [1, 8, 9, 10, 14, 16, 19],
//     'GER': [1, 12, 15, 17],
//     'CUW': [1, 2, 3, 7, 9, 10, 14, 15, 19],
//     'CIV': [1, 2, 6, 7, 12, 13, 15, 16, 18],
//     'ECU': [1, 4, 5, 6, 14, 15, 18, 20],
//     'NED': [1, 8, 14, 17, 18],
//     'JPN': [3, 8, 9, 15, 19],
//     'SWE': [2, 14, 16],
//     'TUN': [2, 4, 5, 6, 10, 18],
//     'BEL': [2, 4, 8, 9, 13, 14],
//     'EGY': [1, 4, 10, 13, 14, 15, 18, 19],
//     'IRN': [6, 7, 9, 10, 14, 15],
//     'NZL': [3, 4, 6, 14, 15, 19],
//     'ESP': [3, 4, 13, 14, 17],
//     'CPV': [1, 4, 6, 15, 19],
//     'KSA': [2, 4, 6, 7, 8, 14, 18],
//     'URU': [1, 3, 12, 13, 14, 17],
//     'FRA': [3, 6, 7, 10, 15],
//     'SEN': [1, 2, 5, 15, 18, 20],
//     'IRQ': [5, 9, 10, 11, 14, 16],
//     'NOR': [2, 3, 6, 7, 11, 13, 16, 19],
//     'ARG': [3, 6, 7, 8, 11, 12, 19, 20],
//     'ALG': [1, 2, 3, 5, 9, 10, 11, 14, 15, 16, 19, 20],
//     'AUT': [1, 3, 5, 6, 7, 8, 11, 15],
//     'JOR': [4, 8, 12, 13, 17, 18],
//     'POR': [1, 3, 4, 7, 10, 11, 16],
//     'COD': [2, 4, 5, 6, 9, 13, 14, 16, 17],
//     'UZB': [4, 13],
//     'COL': [1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 19],
//     'ENG': [3, 7, 9, 11, 13, 14],
//     'CRO': [2, 4, 6, 8, 10, 13, 14, 17, 18],
//     'GHA': [3, 5, 7, 9, 14, 17, 18],
//     'PAN': [1, 9, 10, 13, 19]
// }

export var postalesPegadas = {
    'FIFA': [1, 2, 4, 6, 9],
    'MEX': [1, 2, 3, 6, 9, 10, 15, 19],
    'RSA': [1, 2, 4, 8, 14, 18],
    'KOR': [3, 9, 10, 13, 14, 17],
    'CZE': [5, 6, 15, 20],
    'CAN': [2, 5, 9, 14, 17, 19],
    'BIH': [3, 4, 6, 17, 20],
    'QAT': [1, 3, 7, 8, 9, 12, 13, 14, 19],
    'SUI': [1, 3, 4, 7, 11, 15, 17],
    'BRA': [2, 6, 7, 12, 13, 14, 17],
    'MAR': [1, 3, 7, 8, 11, 12, 17, 18],
    'HAI': [3, 6, 10, 19],
    'SCO': [2, 3, 4, 6, 12, 14, 15],
    'USA': [2, 10, 15, 16, 19],
    'PAR': [3, 4, 5, 9, 12, 14, 18],
    'AUS': [2, 5, 9, 11, 12, 16, 17],
    'TUR': [1, 8, 9, 10, 14, 16, 19],
    'GER': [1, 12, 15, 17],
    'CUW': [1, 2, 3, 7, 9, 10, 14, 15, 19],
    'CIV': [1, 2, 6, 7, 12, 13, 15, 16, 18],
    'ECU': [1, 4, 5, 6, 14, 15, 18, 20],
    'NED': [1, 8, 14, 17, 18],
    'JPN': [3, 8, 9, 15, 19],
    'SWE': [2, 14, 16],
    'TUN': [2, 4, 5, 6, 10, 18],
    'BEL': [2, 4, 8, 9, 13, 14],
    'EGY': [1, 4, 10, 13, 14, 15, 18, 19],
    'IRN': [6, 7, 9, 10, 14, 15],
    'NZL': [3, 4, 6, 14, 15, 19],
    'ESP': [3, 4, 13, 14, 17],
    'CPV': [1, 4, 6, 15, 19],
    'KSA': [2, 4, 6, 7, 8, 14, 18],
    'URU': [1, 3, 12, 13, 14, 17],
    'FRA': [3, 6, 7, 10, 15],
    'SEN': [1, 2, 5, 15, 18, 20],
    'IRQ': [5, 9, 10, 11, 14, 16],
    'NOR': [2, 3, 6, 7, 11, 13, 16, 19],
    'ARG': [3, 6, 7, 8, 11, 12, 19, 20],
    'ALG': [1, 2, 3, 5, 9, 10, 11, 14, 15, 16, 19, 20],
    'AUT': [1, 3, 5, 6, 7, 8, 11, 15],
    'JOR': [4, 8, 12, 13, 17, 18],
    'POR': [1, 3, 4, 7, 10, 11, 16],
    'COD': [2, 4, 5, 6, 9, 13, 14, 16, 17],
    'UZB': [4, 13],
    'COL': [1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 19],
    'ENG': [3, 7, 9, 11, 13, 14],
    'CRO': [2, 4, 6, 8, 10, 13, 14, 17, 18],
    'GHA': [3, 5, 7, 9, 14, 17, 18],
    'PAN': [1, 9, 10, 13, 19]
}