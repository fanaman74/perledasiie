import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../hooks/useScrollReveal';

const dayNamesFr = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const dayNamesNl = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
const dayNamesEn = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthNamesFr = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const monthNamesNl = ['Januari','Februari','Maart','April','Mei','Juni','Juli','Augustus','September','Oktober','November','December'];
const monthNamesEn = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function DatePicker({ value, onChange, lng }) {
  const today = new Date();
  today.setHours(0,0,0,0);
  const [viewDate, setViewDate] = useState(value ? new Date(value + 'T00:00:00') : new Date());

  const dayNames = lng === 'nl' ? dayNamesNl : lng === 'en' ? dayNamesEn : dayNamesFr;
  const monthNames = lng === 'nl' ? monthNamesNl : lng === 'en' ? monthNamesEn : monthNamesFr;

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const startOffset = (firstDay.getDay() + 6) % 7; // Monday = 0
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
  }, [year, month]);

  function prevMonth() {
    setViewDate(new Date(year, month - 1, 1));
  }
  function nextMonth() {
    setViewDate(new Date(year, month + 1, 1));
  }

  function selectDay(d) {
    const selected = new Date(year, month, d);
    if (selected < today) return;
    // Monday (getDay()===1) is closed
    if (selected.getDay() === 1) return;
    const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    onChange(iso);
  }

  const selectedIso = value;

  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="text-text-muted hover:text-text p-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="font-display text-lg">{monthNames[month]} {year}</span>
        <button onClick={nextMonth} className="text-text-muted hover:text-text p-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((d) => (
          <div key={d} className="text-center text-xs text-text-muted py-1">{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => {
          if (d === null) return <div key={`empty-${i}`} />;
          const cellDate = new Date(year, month, d);
          const isPast = cellDate < today;
          const isMonday = cellDate.getDay() === 1;
          const isDisabled = isPast || isMonday;
          const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
          const isSelected = iso === selectedIso;
          const isToday = cellDate.getTime() === today.getTime();

          return (
            <button
              key={d}
              onClick={() => !isDisabled && selectDay(d)}
              disabled={isDisabled}
              className={`aspect-square flex items-center justify-center text-sm rounded transition-colors
                ${isSelected ? 'bg-accent text-bg font-medium' : ''}
                ${isToday && !isSelected ? 'border border-accent text-accent' : ''}
                ${isDisabled ? 'text-text-muted/30 cursor-not-allowed' : ''}
                ${!isSelected && !isDisabled ? 'hover:bg-border text-text' : ''}
              `}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function generateTimeSlots() {
  const slots = [];
  // Lunch: 11:30 - 14:00
  for (let h = 11; h <= 14; h++) {
    for (let m = 0; m < 60; m += 30) {
      if (h === 11 && m === 0) continue; // start at 11:30
      if (h === 14 && m > 0) continue;   // end at 14:00
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }
  // Dinner: 17:30 - 21:30
  for (let h = 17; h <= 21; h++) {
    for (let m = 0; m < 60; m += 30) {
      if (h === 17 && m === 0) continue; // start at 17:30
      if (h === 21 && m > 30) continue;  // end at 21:30
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }
  return slots;
}

const timeSlots = generateTimeSlots();

export default function Reservation() {
  const { t, i18n } = useTranslation();
  const { ref, className } = useScrollReveal();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    guests: 2,
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleConfirm() {
    const subject = encodeURIComponent(`Réservation Lotus — ${form.firstName} ${form.lastName}`);
    const body = encodeURIComponent(
      `Réservation:\n` +
      `Convives: ${form.guests}\n` +
      `Date: ${form.date}\n` +
      `Heure: ${form.time}\n` +
      `Nom: ${form.firstName} ${form.lastName}\n` +
      `Email: ${form.email}\n` +
      `Téléphone: ${form.phone}\n` +
      `Demandes: ${form.specialRequests || '—'}`
    );
    window.location.href = `mailto:info@lotus-laeken.be?subject=${subject}&body=${body}`;
    setStep(3);
  }

  return (
    <section id="contact" className="py-24 px-6 bg-bg-alt">
      <div ref={ref} className={`max-w-[500px] mx-auto ${className}`}>
        <h2 className="font-display italic text-3xl md:text-4xl text-center mb-10">
          {t('reservation.title')}
        </h2>

        {/* Step 1: Date/Time/Guests */}
        {step === 1 && (
          <div className="flex flex-col gap-6">
            {/* Guest counter */}
            <div>
              <label className="block text-sm text-text-muted mb-2">{t('reservation.guests')}</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => update('guests', Math.max(1, form.guests - 1))}
                  className="w-10 h-10 rounded border border-border text-text-muted hover:text-text flex items-center justify-center text-lg"
                >
                  -
                </button>
                <span className="font-display text-2xl w-8 text-center">{form.guests}</span>
                <button
                  onClick={() => update('guests', Math.min(20, form.guests + 1))}
                  className="w-10 h-10 rounded border border-border text-text-muted hover:text-text flex items-center justify-center text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm text-text-muted mb-2">{t('reservation.date')}</label>
              <DatePicker
                value={form.date}
                onChange={(iso) => update('date', iso)}
                lng={i18n.language}
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm text-text-muted mb-2">{t('reservation.time')}</label>
              <select
                value={form.time}
                onChange={(e) => update('time', e.target.value)}
                className="w-full bg-surface border border-border rounded px-4 py-3 text-text focus:outline-none focus:border-accent"
              >
                <option value="">--</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!form.date || !form.time}
              className="mt-2 bg-accent text-bg py-3 text-sm uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t('reservation.continue')}
            </button>
          </div>
        )}

        {/* Step 2: Contact info */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <h3 className="font-display text-xl italic mb-2">{t('reservation.contactTitle')}</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-text-muted mb-2">{t('reservation.firstName')}</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => update('firstName', e.target.value)}
                  className="w-full bg-surface border border-border rounded px-4 py-3 text-text focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm text-text-muted mb-2">{t('reservation.lastName')}</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => update('lastName', e.target.value)}
                  className="w-full bg-surface border border-border rounded px-4 py-3 text-text focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-text-muted mb-2">{t('reservation.email')}</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className="w-full bg-surface border border-border rounded px-4 py-3 text-text focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm text-text-muted mb-2">{t('reservation.phone')}</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                className="w-full bg-surface border border-border rounded px-4 py-3 text-text focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm text-text-muted mb-2">{t('reservation.specialRequests')}</label>
              <textarea
                value={form.specialRequests}
                onChange={(e) => update('specialRequests', e.target.value)}
                rows={3}
                className="w-full bg-surface border border-border rounded px-4 py-3 text-text focus:outline-none focus:border-accent resize-none"
              />
            </div>

            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-border text-text-muted py-3 text-sm uppercase tracking-wider hover:text-text transition-colors"
              >
                &larr;
              </button>
              <button
                onClick={handleConfirm}
                disabled={!form.firstName || !form.email}
                className="flex-[3] bg-accent text-bg py-3 text-sm uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t('reservation.confirm')}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="text-center flex flex-col items-center gap-4">
            {/* Green checkmark */}
            <div className="w-16 h-16 rounded-full bg-accent-alt flex items-center justify-center mb-2">
              <svg className="w-8 h-8 text-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="font-display text-2xl italic">{t('reservation.confirmedTitle')}</h3>

            <div className="text-text-muted text-sm space-y-1">
              <p>{t('reservation.confirmedGuests', { count: form.guests })}</p>
              <p>{form.date} — {form.time}</p>
              <p>{form.firstName} {form.lastName}</p>
            </div>

            <p className="text-text-muted text-sm mt-2">
              {t('reservation.confirmedEmail')} {form.email}
            </p>

            <a
              href="#accueil"
              className="mt-4 inline-block border border-accent text-accent px-8 py-3 text-sm uppercase tracking-wider hover:bg-accent hover:text-bg transition-colors"
            >
              {t('reservation.backHome')}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
