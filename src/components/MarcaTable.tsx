// components/MarcaTable.tsx
import styles from '../styles/Table.module.css';
import Link from 'next/link';
import type { Marca } from '../types/brand';

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

export default function MarcaTable({ items, onEdit, onDelete }: Props) {
  return (
    <div className="card">
      <div className={styles.header}>
        <h2>Registros de Marca</h2>
        <Link href="/crear">
          <button className={styles.newButton}>Nuevo registro</button>
        </Link>
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
              <th>F. Registro</th>
              <th>F. Creación</th>
              <th>U. Creación</th>
              <th>F. Actualización</th>
              <th>U. Actualización</th>
              <th>Sitio Web</th>
              <th>Monitoreo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className={styles.empty}>Sin registros todavía</td>
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
                <td>{m.fecha_registro}</td>
                <td>{m.fecha_creacion}</td>
                <td>{m.usuario_creacion}</td>
                <td>{m.fecha_actualizacion}</td>
                <td>{m.usuario_actualizacion}</td>
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
