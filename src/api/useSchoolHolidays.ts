import { useQuery } from "@tanstack/react-query";
import { getSchoolHolidays } from "./holidays";

export function useSchoolHolidays(country: string, year: number) {
    return useQuery({
        queryKey: ['schoolHolidays', country, year],
        queryFn: () => getSchoolHolidays(country, year),
        enabled: !!country && !!year,
    });
}