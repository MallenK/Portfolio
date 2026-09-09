/* ============================================================================
 *  EL CIELO — CONSTELACIONES + EVENTOS RANDOM  (dentro del mundo 3D)
 *  ---------------------------------------------------------------------------
 *  Todo esto es seguro de tocar. Las constelaciones viven en la galaxia: al
 *  orbitar la cámara se mueven contigo, como estrellas de verdad.
 *
 *  Estrellas: [azimut°, altura°]  (y opcionalmente un 3º número = tamaño ×).
 *    azimut  0..360  -> alrededor de ti. 180 = de frente al cargar la web.
 *    altura  0 = horizonte. Positivo = arriba, negativo = abajo.
 *            ~15..35 se ve asomando por encima del mapa al cargar.
 *  Líneas: pares de índices dentro de "stars".
 *
 *  onClick admite:
 *    'flash:tu texto'   -> escribe el texto un momento en el cielo
 *    'comet'            -> lanza un cometa
 *    'shower'           -> lluvia de estrellas fugaces
 *    'node:core'        -> enfoca/abre ese nodo del mapa (core, perfil, proyectos…)
 *    'url:https://...'  -> abre un enlace en otra pestaña
 * ========================================================================== */

export type SkyAction = string;
/** [azimut, altura] o [azimut, altura, tamaño×] */
export type SkyStar = [number, number] | [number, number, number];

export interface SkyConstellation {
  name: string;
  stars: SkyStar[];
  lines: [number, number][];
  /** si es interactuable: brilla al pasar el ratón y responde al clic */
  interactive?: boolean;
  onClick?: SkyAction;
}

export const SKY = {
  radius: 62, // a qué distancia viven las estrellas del cielo
  starSize: 0.24, // tamaño base de las estrellas (las varía cada una un poco)

  /* -- eventos random ambientales -------------------------------------- */
  events: {
    enabled: true,
    /** segundos entre eventos: valor aleatorio dentro de este rango */
    everySec: [6, 15] as [number, number],
    /** probabilidad relativa de cada tipo */
    weights: { comet: 4, shootingStar: 10, satellite: 3, flare: 4 } as Record<string, number>,
    comet: { color: '#fff2c4', speedSec: [3, 4.6] as [number, number], tail: 7, size: 0.34 },
    shootingStar: { color: '#ffffff', speedSec: [0.55, 1] as [number, number], tail: 4.5 },
    satellite: { color: '#cfe6ff', speedSec: [9, 15] as [number, number] },
    flare: { color: '#fde100' }
  },

  /* -- constelaciones ----------------------------------------------- */
  constellations: [
    {
      // la firma — una M encima del núcleo. Clic = abre el manifiesto.
      name: 'MallenK',
      stars: [
        [173, 22, 1.1],
        [177, 33, 0.8],
        [181, 26, 1.4],
        [185, 33, 0.7],
        [189, 22, 1.0]
      ],
      lines: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4]
      ],
      interactive: true,
      onClick: 'node:core'
    },
    {
      name: 'La Antena',
      stars: [
        [147, 16, 1.3],
        [149, 26, 0.9],
        [148, 36, 0.7],
        [155, 40, 1.1],
        [141, 39, 0.8]
      ],
      lines: [
        [0, 1],
        [1, 2],
        [2, 3],
        [2, 4]
      ],
      interactive: true,
      onClick: 'comet'
    },
    {
      name: 'La Señal',
      stars: [
        [206, 15, 0.9],
        [212, 26, 1.5],
        [219, 21, 0.8],
        [214, 36, 1.0],
        [222, 32, 0.7]
      ],
      lines: [
        [0, 1],
        [1, 2],
        [1, 3],
        [3, 4]
      ],
      interactive: true,
      onClick: 'url:https://github.com/MallenK'
    },
    {
      name: 'El Faro',
      stars: [
        [124, 20, 1.2],
        [126, 31, 0.8],
        [124, 42, 1.6],
        [131, 47, 0.7],
        [118, 47, 0.9]
      ],
      lines: [
        [0, 1],
        [1, 2],
        [2, 3],
        [2, 4]
      ],
      interactive: true,
      onClick: 'flash:sigue mirando arriba'
    },
    {
      name: 'El Vigía',
      stars: [
        [232, 26, 0.9],
        [239, 30, 1.1],
        [235, 37, 0.7],
        [235, 22, 0.8],
        [235, 30, 1.6]
      ],
      lines: [
        [0, 4],
        [1, 4],
        [2, 4],
        [3, 4]
      ],
      interactive: true,
      onClick: 'shower'
    },
    {
      // decorativa, por debajo del mapa
      name: 'El Puente',
      stars: [
        [162, -30, 0.8],
        [172, -22, 1.2],
        [182, -19, 0.7],
        [192, -22, 1.3],
        [202, -30, 0.9]
      ],
      lines: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4]
      ]
    },
    {
      // decorativa, se descubre orbitando a la izquierda
      name: 'El Río',
      stars: [
        [86, 10, 1.0],
        [96, 22, 0.7],
        [106, 14, 1.4],
        [116, 26, 0.8],
        [126, 16, 1.1]
      ],
      lines: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4]
      ]
    },
    {
      // decorativa, se descubre orbitando a la derecha
      name: 'El Compás',
      stars: [
        [262, 30, 1.2],
        [270, 46, 0.8],
        [278, 30, 1.2],
        [270, 46, 0.7],
        [270, 58, 1.5]
      ],
      lines: [
        [0, 1],
        [1, 2],
        [1, 4]
      ]
    }
  ] as SkyConstellation[]
};
