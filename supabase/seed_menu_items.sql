-- Perle d'Asie — Menu Items seed
-- Run this in the Supabase SQL editor

-- Step 1: Add missing columns
ALTER TABLE menu_items
  ADD COLUMN IF NOT EXISTS section TEXT CHECK (section IN ('entrees', 'plats')),
  ADD COLUMN IF NOT EXISTS category_fr TEXT,
  ADD COLUMN IF NOT EXISTS category_nl TEXT,
  ADD COLUMN IF NOT EXISTS category_en TEXT,
  ADD COLUMN IF NOT EXISTS name_fr TEXT,
  ADD COLUMN IF NOT EXISTS name_nl TEXT,
  ADD COLUMN IF NOT EXISTS name_en TEXT,
  ADD COLUMN IF NOT EXISTS description_fr TEXT,
  ADD COLUMN IF NOT EXISTS description_nl TEXT,
  ADD COLUMN IF NOT EXISTS description_en TEXT,
  ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Step 2: Insert all menu items
INSERT INTO menu_items (num, section, category_fr, category_nl, category_en, name_fr, price_restaurant, price_takeaway, display_order) VALUES

-- ============================================================
-- ENTRÉES
-- ============================================================

-- Potages
('101', 'entrees', 'Potages', 'Soepen', 'Soups', 'Tom Yam Kay', 6.30, 6.30, 101),
('102', 'entrees', 'Potages', 'Soepen', 'Soups', 'Potage d''asperges au crabe', 7.10, 7.10, 102),
('103', 'entrees', 'Potages', 'Soepen', 'Soups', 'Potage au nid d''hirondelle', 6.10, 6.10, 103),
('104', 'entrees', 'Potages', 'Soepen', 'Soups', 'Potage piquant Pékinois', 6.10, 6.10, 104),
('105', 'entrees', 'Potages', 'Soepen', 'Soups', 'Potage aux champignons noirs', 6.10, 6.10, 105),
('106', 'entrees', 'Potages', 'Soepen', 'Soups', 'Potage aux raviolis chinois', 7.30, 7.30, 106),
('110', 'entrees', 'Potages', 'Soepen', 'Soups', 'Soupe végétarienne', 6.10, 6.10, 110),
('111', 'entrees', 'Potages', 'Soepen', 'Soups', 'Tom Yam Kung', 10.30, 10.30, 111),

-- Entrées Froides
('201', 'entrees', 'Entrées Froides', 'Koude Voorgerechten', 'Cold Starters', 'Salade Perle d''Asie', 11.10, 11.10, 201),
('202', 'entrees', 'Entrées Froides', 'Koude Voorgerechten', 'Cold Starters', 'Salade au crabe au parfum citronnelle', 11.10, 11.10, 202),
('203', 'entrees', 'Entrées Froides', 'Koude Voorgerechten', 'Cold Starters', 'Salade de vermicelles thaïlandaise', 11.10, 11.10, 203),
('205', 'entrees', 'Entrées Froides', 'Koude Voorgerechten', 'Cold Starters', 'Lab Kay (Salade de poulet thaïlandaise)', 8.30, 8.30, 205),
('207', 'entrees', 'Entrées Froides', 'Koude Voorgerechten', 'Cold Starters', 'Salade de boeuf tiède', 11.10, 11.10, 207),
('210', 'entrees', 'Entrées Froides', 'Koude Voorgerechten', 'Cold Starters', 'Salade végétarienne', 7.30, 7.30, 210),
('211', 'entrees', 'Entrées Froides', 'Koude Voorgerechten', 'Cold Starters', 'Choux carottes vinaigré', 6.30, 6.30, 211),

-- Entrées Grillades
('213', 'entrees', 'Entrées Grillades', 'Gegrilde Voorgerechten', 'Grilled Starters', 'Brochettes de poulet au jus de coco', 7.40, 7.40, 213),
('214', 'entrees', 'Entrées Grillades', 'Gegrilde Voorgerechten', 'Grilled Starters', 'Brochettes de poulet grillées aux feuilles de citronnier', 7.40, 7.40, 214),
('215', 'entrees', 'Entrées Grillades', 'Gegrilde Voorgerechten', 'Grilled Starters', 'Saté de porc', 7.40, 7.40, 215),
('217', 'entrees', 'Entrées Grillades', 'Gegrilde Voorgerechten', 'Grilled Starters', 'Assortiment Oriental', 13.50, 13.50, 217),

-- Entrées Chaudes
('218', 'entrees', 'Entrées Chaudes', 'Warme Voorgerechten', 'Hot Starters', 'Mini Loempia (végétarien)', 6.20, 6.20, 218),
('219', 'entrees', 'Entrées Chaudes', 'Warme Voorgerechten', 'Hot Starters', 'Mini Triangle au curry (végétarien)', 6.20, 6.20, 219),
('220', 'entrees', 'Entrées Chaudes', 'Warme Voorgerechten', 'Hot Starters', 'Pince de crabe farcie sauce aigre-douce', 10.60, 10.60, 220),
('221', 'entrees', 'Entrées Chaudes', 'Warme Voorgerechten', 'Hot Starters', 'Beignet de Langoustines aux graines de sésame', 10.20, 10.20, 221),
('222', 'entrees', 'Entrées Chaudes', 'Warme Voorgerechten', 'Hot Starters', 'Thod Man Kung (beignets de scampis à la Thaïlandaise)', 10.20, 10.20, 222),
('223', 'entrees', 'Entrées Chaudes', 'Warme Voorgerechten', 'Hot Starters', 'Loempia au poulet (3 pièces)', 8.20, 8.20, 223),
('224', 'entrees', 'Entrées Chaudes', 'Warme Voorgerechten', 'Hot Starters', 'Triangles de porc au curry', 8.20, 8.20, 224),
('225', 'entrees', 'Entrées Chaudes', 'Warme Voorgerechten', 'Hot Starters', 'Aile de poulet (5 pièces)', 7.50, 7.50, 225),
('226', 'entrees', 'Entrées Chaudes', 'Warme Voorgerechten', 'Hot Starters', 'Nem (croquettes Vietnamiennes)', 7.50, 7.50, 226),
('228', 'entrees', 'Entrées Chaudes', 'Warme Voorgerechten', 'Hot Starters', 'Nem au scampis et crabe', 10.90, 10.90, 228),
('229', 'entrees', 'Entrées Chaudes', 'Warme Voorgerechten', 'Hot Starters', 'Cuisse de grenouilles au beurre et à l''ail', 8.90, 8.90, 229),
('230', 'entrees', 'Entrées Chaudes', 'Warme Voorgerechten', 'Hot Starters', 'Loempia aux scampis et crabe (3 pièces)', 10.90, 10.90, 230),

-- Dim Sum
('232', 'entrees', 'Dim Sum', 'Dim Sum', 'Dim Sum', 'Assortiment de Dim Sum', 8.20, 8.20, 232),
('233', 'entrees', 'Dim Sum', 'Dim Sum', 'Dim Sum', 'Bouchées de boeuf', 8.20, 8.20, 233),
('234', 'entrees', 'Dim Sum', 'Dim Sum', 'Dim Sum', 'Raviolis aux scampis', 8.20, 8.20, 234),
('235', 'entrees', 'Dim Sum', 'Dim Sum', 'Dim Sum', 'Croissants farcis', 8.20, 8.20, 235),
('236', 'entrees', 'Dim Sum', 'Dim Sum', 'Dim Sum', 'Bouchées de porc', 7.20, 7.20, 236),
('237', 'entrees', 'Dim Sum', 'Dim Sum', 'Dim Sum', 'Assortiment de Dim Sum (spécial pour 2 pers.)', 17.20, 17.20, 237),

-- ============================================================
-- PLATS
-- ============================================================

-- Volailles
('301', 'plats', 'Volailles', 'Gevogelte', 'Poultry', 'Canard laqué à la Pékinoise', 17.60, 17.60, 301),
('302', 'plats', 'Volailles', 'Gevogelte', 'Poultry', 'Canard laqué à l''orange', 17.60, 17.60, 302),
('303', 'plats', 'Volailles', 'Gevogelte', 'Poultry', 'Canard laqué au citron', 17.60, 17.60, 303),
('304', 'plats', 'Volailles', 'Gevogelte', 'Poultry', 'Canard laqué sauté (curry jaune au coco)', 17.60, 17.60, 304),
('305', 'plats', 'Volailles', 'Gevogelte', 'Poultry', 'Poulet aux noix de cajou à la thaïlandaise', 15.00, 15.00, 305),
('306', 'plats', 'Volailles', 'Gevogelte', 'Poultry', 'Poulet sauté à l''ananas frais sauce aigre-douce', 15.00, 15.00, 306),
('307', 'plats', 'Volailles', 'Gevogelte', 'Poultry', 'Poulet grillé sauce Hoi-Sin', 15.00, 15.00, 307),
('308', 'plats', 'Volailles', 'Gevogelte', 'Poultry', 'Poulet au curry à l''Orientale (curry jaune au coco)', 14.50, 14.50, 308),
('309', 'plats', 'Volailles', 'Gevogelte', 'Poultry', 'Poulet au curry rouge et bambou', 15.00, 15.00, 309),
('310', 'plats', 'Volailles', 'Gevogelte', 'Poultry', 'Poulet au curry vert et aubergines Thaïlandaises', 15.00, 15.00, 310),
('312', 'plats', 'Volailles', 'Gevogelte', 'Poultry', 'Dés de poulet caramélisés', 14.50, 14.50, 312),
('313', 'plats', 'Volailles', 'Gevogelte', 'Poultry', 'Panang Kay (poulet au curry rouge et basilic)', 15.00, 15.00, 313),
('314', 'plats', 'Volailles', 'Gevogelte', 'Poultry', 'Canard au curry rouge et bambou', 18.60, 18.60, 314),
('315', 'plats', 'Volailles', 'Gevogelte', 'Poultry', 'Poulet et légumes sautés', 15.00, 15.00, 315),
('317', 'plats', 'Volailles', 'Gevogelte', 'Poultry', 'Canard avec crêpes de riz', 18.80, 18.80, 317),
('318', 'plats', 'Volailles', 'Gevogelte', 'Poultry', 'Canard laqué sauté aux légumes', 20.00, 20.00, 318),
('319', 'plats', 'Volailles', 'Gevogelte', 'Poultry', 'Canard piquant aux feuilles de basilic', 20.00, 20.00, 319),

-- Viandes
('401', 'plats', 'Viandes', 'Vlees', 'Meats', 'Boeuf aux champignons parfumés', 15.50, 15.50, 401),
('402', 'plats', 'Viandes', 'Vlees', 'Meats', 'Boeuf piquant aux feuilles de basilic', 15.50, 15.50, 402),
('403', 'plats', 'Viandes', 'Vlees', 'Meats', 'Boeuf au curry rouge et bambou', 16.00, 16.00, 403),
('404', 'plats', 'Viandes', 'Vlees', 'Meats', 'Panang Nua (boeuf au curry rouge et basilic)', 15.50, 15.50, 404),
('405', 'plats', 'Viandes', 'Vlees', 'Meats', 'Boeuf au curry à l''Orientale (curry jaune au coco)', 15.00, 15.00, 405),
('406', 'plats', 'Viandes', 'Vlees', 'Meats', 'Boeuf et légumes sautés', 15.00, 15.00, 406),
('407', 'plats', 'Viandes', 'Vlees', 'Meats', 'Dés de porc sautés à l''ananas frais sauce aigre-douce', 15.50, 15.50, 407),
('408', 'plats', 'Viandes', 'Vlees', 'Meats', 'Boulettes de porc sautés à l''ananas frais aigre-doux', 15.50, 15.50, 408),
('409', 'plats', 'Viandes', 'Vlees', 'Meats', 'Babi Pag Kang (porc rôti à l''Indonésienne)', 17.00, 17.00, 409),
('410', 'plats', 'Viandes', 'Vlees', 'Meats', 'Boeuf sauté aux piments', 15.50, 15.50, 410),
('411', 'plats', 'Viandes', 'Vlees', 'Meats', 'Bouts de côtes du chef', 15.50, 15.50, 411),
('413', 'plats', 'Viandes', 'Vlees', 'Meats', 'Boeuf aux deux oignons', 15.50, 15.50, 413),
('414', 'plats', 'Viandes', 'Vlees', 'Meats', 'Boeuf à la sauce piquante au saté', 15.50, 15.50, 414),
('415', 'plats', 'Viandes', 'Vlees', 'Meats', 'Boeuf à la thaïlandaise servi avec du vermicelle de riz', 17.50, 17.50, 415),
('416', 'plats', 'Viandes', 'Vlees', 'Meats', 'Boeuf sauté aux haricots noirs', 15.50, 15.50, 416),

-- Poissons & Crustacés
('501', 'plats', 'Poissons & Crustacés', 'Vis & Schaaldieren', 'Fish & Shellfish', 'Scampis à l''ananas frais sauce aigre-doux', 20.00, 20.00, 501),
('502', 'plats', 'Poissons & Crustacés', 'Vis & Schaaldieren', 'Fish & Shellfish', 'Scampis curry vert et aubergines Thaïlandaises', 18.00, 18.00, 502),
('503', 'plats', 'Poissons & Crustacés', 'Vis & Schaaldieren', 'Fish & Shellfish', 'Beignets de scampis à l''ananas frais sauce aigre douce', 20.50, 20.50, 503),
('504', 'plats', 'Poissons & Crustacés', 'Vis & Schaaldieren', 'Fish & Shellfish', 'Scampis au curry rouge', 18.00, 18.00, 504),
('505', 'plats', 'Poissons & Crustacés', 'Vis & Schaaldieren', 'Fish & Shellfish', 'Scampis sautés aux légumes', 18.00, 18.00, 505),
('507', 'plats', 'Poissons & Crustacés', 'Vis & Schaaldieren', 'Fish & Shellfish', 'Scampis sautés aux légumes à la sauce piquante', 18.00, 18.00, 507),
('508', 'plats', 'Poissons & Crustacés', 'Vis & Schaaldieren', 'Fish & Shellfish', 'Scampis sautés aux piments et basilic', 18.00, 18.00, 508),
('509', 'plats', 'Poissons & Crustacés', 'Vis & Schaaldieren', 'Fish & Shellfish', 'Scampis au curry à l''Orientale (curry jaune au coco)', 18.00, 18.00, 509),
('510', 'plats', 'Poissons & Crustacés', 'Vis & Schaaldieren', 'Fish & Shellfish', 'Calamars sautés aux légumes à la sauce piquante', 15.50, 15.50, 510),
('511', 'plats', 'Poissons & Crustacés', 'Vis & Schaaldieren', 'Fish & Shellfish', 'Calamars sautés aux haricots noirs', 15.50, 15.50, 511),
('512', 'plats', 'Poissons & Crustacés', 'Vis & Schaaldieren', 'Fish & Shellfish', 'Beignets de poissons aux piments et basilic', 15.50, 15.50, 512),
('513', 'plats', 'Poissons & Crustacés', 'Vis & Schaaldieren', 'Fish & Shellfish', 'Cuisses de grenouilles au beurre et à l''ail', 15.50, 15.50, 513),
('514', 'plats', 'Poissons & Crustacés', 'Vis & Schaaldieren', 'Fish & Shellfish', 'Fruits de mer sautés aux légumes', 20.00, 20.00, 514),
('515', 'plats', 'Poissons & Crustacés', 'Vis & Schaaldieren', 'Fish & Shellfish', 'Noix de Saint-Jacques à l''ananas frais sauce aigre-douce', 21.00, 21.00, 515),
('516', 'plats', 'Poissons & Crustacés', 'Vis & Schaaldieren', 'Fish & Shellfish', 'Calamars au curry à l''Orientale', 15.50, 15.50, 516),
('517', 'plats', 'Poissons & Crustacés', 'Vis & Schaaldieren', 'Fish & Shellfish', 'Scampis grillés au poivre et sel', 18.00, 18.00, 517),
('518', 'plats', 'Poissons & Crustacés', 'Vis & Schaaldieren', 'Fish & Shellfish', 'Scampis piquants aux feuilles de basilic', 18.00, 18.00, 518),
('519', 'plats', 'Poissons & Crustacés', 'Vis & Schaaldieren', 'Fish & Shellfish', 'Beignets de poissons à l''ananas frais sauce aigre-doux', 15.50, 15.50, 519),

-- Riz & Nouilles
('601', 'plats', 'Riz & Nouilles', 'Rijst & Noedels', 'Rice & Noodles', 'Riz sauté aux 3 délices (boeuf, poulet, scampis)', 16.50, 16.50, 601),
('602', 'plats', 'Riz & Nouilles', 'Rijst & Noedels', 'Rice & Noodles', 'Riz sauté à la cantonaise', 14.00, 14.00, 602),
('603', 'plats', 'Riz & Nouilles', 'Rijst & Noedels', 'Rice & Noodles', 'Riz sauté au poulet', 13.50, 13.50, 603),
('604', 'plats', 'Riz & Nouilles', 'Rijst & Noedels', 'Rice & Noodles', 'Riz sauté aux scampis', 18.00, 18.00, 604),
('605', 'plats', 'Riz & Nouilles', 'Rijst & Noedels', 'Rice & Noodles', 'Riz sauté au boeuf', 14.00, 14.00, 605),
('606', 'plats', 'Riz & Nouilles', 'Rijst & Noedels', 'Rice & Noodles', 'Riz sauté au porc laqué', 14.00, 14.00, 606),
('607', 'plats', 'Riz & Nouilles', 'Rijst & Noedels', 'Rice & Noodles', 'Riz sauté aux légumes (végétarien)', 11.00, 11.00, 607),
('608', 'plats', 'Riz & Nouilles', 'Rijst & Noedels', 'Rice & Noodles', 'Riz sauté au canard', 19.50, 19.50, 608),
('611', 'plats', 'Riz & Nouilles', 'Rijst & Noedels', 'Rice & Noodles', 'Nouilles sautées aux 3 délices (boeuf, poulet, scampis)', 16.50, 16.50, 611),
('612', 'plats', 'Riz & Nouilles', 'Rijst & Noedels', 'Rice & Noodles', 'Nouilles sautées à la cantonaise', 14.00, 14.00, 612),
('613', 'plats', 'Riz & Nouilles', 'Rijst & Noedels', 'Rice & Noodles', 'Nouilles sautées au poulet', 13.50, 13.50, 613),
('614', 'plats', 'Riz & Nouilles', 'Rijst & Noedels', 'Rice & Noodles', 'Nouilles sautées aux scampis', 18.00, 18.00, 614),
('615', 'plats', 'Riz & Nouilles', 'Rijst & Noedels', 'Rice & Noodles', 'Nouilles sautées au boeuf', 14.00, 14.00, 615),
('616', 'plats', 'Riz & Nouilles', 'Rijst & Noedels', 'Rice & Noodles', 'Nouilles sautées au porc laqué', 14.00, 14.00, 616),
('617', 'plats', 'Riz & Nouilles', 'Rijst & Noedels', 'Rice & Noodles', 'Nouilles sautées aux légumes (végétarien)', 11.00, 11.00, 617),
('618', 'plats', 'Riz & Nouilles', 'Rijst & Noedels', 'Rice & Noodles', 'Nouilles sautées au canard', 19.50, 19.50, 618),

-- Grillades à la Vietnamienne
('701', 'plats', 'Grillades Vietnamiennes', 'Vietnamees Gegrild', 'Vietnamese Grills', 'Poulet grillé à la citronnelle', 15.50, 15.50, 701),
('702', 'plats', 'Grillades Vietnamiennes', 'Vietnamees Gegrild', 'Vietnamese Grills', 'Brochettes de noix Saint-Jacques', 21.00, 21.00, 702),
('704', 'plats', 'Grillades Vietnamiennes', 'Vietnamees Gegrild', 'Vietnamese Grills', 'Brochettes de boeuf aux feuilles de poivre long', 18.00, 18.00, 704),
('705', 'plats', 'Grillades Vietnamiennes', 'Vietnamees Gegrild', 'Vietnamese Grills', 'Brochettes de scampis grillés à la citronnelle', 19.00, 19.00, 705),
('706', 'plats', 'Grillades Vietnamiennes', 'Vietnamees Gegrild', 'Vietnamese Grills', 'Grillades de porc laqué aux cinq parfums exotiques', 15.00, 15.00, 706),
('707', 'plats', 'Grillades Vietnamiennes', 'Vietnamees Gegrild', 'Vietnamese Grills', 'Gambas géantes grillées au saté', 22.50, 22.50, 707),
('708', 'plats', 'Grillades Vietnamiennes', 'Vietnamees Gegrild', 'Vietnamese Grills', 'Gambas géantes grillées à la citronnelle', 22.50, 22.50, 708),
('709', 'plats', 'Grillades Vietnamiennes', 'Vietnamees Gegrild', 'Vietnamese Grills', 'Plateau de dégustation aux 5 variétés (2 pers.)', 31.50, 31.50, 709),

-- Plats au Chop-Shoy
('801', 'plats', 'Chop-Shoy', 'Chop-Shoy', 'Chop-Shoy', 'Chop-Shoy au boeuf', 14.00, 14.00, 801),
('802', 'plats', 'Chop-Shoy', 'Chop-Shoy', 'Chop-Shoy', 'Chop-Shoy aux scampis', 18.00, 18.00, 802),
('803', 'plats', 'Chop-Shoy', 'Chop-Shoy', 'Chop-Shoy', 'Chop-Shoy Spécial', 15.00, 15.00, 803),
('804', 'plats', 'Chop-Shoy', 'Chop-Shoy', 'Chop-Shoy', 'Chop-Shoy aux légumes (végétarien)', 11.50, 11.50, 804),
('805', 'plats', 'Chop-Shoy', 'Chop-Shoy', 'Chop-Shoy', 'Chop-Shoy au poulet', 13.00, 13.00, 805),
('806', 'plats', 'Chop-Shoy', 'Chop-Shoy', 'Chop-Shoy', 'Choy-Shoy au porc laqué', 14.00, 14.00, 806);
