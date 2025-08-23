// components/MarcaWizard.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import type { Marca } from '../types/brand';
import MarcaFormStep1 from './MarcaFormStep1';
import MarcaFormStep2 from './MarcaFormStep2';
import MarcaFormStep3 from './MarcaFormStep3';
import { createMarca, updateMarca } from '../services/brandService';
import styles from '../styles/Wizard.module.css';

type Props = {
  mode: 'create' | 'edit';
  initialData?: Marca | null;
  id?: number;
};

export default function MarcaWizard({ mode, initialData, id }: Props) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Marca>(initialData || { nombre: '', titular: '', estado: 'Pendiente' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
      setError(e?.message || 'Error al guardar');
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
        <MarcaFormStep1 value={data} onChange={patch} onNext={() => setStep(2)} />
      )}
      {step === 2 && (
        <MarcaFormStep2 value={data} onChange={patch} onPrev={() => setStep(1)} onNext={() => setStep(3)} />
      )}
      {step === 3 && (
        <MarcaFormStep3 value={data} onPrev={() => setStep(2)} onSubmit={submit} submitting={saving} mode={mode} />
      )}
    </div>
  );
}
