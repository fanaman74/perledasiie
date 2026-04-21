import { createServerClient } from './supabase-server';

export async function getMenuData(locale: string) {
  const supabase = createServerClient();

  const { data: sections } = await supabase.from('sections').select('id, sort_order').order('sort_order');
  const { data: sectionTrans } = await supabase.from('section_translations').select('section_id, name').eq('locale', locale);
  const { data: categories } = await supabase.from('categories').select('id, section_id, sort_order').order('sort_order');
  const { data: catTrans } = await supabase.from('category_translations').select('category_id, name').eq('locale', locale);
  const { data: items } = await supabase.from('menu_items').select('id, category_id, num, price_restaurant, price_takeaway, is_featured, featured_image, sort_order').eq('active', true).order('sort_order');
  const { data: itemTrans } = await supabase.from('item_translations').select('item_id, name, description').eq('locale', locale);

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
  const { data: items } = await supabase.from('menu_items').select('id, price_restaurant, featured_image').eq('is_featured', true).eq('active', true);
  const ids = (items || []).map(i => i.id);
  if (ids.length === 0) return [];
  const { data: trans } = await supabase.from('item_translations').select('item_id, name, description').eq('locale', locale).in('item_id', ids);
  const tMap = Object.fromEntries((trans || []).map(t => [t.item_id, t]));
  return (items || []).map(i => ({
    id: i.id,
    name: tMap[i.id]?.name || i.id,
    description: tMap[i.id]?.description || '',
    price: Number(i.price_restaurant),
    image: i.featured_image,
  }));
}
