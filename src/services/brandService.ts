import axios, { AxiosResponse } from 'axios';
import type { Country, Marca, MarcaCountsResponse, PaginatedResponse } from '../types/brand';
import type { FilterParams } from '../types/brand';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET - Obtener todas las marcas
export const getMarcas = (skip: number = 0, limit: number = 100, filters: FilterParams = {}): Promise<AxiosResponse<PaginatedResponse>> =>
  api.get('/marcas/list', {
    params: {
      skip, limit, ...filters,
      clase_niza: filters.clase_niza ? parseInt(String(filters.clase_niza), 10) : undefined
    }
  });

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

// GET - Obtener el conteo de marcas por estado
export const getMarcaCounts = (): Promise<AxiosResponse<MarcaCountsResponse>> =>
  api.get('/marcas/summary');

// GET - obtener la lista de países
export const getCountries = (): Promise<AxiosResponse<Country[]>> =>
  axios.get('https://restcountries.com/v3.1/all?fields=name');

// GET - obtener la lista de categorías guardadas
export const getCategories =  (): Promise<AxiosResponse<[]>> =>
  api.get('/marcas/categories');