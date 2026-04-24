'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { createBrowserClient } from '@/lib/supabase-browser';
import ScrollReveal from '@/components/ScrollReveal';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Menu from '@/components/Menu';
import FindUs from '@/components/FindUs';
import Reservation from '@/components/Reservation';
import Footer from '@/components/Footer';
import TakeawayPanel from '@/components/TakeawayPanel';

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

export default function ClientHomePage() {
  const { locale, dict } = useLanguage();
  const [menuData, setMenuData] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const supabase = createBrowserClient();

    async function loadData() {
      const [
        { data: menuItems },
        { data: setMenusData },
      ] = await Promise.all([
        supabase
          .from('menu_items')
          .select('*')
          .eq('active', true)
          .order('display_order'),
        supabase
          .from('set_menus')
          .select('*')
          .eq('active', true)
          .order('display_order'),
      ]);

      const mapSetItem = (m: Record<string, unknown>) => ({
        id: m.id as string,
        name: (m[`name_${locale}`] || m.name_fr) as string,
        description: (m[`description_${locale}`] || m.description_fr || '') as string,
        price: m.price as number,
        min_people: m.min_people as number,
        includes: (m[`includes_${locale}`] || m.includes_fr || []) as string[],
        type: m.type as 'set' | 'fondue',
      });

      // Build 2 sections — Menus and Fondues only
      const sections: Section[] = [
        {
          id: 'menus',
          name: (dict.menu.sections as Record<string, string>).menus ?? 'Menus',
          kind: 'cards' as const,
          setItems: (setMenusData ?? []).filter((m: Record<string, unknown>) => m.type === 'set').map(mapSetItem),
        },
        {
          id: 'fondues',
          name: (dict.menu.sections as Record<string, string>).fondues ?? 'Fondues',
          kind: 'cards' as const,
          setItems: (setMenusData ?? []).filter((m: Record<string, unknown>) => m.type === 'fondue').map(mapSetItem),
        },
      ];

      setMenuData(sections);
      setLoading(false);
    }

    loadData().catch(() => setLoading(false));
  }, [locale, dict]);

  return (
    <>
      <Navbar />
      <Hero dict={dict.hero} />
      <ScrollReveal><About dict={dict.about} /></ScrollReveal>
      {!loading && <Menu sections={menuData} dict={dict.menu} />}
      {loading && (
        <section id="menu" className="py-24 px-6 flex justify-center items-center min-h-[300px]">
          <span className="text-text-muted text-sm uppercase tracking-widest">Chargement…</span>
        </section>
      )}
      <div id="contact" className="scroll-mt-[72px]" />
      <ScrollReveal><FindUs dict={dict.findUs} /></ScrollReveal>
      <Reservation dict={dict.reservation} locale={locale} />
      <Footer dict={{ nav: dict.nav, findUs: dict.findUs, footer: dict.footer }} />
      <TakeawayPanel />
    </>
  );
}
