'use client';
import { useState, useEffect } from 'react';
import { useOrder } from './OrderProvider';
import MenuSetCard from './MenuSetCard';

type MenuItem = {
  id: string;
  num: string;
  name: string;
  description: string;
  priceRestaurant: number;
  priceTakeaway: number | null;
  category: string;
};

type SetMenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  min_people: number;
  includes: string[];
  type: 'set' | 'fondue';
};

type Section = {
  id: string;
  name: string;
  kind: 'table' | 'cards';
  items?: MenuItem[];
  setItems?: SetMenuItem[];
};

type MenuDict = {
  title: string;
  priceRestaurant: string;
  priceTraiteur: string;
  addButton?: string;
};

interface MenuProps {
  sections: Section[];
  dict: MenuDict;
}

export default function Menu({ sections, dict }: MenuProps) {
  const { addItem } = useOrder();
  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id || '');
  const [activeCategoryId, setActiveCategoryId] = useState('');

  const activeSection = sections.find(s => s.id === activeSectionId);

  // Derive unique categories from the active table section
  const categories: string[] = [];
  if (activeSection?.kind === 'table' && activeSection.items) {
    for (const item of activeSection.items) {
      if (item.category && !categories.includes(item.category)) {
        categories.push(item.category);
      }
    }
  }

  // Reset active category when section changes
  useEffect(() => {
    setActiveCategoryId(categories[0] ?? '');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSectionId]);

  const visibleItems = activeSection?.kind === 'table'
    ? (activeSection.items ?? []).filter(i => !activeCategoryId || i.category === activeCategoryId)
    : [];

  function switchSection(id: string) {
    setActiveSectionId(id);
  }

  function handleAdd(item: MenuItem) {
    if (!item.priceTakeaway) return;
    addItem({ id: item.id, name: item.name, desc: item.description, price: item.priceTakeaway });
  }

  return (
    <section id="menu" className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-center mb-10">{dict.title}</h2>

        {/* Section tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => switchSection(section.id)}
              className={`px-6 py-2 text-sm uppercase tracking-wider border transition-colors ${
                activeSectionId === section.id
                  ? 'border-accent bg-accent text-bg font-medium'
                  : 'border-border text-text-muted hover:text-text hover:border-text'
              }`}
            >
              {section.name}
            </button>
          ))}
        </div>

        {/* Category pill tabs — only for table sections with multiple categories */}
        {activeSection?.kind === 'table' && categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategoryId(cat)}
                className={`px-4 py-1.5 text-xs uppercase tracking-wider rounded-full transition-colors ${
                  activeCategoryId === cat
                    ? 'bg-accent/15 text-accent font-medium'
                    : 'text-text-muted hover:text-text'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Cards: set menus + fondues */}
        {activeSection?.kind === 'cards' && activeSection.setItems && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
            {activeSection.setItems.map(item => (
              <MenuSetCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Item table */}
        {activeSection?.kind === 'table' && (
          <div className="max-w-[800px] mx-auto">
            <div className="flex items-center text-xs uppercase tracking-wider text-text-muted border-b border-border pb-2 mb-4">
              <span className="w-10">#</span>
              <span className="flex-1">Plat</span>
              <span className="w-16 text-center">{dict.priceRestaurant}</span>
              <span className="w-10" />
            </div>

            {visibleItems.length === 0 && (
              <p className="text-text-muted text-center py-12 text-sm">Carte en cours de mise à jour.</p>
            )}

            {visibleItems.map(item => (
              <div key={item.id} className="flex items-center py-3 border-b border-border/50 group">
                <span className="w-10 text-text-muted text-sm">{item.num}</span>
                <div className="flex-1 min-w-0 pr-4">
                  <span className="text-sm font-medium">{item.name}</span>
                  {item.description && (
                    <span className="text-text-muted text-xs ml-2 italic">{item.description}</span>
                  )}
                </div>
                <span className="w-16 text-center text-sm">€{item.priceRestaurant.toFixed(2)}</span>
                <span className="w-10 flex justify-center">
                  {item.priceTakeaway && (
                    <button
                      onClick={() => handleAdd(item)}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-text-muted hover:bg-accent hover:text-bg transition-colors"
                      aria-label={`Ajouter ${item.name}`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 11H4L5 9z" />
                      </svg>
                    </button>
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
