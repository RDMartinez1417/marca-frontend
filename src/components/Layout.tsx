// components/Layout.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Layout.module.css';
import { ReactNode, useState } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ⬅️ Estado para controlar el sidebar

  const getPageTitle = (pathname: string): string => {
    switch (pathname) {
      case '/':
        return 'Registro de Marca';
      case '/panel':
        return 'Panel';
      case '/crear':
        return 'Crear Marca';
      // Puedes añadir más casos según las rutas que tengas
      case '/editar/[id]':
        return 'Editar Marca';
      default:
        return 'Registro de Marca'; // Título por defecto
    }
  };

  const pageTitle = getPageTitle(router.pathname);
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <button className={styles.toggleButton} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            ☰
          </button>
          <span className={styles.logo}>SIGNA</span>
          <span className={styles.sep}>/</span>
          <span>{pageTitle}</span> 
        </div>
        {/*  <nav className={styles.nav}>
          <Link href="/">Dashboard</Link>
          <Link href="/crear" className={styles.primaryBtn}>Nuevo registro</Link>
        </nav> */}
      </header>
      <div className={`${styles.mainContentWrapper} ${isSidebarOpen ? '' : styles.mainContentWrapperFull}`}>
        <aside className={`${styles.sidebar} ${isSidebarOpen ? '' : styles.sidebarHidden}`}>
          <div className={styles.sidebarSection}>
            <h4 className={styles.sidebarTitle}>Dashboard</h4>
            <ul className={styles.sidebarMenu}>
              <li>
                <Link href="/panel" className={styles.sidebarLink}>
                  Panel
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.sidebarSection}>
            <h4 className={styles.sidebarTitle}>Servicios</h4>
            <ul className={styles.sidebarMenu}>
              <li>
                <Link href="/" className={styles.sidebarLink}>
                  Registro de Marca
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        <main className={styles.main}>{children}</main>
      </div>
      <footer className={styles.footer}>© {new Date().getFullYear()} SIGNA</footer>
    </div>
  );
}
