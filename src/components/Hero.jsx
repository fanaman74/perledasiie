import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="accueil" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.pexels.com/photos/2664443/pexels-photo-2664443.jpeg?auto=compress&cs=tinysrgb&w=1920"
        className="absolute inset-0 w-full h-full object-cover"
      >
        {/* Mixkit: "Cooking asian food" — wok stir fry, free license */}
        <source
          src="https://assets.mixkit.co/videos/9286/9286-720.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center gap-5">
        <span className="text-xs uppercase tracking-[0.3em] text-accent hero-animate hero-animate-delay-1">
          {t('hero.superscript')}
        </span>

        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light italic max-w-[700px] hero-animate hero-animate-delay-2">
          {t('hero.title')}
        </h1>

        <p className="text-text-muted max-w-[500px] hero-animate hero-animate-delay-3">
          {t('hero.subtitle')}
        </p>

        <a
          href="#menu"
          className="inline-block border border-accent text-accent px-8 py-3 text-sm uppercase tracking-wider hover:bg-accent hover:text-bg transition-colors hero-animate hero-animate-delay-4"
        >
          {t('hero.cta')}
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-text-muted">
        <span className="text-xs uppercase tracking-wider">{t('hero.scroll')}</span>
        <svg
          className="w-4 h-4 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
