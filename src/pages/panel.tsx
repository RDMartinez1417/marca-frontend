import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Panel.module.css';
import { getMarcaCounts } from '../services/brandService';
interface MarcaCounts {
  Activo: number;
  Inactivo: number;
  Pendiente: number;
}

const Panel = () => {
    const [counts, setCounts] = useState<MarcaCounts>({
        Activo: 0,
        Inactivo: 0,
        Pendiente: 0
    });
    const [loading, setLoading] = useState(true);
    const fetchCounts = async () => {
        try {
            setLoading(true);
            const response = await getMarcaCounts(); 
            if (response.status === 200) {
                const data = response.data;
                setCounts(data);
            } else {
                console.error("Error al obtener los conteos:", response.status);
            }
        } catch (error) {
            console.error("Error de red al obtener los conteos:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCounts();
    }, []);
    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.title}>Panel Principal</h1>
                <p className={styles.subtitle}>Resumen rápido de los registros de marca.</p>

                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <h2>{counts.Activo || 0}</h2>
                        <p>Marcas Activas</p>
                    </div>
                    <div className={styles.statCard}>
                        <h2>{counts.Pendiente || 0}</h2>
                        <p>Marcas Pendientes</p>
                    </div>
                    <div className={styles.statCard}>
                        <h2>{counts.Inactivo || 0}</h2>
                        <p>Marcas Inactivas</p>
                    </div>
                </div>

            </div>
        </Layout>
    );
};

export default Panel;