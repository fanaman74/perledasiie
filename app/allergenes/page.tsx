import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Allergènes — Perle d'Asie",
  description: "Information sur les allergènes conformément à la réglementation AFSCA.",
};

const allergens = [
  { code: '1', name: 'Gluten', detail: 'Blé, seigle, orge, avoine et leurs produits dérivés' },
  { code: '2', name: 'Crustacés', detail: 'Crevettes, homard, crabe, langoustines' },
  { code: '3', name: 'Œufs', detail: "Œufs et produits à base d'œufs" },
  { code: '4', name: 'Poissons', detail: 'Poissons et produits à base de poissons' },
  { code: '5', name: 'Arachides', detail: "Cacahuètes et produits à base d'arachides" },
  { code: '6', name: 'Soja', detail: 'Soja et produits à base de soja' },
  { code: '7', name: 'Lait', detail: 'Lait et produits laitiers (y compris lactose)' },
  { code: '8', name: 'Fruits à coque', detail: 'Noix, noisettes, amandes, pistaches, noix de cajou' },
  { code: '9', name: 'Céleri', detail: 'Céleri et produits à base de céleri' },
  { code: '10', name: 'Moutarde', detail: 'Moutarde et produits à base de moutarde' },
  { code: '11', name: 'Graines de sésame', detail: 'Graines de sésame et produits à base de graines de sésame' },
  { code: '12', name: 'Dioxyde de soufre et sulfites', detail: 'En concentrations de plus de 10 mg/kg ou 10 mg/litre' },
  { code: '13', name: 'Lupin', detail: 'Lupin et produits à base de lupin' },
  { code: '14', name: 'Mollusques', detail: 'Moules, huîtres, escargots, calmars et leurs dérivés' },
];

export default function AllergenesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[72px]">
        <section className="py-24 px-6">
          <div className="max-w-[800px] mx-auto">
            <h1 className="font-display text-3xl md:text-4xl mb-4 text-center">
              Informations Allergènes
            </h1>
            <p className="text-text-muted text-center mb-2">
              Conformément au règlement (UE) n°1169/2011 et à la réglementation AFSCA belge.
            </p>
            <p className="text-text-muted text-center text-sm mb-12">
              Pour toute information sur les allergènes présents dans nos plats, veuillez nous contacter directement au{' '}
              <a href="tel:024788880" className="text-accent hover:underline">02 478 88 80</a>.
            </p>

            <div className="space-y-3">
              {allergens.map(a => (
                <div key={a.code} className="flex gap-4 p-4 border border-border hover:border-accent/30 transition-colors">
                  <span className="font-display text-accent text-lg w-8 shrink-0">{a.code}</span>
                  <div>
                    <p className="font-medium">{a.name}</p>
                    <p className="text-text-muted text-sm">{a.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-text-muted text-xs text-center mt-12">
              Perle d&apos;Asie — Avenue de l&apos;Exposition 266, 1090 Jette, Bruxelles<br />
              SPRL Golden Peony — TVA: BE0694 792 984
            </p>
          </div>
        </section>
      </main>
      <Footer dict={{
        nav: { home: 'Accueil', menus: 'Menus', entrees: 'Entrées', plats: 'Plats', photos: 'Photos', contact: 'Contact', allergenes: 'Allergènes' },
        findUs: { address: "Avenue de l'Exposition 266, 1090 Jette", phone: '02 478 88 80' },
        footer: { copyright: `© ${new Date().getFullYear()} Perle d'Asie. Tous droits réservés.` },
      }} />
    </>
  );
}
