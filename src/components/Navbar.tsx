import Link from 'next/link';
import styles from '../styles/Navbar.module.css'; // Asegúrate de crear este archivo

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar__logo}>SIGNA / Registro de Marca</div>
            <div className={styles.navbar__actions}>
                {/* Usar el componente Link de Next.js para la navegación */}
                <Link href="/dashboard" className={styles.navbar__link}>
                    Dashboard
                </Link>
                <Link href="/records/create">
                    <button className={styles.navbar__newRecord}>
                        Nuevo registro
                    </button>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;