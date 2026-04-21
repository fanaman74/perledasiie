import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../hooks/useScrollReveal';

const hourKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const closedWords = ['Fermé', 'Gesloten', 'Closed'];

export default function FindUs() {
  const { t } = useTranslation();
  const { ref, className } = useScrollReveal();

  return (
    <section id="informations" className="py-24 px-6">
      <div ref={ref} className={`max-w-[1200px] mx-auto ${className}`}>
        <h2 className="font-display italic text-3xl md:text-4xl mb-12 text-center">
          {t('findUs.title')}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Info */}
        <div className="text-center lg:text-left">
          <p className="text-text-muted mb-2">{t('findUs.address')}</p>
          <a
            href={`tel:${t('findUs.phone').replace(/\s/g, '')}`}
            className="text-accent hover:underline"
          >
            {t('findUs.phone')}
          </a>

          <h3 className="font-display text-xl mt-8 mb-4">{t('findUs.hoursTitle')}</h3>
          <table className="w-full text-sm mx-auto max-w-md lg:mx-0 lg:max-w-none">
            <tbody>
              {hourKeys.map((key) => {
                const day = t(`findUs.hours.${key}.day`);
                const time = t(`findUs.hours.${key}.time`);
                const isClosed = closedWords.includes(time);
                return (
                  <tr key={key} className="border-b border-border">
                    <td className="py-2 pr-4">{day}</td>
                    <td className={`py-2 ${isClosed ? 'text-text-muted' : ''}`}>
                      {time}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Right: Map */}
        <div className="rounded-lg overflow-hidden min-h-[400px]">
          <iframe
            title="Lotus Restaurant location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2517.5!2d4.3497!3d50.8766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDUyJzM1LjgiTiA0wrAyMScwMC4wIkU!5e0!3m2!1sfr!2sbe!4v1"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '400px' }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        </div>
      </div>
    </section>
  );
}
