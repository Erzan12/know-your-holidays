import { api } from './client';

export interface Holiday {
    id: string;
    country: string;
    date: string;
    name: string;
    localName: string;
    type: string | null;
    year: number;
}

export const getHolidays = async (country: string, year: number) => {
    const { data } = await api.get<Holiday[]>('/holidays', {
        params: { country, year },
    });
    return data;
};