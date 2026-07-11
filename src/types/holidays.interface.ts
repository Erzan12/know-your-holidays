export interface Holiday {
    id: string;
    country: string;
    date: string;
    name: string;
    localName: string;
    type: string | null;
    year: number;
}

export interface OpenHolidaysSchoolResponse {
  id: string;
  startDate: string;
  endDate: string;
  name: Array<{ language: string; text: string }>;
  type: string;
}