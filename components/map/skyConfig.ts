/* ============================================================================
 *  EL CIELO — CONSTELACIONES + EVENTOS RANDOM  (capa sobre el mapa)
 *  ---------------------------------------------------------------------------
 *  Todo esto es seguro de tocar. Añade/quita constelaciones, mueve estrellas,
 *  cambia qué pasa al hacer clic, ajusta cada cuánto cruzan los cometas.
 *
 *  Estrellas: [x, y] en fracción de pantalla.
 *    x: 0 = borde izquierdo, 0.5 = centro, 1 = borde derecho
 *    y: 0 = arriba del todo, 1 = abajo del todo
 *  Ponlas por los bordes / la parte de arriba para no tapar el mapa.
 *  Líneas: pares de índices dentro de "stars".
 *
 *  onClick admite:
 *    'flash:tu texto'   -> escribe el texto un momento en el cielo
 *    'comet'            -> lanza un cometa al instante
 *    'shower'           -> lluvia de estrellas fugaces
 *    'node:core'        -> enfoca/abre ese nodo del mapa (core, perfil, proyectos…)
 *    'url:https://...'  -> abre un enlace en otra pestaña
 * ========================================================================== */

export type SkyAction = string;

export interface SkyConstellation {
  name: string;
  stars: [number, number][];
  lines: [number, number][];
  /** si es interactuable: brilla al pasar el ratón y responde al clic */
  interactive?: boolean;
  onClick?: SkyAction;
}

export const SKY = {
  /* -- eventos random ambientales -------------------------------------- */
  events: {
    enabled: true,
    /** segundos entre eventos: valor aleatorio dentro de este rango */
    everySec: [5, 14] as [number, number],
    /** probabilidad relativa de cada tipo */
    weights: { comet: 4, shootingStar: 10, satellite: 3, flare: 4 } as Record<string, number>,
    comet: { color: '#fff2c4', speedSec: [2.2, 3.6] as [number, number], tail: 190 },
    shootingStar: { color: '#ffffff', speedSec: [0.5, 0.9] as [number, number], tail: 120 },
    satellite: { color: '#bcd8ff', speedSec: [9, 15] as [number, number] },
    flare: { color: '#fde100' }
  },

  /* -- constelaciones ----------------------------------------------- */
  constellations: [
    {
      // la firma — una M de estrellas arriba a la izquierda. Clic = manifiesto.
      name: 'MallenK',
      stars: [
        [0.07, 0.24],
        [0.1, 0.12],
        [0.13, 0.2],
        [0.16, 0.12],
        [0.19, 0.24]
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
        [0.31, 0.1],
        [0.33, 0.19],
        [0.31, 0.28],
        [0.37, 0.31],
        [0.26, 0.31]
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
      name: 'El Faro',
      stars: [
        [0.5, 0.08],
        [0.52, 0.16],
        [0.5, 0.25],
        [0.56, 0.3],
        [0.45, 0.3]
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
      name: 'La Señal',
      stars: [
        [0.7, 0.11],
        [0.74, 0.2],
        [0.79, 0.16],
        [0.75, 0.29],
        [0.81, 0.26]
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
      name: 'El Vigía',
      stars: [
        [0.9, 0.28],
        [0.95, 0.32],
        [0.92, 0.4],
        [0.92, 0.22],
        [0.92, 0.31]
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
      // decorativa
      name: 'El Puente',
      stars: [
        [0.04, 0.6],
        [0.1, 0.66],
        [0.17, 0.68],
        [0.24, 0.66],
        [0.31, 0.6]
      ],
      lines: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4]
      ]
    },
    {
      // decorativa
      name: 'El Río',
      stars: [
        [0.63, 0.62],
        [0.71, 0.7],
        [0.79, 0.64],
        [0.87, 0.72],
        [0.95, 0.66]
      ],
      lines: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4]
      ]
    }
  ] as SkyConstellation[]
};
