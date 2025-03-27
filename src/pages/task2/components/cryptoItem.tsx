import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, RefreshCw, ArrowUp, ArrowDown } from "lucide-react";
import { ICrypto } from "../index";

interface IProps {
    crypto: ICrypto;
    fetchCryptoData: () => void;
    deleteCrypto: () => void;
}

export default function CryptoItem({
    crypto,
    fetchCryptoData,
    deleteCrypto,
}: IProps) {
    useEffect(() => {
        fetchCryptoData();

        const intervalId = setInterval(() => {
            fetchCryptoData();
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    const updateCrypto = async () => {
        await fetchCryptoData();
    };

    return (
        <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-2">
                <span className="font-bold">{crypto.name}</span>
                <span>${crypto.rate}</span>
                {crypto.change === "up" && (
                    <ArrowUp className="text-green-500" />
                )}
                {crypto.change === "down" && (
                    <ArrowDown className="text-red-500" />
                )}
            </div>
            <div className="flex items-center gap-2">
                <Button size="icon" onClick={updateCrypto}>
                    <RefreshCw />
                </Button>
                <Button
                    size="icon"
                    variant="destructive"
                    onClick={deleteCrypto}
                >
                    <Trash2 />
                </Button>
            </div>
        </div>
    );
}
