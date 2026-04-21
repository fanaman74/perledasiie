'use client';
import { useState } from 'react';
import { useOrder } from './OrderProvider';
import MenuSetCard from './MenuSetCard';

type MenuItem = {
  id: string;
  num: string;
  name: string;
  description: string;
  priceRestaurant: number;
  priceTakeaway: number | null;
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
  const activeSection = sections.find(s => s.id === activeSectionId);

  function handleAdd(item: MenuItem) {
    if (!item.priceTakeaway) return;
    addItem({
      id: item.id,
      name: item.name,
      desc: item.description,
      price: item.priceTakeaway,
    });
  }

  return (
    <section id="menu" className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-center mb-10">
          {dict.title}
        </h2>

        {/* Section tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSectionId(section.id)}
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

        {/* Card grid for Menus and Fondues */}
        {activeSection?.kind === 'cards' && activeSection.setItems && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
            {activeSection.setItems.map(item => (
              <MenuSetCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Table rows for Entrées and Plats */}
        {activeSection?.kind === 'table' && activeSection.items && (
          <div className="max-w-[800px] mx-auto">
            <div className="flex items-center text-xs uppercase tracking-wider text-text-muted border-b border-border pb-2 mb-4">
              <span className="w-10">#</span>
              <span className="flex-1">Plat</span>
              <span className="w-16 text-center">{dict.priceRestaurant}</span>
              <span className="w-16 text-center">{dict.priceTraiteur}</span>
              <span className="w-10" />
            </div>

            {activeSection.items.map(item => (
              <div key={item.id} className="flex items-center py-3 border-b border-border/50 group">
                <span className="w-10 text-text-muted text-sm">{item.num}</span>
                <div className="flex-1 min-w-0 pr-4">
                  <span className="text-sm font-medium">{item.name}</span>
                  {item.description && (
                    <span className="text-text-muted text-xs ml-2">{item.description}</span>
                  )}
                </div>
                <span className="w-16 text-center text-sm">{item.priceRestaurant.toFixed(2)}</span>
                <span className="w-16 text-center text-sm text-text-muted">
                  {item.priceTakeaway ? item.priceTakeaway.toFixed(2) : '\u2014'}
                </span>
                <span className="w-10 flex justify-center">
                  {item.priceTakeaway && (
                    <button
                      onClick={() => handleAdd(item)}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-sm text-text-muted hover:bg-accent hover:text-bg transition-colors"
                      aria-label={`Add ${item.name}`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 11H4L5 9z" />
                      </svg>
                    </button>
                  )}
                </span>
              </div>
            ))}

            {activeSection.items.length === 0 && (
              <p className="text-text-muted text-center py-12 text-sm">Carte en cours de mise à jour.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
