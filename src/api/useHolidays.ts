import { useQuery } from "@tanstack/react-query";
import { getHolidays } from "./holidays";

export function useHolidays(country: string, year: number) {
    return useQuery({
        queryKey: ['holidays', country, year],
        queryFn: () => getHolidays(country, year),
        enabled: !!country && !!year, // dont fetch until both are set
    })
}