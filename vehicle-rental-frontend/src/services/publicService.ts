// src/services/publicService.ts
import axiosPublic from '../utils/axiosPublic';
import { Vehicle } from '../types/vehicle';

// ✅ Add this type for cities response
interface CitiesResponse {
  cities: string[];
}

// ✅ Export this
export const getCities = async (): Promise<string[]> => {
  const response = await axiosPublic.get<CitiesResponse>('/cities');
  return response.data.cities;
};

// ✅ Properly typed
export const getVehiclesByCity = async (city: string): Promise<Vehicle[]> => {
  const response = await axiosPublic.get<Vehicle[]>(`/vehicles-by-city/${city}`);
  return response.data;
};
