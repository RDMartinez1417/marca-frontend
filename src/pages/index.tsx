import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import MarcaTable from '../components/MarcaTable';
import type { Marca } from '../types/brand';
import { getMarcas, deleteMarca } from '../services/brandService';

export default function Home() {
    const [items, setItems] = useState<Marca[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 5;
    const [filterNombre, setFilterNombre] = useState('');
    const [filterPais, setFilterPais] = useState('');
    const [filterClaseNiza, setFilterClaseNiza] = useState('');
    const [filterEstado, setFilterEstado] = useState('');
    const [filterCategoria, setFilterCategoria] = useState('');

    const load = async (page: number) => {
        try {
            setLoading(true);
            const skip = (page - 1) * itemsPerPage;
            const response = await getMarcas(skip, itemsPerPage, {
                nombre: filterNombre,
                pais_origen: filterPais,
                clase_niza: filterClaseNiza,
                estado: filterEstado,
                categoria: filterCategoria,
            });
            if (response.status == 200) {
                setItems(response.data.marcas);
                setTotalCount(response.data.total_count);
            } else {
                setItems([])
                setTotalCount(0);
            }
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        setCurrentPage(1);
    }, [filterNombre, filterPais, filterClaseNiza, filterEstado, filterCategoria]);
    useEffect(() => {
        load(currentPage);
    }, [currentPage, filterNombre, filterPais, filterClaseNiza, filterEstado, filterCategoria]);

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
                <div className="filter-panel">
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={filterNombre}
                        onChange={(e) => setFilterNombre(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="País de origen..."
                        value={filterPais}
                        onChange={(e) => setFilterPais(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Clase Niza..."
                        value={filterClaseNiza}
                        onChange={(e) => setFilterClaseNiza(e.target.value)}
                    />
                    <select value={filterEstado} onChange={(e) => setFilterEstado(e.target.value)}>
                        <option value="">Todos los estados</option>
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                        <option value="Pendiente">Pendiente</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Categoría..."
                        value={filterCategoria}
                        onChange={(e) => setFilterCategoria(e.target.value)}
                    />
                </div>
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
