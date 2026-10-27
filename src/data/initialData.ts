import { Product, Banner, Category, StoreSettings } from '../types/catalog';

// Helper to create pastel celebration SVG illustrations with Ballón Dulces Khloe branding
const createBrandSvg = (
  grad1: string,
  grad2: string,
  accent: string,
  iconSvg: string,
  title: string,
  badgeText?: string
): string => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${grad1}" />
        <stop offset="100%" stop-color="${grad2}" />
      </linearGradient>
      <radialGradient id="softGlow" cx="50%" cy="40%" r="55%">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.3" />
        <stop offset="100%" stop-color="${grad2}" stop-opacity="0" />
      </radialGradient>
      <pattern id="confettiDots" width="36" height="36" patternUnits="userSpaceOnUse">
        <circle cx="18" cy="18" r="1.5" fill="#fbcfe8" fill-opacity="0.35" />
      </pattern>
    </defs>
    <rect width="800" height="600" fill="url(#bgGrad)" />
    <circle cx="400" cy="260" r="280" fill="url(#softGlow)" />
    <rect width="800" height="600" fill="url(#confettiDots)" />

    <!-- Soft Pastel Balloon Clusters in Background -->
    <circle cx="140" cy="110" r="24" fill="#38bdf8" fill-opacity="0.45" stroke="#bae6fd" stroke-width="2"/>
    <circle cx="670" cy="100" r="28" fill="#f472b6" fill-opacity="0.45" stroke="#fbcfe8" stroke-width="2"/>
    <circle cx="710" cy="240" r="20" fill="#fde047" fill-opacity="0.5" stroke="#fef08a" stroke-width="2"/>
    <circle cx="100" cy="270" r="22" fill="#c084fc" fill-opacity="0.45" stroke="#e9d5ff" stroke-width="2"/>
    
    <!-- Central Cloud Base -->
    <path d="M 270 330 Q 310 260 370 280 Q 420 220 480 270 Q 540 270 550 330 Z" fill="#ffffff" fill-opacity="0.25" />

    <!-- Icon Frame -->
    <g transform="translate(400, 240)">
      <circle cx="0" cy="0" r="86" fill="${grad1}" stroke="${accent}" stroke-width="3" stroke-opacity="0.85"/>
      <circle cx="0" cy="0" r="74" fill="none" stroke="#f472b6" stroke-dasharray="6 4" stroke-width="1.8" stroke-opacity="0.7"/>
      <g transform="translate(-40, -40) scale(3.3)" stroke="${accent}" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        ${iconSvg}
      </g>
    </g>

    <text x="400" y="425" font-family="'Dancing Script', cursive, sans-serif" font-size="34" font-weight="700" fill="#ffffff" text-anchor="middle">${title}</text>
    ${badgeText ? `
      <rect x="320" y="455" width="160" height="32" rx="16" fill="#f472b6" fill-opacity="0.25" stroke="#f472b6" stroke-width="1.5"/>
      <text x="400" y="476" font-family="'Caveat', cursive, sans-serif" font-size="18" font-weight="700" fill="#fbcfe8" text-anchor="middle">${badgeText}</text>
    ` : ''}
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const createBrandBannerSvg = (
  grad1: string,
  grad2: string,
  accent: string,
  badge: string,
  title: string,
  subtitle: string,
  iconD: string
): string => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 480" width="100%" height="100%">
    <defs>
      <linearGradient id="bannerBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${grad1}" />
        <stop offset="60%" stop-color="${grad2}" />
        <stop offset="100%" stop-color="#120624" />
      </linearGradient>
      <radialGradient id="bannerGlow" cx="80%" cy="40%" r="60%">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.4" />
        <stop offset="100%" stop-color="#120624" stop-opacity="0" />
      </radialGradient>
      <pattern id="bannerSparkles" width="50" height="50" patternUnits="userSpaceOnUse">
        <circle cx="25" cy="25" r="1.5" fill="#ffffff" fill-opacity="0.3" />
      </pattern>
    </defs>
    <rect width="1200" height="480" fill="url(#bannerBg)" />
    <rect width="1200" height="480" fill="url(#bannerGlow)" />
    <rect width="1200" height="480" fill="url(#bannerSparkles)" />

    <!-- Content Side with Clean, Non-crowded Typography -->
    <g transform="translate(90, 120)">
      <rect x="0" y="0" width="230" height="34" rx="17" fill="#f472b6" fill-opacity="0.2" stroke="#f472b6" stroke-width="1.5"/>
      <text x="115" y="23" font-family="'Caveat', cursive, sans-serif" font-size="18" font-weight="700" fill="#fbcfe8" text-anchor="middle" letter-spacing="1">${badge}</text>
      
      <text x="0" y="90" font-family="'Dancing Script', cursive, sans-serif" font-size="50" font-weight="700" fill="#ffffff">${title}</text>
      <text x="0" y="140" font-family="'Caveat', cursive, sans-serif" font-size="24" font-weight="600" fill="#fbcfe8">${subtitle}</text>
      
      <g transform="translate(0, 175)">
        <rect x="0" y="0" width="190" height="46" rx="23" fill="#f472b6" stroke="#fbcfe8" stroke-width="1.8"/>
        <text x="95" y="29" font-family="'Dancing Script', cursive, sans-serif" font-size="22" font-weight="700" fill="#180c2e" text-anchor="middle">Ver Opciones ✨</text>
      </g>
    </g>

    <!-- Graphic Side: Cloud & Pastel Balloons Cluster -->
    <g transform="translate(940, 240)">
      <circle cx="0" cy="0" r="150" fill="${grad1}" stroke="${accent}" stroke-width="2.5" stroke-opacity="0.6"/>
      <circle cx="0" cy="0" r="120" fill="none" stroke="#fde047" stroke-dasharray="8 6" stroke-width="2" stroke-opacity="0.7"/>
      
      <!-- Pastel balloons cluster matching logo colors -->
      <circle cx="-50" cy="-50" r="36" fill="#38bdf8" fill-opacity="0.85" stroke="#bae6fd" stroke-width="2"/>
      <circle cx="45" cy="-60" r="40" fill="#f472b6" fill-opacity="0.85" stroke="#fbcfe8" stroke-width="2"/>
      <circle cx="0" cy="-15" r="46" fill="#fde047" fill-opacity="0.9" stroke="#fef08a" stroke-width="2"/>
      <circle cx="-35" cy="35" r="34" fill="#c084fc" fill-opacity="0.85" stroke="#e9d5ff" stroke-width="2"/>
      <circle cx="35" cy="35" r="34" fill="#6ee7b7" fill-opacity="0.85" stroke="#a7f3d0" stroke-width="2"/>
      
      <g transform="translate(-36, -36) scale(3)" stroke="#ffffff" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        ${iconD}
      </g>
    </g>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'todos', name: 'Todos los Festejos' },
  { id: 'arcos', name: 'Arcos & Globos Pastel' },
  { id: 'bouquets', name: 'Bouquets & Números' },
  { id: 'candybar', name: 'Mesas Dulces & Candy Bar' },
  { id: 'backdrops', name: 'Backdrops & Fondos' },
  { id: 'mobiliario', name: 'Mobiliario & Estructuras' },
];

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'b1',
    title: 'Ballón Dulces Khloe',
    subtitle: 'Magia y color para tus celebraciones especiales.',
    badge: 'FESTEJOS & DECORACIONES',
    image: createBrandBannerSvg(
      '#2d1140',
      '#431354',
      '#f472b6',
      'FESTEJOS KHLOE',
      'Ballón Dulces Khloe',
      'Magia y color para tus celebraciones especiales.',
      '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18"/><path d="M12 7v10"/>'
    ),
    linkCategory: 'arcos',
    buttonText: 'Ver Arcos',
  },
  {
    id: 'b2',
    title: 'Diseños Exclusivos con Globos',
    subtitle: 'Estilo orgánico, tonos pastel y globos perlados.',
    badge: 'CALIDAD PREMIUM',
    image: createBrandBannerSvg(
      '#131e3d',
      '#1d2d58',
      '#38bdf8',
      'ARCOS ORGÁNICOS',
      'Diseños Exclusivos',
      'Estilo orgánico, tonos pastel y globos perlados.',
      '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>'
    ),
    linkCategory: 'bouquets',
    buttonText: 'Ver Bouquets',
  },
  {
    id: 'b3',
    title: 'Candy Bar & Mesas Dulces',
    subtitle: 'Montajes temáticos elegantes para todo festejo.',
    badge: 'MESAS DECORADAS',
    image: createBrandBannerSvg(
      '#1b1c3b',
      '#262354',
      '#c084fc',
      'MESAS DULCES',
      'Candy Bar Khloe',
      'Montajes temáticos elegantes para todo festejo.',
      '<rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 2v9"/><path d="M7 6l5-4 5 4"/>'
    ),
    linkCategory: 'candybar',
    buttonText: 'Ver Candy Bar',
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Arco Orgánico Pastel con Nubes',
    category: 'arcos',
    badge: 'Más Pedido',
    unit: 'montaje',
    inStock: true,
    description: 'Arco orgánico con globos perlados tonos pastel y nubes en la base.',
    image: createBrandSvg(
      '#2e103f',
      '#180829',
      '#f472b6',
      '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18"/><path d="M12 7v10"/>',
      'Arco Orgánico Pastel',
      'Estilo Nube'
    ),
  },
  {
    id: 'p2',
    name: 'Decoración Integral Khloe Gold & Rose',
    category: 'backdrops',
    badge: 'Paquete VIP',
    unit: 'evento',
    inStock: true,
    description: 'Decoración integral con fondo circular, arco XL y cilindros personalizados.',
    image: createBrandSvg(
      '#1b153b',
      '#0e0924',
      '#38bdf8',
      '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
      'Decoración Integral VIP',
      'Todo Incluido'
    ),
  },
  {
    id: 'p3',
    name: 'Bouquet Khloe con Corona Princesa',
    category: 'bouquets',
    badge: 'Favorito',
    unit: 'arreglo',
    inStock: true,
    description: 'Bouquet de globos pastel con número metalizado y corona dorada.',
    image: createBrandSvg(
      '#3b1433',
      '#1c0819',
      '#fde047',
      '<path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/>',
      'Bouquet con Corona',
      'Pastel & Oro'
    ),
  },
  {
    id: 'p4',
    name: 'Backdrop Circular con Luz Neón',
    category: 'backdrops',
    badge: 'Tendencia',
    unit: 'montaje',
    inStock: true,
    description: 'Estructura circular de 2 metros con guirnalda orgánica y cartel neón.',
    image: createBrandSvg(
      '#12243d',
      '#081224',
      '#38bdf8',
      '<circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/>',
      'Backdrop Neón',
      'Fotocall'
    ),
  },
  {
    id: 'p5',
    name: 'Mesa Dulce & Candy Bar Temático',
    category: 'candybar',
    badge: 'Especial',
    unit: 'servicio',
    inStock: true,
    description: 'Montaje de candy bar con bandejas de lujo y golosinas personalizadas.',
    image: createBrandSvg(
      '#33152c',
      '#170714',
      '#f472b6',
      '<rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 2v9"/><path d="M7 6l5-4 5 4"/>',
      'Candy Bar Temático',
      'Mesa de Dulces'
    ),
  },
  {
    id: 'p6',
    name: 'Trío de Cilindros & Mobiliario Pastel',
    category: 'mobiliario',
    badge: 'Mobiliario',
    unit: 'evento',
    inStock: true,
    description: 'Set de 3 mesas cilíndricas en alturas escalonadas con fundas pastel.',
    image: createBrandSvg(
      '#141b36',
      '#070b1a',
      '#c084fc',
      '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/>',
      'Trío de Cilindros',
      'Mobiliario'
    ),
  },
  {
    id: 'p7',
    name: 'Globo Burbuja Personalizado con Dulces',
    category: 'bouquets',
    badge: 'Detalle',
    unit: 'arreglo',
    inStock: true,
    description: 'Globo transparente con vinilo personalizado y base con bombones.',
    image: createBrandSvg(
      '#2c1538',
      '#14071c',
      '#f472b6',
      '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18"/>',
      'Burbuja Personalizada',
      'Regalo Especial'
    ),
  },
  {
    id: 'p8',
    name: 'Guirnalda Orgánica para Entrada o Fachada',
    category: 'arcos',
    badge: 'Impacto',
    unit: 'montaje',
    inStock: true,
    description: 'Guirnalda orgánica de 4 metros para entradas y bienvenida de invitados.',
    image: createBrandSvg(
      '#16283b',
      '#091421',
      '#38bdf8',
      '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
      'Guirnalda Entrada',
      'Fachada'
    ),
  },
];

export const INITIAL_SETTINGS: StoreSettings = {
  companyName: 'Ballón Dulces Khloe',
  logoUrl: '/assets/aistudio/IMG-20261012-WA0008_94da2846.jpg', // Primera imagen adjuntada por el usuario
  whatsappNumber: '584245104245',
  confirmationMessage: '¡Su pedido ya fue enviado y pronto será atendido por nuestro personal!',
  adminPin: '1234',
};
