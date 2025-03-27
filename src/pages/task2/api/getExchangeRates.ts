import { axiosInstance } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

export interface IExchangeRate {
    USD: number;
    JPY: number;
    EUR: number;
}

interface IParams {
    tsyms?: string;
    fsym?: string;
}

export const getExchangePrice = (params?: IParams): Promise<IExchangeRate> =>
    axiosInstance
        .get("/data/price", {
            params,
        })
        .then((res) => res.data);

export const useGetExchangePrice = (params?: IParams) =>
    useQuery({
        queryKey: ["price", params],
        queryFn: () => getExchangePrice(params),
        enabled: !!params?.tsyms && !!params?.fsym,
        refetchInterval: 10000,
        refetchOnWindowFocus: false,
    });
