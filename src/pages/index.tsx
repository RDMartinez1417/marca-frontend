// pages/index.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import MarcaTable from '../components/MarcaTable';
import type { Marca } from '../types/brand';
import { getMarcas, deleteMarca } from '../services/brandService';

export default function Home() {
    const [items, setItems] = useState<Marca[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 10;

    const load = async (page: number) => {
        try {
            setLoading(true);
            const skip = (page - 1) * itemsPerPage;
            const response = await getMarcas(skip, itemsPerPage);
            if (response.status == 200) {
                setItems(response.data);
                setTotalCount(response.data.length);
            } else {
                setItems([])
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load(currentPage);
    }, [currentPage]);

    const onDelete = async (id: number) => {
        if (!confirm('¿Eliminar este registro?')) return;
        try {
            await deleteMarca(id);
            await load(currentPage);
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }
    };
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    return (
        <Layout>
            <div className="container">
                {loading ? <p>Cargando…</p> : (
                    <>
                        <MarcaTable
                            items={items}
                            onEdit={(id) => router.push(`/editar/${id}`)}
                            onDelete={onDelete}
                        />
                        <div className="pagination">
                            <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
                            <span>Página {currentPage} de {totalPages} </span>
                            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Siguiente</button>
                        </div>
                    </>

                )}
            </div>
        </Layout>
    );
}
