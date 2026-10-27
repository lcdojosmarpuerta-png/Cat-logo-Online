import { Product, Banner, Category, StoreSettings } from '../types/catalog';

// Helper to create pastel & Christmas decorative SVG illustrations
const createFestiveSvg = (
  grad1: string,
  grad2: string,
  accent: string,
  iconSvg: string,
  title: string,
  badgeText?: string
): string => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${grad1}" />
        <stop offset="100%" stop-color="${grad2}" />
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.4" />
        <stop offset="100%" stop-color="${grad2}" stop-opacity="0" />
      </radialGradient>
      <pattern id="festiveDots" width="30" height="30" patternUnits="userSpaceOnUse">
        <circle cx="15" cy="15" r="1.5" fill="#fbcfe8" fill-opacity="0.25" />
      </pattern>
    </defs>
    <rect width="800" height="600" fill="url(#g)" />
    <circle cx="400" cy="250" r="280" fill="url(#glow)" />
    <rect width="800" height="600" fill="url(#festiveDots)" />

    <!-- Christmas & Balloon Ornaments in Background -->
    <circle cx="120" cy="100" r="18" fill="#ef4444" fill-opacity="0.4" stroke="#fecaca" stroke-width="1.5"/>
    <circle cx="680" cy="90" r="22" fill="#10b981" fill-opacity="0.4" stroke="#a7f3d0" stroke-width="1.5"/>
    <circle cx="720" cy="220" r="14" fill="#facc15" fill-opacity="0.5" stroke="#fef08a" stroke-width="1.5"/>
    <circle cx="90" cy="260" r="16" fill="#f472b6" fill-opacity="0.4" stroke="#fbcfe8" stroke-width="1.5"/>
    
    <!-- Central Cloud Base -->
    <path d="M 260 320 Q 300 240 370 260 Q 420 200 480 250 Q 550 250 560 320 Z" fill="#ffffff" fill-opacity="0.12" />

    <!-- Icon Frame -->
    <g transform="translate(400, 240)">
      <circle cx="0" cy="0" r="85" fill="${grad1}" stroke="${accent}" stroke-width="3" stroke-opacity="0.8"/>
      <circle cx="0" cy="0" r="72" fill="none" stroke="#f472b6" stroke-dasharray="6 4" stroke-width="1.5" stroke-opacity="0.6"/>
      <g transform="translate(-40, -40) scale(3.3)" stroke="${accent}" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        ${iconSvg}
      </g>
    </g>

    <text x="400" y="430" font-family="'Dancing Script', cursive, sans-serif" font-size="34" font-weight="700" fill="#fff" text-anchor="middle" letter-spacing="0.5">${title}</text>
    ${badgeText ? `
      <rect x="310" y="465" width="180" height="34" rx="17" fill="#ef4444" fill-opacity="0.3" stroke="#ef4444" stroke-width="1.5"/>
      <text x="400" y="488" font-family="'Caveat', cursive, sans-serif" font-size="19" font-weight="700" fill="#fecaca" text-anchor="middle">${badgeText}</text>
    ` : ''}
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const createFestiveBannerSvg = (
  grad1: string,
  grad2: string,
  accent: string,
  badge: string,
  title: string,
  subtitle: string,
  iconD: string
): string => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 500" width="100%" height="100%">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${grad1}" />
        <stop offset="50%" stop-color="${grad2}" />
        <stop offset="100%" stop-color="#140628" />
      </linearGradient>
      <radialGradient id="neon" cx="85%" cy="30%" r="65%">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.4" />
        <stop offset="100%" stop-color="#140628" stop-opacity="0" />
      </radialGradient>
      <pattern id="snowGrid" width="60" height="60" patternUnits="userSpaceOnUse">
        <circle cx="30" cy="30" r="1.5" fill="#ffffff" fill-opacity="0.25" />
      </pattern>
    </defs>
    <rect width="1200" height="500" fill="url(#bg)" />
    <rect width="1200" height="500" fill="url(#neon)" />
    <rect width="1200" height="500" fill="url(#snowGrid)" />

    <!-- Christmas Lights Garland at top -->
    <path d="M 0 20 Q 150 55 300 20 T 600 20 T 900 20 T 1200 20" fill="none" stroke="#10b981" stroke-width="2.5" opacity="0.6"/>
    <circle cx="150" cy="38" r="6" fill="#ef4444" filter="drop-shadow(0 0 5px #ef4444)"/>
    <circle cx="300" cy="20" r="6" fill="#facc15" filter="drop-shadow(0 0 5px #facc15)"/>
    <circle cx="450" cy="38" r="6" fill="#38bdf8" filter="drop-shadow(0 0 5px #38bdf8)"/>
    <circle cx="600" cy="20" r="6" fill="#f472b6" filter="drop-shadow(0 0 5px #f472b6)"/>
    <circle cx="750" cy="38" r="6" fill="#10b981" filter="drop-shadow(0 0 5px #10b981)"/>
    <circle cx="900" cy="20" r="6" fill="#facc15" filter="drop-shadow(0 0 5px #facc15)"/>
    <circle cx="1050" cy="38" r="6" fill="#ef4444" filter="drop-shadow(0 0 5px #ef4444)"/>

    <!-- Content side -->
    <g transform="translate(80, 110)">
      <rect x="0" y="0" width="220" height="38" rx="19" fill="#ef4444" fill-opacity="0.25" stroke="#ef4444" stroke-width="1.5"/>
      <text x="110" y="25" font-family="'Caveat', cursive, sans-serif" font-size="18" font-weight="700" fill="#fecaca" text-anchor="middle" letter-spacing="1">🎄 ${badge} 🎄</text>
      
      <text x="0" y="95" font-family="'Dancing Script', cursive, sans-serif" font-size="52" font-weight="700" fill="#ffffff" letter-spacing="-0.5">${title}</text>
      <text x="0" y="150" font-family="'Caveat', cursive, sans-serif" font-size="26" font-weight="400" fill="#fbcfe8" width="550">${subtitle}</text>
      
      <g transform="translate(0, 190)">
        <rect x="0" y="0" width="210" height="50" rx="25" fill="#f472b6" stroke="#fbcfe8" stroke-width="2"/>
        <text x="105" y="32" font-family="'Dancing Script', cursive, sans-serif" font-size="22" font-weight="700" fill="#180c2e" text-anchor="middle">Cotizar por WhatsApp ✨</text>
      </g>
    </g>

    <!-- Graphic showcase side: Balloons, Cloud & Christmas Tree -->
    <g transform="translate(930, 240)">
      <circle cx="0" cy="0" r="160" fill="${grad1}" stroke="#ef4444" stroke-width="2.5" stroke-opacity="0.5"/>
      <circle cx="0" cy="0" r="125" fill="none" stroke="#facc15" stroke-dasharray="10 6" stroke-width="2" stroke-opacity="0.7"/>
      
      <!-- Pastel balloons cluster -->
      <circle cx="-50" cy="-60" r="38" fill="#38bdf8" fill-opacity="0.8" stroke="#bae6fd" stroke-width="2"/>
      <circle cx="40" cy="-70" r="42" fill="#f472b6" fill-opacity="0.8" stroke="#fbcfe8" stroke-width="2"/>
      <circle cx="0" cy="-20" r="48" fill="#fde047" fill-opacity="0.85" stroke="#fef08a" stroke-width="2"/>
      <circle cx="-40" cy="30" r="35" fill="#c084fc" fill-opacity="0.8" stroke="#e9d5ff" stroke-width="2"/>
      <circle cx="35" cy="35" r="36" fill="#6ee7b7" fill-opacity="0.8" stroke="#a7f3d0" stroke-width="2"/>
      
      <g transform="translate(-40, -40) scale(3.5)" stroke="#ffffff" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        ${iconD}
      </g>
    </g>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'todos', name: 'Todos los Festejos' },
  { id: 'navidad', name: 'Especial Navideño 🎄' },
  { id: 'arcos', name: 'Arcos & Globos Pastel 🎈' },
  { id: 'bouquets', name: 'Bouquets & Coronas 👑' },
  { id: 'candybar', name: 'Mesas Dulces & Candy Bar 🍬' },
  { id: 'mobiliario', name: 'Mobiliario & Festejos 🎉' },
];

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'b1',
    title: 'Magia Navideña & Globos Pastel',
    subtitle: 'Decoraciones espectaculares para fiestas infantiles, reuniones y eventos familiares',
    badge: 'NAVIDAD KHLOE 2026',
    image: createFestiveBannerSvg(
      '#2a0d3b',
      '#3f124d',
      '#f472b6',
      'FESTEJOS & DECORACIONES',
      'Magia Navideña con Globos',
      'Arcos orgánicos, candy bars y decoraciones con temática arcoíris y navideña.',
      '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18"/><path d="M12 7v10"/>'
    ),
    linkCategory: 'navidad',
    buttonText: 'Ver Paquetes Navideños',
  },
  {
    id: 'b2',
    title: 'Arcos Orgánicos & Globos Pastel',
    subtitle: 'Diseños temáticos con nubes, coronas doradas, globos perlados y arcoíris',
    badge: 'DISEÑO EXCLUSIVO KHLOE',
    image: createFestiveBannerSvg(
      '#131e3d',
      '#1e2d5a',
      '#38bdf8',
      'CALIDAD & ELEGANCIA',
      'Bouquets y Arcos Orgánicos',
      'Globos 100% biodegradables de alta gama con brillo perlado duradero.',
      '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>'
    ),
    linkCategory: 'arcos',
    buttonText: 'Explorar Arcos',
  },
  {
    id: 'b3',
    title: 'Candy Bar & Mesas Dulces Navideñas',
    subtitle: 'Montajes completos con cilindros temáticos, repostería y detalles únicos',
    badge: 'DULCES & FESTEJOS',
    image: createFestiveBannerSvg(
      '#1a3326',
      '#1f4733',
      '#10b981',
      'EVENTOS INOLVIDABLES',
      'Candy Bar & Festejos Khloe',
      'Hacemos realidad la fiesta de tus sueños con atención al más mínimo detalle.',
      '<path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/>'
    ),
    linkCategory: 'candybar',
    buttonText: 'Ver Mesas Dulces',
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Arco Orgánico Navideño Candy Cane & Pastel',
    category: 'navidad',
    price: 95,
    badge: 'Navideño 🎄',
    unit: 'montaje',
    inStock: true,
    description: 'Arco orgánico de 3 metros con globos perlados tonos pastel, bastones de caramelo gigantes (candy cane), globos metalizados navideños, esferas rojas y verdes, y nubes en la base.',
    image: createFestiveSvg(
      '#3b0724',
      '#180828',
      '#ef4444',
      '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18"/><path d="M12 7v10"/>',
      'Arco Navideño Candy Cane',
      'Navidad Khloe 🎅'
    ),
  },
  {
    id: 'p2',
    name: 'Decoración Integral Navideña Khloe Gold & Rose',
    category: 'navidad',
    price: 220,
    badge: 'Paquete VIP ⭐',
    unit: 'evento',
    inStock: true,
    description: 'Decoración de ensueño para festejos navideños. Incluye fondo de lona personalizado o panel circular, arco de globos orgánico XL, trío de cilindros decorados, árbol de globos con luces y corona dorada.',
    image: createFestiveSvg(
      '#200938',
      '#0d041c',
      '#f472b6',
      '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
      'Decoración VIP Navideña',
      'Todo Incluido ✨'
    ),
  },
  {
    id: 'p3',
    name: 'Bouquet de Globos Pastel Khloe con Corona',
    category: 'bouquets',
    price: 45,
    badge: 'Más Vendido 👑',
    unit: 'arreglo',
    inStock: true,
    description: 'Hermoso bouquet con número metalizado gigante, corona dorada de princesa, globos cromados rosa, lavanda y celeste pastel, estrellas doradas y base de globos inflados con aire.',
    image: createFestiveSvg(
      '#141938',
      '#0a0d24',
      '#38bdf8',
      '<path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/>',
      'Bouquet Khloe con Corona',
      'Pastel & Oro 👑'
    ),
  },
  {
    id: 'p4',
    name: 'Árbol de Globos Navideño con Luces LED',
    category: 'navidad',
    price: 70,
    badge: 'Navideño 🎄',
    unit: 'unidad',
    inStock: true,
    description: 'Estructura en forma de pino navideño realizada íntegramente con globos verdes esmeralda, detalles en dorado y rosa pastel, estrella luminosa en la cúspide y guirnalda de luces LED micro-fairy.',
    image: createFestiveSvg(
      '#092b1a',
      '#04170d',
      '#10b981',
      '<polygon points="12 2 19 21 5 21 12 2"/>',
      'Árbol de Globos LED',
      'Pino Navideño 🎄'
    ),
  },
  {
    id: 'p5',
    name: 'Mesa Dulce & Candy Bar Navideño',
    category: 'candybar',
    price: 130,
    badge: 'Especial 🍬',
    unit: 'servicio',
    inStock: true,
    description: 'Montaje de candy bar temático navideño con bandejas de lujo, golosinas personalizadas con motivos de Ballón Dulces Khloe, cupcakes temáticos, galletas glaseadas y decoración de globos.',
    image: createFestiveSvg(
      '#33152c',
      '#170714',
      '#f472b6',
      '<rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 2v9"/><path d="M7 6l5-4 5 4"/>',
      'Candy Bar Navideño',
      'Mesa de Dulces 🍭'
    ),
  },
  {
    id: 'p6',
    name: 'Backdrop Circular con Globos Orgánicos & Neón',
    category: 'arcos',
    price: 110,
    badge: 'Tendencia 🎈',
    unit: 'montaje',
    inStock: true,
    description: 'Estructura circular de 2 metros de diámetro con guirnalda orgánica en tonos pasteles (celeste, rosa, lila y crema), cartel de luz neón "Feliz Navidad" o "Happy Birthday", y flores decorativas.',
    image: createFestiveSvg(
      '#210e3d',
      '#0c041c',
      '#c084fc',
      '<circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/>',
      'Backdrop Circular Neón',
      'Fotocall & Globos 📸'
    ),
  },
  {
    id: 'p7',
    name: 'Arreglo Navideño de Mesa con Burbuja & Dulces',
    category: 'bouquets',
    price: 35,
    badge: 'Regalo 🎁',
    unit: 'arreglo',
    inStock: true,
    description: 'Globo burbuja transparente de 24 pulgadas relleno con mini globitos navideños o plumas, personalización en vinilo ("Feliz Navidad / Próspero 2026"), base con caja de bombones y lazo de satén.',
    image: createFestiveSvg(
      '#330c14',
      '#170408',
      '#ef4444',
      '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18"/>',
      'Burbuja Navideña Dulces',
      'Detalle Especial 🎁'
    ),
  },
  {
    id: 'p8',
    name: 'Guirnalda de Globos para Fachada o Entrada',
    category: 'arcos',
    price: 85,
    badge: 'Impacto 🎈',
    unit: 'montaje',
    inStock: true,
    description: 'Guirnalda orgánica de 4 metros para entradas de casas, salones o locales comerciales. Resistente a exteriores, tratada con abrillantador Hi-Shine de larga duración con colores navideños y pastel.',
    image: createFestiveSvg(
      '#102c1f',
      '#05140d',
      '#34d399',
      '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
      'Guirnalda Fachada',
      'Entradas & Salones 🏠'
    ),
  },
  {
    id: 'p9',
    name: 'Alquiler de Trío de Cilindros & Mobiliario Pastel',
    category: 'mobiliario',
    price: 60,
    badge: 'Mobiliario 🎉',
    unit: 'evento',
    inStock: true,
    description: 'Set de 3 mesas cilíndricas en alturas escalonadas con fundas sublimadas en tonos pasteles o temática navideña, base para torta de acrílico y alzadores para dulces.',
    image: createFestiveSvg(
      '#141b36',
      '#070b1a',
      '#38bdf8',
      '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/>',
      'Trío de Cilindros Pastel',
      'Mobiliario de Fiesta 🎈'
    ),
  },
  {
    id: 'p10',
    name: 'Combo Fiesta Navideña Completa Khloe',
    category: 'navidad',
    price: 280,
    badge: 'Combo Completo 🌟',
    unit: 'paquete',
    inStock: true,
    description: 'El paquete definitivo para celebrar: Fondo temático, arco orgánico de 4m, trío de cilindros, Candy Bar con 50 dulces decorados, cartel de luces neón, árbol de globos y atención personalizada durante el montaje.',
    image: createFestiveSvg(
      '#3d1428',
      '#1a0610',
      '#facc15',
      '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
      'Combo Fiesta Completa',
      'Máxima Celebración 🌟'
    ),
  },
];

export const INITIAL_SETTINGS: StoreSettings = {
  companyName: 'Ballón Dulces Khloe',
  logoUrl: '/assets/aistudio/IMG-20261012-WA0008_94da2846.jpg', // Primera imagen adjuntada por el usuario
  whatsappNumber: '584245104245',
  currencySymbol: '$',
  confirmationMessage: '¡Su pedido ya fue enviado y pronto será atendido por nuestro personal!',
  adminPin: '1234',
};
