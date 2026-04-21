'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { createBrowserClient } from '@/lib/supabase-browser';
import ScrollReveal from '@/components/ScrollReveal';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import FeaturedDishes from '@/components/FeaturedDishes';
import Menu from '@/components/Menu';
import Events from '@/components/Events';
import FindUs from '@/components/FindUs';
import Reservation from '@/components/Reservation';
import Footer from '@/components/Footer';
import TakeawayPanel from '@/components/TakeawayPanel';

type Dish = { id: string; name: string; description: string; price: number; image: string | null };

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

export default function ClientHomePage() {
  const { locale, dict } = useLanguage();
  const [menuData, setMenuData] = useState<Section[]>([]);
  const [featured, setFeatured] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const supabase = createBrowserClient();

    async function loadData() {
      const [
        { data: menuItems },
        { data: setMenusData },
        { data: featuredItems },
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
        supabase
          .from('lotus_items')
          .select('id, price_restaurant, featured_image')
          .eq('is_featured', true)
          .eq('active', true),
      ]);

      // Build featured dishes
      let featuredDishes: Dish[] = [];
      if (featuredItems && featuredItems.length > 0) {
        const ids = featuredItems.map((i: Record<string, unknown>) => i.id as string);
        const { data: trans } = await supabase
          .from('lotus_item_translations')
          .select('item_id, name, description')
          .eq('locale', locale)
          .in('item_id', ids);
        const tMap = Object.fromEntries(
          ((trans ?? []) as Array<{ item_id: string; name: string; description: string }>).map(t => [t.item_id, t])
        );
        featuredDishes = featuredItems.map((i: Record<string, unknown>) => ({
          id: i.id as string,
          name: tMap[i.id as string]?.name || (i.id as string),
          description: tMap[i.id as string]?.description || '',
          price: Number(i.price_restaurant),
          image: i.featured_image as string | null,
        }));
      }

      // Build 4 sections
      const sections: Section[] = [
        {
          id: 'menus',
          name: (dict.menu.sections as Record<string, string>).menus ?? 'Menus',
          kind: 'cards' as const,
          setItems: (setMenusData ?? [])
            .filter((m: Record<string, unknown>) => m.type === 'set')
            .map((m: Record<string, unknown>) => ({
              id: m.id as string,
              name: (m[`name_${locale}`] || m.name_fr) as string,
              description: (m[`description_${locale}`] || m.description_fr || '') as string,
              price: m.price as number,
              min_people: m.min_people as number,
              includes: (m[`includes_${locale}`] || m.includes_fr || []) as string[],
              type: m.type as 'set' | 'fondue',
            })),
        },
        {
          id: 'fondues',
          name: (dict.menu.sections as Record<string, string>).fondues ?? 'Fondues',
          kind: 'cards' as const,
          setItems: (setMenusData ?? [])
            .filter((m: Record<string, unknown>) => m.type === 'fondue')
            .map((m: Record<string, unknown>) => ({
              id: m.id as string,
              name: (m[`name_${locale}`] || m.name_fr) as string,
              description: (m[`description_${locale}`] || m.description_fr || '') as string,
              price: m.price as number,
              min_people: m.min_people as number,
              includes: (m[`includes_${locale}`] || m.includes_fr || []) as string[],
              type: m.type as 'set' | 'fondue',
            })),
        },
        {
          id: 'entrees',
          name: (dict.menu.sections as Record<string, string>).entrees ?? 'Entrées',
          kind: 'table' as const,
          items: (menuItems ?? [])
            .filter((m: Record<string, unknown>) => m.section === 'entrees')
            .map((m: Record<string, unknown>) => ({
              id: m.id as string,
              num: m.num as string,
              name: (m[`name_${locale}`] || m.name_fr) as string,
              description: (m[`description_${locale}`] || m.description_fr || '') as string,
              priceRestaurant: m.price_restaurant as number,
              priceTakeaway: m.price_takeaway as number | null,
            })),
        },
        {
          id: 'plats',
          name: (dict.menu.sections as Record<string, string>).plats ?? 'Plats',
          kind: 'table' as const,
          items: (menuItems ?? [])
            .filter((m: Record<string, unknown>) => m.section === 'plats')
            .map((m: Record<string, unknown>) => ({
              id: m.id as string,
              num: m.num as string,
              name: (m[`name_${locale}`] || m.name_fr) as string,
              description: (m[`description_${locale}`] || m.description_fr || '') as string,
              priceRestaurant: m.price_restaurant as number,
              priceTakeaway: m.price_takeaway as number | null,
            })),
        },
      ];

      setMenuData(sections);
      setFeatured(featuredDishes);
      setLoading(false);
    }

    loadData().catch(() => setLoading(false));
  }, [locale, dict]);

  return (
    <>
      <Navbar />
      <Hero dict={dict.hero} />
      <ScrollReveal><About dict={dict.about} /></ScrollReveal>
      <ScrollReveal>
        <FeaturedDishes dict={dict.featured} dishes={featured} />
      </ScrollReveal>
      {!loading && <Menu sections={menuData} dict={dict.menu} />}
      {loading && (
        <section id="menu" className="py-24 px-6 flex justify-center items-center min-h-[300px]">
          <span className="text-text-muted text-sm uppercase tracking-widest">Chargement…</span>
        </section>
      )}
      <ScrollReveal><Events dict={dict.events} /></ScrollReveal>
      <ScrollReveal><FindUs dict={dict.findUs} /></ScrollReveal>
      <Reservation dict={dict.reservation} locale={locale} />
      <Footer dict={{ nav: dict.nav, findUs: dict.findUs, footer: dict.footer }} />
      <TakeawayPanel />
    </>
  );
}
