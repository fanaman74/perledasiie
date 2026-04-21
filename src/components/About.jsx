import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function About() {
  const { t } = useTranslation();
  const { ref, className } = useScrollReveal();

  return (
    <section id="about" className="py-24 px-6">
      <div
        ref={ref}
        className={`max-w-[700px] mx-auto text-center ${className}`}
      >
        <h2 className="font-display italic text-3xl md:text-4xl mb-6">
          {t('about.title')}
        </h2>
        <p className="text-text-muted leading-relaxed">
          {t('about.body')}
        </p>
      </div>
    </section>
  );
}
