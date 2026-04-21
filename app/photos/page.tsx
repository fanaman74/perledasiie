'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useOrder } from '@/components/OrderProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TakeawayPanel from '@/components/TakeawayPanel';
import Link from 'next/link';

type Locale = 'fr' | 'nl' | 'en';

type Photo = {
  src: string;
  caption: Record<Locale, string>;
  menuItem?: string;           // dish name on menu (FR)
  priceRestaurant?: number;    // null = not on current menu
  priceTakeaway?: number | null;
  priceNote?: Record<Locale, string>; // e.g. "dès" / "v.a." / "from"
};

const photos: Photo[] = [
  {
    src: 'https://images.squarespace-cdn.com/content/v1/5bb1f5abc46f6d5eaedceb44/1538740326566-5XLFTER4LUKZU99M4Q7N/01.JPG',
    caption: { fr: 'Wan Tan', nl: 'Wan Tan', en: 'Wan Tan' },
    menuItem: 'Potage Raviolis Wan Tan',
    priceRestaurant: 6.50,
    priceTakeaway: 6.00,
  },
  {
    src: 'https://images.squarespace-cdn.com/content/v1/5bb1f5abc46f6d5eaedceb44/1538741916944-3GQIYAEJTIJRCZ5LR6FP/02.JPG',
    caption: { fr: 'Nems', nl: 'Nems', en: 'Spring Rolls' },
    menuItem: 'Nems',
    priceRestaurant: 7.00,
    priceTakeaway: 6.50,
  },
  {
    src: 'https://images.squarespace-cdn.com/content/v1/5bb1f5abc46f6d5eaedceb44/1538742024569-NJ9AN24C0O3HKBQR0E51/03.jpg',
    caption: { fr: 'Assiette Entrée Maison', nl: 'Huisvoorgerecht', en: 'House Starter Platter' },
    menuItem: 'Assiette Maison',
    priceRestaurant: 13.00,
    priceTakeaway: 11.50,
  },
  {
    src: 'https://images.squarespace-cdn.com/content/v1/5bb1f5abc46f6d5eaedceb44/1538748165597-UEFZJUYUJ2Y75TFEOZDI/Rouleaux+de+printemps',
    caption: { fr: 'Rouleaux de Printemps', nl: 'Lenterolle', en: 'Fresh Spring Rolls' },
    menuItem: 'Rouleaux de Printemps',
    priceRestaurant: 7.00,
    priceTakeaway: 7.00,
  },
  {
    src: 'https://images.squarespace-cdn.com/content/v1/5bb1f5abc46f6d5eaedceb44/1538748181565-R0M1RG02PB4LX1ZLJXZ1/05.JPG',
    caption: { fr: 'Salade de Poulet aux Herbes Fraîches', nl: 'Kipsalade met Verse Kruiden', en: 'Chicken Salad with Fresh Herbs' },
    menuItem: 'Salade de Poulet',
    priceRestaurant: 8.00,
    priceTakeaway: 7.50,
  },
  {
    src: 'https://images.squarespace-cdn.com/content/v1/5bb1f5abc46f6d5eaedceb44/1538767030694-RU1I013TY3MHVV2IQ5QR/06Assiette+Banian.jpg',
    caption: { fr: 'Assiette Banian', nl: 'Banian Schotel', en: 'Banian Platter' },
    // Not on current menu — no price shown
  },
  {
    src: 'https://images.squarespace-cdn.com/content/v1/5bb1f5abc46f6d5eaedceb44/1538767056267-H83S9GP5UIJM8CCYS15X/07Dim+Sum.jpg',
    caption: { fr: 'Dim Sum', nl: 'Dim Sum', en: 'Dim Sum' },
    menuItem: 'Assortiment de Dim Sum',
    priceRestaurant: 10.00,
    priceTakeaway: 9.50,
  },
  {
    src: 'https://images.squarespace-cdn.com/content/v1/5bb1f5abc46f6d5eaedceb44/1538767145756-L61P49XOBST0NPK1O965/08nouilles.jpg',
    caption: { fr: 'Nouilles Sautées', nl: 'Gebakken Noedels', en: 'Stir-Fried Noodles' },
    menuItem: 'Nouilles Sautées',
    priceRestaurant: 10.00,
    priceTakeaway: 9.50,
    priceNote: { fr: 'dès', nl: 'v.a.', en: 'from' },
  },
  {
    src: 'https://images.squarespace-cdn.com/content/v1/5bb1f5abc46f6d5eaedceb44/1538767203824-XE980KRLK9Q4T651K48D/09curry.jpg',
    caption: { fr: 'Curry Vert', nl: 'Groene Curry', en: 'Green Curry' },
    menuItem: 'Bœuf au Curry Vert',
    priceRestaurant: 16.00,
    priceTakeaway: 14.50,
  },
  {
    src: 'https://images.squarespace-cdn.com/content/v1/5bb1f5abc46f6d5eaedceb44/1538767255931-WND9VM3QIGN84UBPP9Q2/10.jpg',
    caption: { fr: 'Canard Laqué', nl: 'Gelakte Eend', en: 'Lacquered Duck' },
    menuItem: 'Canard Laqué',
    priceRestaurant: 19.00,
    priceTakeaway: null,
  },
  {
    src: 'https://images.squarespace-cdn.com/content/v1/5bb1f5abc46f6d5eaedceb44/1538767976643-I8WRRUS82P2N9BRLDN6L/14.jpg',
    caption: { fr: "Cuisses de Grenouilles à l'Ail", nl: 'Kikkerbilletjes met Knoflook', en: 'Garlic Frog Legs' },
    menuItem: "Cuisses de Grenouilles à l'Ail",
    priceRestaurant: 17.00,
    priceTakeaway: null,
  },
  {
    src: 'https://images.squarespace-cdn.com/content/v1/5bb1f5abc46f6d5eaedceb44/1538768040726-6ZFDR8P9BS13FT4FFMCM/16.jpg',
    caption: { fr: 'Teppan de Fruits de Mer', nl: 'Teppan Zeevruchten', en: 'Seafood Teppan' },
    menuItem: 'Teppan de Fruits de Mer',
    priceRestaurant: 19.00,
    priceTakeaway: null,
  },
];

const BagIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 11H4L5 9z" />
  </svg>
);

function PriceTag({ photo, locale, onAdd }: { photo: Photo; locale: Locale; onAdd: () => void }) {
  if (!photo.priceRestaurant) return null;
  const note = photo.priceNote?.[locale];
  return (
    <div className="flex items-center gap-2 mt-1 flex-wrap">
      <span className="inline-flex items-center gap-1 bg-accent/90 text-bg text-xs font-semibold px-2 py-0.5 rounded-sm tracking-wide">
        {note && <span className="opacity-80 font-normal">{note}</span>}
        {photo.priceRestaurant.toFixed(2)}€
      </span>
      {photo.priceTakeaway != null && (
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 bg-bg-alt/90 border border-border text-text text-xs px-2 py-0.5 rounded-sm tracking-wide hover:border-accent hover:text-accent transition-colors"
        >
          <BagIcon className="w-3 h-3 shrink-0" />
          {photo.priceTakeaway.toFixed(2)}€
        </button>
      )}
    </div>
  );
}

export default function PhotosPage() {
  const { locale, dict } = useLanguage();
  const { addItem } = useOrder();
  const [lightbox, setLightbox] = useState<number | null>(null);

  function handleAdd(photo: Photo) {
    if (!photo.priceTakeaway || !photo.menuItem) return;
    addItem({
      id: photo.menuItem,
      name: photo.caption[locale as Locale],
      desc: '',
      price: photo.priceTakeaway,
    });
  }

  useEffect(() => {
    if (lightbox === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox(i => i !== null ? (i + 1) % photos.length : null);
      if (e.key === 'ArrowLeft') setLightbox(i => i !== null ? (i - 1 + photos.length) % photos.length : null);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const photosDict = (dict as any).photos as { title: string; subtitle: string };

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-[72px]">
        {/* Page header */}
        <div className="py-16 px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">{photosDict?.subtitle}</p>
          <h1 className="font-display italic text-4xl md:text-5xl">{photosDict?.title}</h1>
        </div>

        {/* Grid */}
        <div className="px-6 pb-24 max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {photos.map((photo, i) => (
              <div key={i} className="flex flex-col gap-2">
                {/* Image */}
                <button
                  onClick={() => setLightbox(i)}
                  className="group relative aspect-square overflow-hidden rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <img
                    src={photo.src}
                    alt={photo.caption[locale as Locale]}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </button>

                {/* Caption + price below image */}
                <div className="px-0.5">
                  <p className="text-sm font-medium text-text leading-snug">
                    {photo.caption[locale as Locale]}
                  </p>
                  <PriceTag photo={photo} locale={locale as Locale} onAdd={() => handleAdd(photo)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pb-8">
          <Link href="/" className="text-text-muted hover:text-accent text-sm uppercase tracking-wider transition-colors">
            ← {dict.nav.home}
          </Link>
        </div>
      </main>

      <Footer dict={{ nav: dict.nav, findUs: dict.findUs, footer: dict.footer }} />
      <TakeawayPanel />

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl leading-none z-10" onClick={() => setLightbox(null)} aria-label="Close">×</button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-5xl leading-none z-10 px-2"
            onClick={e => { e.stopPropagation(); setLightbox((lightbox - 1 + photos.length) % photos.length); }}
            aria-label="Previous"
          >‹</button>

          <div className="max-w-[90vw] max-h-[90vh] flex flex-col items-center gap-4" onClick={e => e.stopPropagation()}>
            <img
              src={photos[lightbox].src}
              alt={photos[lightbox].caption[locale as Locale]}
              className="max-w-full max-h-[72vh] object-contain rounded"
            />
            <div className="text-center">
              <p className="text-white/90 text-sm uppercase tracking-wider mb-2">
                {photos[lightbox].caption[locale as Locale]}
              </p>
              {photos[lightbox].priceRestaurant && (
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <span className="text-accent text-sm font-semibold">
                    {photos[lightbox].priceNote?.[locale as Locale] && <span className="text-accent/70 font-normal mr-1">{photos[lightbox].priceNote?.[locale as Locale]}</span>}
                    🍽 {photos[lightbox].priceRestaurant?.toFixed(2)}€
                  </span>
                  {photos[lightbox].priceTakeaway != null && (
                    <button
                      onClick={() => handleAdd(photos[lightbox])}
                      className="inline-flex items-center gap-1.5 text-white/60 text-sm hover:text-accent transition-colors"
                    >
                      <BagIcon className="w-4 h-4 shrink-0" />
                      {photos[lightbox].priceTakeaway?.toFixed(2)}€
                    </button>
                  )}
                </div>
              )}
              <p className="text-white/30 text-xs mt-2">{lightbox + 1} / {photos.length}</p>
            </div>
          </div>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-5xl leading-none z-10 px-2"
            onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % photos.length); }}
            aria-label="Next"
          >›</button>
        </div>
      )}
    </>
  );
}
