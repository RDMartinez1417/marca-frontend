import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { Country, Marca } from '../types/brand';
import MarcaFormStep1 from './MarcaFormStep1';
import MarcaFormStep2 from './MarcaFormStep2';
import MarcaFormStep3 from './MarcaFormStep3';
import { createMarca, getCategories, getCountries, updateMarca } from '../services/brandService';
import styles from '../styles/Wizard.module.css';

type Props = {
  mode: 'create' | 'edit';
  initialData?: Marca | null;
  id?: number;
};

export default function MarcaWizard({ mode, initialData, id }: Props) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Marca>(initialData || { nombre: '', titular: '', estado: 'Activo' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const router = useRouter();
  useEffect(() => {
    async function fetchInitialData() {
      try {
        const categoriesResponse = await getCategories();
        setCategories(categoriesResponse.data);

        const countriesResponse = await getCountries();
        setCountries(countriesResponse.data); // Llama al servicio y guarda los datos
      } catch (e) {
        console.error("Error al cargar los datos iniciales:", e);
      }
    }
    fetchInitialData();
  }, []);

  const patch = (patch: Partial<Marca>) => setData((d) => ({ ...d, ...patch }));

  const submit = async () => {
    try {
      setSaving(true);
      setError(null);
      if (mode === 'create') {
        await createMarca(data);
      } else if (mode === 'edit' && id != null) {
        await updateMarca(id, data);
      }
      router.push('/');
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.detail) {
        const errorDetail = e.response.data.detail;
        if (Array.isArray(errorDetail)) {
          const errorMessages = errorDetail.map(err => {
            const field = err.loc[1];
            const message = err.msg;
            return `Campo "${field}": ${message}`;
          });
          setError(errorMessages.join(' | '));
        } else {
          setError(errorDetail);
        }
      } else {
        setError('Error inesperado al guardar la información. Por favor, inténtalo de nuevo.');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container">
      <div className={styles.steps}>
        <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>1</div>
        <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>2</div>
        <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>3</div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {step === 1 && (
        <MarcaFormStep1 value={data} onChange={patch} onNext={() => setStep(2)} countries={countries}/>
      )}
      {step === 2 && (
        <MarcaFormStep2 value={data} onChange={patch} onPrev={() => setStep(1)} onNext={() => setStep(3)} categories={categories}/>
      )}
      {step === 3 && (
        <MarcaFormStep3 value={data} onPrev={() => setStep(2)} onSubmit={submit} submitting={saving} mode={mode} />
      )}
    </div>
  );
}
