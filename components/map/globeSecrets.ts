/* ============================================================================
 *  PROYECTOS · EL GLOBO — DETALLES Y EASTER EGGS
 *  ---------------------------------------------------------------------------
 *  Todo lo de este archivo es seguro de tocar. Cambia textos, enlaces, emojis,
 *  códigos y tiempos a tu gusto — no hace falta abrir nodes.tsx.
 *
 *  Los "códigos" se activan escribiéndolos con el teclado en cualquier parte
 *  de la página (como el ya existente "mallenk" que desbloquea el dev mode).
 * ========================================================================== */

export const GLOBE = {
  /* -- Detalles visuales (siempre activos) -------------------------------- */
  detail: {
    atmosphere: true, // halo de atmósfera alrededor del globo
    surfaceMotes: 46, // "resto de la web": puntitos en la superficie (0 = ninguno)
    orbiters: 2, // satélites que orbitan el globo
    signalPing: true, // anillo de "señal" que sale de un pin cada pocos segundos
    pingEverySec: 4.2,
    poles: true // marcas diminutas en los polos (deja claro que es un globo con eje)
  },

  /* -- Easter egg 1 · lluvia de datos ----------------------------------- *
   *  Escribe este código y el globo "llueve datos" unos segundos.
   *  Al terminar, aparece un pin secreto en la superficie (egg 2).         */
  dataRain: {
    code: 'online',
    seconds: 5,
    toast: 'CONEXIÓN ESTABLECIDA'
  },

  /* -- Easter egg 2 · el pin fantasma --------------------------------- *
   *  El 6º proyecto, oculto. Aparece tras activar la lluvia de datos y se
   *  queda toda la sesión. Haz clic en él para abrir la URL.              */
  ghostPin: {
    label: '· · ·', // lo que se lee al pasar el ratón (déjalo críptico)
    url: 'https://github.com/MallenK',
    openInNewTab: true,
    toast: 'todavía no 👀',
    latDeg: 18, // dónde se coloca en el globo
    lngDeg: 132
  },

  /* -- Easter egg 3 · enjambre --------------------------------------- *
   *  Escribe este código y salen más satélites a orbitar (toda la sesión). */
  swarm: {
    code: 'orbita',
    addOrbiters: 3,
    toast: 'ENJAMBRE DESPLEGADO'
  },

  /* -- Firma que se imprime una vez en la consola del navegador ------- */
  consoleNote: [
    '5 sitios en producción.',
    'El 6º está escondido en el globo de Proyectos.',
    'Pista: la red ya está «online».'
  ]
};

/* sessionStorage a prueba de modos privados / permisos denegados */
export const ss = {
  get(k: string): string | null {
    try {
      return window.sessionStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set(k: string, v: string): void {
    try {
      window.sessionStorage.setItem(k, v);
    } catch {
      /* ignore */
    }
  }
};
