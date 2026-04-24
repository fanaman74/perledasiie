type FooterDict = {
  nav: {
    home: string;
    menus: string;
    photos: string;
    contact: string;
    allergenes: string;
  };
  findUs: {
    address: string;
    phone: string;
  };
  footer: {
    copyright: string;
  };
};

const navLinks = [
  { key: 'home'      as const, href: '#accueil'    },
  { key: 'menus'     as const, href: '#menus'      },
  { key: 'photos'    as const, href: '/photos'     },
  { key: 'contact'   as const, href: '#contact'    },
  { key: 'allergenes'as const, href: '/allergenes' },
];

export default function Footer({ dict }: { dict: FooterDict }) {
  return (
    <footer className="border-t border-border py-16 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-8 text-center">
        {/* Wordmark */}
        <a href="#accueil" className="font-display uppercase tracking-[0.12em] text-xl text-text no-underline">
          PERLE D&apos;ASIE
        </a>

        {/* Nav links */}
        <nav className="flex flex-wrap justify-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm text-text-muted hover:text-accent transition-colors uppercase tracking-wider"
            >
              {dict.nav[link.key]}
            </a>
          ))}
        </nav>

        {/* Address + phone */}
        <div className="text-text-muted text-sm space-y-1">
          <p>{dict.findUs.address}</p>
          <a href={`tel:${dict.findUs.phone.replace(/\s/g, '')}`} className="hover:text-accent transition-colors">
            {dict.findUs.phone}
          </a>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-4">
          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C16.67.014 16.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent transition-colors"
            aria-label="Facebook"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-text-muted text-xs">
          {dict.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
