type SetMenu = {
  id: string;
  name: string;
  description: string;
  price: number;
  min_people: number;
  includes: string[];
  type: 'set' | 'fondue';
};

export default function MenuSetCard({ item }: { item: SetMenu }) {
  return (
    <div className="border border-border bg-surface/30 p-6 flex flex-col gap-4 hover:border-accent/40 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg">{item.name}</h3>
          {item.description && (
            <p className="text-text-muted text-sm mt-1">{item.description}</p>
          )}
        </div>
        <div className="text-right shrink-0">
          <span className="text-accent font-display text-xl">€{item.price.toFixed(2)}</span>
          <p className="text-text-muted text-xs mt-0.5">/ personne</p>
        </div>
      </div>

      {item.min_people > 1 && (
        <span className="inline-flex self-start items-center gap-1.5 text-xs uppercase tracking-wider text-text-muted border border-border px-2.5 py-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Min. {item.min_people} personnes
        </span>
      )}

      {item.includes.length > 0 && (
        <ul className="space-y-1">
          {item.includes.map((inc, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-text-muted">
              <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
              {inc}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
