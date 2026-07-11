import { Holiday } from '../types/holidays.interface';
import { api } from './client';

// const API_BASE_URL = 'http://10.10.1.159:3002'
const API_BASE_URL = 'https://know-your-holidays-api.onrender.com'

export const getHolidays = async (country: string, year: number) => {
    const { data } = await api.get<Holiday[]>('/holidays', {
        params: { country, year },
    });
    return data;
};

export async function getSchoolHolidays(country: string, year: number) {
  const response = await fetch(`${API_BASE_URL}/holidays/school?country=${country}&year=${year}`);
  if (!response.ok) throw new Error('Failed to fetch school breaks');
  return response.json();
}