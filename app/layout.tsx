import type { Metadata } from 'next';
import { Cinzel, Jost, Chango } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { OrderProvider } from '@/components/OrderProvider';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';

const cinzel = Cinzel({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
});

const chango = Chango({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-chango',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Perle d'Asie — Spécialités Cuisines Asiatiques | Laeken, Bruxelles",
  description: "Restaurant Perle d'Asie — Spécialités Cuisines Asiatiques depuis 1997. Avenue de l'Exposition 266, 1090 Laeken, Bruxelles.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${cinzel.variable} ${jost.variable} ${chango.variable}`}>
      <body className="font-body bg-bg text-text">
        <LanguageProvider>
          <ThemeProvider>
            <OrderProvider>
              {children}
            </OrderProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
