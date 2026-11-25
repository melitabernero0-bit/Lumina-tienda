export const PRODUCTOS_INICIALES = [
  {
    id: 1,
    nombre: "Gel postsolar",
    precio: 3200,
    categoria: "CUIDADO PERSONAL",
    descripcion: `Aliviá y refrescá tu piel al instante después del sol. Fórmula ligera de rápida absorción que hidrata y calma sin dejar sensación grasa.
• Aloe Vera y Vitamina E: Calman, reparan la piel y prolongan el bronceado.
• Mentol: Aporta un efecto frío refrescante inmediato.
• Formato bolsillo (30 g): Ideal para llevar en el bolso, cartera o de viaje.
Apto rostro y cuerpo | Todo tipo de piel | Vegano y cruelty-free.`,
    imagen: "/gelpostsolar.jpeg"
  },
  {
    id: 2,
    nombre: "Sombra Choco Eyes",
    precio: 5700,
    categoria: "OJOS",
    descripcion: "Sombra de 12 colores con tonos mate y glitter de Pink 21",
    imagen: "/sombraspink21.jpeg",
    opciones: ["Modelo 1", "Modelo 2"]
  },
  {
    id: 3,
    nombre: "Guante exfoliante",
    precio: 1500,
    categoria: "ACCESORIOS",
    descripcion: "Remové células muertas e impurezas, piel mas luminosa y suave",
    imagen: "/guanteexfoliante.jpeg"
  },
  {
    id: 4,
    nombre: "Arqueador",
    precio: 3200,
    categoria: ["ACCESORIOS", "OJOS"],
    descripcion: "Arqueador con peine desmontable. Curvatura natural, potenciá el volumen de tus pestañas.",
    imagen: "/arqueador.jpeg"
  },
  {
    id: 5,
    nombre: "Espejo de cartera con cepillo",
    precio: 3500,
    categoria: "ACCESORIOS",
    descripcion: "Tamaño ideal para cartera, espejo y cepillo (2 en 1). Incluye pincita de depilar Eloise.",
    imagen: "/cepilloypinza.jpeg"
  },
  {
    id: 6,
    nombre: "Corrector TEI",
    precio: 3200,
    categoria: "ROSTRO",
    descripcion: "Ideal para el día a día. Cobertura ligera a media, hidratante y fácil de difuminar.",
    imagen: "/correctortei.jpeg",
    imagenes: ["/correctortei.jpeg", "/tonoscorrectortei.jpeg"],
    opciones: ["Tono 7", "Tono 8", "Tono 9", "Tono 10", "Tono 11", "Tono 12"],
    opcionesSinStock: ["Tono 8"],
    
  },
  {
    id: 7,
    nombre: "Delineador labial Pink 21",
    precio: 1500,
    categoria: "LABIOS",
    consultaTonos: true,
    descripcion: "",
    imagen: "/delineadorlabialpink21.jpeg"
  },
  {
    id: 8,
    nombre: "Beauty Blender",
    precio: 1600,
    categoria: "ACCESORIOS",
    descripcion: "",
    imagen: "/esponja.jpeg"
  },
  {
    id: 9,
    nombre: "Mini esponjas para corrector",
    precio: 2600,
    categoria: "ACCESORIOS",
    descripcion: "5 mini esponjas para corrector en cajita.",
    imagen: "/esponjapcorrector.jpeg"
  },
  {
    id: 10,
    nombre: "Exfoliante Corporal",
    precio: 9100,
    categoria: "CUIDADO PERSONAL",
    descripcion: "Limpia, remueve células muertas e hidrata la piel. Exfoliante con ácido hialurónico, que ayuda a retener la hidratación y mantener la piel flexible y suave. Marca: TEI",
    imagen: "/exfoliantetei.jpeg"
  },
  {
    id: 11,
    nombre: "Fijador Super Stay Double Fixer – TEI",
    precio: 6300,
    categoria: "ROSTRO",
    descripcion: "Bruma fijadora de doble acción que sella el maquillaje por más tiempo y aporta un acabado luminoso natural. Rociar a 25cm del rostro. 60ML.",
    imagen: "/fijadortei.jpeg"
  },
  {
    id: 12,
    nombre: "Gel para cejas ULTRA FIX",
    precio: 4100,
    categoria: "OJOS",
    descripcion: "Cepillo aplicador preciso y fórmula con Vitamina E. Fijación de larga duración.",
    imagen: "/gelcejasultrafix.jpeg"
  },
  {
    id: 13,
    nombre: "Labial Líquido Perfect Lips Ruby Rose (Mate)",
    precio: 4000,
    categoria: "LABIOS",
    descripcion: "",
    imagen: "/perfectlipsrubyrose.png",
    imagenes: [
      "/perfectlipsrubyrose.png",
      "/labialmaterrtono1.jpeg",
      "/labialmaterrtono2.jpeg",
      "/labialmaterrtono3.jpeg",
      "/labialmaterrtono6.jpeg",
      "/labialmaterrtono7.jpeg",
      "/labialmaterrtono8.jpeg"
    ],
    opciones: ["Tono 1", "Tono 2", "Tono 3", "Tono 4", "Tono 5", "Tono 6", "Tono 7", "Tono 8"],
    opcionesSinStock: ["Tono 4", "Tono 5"],
    imagenesPorOpcion: {
      "Tono 1": "/labialmaterrtono1.jpeg",
      "Tono 2": "/labialmaterrtono2.jpeg",
      "Tono 3": "/labialmaterrtono3.jpeg",
      "Tono 6": "/labialmaterrtono6.jpeg",
      "Tono 7": "/labialmaterrtono7.jpeg",
      "Tono 8": "/labialmaterrtono8.jpeg"
    }
  },
  {
    id: 14,
    nombre: "Lipgloss Pink 21 con llavero",
    precio: 4000,
    categoria: ["LABIOS"],
    descripcion: "",
    imagen: "/lipglossllavero.png",
    imagenes: [
      "/lipglossllavero.png",
      "/lipglossllaverotono3.jpeg",
      "/lipglossllaverotono6.jpeg"
    ],
    opciones: ["Tono 1", "Tono 2", "Tono 3", "Tono 4", "Tono 5", "Tono 6"],
    opcionesSinStock: ["Tono 1", "Tono 2", "Tono 4", "Tono 5"],
    imagenesPorOpcion: {
      "Tono 3": "/lipglossllaverotono3.jpeg",
      "Tono 6": "/lipglossllaverotono6.jpeg"
    }
  },
{
    id: 15,
    nombre: "Mascara de pestañas 4D Pink 21",
    precio: 4500,
    categoria: "OJOS",
    descripcion: "",
    imagen: "/mascara4d.jpeg"
  },
  {
    id: 16,
    nombre: "Mascara de pestañas DAPOP IX",
    precio: 6250,
    categoria: "OJOS",
    descripcion: "",
    imagen: "/mascaradapop.jpeg"
  },
  {
    id: 17,
    nombre: "Neceser Handsome",
    precio: 5200,
    categoria: "ACCESORIOS",
    descripcion: "",
    imagen: "/neceserhandsome.jpeg"
  },
  {
    id: 18,
    nombre: "Rubor en barra Pink 21",
    precio: 3500,
    categoria: "ROSTRO",
    descripcion: "",
    imagen: "/ruborenbarra.jpeg",
    opciones: ["Tono 1", "Tono 2", "Tono 3", "Tono 4", "Tono 5", "Tono 6"],
    opcionesSinStock: ["Tono 1", "Tono 3", "Tono 4", "Tono 5", "Tono 6"],
  },
  {
    id: 19,
    nombre: "Primer",
    precio: 5800,
    categoria: "ROSTRO",
    descripcion: "Prebase de maquillaje con una fórmula ligera que alisa la piel, unifica su textura y difumina los poros. Su acabado sedoso y traslúcido actúa como un velo transparente perfeccionador, que ayuda a lograr una aplicación más uniforme de la base de maquillaje y prolongar su duración.",
    imagen: "/primer.jpeg"
     },
  {
    id: 20,
    nombre: "Iluminador Pink 21",
    precio: 4000,
    categoria: "ROSTRO",
    descripcion: "",
    imagen: "/iluminador.jpeg"
  },
  {
    id: 21,
    nombre: "Primer Grip",
    precio: 6700,
    categoria: "ROSTRO",
    descripcion: 'Prebase hidratante. Textura en gel y efecto "pegajoso" (tipo imán o adhesivo) diseñada para sujetar la base y los productos de rostro, fijación duradera.',
    imagen: "/primergrip.jpeg"
  },
  {
    id: 22,
    nombre: "Base Ruby Rose Soft Matte",
    precio: 5200,
    categoria: "ROSTRO",
    descripcion: `Piel uniforme, suave y libre de brillos durante todo el día. Su fórmula de cobertura media a alta disimula imperfecciones al instante, ofreciendo un acabado mate natural y aterciopelado sin sensación pesada.
• Ideal para: Pieles mixtas a grasas (controla la oleosidad).
• Cobertura: Media a alta (construible).
• Acabado: Soft matte de larga duración.
• Contenido: 29 ml.`,
        imagen: "/baserubyrose.jpeg",
    imagenes: ["/baserubyrose.jpeg", "/tonosbaserubyrose.png"],
    opciones: ["Beige 2", "Beige 3", "Beige 4", "Beige 5", "Beige 6", "Beige 7"],
    opcionesSinStock: ["Beige 7"]
    },
  {
    id: 23,
    nombre: "Labial Color Top",
    precio: 2200,
    categoria: "LABIOS",
    consultaTonos: true,
    descripcion: "Labial en barra de Pink 21.",
    imagen: "/labialbarrapink21.jpeg"
  },
  {
    id: 24,
    nombre: "Rubor Love Crazy",
    precio: 4000,
    categoria: "ROSTRO",
    descripcion: "Tamaño chico, alta pigmentación. Marca: Tejar.",
    imagen: "/ruborx4tejar.jpeg"
  },
  {
    id: 25,
    nombre: "Delineador líquido Pink INK",
    precio: 4000,
    categoria: "OJOS",
    imagen: "/delineadorliqpink1.jpeg",
    imagenes: ["/delineadorliqpink1.jpeg", "/delineadorliqpink2.jpeg"]
  },
  {
    id: 26,
    nombre: "Delineador retráctil Love Crazy",
    precio: 1500,
    categoria: "OJOS",
    imagen: "/delineadorretractil.jpeg"
  },
  {
    id: 27,
    nombre: "Bálsamo TEI",
    precio: 2000,
    categoria: "LABIOS",
    imagen: "/teibalsamo.jpeg"
  },
  {
    id: 28,
    nombre: "Delineador labial Hude Beauty",
    precio: 1500,
    categoria: "LABIOS",
    consultaTonos: true,
    descripcion: "Delineador hude beauty",
    imagen: "/delineadorlabialhude.jpeg"
  },
  {
    id: 29,
    nombre: "Corrector Baking",
    precio: 4200,
    categoria: "ROSTRO",
    descripcion: "Corrector baking de Pink 21, cobertura media a alta, para todo tipo de piel.",
    imagen: "/correctorbaking.jpeg",
    imagenes: ["/correctorbaking.jpeg", "/correctorbakingtonos.jpeg"],
    opciones: ["Tono 1", "Tono 2", "Tono 3", "Tono 4", "Tono 5", "Tono 6"]
  },
  {
    id: 30,
    nombre: "Perfilador",
    precio: 1500,
    categoria: "ACCESORIOS",
    imagen: "/perfiladores.jpeg"
  },
  {
    id: 31,
    nombre: "Brillo labial Plump",
    precio: 3250,
    categoria: "LABIOS",
    imagen: "/brillolabial4angels.jpeg"
  },
  {
    id: 32,
    nombre: "Cejas y pestañas",
    precio: 8600,
    categoria: "OJOS",
    esCombo: true,
    descripcion: "Incluye: Gel para cejas ULTRA FIX + Máscara de pestañas 4D Pink 21 + Pincita de depilar.",
    textoAhorro: "¡Ahorrás $1.000!",
    imagen: "/combo1.jpeg"
  },
  {
    id: 33,
    nombre: "Exfoliación total",
    precio: 9500,
    categoria: "CUIDADO PERSONAL",
    esCombo: true,
    descripcion: "Incluye: Exfoliante corporal TEI + Guante exfoliante.",
    textoAhorro: "¡Ahorrás $1.100!",
    imagen: "/combo2.jpeg"
  },
  {
    id: 34,
    nombre: "Lip combo",
    precio: 8500,
    categoria: "LABIOS",
    esCombo: true,
    consultaTonos: true,
    descripcion: "Incluye: Delineador labial Pink 21 + Labial líquido Perfect Lips Ruby Rose + Lipgloss Pink 21 con llavero.",
    textoAhorro: "¡Ahorrás $1.000!",
    imagen: "/combo3.jpeg"
  },
  {
    id: 35,
    nombre: "Fresh face",
    precio: 10800,
    categoria: "ROSTRO",
    esCombo: true,
    consultaTonos: true,
    descripcion: "Incluye: Base Ruby Rose Soft Matte + Corrector TEI + Rubor en barra Pink 21.",
    textoAhorro: "¡Ahorrás $1.100!",
    imagen: "/combo4.jpeg"
  },
  {
    id: 36,
    nombre: "Duo de esponjas + Mini brochas",
    precio: 4200,
    categoria: "ACCESORIOS",
    esCombo: true,
    descripcion: "Incluye: Beauty Blender + Mini esponjas para corrector.",
    textoAhorro: "¡Set de mini brochas DE REGALO!",
    imagen: "/combo5.jpeg"
  },
  {
    id: 37,
    nombre: "Long Lasting",
    precio: 16900,
    categoria: "ROSTRO",
    esCombo: true,
    descripcion: "Incluye: Primer mate DAPOP + Primer Grip DAPOP + Fijador de maquillaje TEI.",
    textoAhorro: "¡Ahorrás $1.900!",
    imagen: "/combo6.jpeg"
  }
];
