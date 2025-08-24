import styles from '../styles/Table.module.css';
import Link from 'next/link';
import type { Marca } from '../types/brand';
import { format } from 'date-fns';
import { useState } from 'react';

type Props = {
  items: Marca[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

function statusClass(estado: string) {
  if (estado === 'Activo') return 'badge success';
  if (estado === 'Pendiente') return 'badge warn';
  return 'badge muted';
}
const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return '';
  return format(new Date(dateString), 'dd/MM/yyyy HH:mm:ss');
};
const formatDateRegister = (dateString: string | null | undefined) => {
  if (!dateString) return '';
  return format(new Date(dateString), 'dd/MM/yyyy');
};

export default function MarcaTable({ items, onEdit, onDelete }: Props) {
  const [showAudit, setShowAudit] = useState(false);
  return (
    <div className="card">
      <div className={styles.header}>
        <h2>Registros de Marca</h2>
        <div className={styles.headerControls}>
          <label className={styles.auditToggle}>
            <input
              type="checkbox"
              checked={showAudit}
              onChange={(e) => setShowAudit(e.target.checked)}
            />
            Mostrar auditoría
          </label>
          <Link href="/crear">
            <button className={styles.newButton}>Nuevo registro</button>
          </Link>
        </div>

      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Marca</th>
              <th>Titular</th>
              <th>Estado</th>
              <th>Pais Origen</th>
              <th>Clase Niza</th>
              <th>Categoria</th>
              <th># Registro</th>
              <th>Fecha Registro</th>
              {showAudit && (
                <>
                  <th>Fecha Creación</th>
                  <th>Usuario Creación</th>
                  <th>Fecha Actualización</th>
                  <th>Usuario Actualización</th>
                </>
              )}

              <th>Sitio Web</th>
              <th>Monitoreo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className={styles.empty}>No hay marcas registradas</td>
              </tr>
            )}
            {items.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.nombre}</td>
                <td>{m.titular}</td>
                <td><span className={statusClass(m.estado)}>{m.estado}</span></td>
                <td>{m.pais_origen}</td>
                <td>{m.clase_niza}</td>
                <td>{m.categoria}</td>
                <td>{m.numero_registro}</td>
                <td>{formatDateRegister(m.fecha_registro)}</td>
                {showAudit && (
                  <>
                    <td>{formatDate(m.fecha_creacion)}</td>
                    <td>{m.usuario_creacion}</td>
                    <td>{formatDate(m.fecha_actualizacion)}</td>
                    <td>{m.usuario_actualizacion}</td>
                  </>
                )}
                <td>{m.sitio_web}</td>
                <td>{m.monitoreo_falsificacion ? 'Sí' : 'No'}</td>
                <td>
                  <div className="tableActions">
                    <button className={styles.edit} onClick={() => m.id && onEdit(m.id)}>Editar</button>
                    <button className={styles.delete} onClick={() => m.id && onDelete(m.id)}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
