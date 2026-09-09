/* ============================================================================
 *  EL CIELO — CONSTELACIONES REALES + EVENTOS RANDOM  (dentro del mundo 3D)
 *  ---------------------------------------------------------------------------
 *  Cada constelación es un asterismo real (Orión, Osa Mayor, Casiopea…).
 *  Viven en la galaxia: al orbitar la cámara se mueven contigo.
 *
 *  - anchor: [azimut°, altura°]  -> DÓNDE va la constelación en el cielo.
 *      azimut 0..360 alrededor (180 = de frente al cargar). altura 0 = horizonte.
 *      Para MOVER una constelación entera: cambia solo su anchor.
 *  - scale: grados por unidad -> el TAMAÑO. Bájalo y se hace más pequeña.
 *  - stars: la FORMA real (offsets relativos). No la toques si quieres que
 *      siga pareciéndose a la constelación de verdad.
 *  - brightness: brillo/tamaño de cada estrella (mismo orden que stars).
 *  - lines: pares de índices de "stars".
 *
 *  onClick: 'flash:texto' | 'comet' | 'shower' | 'node:core' | 'url:https://...'
 * ========================================================================== */

export type SkyAction = string;

export interface SkyConstellation {
  name: string;
  anchor: [number, number];
  scale?: number;
  stars: [number, number][];
  brightness?: number[];
  lines: [number, number][];
  interactive?: boolean;
  onClick?: SkyAction;
}

export const SKY = {
  radius: 62,
  starSize: 0.1, // estrellas pequeñas — son estrellas de verdad

  events: {
    enabled: true,
    everySec: [6, 15] as [number, number],
    weights: { comet: 4, shootingStar: 10, satellite: 3, flare: 4 } as Record<string, number>,
    comet: { color: '#fff2c4', speedSec: [3, 4.6] as [number, number], tail: 7, size: 0.34 },
    shootingStar: { color: '#ffffff', speedSec: [0.55, 1] as [number, number], tail: 4.5 },
    satellite: { color: '#cfe6ff', speedSec: [9, 15] as [number, number] },
    flare: { color: '#fde100' }
  },

  constellations: [
    {
      name: 'Orión',
      anchor: [148, 14],
      scale: 2.4,
      // Betelgeuse, Bellatrix, cinturón (Alnitak/Alnilam/Mintaka), Saiph, Rigel
      stars: [
        [-1.0, 1.5],
        [1.1, 1.5],
        [-0.45, 0.05],
        [0.0, 0.0],
        [0.5, 0.0],
        [-0.85, -1.5],
        [1.0, -1.6]
      ],
      brightness: [1.7, 1.2, 1.1, 1.2, 1.1, 0.9, 1.7],
      lines: [
        [0, 1],
        [0, 2],
        [1, 4],
        [2, 3],
        [3, 4],
        [2, 5],
        [4, 6]
      ],
      interactive: true,
      onClick: 'node:core'
    },
    {
      name: 'Osa Mayor',
      anchor: [72, 25],
      scale: 2.2,
      // cazo (Dubhe, Merak, Phecda, Megrez) + mango (Alioth, Mizar, Alkaid)
      stars: [
        [0.0, 0.9],
        [0.0, 0.2],
        [0.85, 0.05],
        [0.9, 0.8],
        [1.6, 0.95],
        [2.3, 1.15],
        [3.0, 1.5]
      ],
      brightness: [1.4, 1.3, 1.1, 0.9, 1.3, 1.2, 1.2],
      lines: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
        [3, 4],
        [4, 5],
        [5, 6]
      ],
      interactive: true,
      onClick: 'comet'
    },
    {
      name: 'Casiopea',
      anchor: [210, 28],
      scale: 2.2,
      stars: [
        [0.0, 0.0],
        [1.0, 0.7],
        [2.0, 0.15],
        [3.0, 0.8],
        [4.0, 0.1]
      ],
      brightness: [1.2, 1.1, 1.3, 1.0, 1.1],
      lines: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4]
      ],
      interactive: true,
      onClick: 'flash:sigue mirando arriba'
    },
    {
      name: 'Cisne',
      anchor: [292, 20],
      scale: 2.4,
      // Deneb, Sadr, Albireo (espina) + Gienah, Delta (alas) — la Cruz del Norte
      stars: [
        [0.0, 1.7],
        [0.1, 0.3],
        [0.25, -1.6],
        [-1.4, 0.5],
        [1.3, 0.55]
      ],
      brightness: [1.6, 1.1, 0.9, 1.0, 1.0],
      lines: [
        [0, 1],
        [1, 2],
        [3, 1],
        [1, 4]
      ],
      interactive: true,
      onClick: 'url:https://github.com/MallenK'
    },
    {
      name: 'Lira',
      anchor: [12, 30],
      scale: 1.4,
      // Vega + el paralelogramo
      stars: [
        [0.0, 1.1],
        [-0.4, -0.1],
        [0.5, 0.0],
        [-0.25, -1.1],
        [0.65, -1.0]
      ],
      brightness: [1.8, 0.7, 0.7, 0.7, 0.7],
      lines: [
        [0, 1],
        [0, 2],
        [1, 3],
        [2, 4],
        [3, 4]
      ],
      interactive: true,
      onClick: 'shower'
    },
    {
      name: 'León',
      anchor: [340, 26],
      scale: 2.0,
      // la hoz (Regulus + curva) y el triángulo trasero (Zosma, Denebola)
      stars: [
        [0.0, 0.0],
        [0.05, 0.6],
        [0.15, 1.15],
        [0.3, 1.6],
        [0.7, 1.75],
        [1.0, 1.3],
        [-1.8, 0.75],
        [-2.7, 0.35]
      ],
      brightness: [1.5, 0.8, 1.1, 0.8, 0.8, 0.9, 1.0, 1.2],
      lines: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [0, 6],
        [6, 7],
        [7, 0],
        [2, 6]
      ]
    },
    {
      name: 'Tauro',
      anchor: [230, 12],
      scale: 2.4,
      // la V de las Híades con Aldebarán, hacia Elnath
      stars: [
        [0.0, 0.0],
        [0.55, 0.45],
        [1.1, 0.95],
        [0.5, -0.35],
        [1.15, -0.7]
      ],
      brightness: [1.5, 0.8, 1.1, 0.8, 0.9],
      lines: [
        [0, 1],
        [1, 2],
        [0, 3],
        [3, 4]
      ]
    },
    {
      name: 'Osa Menor',
      anchor: [285, 42],
      scale: 2.0,
      // con la Estrella Polar
      stars: [
        [0.0, 1.5],
        [0.25, 0.9],
        [0.1, 0.35],
        [-0.35, 0.1],
        [-0.55, -0.35],
        [-0.75, 0.35],
        [-0.15, -0.15]
      ],
      brightness: [1.3, 0.7, 0.7, 0.8, 1.1, 1.0, 0.7],
      lines: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 6],
        [6, 4],
        [4, 5],
        [5, 3]
      ]
    }
  ] as SkyConstellation[]
};
