export type Marca = {
  id?: number;
  nombre: string;
  descripcion?: string;
  estado: 'Activo' | 'Inactivo' | 'Pendiente' | string;
  pais_origen?: string;
  clase_niza?: number;
  categoria?: string;
  numero_registro?: string;
  fecha_registro?: string;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
  usuario_creacion?: string;
  usuario_actualizacion?: string;
  sitio_web?: string;
  titular: string;
  monitoreo_falsificacion?: boolean;
};
export type FilterParams = {
  nombre?: string;
  pais_origen?: string;
  clase_niza?: string | number | undefined;
  estado?: string;
  categoria?: string;
};
export type PaginatedResponse = {
  marcas: Marca[];
  total_count: number;
};
export type MarcaCountsResponse = {
  Activo: number;
  Inactivo: number;
  Pendiente: number;
};
export type Country = {
  name: {
    common: string;
  };
}