import type { Metadata } from 'next';
import { Chango, Jost, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { OrderProvider } from '@/components/OrderProvider';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';

const chango = Chango({ weight: '400', subsets: ['latin'], variable: '--font-chango', display: 'swap' });
const jost = Jost({ subsets: ['latin'], variable: '--font-jost', display: 'swap' });
const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lotus — Restaurant Vietnamien & Thaïlandais | Laeken, Bruxelles',
  description: 'Traiteur-Restaurant Lotus — La cuisine Vietnamienne & Thaïlandaise de Laeken, Bruxelles.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${chango.variable} ${jost.variable} ${cormorant.variable}`}>
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
