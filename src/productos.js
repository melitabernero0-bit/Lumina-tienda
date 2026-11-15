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
    descripcion: "Tamaño ideal para cartera, espejo y cepillo (2 en 1). Incluye pinzita de depilar Eloise.",
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
    opciones: ["Tono 7", "Tono 8", "Tono 9", "Tono 10", "Tono 11", "Tono 12"]
  },
  {
    id: 7,
    nombre: "Delineador labial Pink 21",
    precio: 1500,
    categoria: "LABIOS",
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
    imagen: "/perfectlipsrubyrose.jpeg",
    imagenes: [
      "/perfectlipsrubyrose.jpeg",
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
    imagen: "/lipglossllavero.jpeg",
    imagenes: [
      "/lipglossllavero.jpeg",
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
    opcionesSinStock: ["Tono 1", "Tono 3"]
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
    nombre: "Primer Grip",
    precio: 6700,
    categoria: "ROSTRO",
    descripcion: 'Prebase hidratante. Textura en gel y efecto "pegajoso" (tipo imán o adhesivo) diseñada para sujetar la base y los productos de rostro, fijación duradera.',
    imagen: "/primergrip.jpeg"
  },
  {
    id: 21,
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
  }
];

