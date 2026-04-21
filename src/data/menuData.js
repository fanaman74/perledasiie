export const menuSections = [
  {
    id: 'thai',
    name: 'Specialites Thailandaises',
    categories: [
      {
        id: 'thai_potages',
        name: 'Potages',
        items: [
          { id: 'th01', num: '01', name: 'Tom yam kai', nameKey: 'menu.dish.th01.name', desc: 'Poulet a la citronnelle', descKey: 'menu.dish.th01.desc', priceRestaurant: 6.50, priceTraiteur: 5.50 },
          { id: 'th02', num: '02', name: 'Tom ka kai', nameKey: 'menu.dish.th02.name', desc: 'Poulet, lait de coco', descKey: 'menu.dish.th02.desc', priceRestaurant: 7.00, priceTraiteur: 5.50 },
          { id: 'th03', num: '03', name: 'Tom yam khung', nameKey: 'menu.dish.th03.name', desc: 'Scampis a la citronnelle', descKey: 'menu.dish.th03.desc', priceRestaurant: 6.50, priceTraiteur: 6.00 },
        ]
      },
      {
        id: 'thai_entrees',
        name: 'Entrees',
        items: [
          { id: 'th04', num: '04', name: 'Satay poulet', nameKey: 'menu.dish.th04.name', desc: 'Brochettes de poulet', descKey: 'menu.dish.th04.desc', priceRestaurant: 7.00, priceTraiteur: 6.50 },
          { id: 'th4a', num: '4a', name: 'Croquettes Thai', nameKey: 'menu.dish.th4a.name', desc: 'Croquettes croustillantes aux épices thaï', descKey: 'menu.dish.th4a.desc', priceRestaurant: 6.50, priceTraiteur: 6.00 },
          { id: 'th05', num: '05', name: 'Pai kai tod', nameKey: 'menu.dish.th05.name', desc: 'Ailes de poulet farcies', descKey: 'menu.dish.th05.desc', priceRestaurant: 7.50, priceTraiteur: null },
          { id: 'th06', num: '06', name: 'Scampis a la Coriandre', nameKey: 'menu.dish.th06.name', desc: 'Scampis sautés à la coriandre fraîche', descKey: 'menu.dish.th06.desc', priceRestaurant: 10.00, priceTraiteur: 9.50 },
          { id: 'th07', num: '07', name: 'Raviolis de scampis', nameKey: 'menu.dish.th07.name', desc: 'Raviolis vapeur aux scampis et viande', descKey: 'menu.dish.th07.desc', priceRestaurant: 7.50, priceTraiteur: 7.00 },
          { id: 'th08', num: '08', name: 'Salade de poulet', nameKey: 'menu.dish.th08.name', desc: 'Aux herbes fraiches', descKey: 'menu.dish.th08.desc', priceRestaurant: 8.00, priceTraiteur: 7.50 },
          { id: 'th09', num: '09', name: 'Salade de boeuf', nameKey: 'menu.dish.th09.name', desc: 'Legerement grille au citron', descKey: 'menu.dish.th09.desc', priceRestaurant: 10.00, priceTraiteur: 9.50 },
          { id: 'th10', num: '10', name: 'Salade de scampis', nameKey: 'menu.dish.th10.name', desc: 'Scampis frais, salade croquante, vinaigrette thaï', descKey: 'menu.dish.th10.desc', priceRestaurant: 10.00, priceTraiteur: null },
          { id: 'th11', num: '11', name: 'Homok', nameKey: 'menu.dish.th11.name', desc: 'Souffles de poulet, coco, curry', descKey: 'menu.dish.th11.desc', priceRestaurant: 7.50, priceTraiteur: null },
        ]
      },
      {
        id: 'thai_volailles',
        name: 'Volailles',
        items: [
          { id: 'th12', num: '12', name: 'Poulet grille', nameKey: 'menu.dish.th12.name', desc: 'A la citronnelle ou sauce Tom Yam', descKey: 'menu.dish.th12.desc', priceRestaurant: 13.50, priceTraiteur: 12.50 },
          { id: 'th13', num: '13', name: 'Poulet saute au basilic', nameKey: 'menu.dish.th13.name', desc: 'Avec legumes', descKey: 'menu.dish.th13.desc', priceRestaurant: 13.50, priceTraiteur: 12.50 },
          { id: 'th14', num: '14', name: 'Curry rouge au poulet', nameKey: 'menu.dish.th14.name', desc: 'Cassolette au coco', descKey: 'menu.dish.th14.desc', priceRestaurant: 13.50, priceTraiteur: 12.50 },
          { id: 'th15', num: '15', name: 'Canard au curry rouge', nameKey: 'menu.dish.th15.name', desc: 'Cassolette', descKey: 'menu.dish.th15.desc', priceRestaurant: 19.00, priceTraiteur: null },
          { id: 'th16', num: '16', name: 'Canard laque', nameKey: 'menu.dish.th16.name', desc: 'Avec crepes et poireaux', descKey: 'menu.dish.th16.desc', priceRestaurant: 19.00, priceTraiteur: null },
        ]
      },
      {
        id: 'thai_viandes',
        name: 'Porc & Boeuf',
        items: [
          { id: 'th17', num: '17', name: 'Porc caramelise', nameKey: 'menu.dish.th17.name', desc: 'Piquant', descKey: 'menu.dish.th17.desc', priceRestaurant: 14.00, priceTraiteur: 13.50 },
          { id: 'th18', num: '18', name: 'Boeuf piquant au basilic', nameKey: 'menu.dish.th18.name', desc: 'Bœuf sauté au basilic thaï et piment', descKey: 'menu.dish.th18.desc', priceRestaurant: 16.00, priceTraiteur: 14.50 },
          { id: 'th19', num: '19', name: 'Boeuf au curry rouge', nameKey: 'menu.dish.th19.name', desc: 'Lait de coco et cacahuetes', descKey: 'menu.dish.th19.desc', priceRestaurant: 16.00, priceTraiteur: 14.50 },
          { id: 'th20', num: '20', name: 'Boeuf au curry vert', nameKey: 'menu.dish.th20.name', desc: 'Aubergines thai', descKey: 'menu.dish.th20.desc', priceRestaurant: 16.00, priceTraiteur: 14.50 },
        ]
      },
      {
        id: 'thai_poissons',
        name: 'Poissons & Crustaces',
        items: [
          { id: 'th21', num: '21', name: 'Scampis grilles', nameKey: 'menu.dish.th21.name', desc: 'Au lait de coco', descKey: 'menu.dish.th21.desc', priceRestaurant: 16.00, priceTraiteur: 14.50 },
          { id: 'th22', num: '22', name: 'Teppan de scampis', nameKey: 'menu.dish.th22.name', desc: 'Legumes, piquant', descKey: 'menu.dish.th22.desc', priceRestaurant: 16.00, priceTraiteur: 14.50 },
          { id: 'th23', num: '23', name: 'Croustillons de poisson', nameKey: 'menu.dish.th23.name', desc: 'Sauce coriandre ou aigre-douce', descKey: 'menu.dish.th23.desc', priceRestaurant: 14.00, priceTraiteur: 13.50 },
          { id: 'th24', num: '24', name: 'Teppan de fruits de mer', nameKey: 'menu.dish.th24.name', desc: 'St-Jacques, scampis, calamars, poisson', descKey: 'menu.dish.th24.desc', priceRestaurant: 19.00, priceTraiteur: null },
          { id: 'th25', num: '25', name: 'Cassolette fruits de mer au curry', nameKey: 'menu.dish.th25.name', desc: 'St-Jacques, scampis, calamars, poisson', descKey: 'menu.dish.th25.desc', priceRestaurant: 19.00, priceTraiteur: null },
          { id: 'th26', num: '26', name: 'Gambas grillees', nameKey: 'menu.dish.th26.name', desc: 'A la citronnelle', descKey: 'menu.dish.th26.desc', priceRestaurant: 17.00, priceTraiteur: 15.50 },
          { id: 'th27', num: '27', name: 'Homok de saumon', nameKey: 'menu.dish.th27.name', desc: 'En feuille de bananier', descKey: 'menu.dish.th27.desc', priceRestaurant: 17.00, priceTraiteur: 15.50 },
        ]
      },
      {
        id: 'thai_riz',
        name: 'Riz',
        items: [
          { id: 'th29', num: '29', name: 'Riz saute aux legumes', nameKey: 'menu.dish.th29.name', desc: 'Vegetarien', descKey: 'menu.dish.th29.desc', priceRestaurant: 8.00, priceTraiteur: 8.00 },
          { id: 'th30', num: '30', name: 'Riz saute au poulet', nameKey: 'menu.dish.th30.name', desc: 'Riz parfumé sauté au wok avec poulet', descKey: 'menu.dish.th30.desc', priceRestaurant: 10.00, priceTraiteur: 10.50 },
          { id: 'th31', num: '31', name: 'Riz saute Special Mix', nameKey: 'menu.dish.th31.name', desc: 'Poulet, scampis, porc et légumes', descKey: 'menu.dish.th31.desc', priceRestaurant: 13.00, priceTraiteur: 13.00 },
          { id: 'th32', num: '32', name: 'Riz saute aux scampis', nameKey: 'menu.dish.th32.name', desc: 'Riz parfumé sauté au wok avec scampis', descKey: 'menu.dish.th32.desc', priceRestaurant: 14.00, priceTraiteur: 14.50 },
          { id: 'th33', num: '33', name: 'Vermicelles de riz aux nems', nameKey: 'menu.dish.th33.name', desc: 'Vermicelles garnis de nems croustillants', descKey: 'menu.dish.th33.desc', priceRestaurant: 10.00, priceTraiteur: null },
          { id: 'th34', num: '34', name: 'Vermicelles de riz au boeuf', nameKey: 'menu.dish.th34.name', desc: 'Saute a la citronnelle', descKey: 'menu.dish.th34.desc', priceRestaurant: 13.00, priceTraiteur: null },
        ]
      },
    ]
  },
  {
    id: 'viet',
    name: 'Specialites Vietnamiennes',
    categories: [
      {
        id: 'viet_potages',
        name: 'Potages',
        items: [
          { id: 'vn01', num: '01', name: 'Potage Saigon', nameKey: 'menu.dish.vn01.name', desc: 'Scampis, viande, vermicelles', descKey: 'menu.dish.vn01.desc', priceRestaurant: 6.50, priceTraiteur: 6.50 },
          { id: 'vn02', num: '02', name: 'Potage au poivre oriental', nameKey: 'menu.dish.vn02.name', desc: 'Bouillon relevé aux épices orientales', descKey: 'menu.dish.vn02.desc', priceRestaurant: 6.00, priceTraiteur: 5.50 },
          { id: 'vn2a', num: '2a', name: 'Potage aux legumes frais', nameKey: 'menu.dish.vn2a.name', desc: 'Légumes de saison en bouillon parfumé', descKey: 'menu.dish.vn2a.desc', priceRestaurant: 6.00, priceTraiteur: 5.50 },
          { id: 'vn03', num: '03', name: 'Potage raviolis Wan Tan', nameKey: 'menu.dish.vn03.name', desc: 'Langoustines et viande', descKey: 'menu.dish.vn03.desc', priceRestaurant: 6.50, priceTraiteur: 6.00 },
          { id: 'vn04', num: '04', name: 'Potage asperges crabe', nameKey: 'menu.dish.vn04.name', desc: 'Chair de crabe', descKey: 'menu.dish.vn04.desc', priceRestaurant: 7.00, priceTraiteur: null },
        ]
      },
      {
        id: 'viet_entrees',
        name: 'Entrees',
        items: [
          { id: 'vn05', num: '05', name: 'Nems', nameKey: 'menu.dish.vn05.name', desc: 'Rouleaux chauds aux langoustines, viandes', descKey: 'menu.dish.vn05.desc', priceRestaurant: 7.00, priceTraiteur: 6.50 },
          { id: 'vn06', num: '06', name: 'Rouleaux de printemps', nameKey: 'menu.dish.vn06.name', desc: 'Scampis et viande, froids', descKey: 'menu.dish.vn06.desc', priceRestaurant: 7.00, priceTraiteur: 7.00 },
          { id: 'vn07', num: '07', name: 'Loempia au poulet', nameKey: 'menu.dish.vn07.name', desc: 'Sauce aigre-douce', descKey: 'menu.dish.vn07.desc', priceRestaurant: 6.00, priceTraiteur: 5.50 },
          { id: 'vn08', num: '08', name: 'Eventail de scampis croquants', nameKey: 'menu.dish.vn08.name', desc: 'Scampis panés en éventail, dorés et croustillants', descKey: 'menu.dish.vn08.desc', priceRestaurant: 9.00, priceTraiteur: 8.00 },
          { id: 'vn09', num: '09', name: 'Assiette maison', nameKey: 'menu.dish.vn09.name', desc: 'Min. 2 couverts — brochettes, nems, raviolis, beignets, salade', descKey: 'menu.dish.vn09.desc', priceRestaurant: 13.00, priceTraiteur: 11.50 },
        ]
      },
      {
        id: 'viet_dimsum',
        name: 'Dim Sum (a la vapeur)',
        items: [
          { id: 'vn10', num: '10', name: 'Bouchees de porc ou poulet', nameKey: 'menu.dish.vn10.name', desc: 'Raviolis vapeur farcis', descKey: 'menu.dish.vn10.desc', priceRestaurant: 6.00, priceTraiteur: 5.50 },
          { id: 'vn11', num: '11', name: 'Bouchees de langoustines', nameKey: 'menu.dish.vn11.name', desc: 'Ou coquilles St-Jacques', descKey: 'menu.dish.vn11.desc', priceRestaurant: 6.50, priceTraiteur: 6.00 },
          { id: 'vn12', num: '12', name: 'Assortiment de Dim Sum', nameKey: 'menu.dish.vn12.name', desc: 'Sélection variée de bouchées vapeur', descKey: 'menu.dish.vn12.desc', priceRestaurant: 10.00, priceTraiteur: 9.50 },
        ]
      },
      {
        id: 'viet_volailles',
        name: 'Volailles',
        items: [
          { id: 'vn13', num: '13', name: 'Poulet aux ananas frais', nameKey: 'menu.dish.vn13.name', desc: 'Poulet sauté aux morceaux d\'ananas frais', descKey: 'menu.dish.vn13.desc', priceRestaurant: 13.50, priceTraiteur: 12.50 },
          { id: 'vn14', num: '14', name: 'Poulet imperial piquant', nameKey: 'menu.dish.vn14.name', desc: 'Poulet croustillant, sauce impériale pimentée', descKey: 'menu.dish.vn14.desc', priceRestaurant: 13.50, priceTraiteur: 12.50 },
          { id: 'vn15', num: '15', name: 'Poulet aux 3 champignons', nameKey: 'menu.dish.vn15.name', desc: 'Shiitake, pleurotes et champignons noirs', descKey: 'menu.dish.vn15.desc', priceRestaurant: 13.50, priceTraiteur: 12.50 },
          { id: 'vn16', num: '16', name: "Canard a l'orange", nameKey: 'menu.dish.vn16.name', desc: 'Canard rôti, sauce à l\'orange maison', descKey: 'menu.dish.vn16.desc', priceRestaurant: 19.00, priceTraiteur: null },
          { id: 'vn17', num: '17', name: 'Canard fondant', nameKey: 'menu.dish.vn17.name', desc: 'Specialite maison — min. 2 couverts', descKey: 'menu.dish.vn17.desc', priceRestaurant: 20.00, priceTraiteur: null },
        ]
      },
      {
        id: 'viet_viandes',
        name: 'Porc & Boeuf',
        items: [
          { id: 'vn18', num: '18', name: 'Porc sauce aigre-douce', nameKey: 'menu.dish.vn18.name', desc: 'Porc pané, sauce aigre-douce aux légumes', descKey: 'menu.dish.vn18.desc', priceRestaurant: 14.00, priceTraiteur: 13.50 },
          { id: 'vn19', num: '19', name: 'Porc laque au miel', nameKey: 'menu.dish.vn19.name', desc: 'Porc caramélisé au miel et sésame', descKey: 'menu.dish.vn19.desc', priceRestaurant: 14.00, priceTraiteur: 13.50 },
          { id: 'vn20', num: '20', name: 'Boeuf grille facon du Chef', nameKey: 'menu.dish.vn20.name', desc: 'Aux vermicelles', descKey: 'menu.dish.vn20.desc', priceRestaurant: 17.00, priceTraiteur: 15.50 },
          { id: 'vn21', num: '21', name: 'Boeuf satay piquant', nameKey: 'menu.dish.vn21.name', desc: 'Bœuf sauté sauce satay épicée aux cacahuètes', descKey: 'menu.dish.vn21.desc', priceRestaurant: 16.00, priceTraiteur: 14.50 },
          { id: 'vn22', num: '22', name: 'Les Huit Delices', nameKey: 'menu.dish.vn22.name', desc: 'Porc, poulet, scampis, calamars, legumes', descKey: 'menu.dish.vn22.desc', priceRestaurant: 16.00, priceTraiteur: 15.50 },
        ]
      },
      {
        id: 'viet_poissons',
        name: 'Poissons & Crustaces',
        items: [
          { id: 'vn23', num: '23', name: 'Calamars croquants', nameKey: 'menu.dish.vn23.name', desc: 'Calamars frits, dorés et croustillants', descKey: 'menu.dish.vn23.desc', priceRestaurant: 14.00, priceTraiteur: null },
          { id: 'vn24', num: '24', name: 'Beignets de scampis', nameKey: 'menu.dish.vn24.name', desc: "A l'aigre-doux", descKey: 'menu.dish.vn24.desc', priceRestaurant: 15.00, priceTraiteur: 14.50 },
          { id: 'vn25', num: '25', name: 'Marmite du Pecheur', nameKey: 'menu.dish.vn25.name', desc: 'St-Jacques, scampis, calamars, poisson', descKey: 'menu.dish.vn25.desc', priceRestaurant: 19.00, priceTraiteur: null },
          { id: 'vn26', num: '26', name: 'Saumon frais', nameKey: 'menu.dish.vn26.name', desc: 'Au gingembre et limon', descKey: 'menu.dish.vn26.desc', priceRestaurant: 17.00, priceTraiteur: 15.50 },
          { id: 'vn27', num: '27', name: "Cuisses de grenouilles a l'ail", nameKey: 'menu.dish.vn27.name', desc: 'Sautées au beurre d\'ail et persil', descKey: 'menu.dish.vn27.desc', priceRestaurant: 17.00, priceTraiteur: null },
          { id: 'vn28', num: '28', name: 'Cuisses de grenouilles', nameKey: 'menu.dish.vn28.name', desc: 'A la citronnelle', descKey: 'menu.dish.vn28.desc', priceRestaurant: 17.00, priceTraiteur: null },
        ]
      },
      {
        id: 'viet_riz',
        name: 'Riz',
        items: [
          { id: 'vn29', num: '29', name: 'Riz saute aux legumes', nameKey: 'menu.dish.vn29.name', desc: 'Vegetarien', descKey: 'menu.dish.vn29.desc', priceRestaurant: 9.00, priceTraiteur: 8.00 },
          { id: 'vn30', num: '30', name: 'Riz saute au poulet', nameKey: 'menu.dish.vn30.name', desc: 'Riz parfumé sauté au wok avec poulet', descKey: 'menu.dish.vn30.desc', priceRestaurant: 11.00, priceTraiteur: 10.50 },
          { id: 'vn31', num: '31', name: 'Riz saute Special Mix', nameKey: 'menu.dish.vn31.name', desc: 'Poulet, scampis, porc et légumes', descKey: 'menu.dish.vn31.desc', priceRestaurant: 14.00, priceTraiteur: 13.00 },
          { id: 'vn32', num: '32', name: 'Riz saute aux scampis', nameKey: 'menu.dish.vn32.name', desc: 'Riz parfumé sauté au wok avec scampis', descKey: 'menu.dish.vn32.desc', priceRestaurant: 15.00, priceTraiteur: 14.50 },
          { id: 'vn33', num: '33', name: 'Vermicelles de riz aux nems', nameKey: 'menu.dish.vn33.name', desc: 'Vermicelles garnis de nems croustillants', descKey: 'menu.dish.vn33.desc', priceRestaurant: 11.00, priceTraiteur: null },
          { id: 'vn34', num: '34', name: 'Vermicelles de riz au boeuf', nameKey: 'menu.dish.vn34.name', desc: 'Saute a la citronnelle', descKey: 'menu.dish.vn34.desc', priceRestaurant: 14.00, priceTraiteur: null },
        ]
      },
      {
        id: 'viet_nouilles',
        name: 'Nouilles',
        items: [
          { id: 'vn35', num: '35', name: 'Nouilles sautees legumes', nameKey: 'menu.dish.vn35.name', desc: 'Vegetarien', descKey: 'menu.dish.vn35.desc', priceRestaurant: 10.00, priceTraiteur: 9.50 },
          { id: 'vn36', num: '36', name: 'Nouilles sautees poulet', nameKey: 'menu.dish.vn36.name', desc: 'Nouilles de blé sautées au wok avec poulet', descKey: 'menu.dish.vn36.desc', priceRestaurant: 11.00, priceTraiteur: 10.50 },
          { id: 'vn37', num: '37', name: 'Nouilles sautees porc laque', nameKey: 'menu.dish.vn37.name', desc: 'Nouilles sautées au porc laqué caramélisé', descKey: 'menu.dish.vn37.desc', priceRestaurant: 13.00, priceTraiteur: 12.50 },
          { id: 'vn38', num: '38', name: 'Nouilles Facon du Chef', nameKey: 'menu.dish.vn38.name', desc: 'Recette signature du Chef, garniture variée', descKey: 'menu.dish.vn38.desc', priceRestaurant: 14.00, priceTraiteur: 13.50 },
          { id: 'vn39', num: '39', name: 'Nouilles sautees scampis', nameKey: 'menu.dish.vn39.name', desc: 'Nouilles de blé sautées au wok avec scampis', descKey: 'menu.dish.vn39.desc', priceRestaurant: 15.00, priceTraiteur: 14.50 },
          { id: 'vn40', num: '40', name: 'Grande soupe Pho au boeuf', nameKey: 'menu.dish.vn40.name', desc: 'Tonkinoise', descKey: 'menu.dish.vn40.desc', priceRestaurant: 13.00, priceTraiteur: null },
          { id: 'vn41', num: '41', name: 'Grande soupe Saigon', nameKey: 'menu.dish.vn41.name', desc: 'Bouillon parfumé, scampis, viande, nouilles', descKey: 'menu.dish.vn41.desc', priceRestaurant: 13.00, priceTraiteur: null },
        ]
      },
      {
        id: 'viet_vegetariens',
        name: 'Vegetariens',
        items: [
          { id: 'vn42', num: '42', name: 'Legumes frais sautes', nameKey: 'menu.dish.vn42.name', desc: 'Légumes de saison sautés au wok', descKey: 'menu.dish.vn42.desc', priceRestaurant: 11.00, priceTraiteur: 10.50 },
          { id: 'vn43', num: '43', name: "L'Assiette du Bonze", nameKey: 'menu.dish.vn43.name', desc: 'Assortiment de legumes et tofu', descKey: 'menu.dish.vn43.desc', priceRestaurant: 13.00, priceTraiteur: 12.50 },
          { id: 'vn44', num: '44', name: 'Tofu risole', nameKey: 'menu.dish.vn44.name', desc: 'A la citronnelle', descKey: 'menu.dish.vn44.desc', priceRestaurant: 13.00, priceTraiteur: 12.50 },
          { id: 'vn45', num: '45', name: 'Cassolette de legumes au curry', nameKey: 'menu.dish.vn45.name', desc: 'Légumes mijotés au curry et lait de coco', descKey: 'menu.dish.vn45.desc', priceRestaurant: 13.00, priceTraiteur: 12.50 },
        ]
      },
    ]
  }
];

// Keep a flat list for the ordering system — only items with traiteur prices (takeaway-available)
export const orderableItems = menuSections.flatMap(section =>
  section.categories.flatMap(cat =>
    cat.items.filter(item => item.priceTraiteur !== null).map(item => ({
      id: item.id,
      name: item.name,
      nameKey: item.nameKey,
      desc: item.desc,
      descKey: item.descKey,
      price: item.priceTraiteur,
      category: cat.name,
      section: section.name,
    }))
  )
);

// Featured dishes for the FeaturedDishes section
export const featuredDishes = [
  { id: 'th03', name: 'Tom Yam Khung', nameKey: 'menu.dish.th03.name', desc: 'Scampis a la citronnelle', descKey: 'menu.dish.th03.desc', price: 6.50, image: 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'th04', name: 'Satay Poulet', nameKey: 'menu.dish.th04.name', desc: 'Brochettes de poulet grillées', descKey: 'menu.dish.th04.desc', price: 7.00, image: 'https://images.pexels.com/photos/19792082/pexels-photo-19792082.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'vn40', name: 'Pho Bo', nameKey: 'menu.dish.vn40.name', desc: 'Grande soupe tonkinoise au boeuf', descKey: 'menu.dish.vn40.desc', price: 13.00, image: 'https://images.pexels.com/photos/2133989/pexels-photo-2133989.jpeg?auto=compress&cs=tinysrgb&w=600' },
];
