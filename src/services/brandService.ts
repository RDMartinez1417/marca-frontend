import axios, { AxiosResponse } from 'axios';
import type { Marca } from '../types/brand';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET - Obtener todas las marcas
export const getMarcas = (skip: number = 0, limit: number = 100): Promise<AxiosResponse<Marca[]>> =>
  api.get('/marcas/list', { params: { skip, limit } });

// GET - Obtener una marca por su ID
export const getMarca = (id: number): Promise<AxiosResponse<Marca>> =>
  api.get(`/marcas/list/${id}`);

// POST - Crear una nueva marca
export const createMarca = (data: Marca): Promise<AxiosResponse<Marca>> =>
  api.post('/marcas/create', data);

// PUT - Actualizar una marca existente
export const updateMarca = (id: number, data: Marca): Promise<AxiosResponse<Marca>> =>
  api.put(`/marcas/update/${id}`, data);

// DELETE - Eliminar una marca
export const deleteMarca = (id: number): Promise<AxiosResponse<{ success: boolean }>> =>
  api.delete(`/marcas/delete/${id}`);