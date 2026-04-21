import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { featuredDishes } from '../data/menuData';

export default function FeaturedDishes() {
  const { t } = useTranslation();
  const { ref, className } = useScrollReveal();

  return (
    <section id="featured" className="py-24 px-6 bg-bg-alt">
      <div ref={ref} className={`max-w-[1200px] mx-auto ${className}`}>
        <h2 className="font-display italic text-3xl md:text-4xl text-center mb-12">
          {t('featured.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredDishes.map((item) => (
            <div
              key={item.id}
              className="relative rounded-lg overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={t(item.nameKey)}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Gradient overlay — stronger for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display text-xl italic mb-1 drop-shadow-lg">{t(item.nameKey)}</h3>
                <p className="text-white/80 text-sm mb-2 drop-shadow-md">{t(item.descKey)}</p>
                <span className="text-accent font-display text-lg drop-shadow-md">{item.price.toFixed(2)}&euro;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
