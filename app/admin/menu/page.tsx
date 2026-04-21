'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface MenuItem {
  id: string;
  category_id: string;
  num: string | null;
  price_restaurant: number;
  price_takeaway: number | null;
  active: boolean;
  is_featured: boolean;
  sort_order: number;
  translations: Record<string, { name: string; description: string }>;
  categoryName: Record<string, string>;
}

interface Category {
  id: string;
  section_id: string;
  sort_order: number;
  translations: Record<string, string>;
}

interface Section {
  id: string;
  sort_order: number;
  translations: Record<string, string>;
}

export default function MenuManagementPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/menu')
      .then((r) => r.json())
      .then((data) => {
        setItems(data.items || []);
        setCategories(data.categories || []);
        setSections(data.sections || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleDelete(itemId: string) {
    if (!confirm('Delete this item?')) return;
    await fetch(`/api/admin/menu/${itemId}`, { method: 'DELETE' });
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  }

  async function handleToggleActive(item: MenuItem) {
    const newActive = !item.active;
    await fetch(`/api/admin/menu/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...item, active: newActive }),
    });
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, active: newActive } : i))
    );
  }

  if (loading) {
    return <div className="text-text-muted">Loading menu...</div>;
  }

  const secCats: Record<string, Category[]> = {};
  for (const cat of categories) {
    if (!secCats[cat.section_id]) secCats[cat.section_id] = [];
    secCats[cat.section_id].push(cat);
  }
  const catItems: Record<string, MenuItem[]> = {};
  for (const item of items) {
    if (!catItems[item.category_id]) catItems[item.category_id] = [];
    catItems[item.category_id].push(item);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display text-accent">Menu Management</h1>
        <Link
          href="/admin/menu/new"
          className="bg-accent text-bg px-4 py-2 rounded text-sm font-semibold hover:bg-accent/90 transition-colors"
        >
          + New Item
        </Link>
      </div>

      {sections.map((section) => (
        <div key={section.id} className="space-y-4">
          <h2 className="text-lg font-semibold text-text border-b border-border pb-2">
            {section.translations.fr || section.id}
          </h2>
          {(secCats[section.id] || []).map((cat) => (
            <div key={cat.id} className="ml-4 space-y-2">
              <h3 className="text-sm font-semibold text-accent/80">
                {cat.translations.fr || cat.id}
              </h3>
              <div className="space-y-1">
                {(catItems[cat.id] || []).map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between bg-surface rounded px-4 py-2 text-sm ${!item.active ? 'opacity-50' : ''}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {item.num && (
                        <span className="text-text-muted text-xs w-8">{item.num}</span>
                      )}
                      <span className="truncate">
                        {item.translations.fr?.name || 'Unnamed'}
                      </span>
                      {item.is_featured && (
                        <span className="text-xs bg-accent/20 text-accent px-1.5 py-0.5 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-text-muted">
                        {Number(item.price_restaurant).toFixed(2)}&euro;
                        {item.price_takeaway != null && (
                          <> / {Number(item.price_takeaway).toFixed(2)}&euro;</>
                        )}
                      </span>
                      <button
                        onClick={() => handleToggleActive(item)}
                        className={`text-xs px-2 py-0.5 rounded border ${item.active ? 'border-green-500/50 text-green-300' : 'border-red-500/50 text-red-300'}`}
                      >
                        {item.active ? 'Active' : 'Inactive'}
                      </button>
                      <Link
                        href={`/admin/menu/${item.id}`}
                        className="text-accent/70 hover:text-accent text-xs"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-400/70 hover:text-red-400 text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
