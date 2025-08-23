// components/MarcaFormStep2.tsx
import styles from '../styles/Wizard.module.css';
import type { Marca } from '../types/brand';

type Props = {
    value: Marca;
    onChange: (patch: Partial<Marca>) => void;
    onPrev: () => void;
    onNext: () => void;
};

export default function MarcaFormStep2({ value, onChange, onPrev, onNext }: Props) {
    const canNext = true

    return (
        <div className="card">
            <div className={styles.section}>
                <h3>2. Información de registro</h3>
                <div className={styles.grid}>
                    <div className={styles.field}>
                        <label>Numero de registro</label>
                        <input
                            placeholder="Ej. 123456"
                            value={value.numero_registro || ''}
                            onChange={(e) => onChange({ numero_registro: e.target.value })}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Fecha de registro</label>
                        <input
                            type="date"
                            value={value.fecha_registro ? value.fecha_registro.split('T')[0] : ''}
                            onChange={(e) => onChange({ fecha_registro: e.target.value })}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Categoria</label>
                        <input
                            value={value.categoria || ''}
                            onChange={(e) => onChange({ categoria: e.target.value })}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Clase Niza</label>
                        <input
                            type='number'
                            value={value.clase_niza || ''}
                            onChange={(e) => {
                                const val = parseInt(e.target.value, 10);
                                onChange({ clase_niza: isNaN(val) ? undefined : val });
                            }}
                        />
                    </div>
                </div>
                <div className={styles.actions}>
                    <button className={styles.ghost} onClick={onPrev}>← Atrás</button>
                    <button disabled={!canNext} className={styles.primary} onClick={onNext}>Continuar →</button>
                </div>
            </div>
        </div>
    );
}
