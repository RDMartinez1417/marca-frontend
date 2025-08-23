// types/marca.ts
export type Marca = {
  id?: number;
  nombre: string;
  descripcion?: string;
  estado: 'Activo' | 'Inactivo' | 'Pendiente' | string;
  pais_origen?: string;
  clase_niza?: number;
  categoria?: string;
  numero_registro?: string;
  fecha_registro?: string; // ISO date string
  fecha_creacion?: string; // ISO datetime string
  fecha_actualizacion?: string; // ISO datetime string
  usuario_creacion?: string;
  usuario_actualizacion?: string;
  sitio_web?: string;
  titular: string;
  monitoreo_falsificacion?: boolean;
};
