import styles from '../styles/Wizard.module.css';
import type { Marca } from '../types/brand';

type Props = {
  value: Marca;
  onPrev: () => void;
  onSubmit: () => Promise<void> | void;
  submitting?: boolean;
  mode: 'create' | 'edit';
};

export default function MarcaFormStep3({ value, onPrev, onSubmit, submitting, mode }: Props) {
  return (
    <div className="card">
      <div className={styles.section}>
        <h3>3. Resumen</h3>
        <div className={styles.summary}>
          <div>
            <div className={styles.summaryLabel}>Marca a registrar</div>
            <div className={styles.summaryValue}>{value.nombre}</div>
          </div>
           <div>
            <div className={styles.summaryLabel}>Descripción</div>
            <div className={styles.summaryValue}>{value.descripcion}</div>
          </div>
          <div>
            <div className={styles.summaryLabel}>Titular</div>
            <div className={styles.summaryValue}>{value.titular}</div>
          </div>
          <div>
            <div className={styles.summaryLabel}>Estado</div>
            <div className={styles.summaryValue}><span className={`badge ${value.estado === 'Activo' ? 'success' : value.estado === 'Pendiente' ? 'warn' : 'muted'}`}>{value.estado}</span></div>
          </div>
          <div>
            <div className={styles.summaryLabel}>Pais</div>
            <div className={styles.summaryValue}>{value.pais_origen}</div>
          </div>
          <div>
            <div className={styles.summaryLabel}>Sitio Web</div>
            <div className={styles.summaryValue}>{value.sitio_web}</div>
          </div>
          <div>
            <div className={styles.summaryLabel}>Numero de registro</div>
            <div className={styles.summaryValue}>{value.numero_registro}</div>
          </div>
           <div>
            <div className={styles.summaryLabel}>Fecha de registro</div>
            <div className={styles.summaryValue}>{value.fecha_registro}</div>
          </div>
           <div>
            <div className={styles.summaryLabel}>Categoria</div>
            <div className={styles.summaryValue}>{value.categoria}</div>
          </div>
           <div>
            <div className={styles.summaryLabel}>Clase Niza</div>
            <div className={styles.summaryValue}>{value.clase_niza}</div>
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.ghost} onClick={onPrev}>← Atrás</button>
          <button className={styles.primary} onClick={onSubmit} disabled={submitting}>
            {submitting ? 'Guardando…' : mode === 'create' ? 'Crear' : 'Actualizar'}
          </button>
        </div>
      </div>
    </div>
  );
}
