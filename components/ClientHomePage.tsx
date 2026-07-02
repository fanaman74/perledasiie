'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
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
    async function loadData() {
      setLoading(true);

      const response = await fetch(`/api/menu?locale=${locale}`, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Failed to load menu data');
      }

      const data = await response.json();
      const menuSections: Section[] = (data.sections || []).map((section: Record<string, unknown>) => ({
        id: section.id as string,
        name: section.name as string,
        kind: 'table',
        items: (((section.categories as Record<string, unknown>[] | undefined) || []).flatMap((category) =>
          (((category.items as Record<string, unknown>[] | undefined) || []).map((item) => ({
            id: item.id as string,
            num: item.num as string,
            name: item.name as string,
            description: item.description as string,
            priceRestaurant: Number(item.priceRestaurant),
            priceTakeaway: item.priceTakeaway == null ? null : Number(item.priceTakeaway),
            category: category.name as string,
          })))
        )),
      }));

      const setMenus: SetMenuItem[] = (data.setMenus || []).map((item: SetMenuItem) => ({
        ...item,
        price: Number(item.price),
        min_people: Number(item.min_people),
      }));

      setMenuData([
        ...menuSections,
        {
          id: 'menus',
          name: (dict.menu.sections as Record<string, string>).menus ?? 'Menus',
          kind: 'cards',
          setItems: setMenus.filter((item) => item.type === 'set'),
        },
        {
          id: 'fondues',
          name: (dict.menu.sections as Record<string, string>).fondues ?? 'Fondues',
          kind: 'cards',
          setItems: setMenus.filter((item) => item.type === 'fondue'),
        },
      ]);
    }

    loadData()
      .catch(() => {
        setMenuData([]);
      })
      .finally(() => {
        setLoading(false);
      });
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
