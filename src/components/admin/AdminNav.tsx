'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './admin.module.scss';

const links = [
  { href: '/admin', label: 'Przegląd', exact: true },
  { href: '/admin/aktualnosci', label: 'Aktualności' },
  { href: '/admin/rekrutacja', label: 'Rekrutacja' },
  { href: '/admin/strona-glowna', label: 'Strona główna' },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      {links.map((link) => {
        const isActive = link.exact
          ? pathname === link.href
          : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
