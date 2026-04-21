-- Menu items table
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID,
  num TEXT,
  price_restaurant NUMERIC(6,2) NOT NULL DEFAULT 0,
  price_takeaway NUMERIC(6,2),
  active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  featured_image TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Set menus and fondues
CREATE TABLE IF NOT EXISTS set_menus (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('set', 'fondue')),
  name_fr TEXT NOT NULL,
  name_nl TEXT,
  name_en TEXT,
  description_fr TEXT,
  description_nl TEXT,
  description_en TEXT,
  price NUMERIC(6,2) NOT NULL,
  min_people INTEGER DEFAULT 1,
  includes_fr JSONB DEFAULT '[]',
  includes_nl JSONB DEFAULT '[]',
  includes_en JSONB DEFAULT '[]',
  active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reservations
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guests INTEGER NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL,
  phone TEXT,
  special_requests TEXT,
  locale TEXT DEFAULT 'fr',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders (takeaway / traiteur)
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  items JSONB NOT NULL,
  total NUMERIC(8,2) NOT NULL,
  locale TEXT DEFAULT 'fr',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE set_menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Public read for menu data
CREATE POLICY "Public read menu_items" ON menu_items FOR SELECT USING (active = true);
CREATE POLICY "Public read set_menus" ON set_menus FOR SELECT USING (active = true);

-- Public insert for orders and reservations
CREATE POLICY "Public insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert reservations" ON reservations FOR INSERT WITH CHECK (true);

-- OTP verification codes
CREATE TABLE IF NOT EXISTS otps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE otps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert otps" ON otps FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read otps" ON otps FOR SELECT USING (true);
CREATE POLICY "Public update otps" ON otps FOR UPDATE USING (true);

-- Event requests (private dining / catering enquiries)
CREATE TABLE IF NOT EXISTS event_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  event_type TEXT NOT NULL,
  event_date DATE,
  guests INTEGER,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE event_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert event_requests" ON event_requests FOR INSERT WITH CHECK (true);

-- Admin sessions
CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role only admin_sessions" ON admin_sessions USING (false);

-- Menu sections
CREATE TABLE IF NOT EXISTS sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read sections" ON sections FOR SELECT USING (true);

-- Section translations
CREATE TABLE IF NOT EXISTS section_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  locale TEXT NOT NULL,
  name TEXT NOT NULL,
  UNIQUE (section_id, locale)
);

ALTER TABLE section_translations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read section_translations" ON section_translations FOR SELECT USING (true);

-- Menu categories
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES sections(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);

-- Category translations
CREATE TABLE IF NOT EXISTS category_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  locale TEXT NOT NULL,
  name TEXT NOT NULL,
  UNIQUE (category_id, locale)
);

ALTER TABLE category_translations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read category_translations" ON category_translations FOR SELECT USING (true);

-- Menu item translations
CREATE TABLE IF NOT EXISTS item_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  locale TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  UNIQUE (item_id, locale)
);

ALTER TABLE item_translations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read item_translations" ON item_translations FOR SELECT USING (true);
