// components/MarcaFormStep1.tsx
import styles from '../styles/Wizard.module.css';
import type { Marca } from '../types/brand';

type Props = {
    value: Marca;
    onChange: (patch: Partial<Marca>) => void;
    onNext: () => void;
};

export default function MarcaFormStep1({ value, onChange, onNext }: Props) {
    const canNext = value.nombre?.trim().length > 1 && value.titular?.trim().length > 1;

    return (
        <div className="card">
            <div className={styles.section}>
                <h3>1. Información de la Marca</h3>
                <div className={styles.grid}>
                    <div className={styles.field}>
                        <label>Marca a registrar</label>
                        <input
                            placeholder="Ej. Marca X"
                            value={value.nombre || ''}
                            onChange={(e) => onChange({ nombre: e.target.value })}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Descripción</label>
                        <input
                            value={value.descripcion || ''}
                            onChange={(e) => onChange({ descripcion: e.target.value })}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Titular de la marca</label>
                        <input
                            placeholder="Ej. Rafael Martinez"
                            value={value.titular || ''}
                            onChange={(e) => onChange({ titular: e.target.value })}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Estado</label>
                        <select
                            value={value.estado || 'Pendiente'}
                            onChange={(e) => onChange({ estado: e.target.value })}
                        >
                            <option value="Pendiente">Pendiente</option>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                    </div>
                     <div className={styles.field}>
                        <label>Pais</label>
                        <input
                            placeholder="Ej. Colombia"
                            value={value.pais_origen || ''}
                            onChange={(e) => onChange({ pais_origen: e.target.value })}
                        />
                    </div>
                     <div className={styles.field}>
                        <label>Sitio Web</label>
                        <input
                            placeholder="Ej. www.marca.com"
                            value={value.sitio_web || ''}
                            onChange={(e) => onChange({ sitio_web: e.target.value })}
                        />
                    </div>

                </div>
                <div className={styles.actions}>
                    <span />
                    <button disabled={!canNext} className={styles.primary} onClick={onNext}>
                        Continuar →
                    </button>
                </div>
            </div>
        </div>
    );
}
