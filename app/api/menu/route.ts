import { getMenuData, getFeaturedDishes, getSetMenus } from '@/lib/menu';
import type { Locale } from '@/lib/i18n/config';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = (searchParams.get('locale') || 'fr') as Locale;

    const [sections, featured, setMenus] = await Promise.all([
      getMenuData(locale),
      getFeaturedDishes(locale),
      getSetMenus(locale),
    ]);

    return Response.json({ sections, featured, setMenus });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load menu data';
    return Response.json({ error: message }, { status: 500 });
  }
}
