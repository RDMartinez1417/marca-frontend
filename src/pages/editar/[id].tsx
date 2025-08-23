// pages/editar/[id].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import MarcaWizard from '../../components/MarcaWizard';
import { getMarca } from '../../services/brandService';
import type { Marca } from '../../types/brand';

export default function Editar() {
  const router = useRouter();
  const id = Number(router.query.id);
  const [data, setData] = useState<Marca | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady || Number.isNaN(id)) return;
    (async () => {
      try {
        setLoading(true);
        const response = await getMarca(id);
        if (response.status === 200) {
          setData(response.data);
        } else {
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [router.isReady, id]);

  return (
    <Layout>
      {loading ? <div className="container"><p>Cargando…</p></div> : (
        <MarcaWizard mode="edit" id={id} initialData={data} />
      )}
    </Layout>
  );
}
