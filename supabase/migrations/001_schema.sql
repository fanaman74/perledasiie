-- Menu items table (entrées and plats à la carte)
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  num TEXT NOT NULL,
  section TEXT NOT NULL CHECK (section IN ('entrees', 'plats')),
  name_fr TEXT NOT NULL,
  name_nl TEXT,
  name_en TEXT,
  description_fr TEXT,
  description_nl TEXT,
  description_en TEXT,
  price_restaurant NUMERIC(6,2) NOT NULL,
  price_takeaway NUMERIC(6,2),
  active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
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
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  notes TEXT,
  confirmed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders (takeaway)
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  items JSONB NOT NULL,
  total NUMERIC(8,2) NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  notes TEXT,
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
