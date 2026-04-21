import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Events() {
  const { t } = useTranslation();
  const { ref, className } = useScrollReveal();

  return (
    <section
      id="evenements"
      className="relative py-32 px-6 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          'url(https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1920)',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-bg/85" />

      <div
        ref={ref}
        className={`relative z-10 max-w-[600px] mx-auto text-center ${className}`}
      >
        <h2 className="font-display italic text-3xl md:text-4xl mb-6">
          {t('events.title')}
        </h2>
        <p className="text-text-muted leading-relaxed mb-8">
          {t('events.body')}
        </p>
        <a
          href="#contact"
          className="inline-block border border-accent text-accent px-8 py-3 text-sm uppercase tracking-wider hover:bg-accent hover:text-bg transition-colors"
        >
          {t('events.cta')}
        </a>
      </div>
    </section>
  );
}
