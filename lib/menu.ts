import { createServerClient } from './supabase-server';

function unwrapQuery<T>(label: string, result: { data: T | null; error: { message: string } | null }) {
  if (result.error) {
    throw new Error(`${label}: ${result.error.message}`);
  }
  return result.data;
}

export async function getMenuData(locale: string) {
  const supabase = createServerClient();

  const sections = unwrapQuery('sections query failed', await supabase.from('sections').select('id, sort_order').order('sort_order'));
  const sectionTrans = unwrapQuery('section_translations query failed', await supabase.from('section_translations').select('section_id, name').eq('locale', locale));
  const categories = unwrapQuery('categories query failed', await supabase.from('categories').select('id, section_id, sort_order').order('sort_order'));
  const catTrans = unwrapQuery('category_translations query failed', await supabase.from('category_translations').select('category_id, name').eq('locale', locale));
  const items = unwrapQuery('menu_items query failed', await supabase.from('menu_items').select('id, category_id, num, price_restaurant, price_takeaway, is_featured, featured_image, sort_order').eq('active', true).order('sort_order'));
  const itemTrans = unwrapQuery('item_translations query failed', await supabase.from('item_translations').select('item_id, name, description').eq('locale', locale));

  const secMap = Object.fromEntries((sectionTrans || []).map(t => [t.section_id, t.name]));
  const catMap = Object.fromEntries((catTrans || []).map(t => [t.category_id, t.name]));
  const itemMap = Object.fromEntries((itemTrans || []).map(t => [t.item_id, { name: t.name, description: t.description }]));

  return (sections || []).map(s => ({
    id: s.id,
    name: secMap[s.id] || s.id,
    categories: (categories || []).filter(c => c.section_id === s.id).map(c => ({
      id: c.id,
      name: catMap[c.id] || c.id,
      items: (items || []).filter(i => i.category_id === c.id).map(i => ({
        id: i.id,
        num: i.num,
        name: itemMap[i.id]?.name || i.id,
        description: itemMap[i.id]?.description || '',
        priceRestaurant: Number(i.price_restaurant),
        priceTakeaway: i.price_takeaway ? Number(i.price_takeaway) : null,
      })),
    })),
  }));
}

export async function getFeaturedDishes(locale: string) {
  const supabase = createServerClient();
  const items = unwrapQuery('featured menu_items query failed', await supabase.from('menu_items').select('id, price_restaurant, featured_image').eq('is_featured', true).eq('active', true));
  const ids = (items || []).map(i => i.id);
  if (ids.length === 0) return [];
  const trans = unwrapQuery('featured item_translations query failed', await supabase.from('item_translations').select('item_id, name, description').eq('locale', locale).in('item_id', ids));
  const tMap = Object.fromEntries((trans || []).map(t => [t.item_id, t]));
  return (items || []).map(i => ({
    id: i.id,
    name: tMap[i.id]?.name || i.id,
    description: tMap[i.id]?.description || '',
    price: Number(i.price_restaurant),
    image: i.featured_image,
  }));
}

export async function getSetMenus(locale: string) {
  const supabase = createServerClient();
  const data = unwrapQuery(
    'set_menus query failed',
    await supabase
    .from('set_menus')
    .select('*')
    .eq('active', true)
    .order('display_order')
  );

  return (data || []).map((menu: Record<string, unknown>) => ({
    id: menu.id as string,
    name: (menu[`name_${locale}`] || menu.name_fr) as string,
    description: (menu[`description_${locale}`] || menu.description_fr || '') as string,
    price: Number(menu.price),
    min_people: Number(menu.min_people || 1),
    includes: (menu[`includes_${locale}`] || menu.includes_fr || []) as string[],
    type: menu.type as 'set' | 'fondue',
  }));
}
