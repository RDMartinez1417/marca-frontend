import { useState } from 'react';
import styles from '../styles/Wizard.module.css';
import type { Marca } from '../types/brand';

type Props = {
    value: Marca;
    onChange: (patch: Partial<Marca>) => void;
    onPrev: () => void;
    onNext: () => void;
    categories: string[];
};

export default function MarcaFormStep2({ value, onChange, onPrev, onNext, categories }: Props) {
    const canNext = true
    const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        if (selectedValue === "new_category") {
            setShowNewCategoryInput(true);
            onChange({ categoria: '' });
        } else {
            setShowNewCategoryInput(false);
            onChange({ categoria: selectedValue });
        }
    };
    const handleNewCatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCatValue = e.target.value;
        onChange({ categoria: newCatValue });
    };
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
                        <select
                            id="categoria"
                            value={value.categoria || ''}
                            onChange={handleCategoryChange}
                        >
                            <option value="">Selecciona una categoría</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                            <option value="new_category">Crear nueva categoría...</option>
                        </select>
                        {showNewCategoryInput  && (
                            <input
                                type="text"
                                id="nuevaCategoria"
                                placeholder="Escribe la nueva categoría"
                                value={value.categoria || ''}
                                onChange={handleNewCatChange}
                            />
                        )}
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
