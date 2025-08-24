import { useEffect, useState } from 'react';
import styles from '../styles/Wizard.module.css';
import type { Country, Marca } from '../types/brand';

type Props = {
    value: Marca;
    onChange: (patch: Partial<Marca>) => void;
    onNext: () => void;
    countries: Country[];
};

export default function MarcaFormStep1({ value, onChange, onNext,countries  }: Props) {
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([])
    const canNext = value.nombre?.trim().length > 1 && value.titular?.trim().length > 1;
    useEffect(() => {
        if (value.pais_origen && value.pais_origen?.length > 1) {
            const filtered = countries.filter(country =>
                country.name.common.toLowerCase().includes(value.pais_origen?.toLowerCase() ?? '')
            );
            setFilteredCountries(filtered);
        } else {
            setFilteredCountries([]);
        }
    }, [value.pais_origen, countries]);
    const handlePaisChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        onChange({ pais_origen: inputValue });
    };

    return (
        <div className="card">
            <div className={styles.section}>
                <h3>1. Información de la Marca</h3>
                <div className={styles.grid}>
                    <div className={styles.field}>
                        <label>Marca a registrar <span className={styles.required}>*</span></label>
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
                        <label>Titular de la marca <span className={styles.required}>*</span></label>
                        <input
                            placeholder="Ej. Rafael Martinez"
                            value={value.titular || ''}
                            onChange={(e) => onChange({ titular: e.target.value })}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Estado</label>
                        <select
                            value={value.estado || 'Activo'}
                            onChange={(e) => onChange({ estado: e.target.value })}
                        >
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                            <option value="Pendiente">Pendiente</option>
                        </select>
                    </div>
                    <div className={styles.field}>
                        <label>Pais</label>
                        <input
                            placeholder="Ej. Colombia"
                            value={value.pais_origen || ''}
                            onChange={handlePaisChange}
                            list="country-options"
                        />
                        <datalist id="country-options">
                            {filteredCountries.map((country, index) => (
                                <option key={index} value={country.name.common} />
                            ))}
                        </datalist>
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
