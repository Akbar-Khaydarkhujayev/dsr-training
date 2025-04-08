import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import CryptoItem from "./components/cryptoItem";
import { getExchangePrice } from "./api/getExchangeRates";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useOnlineStatus } from "@/hooks/use-online-status";

export interface Crypto {
    name: string;
    rate: number;
    change: "up" | "down" | "none";
}

function handleCryptoChange(
    crypto: Crypto,
    name: string,
    rate: number
): Crypto {
    if (crypto.name !== name) return crypto;

    let change: "up" | "down" | "none";

    if (rate > crypto.rate) {
        change = "up";
    } else if (rate < crypto.rate) {
        change = "down";
    } else {
        change = "none";
    }

    return {
        name,
        change,
        rate,
    };
}

export default function CryptoCurrencyApp() {
    const isOnline = useOnlineStatus();
    const [search, setSearch] = useState("");
    const [cryptos, setCryptos] = useState<Crypto[]>([
        { name: "DOGE", change: "none", rate: 0 },
    ]);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startAutoUpdate = () => {
        stopAutoUpdate();
        intervalRef.current = setInterval(() => {
            updateAllCryptos();
        }, 10000);
    };

    const stopAutoUpdate = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    useEffect(() => {
        updateAllCryptos();
        startAutoUpdate();
        return stopAutoUpdate;
    }, []);

    const addCrypto = async () => {
        const cryptoName = search.toUpperCase();
        if (cryptos.some((crypto) => crypto.name === cryptoName)) {
            toast.error("Cryptocurrency is already in the list.");
            return;
        }

        const { USD } = await getExchangePrice({
            fsym: cryptoName,
            tsyms: "USD",
        });
        if (USD) {
            setCryptos((prev) => [
                ...prev,
                { name: cryptoName, rate: USD, change: "none" },
            ]);
            setSearch("");
        } else {
            toast.error("Cryptocurrency not found.");
        }
    };

    const deleteCrypto = (cryptoToDelete: string) => {
        setCryptos((prev) =>
            prev.filter((crypto) => crypto.name !== cryptoToDelete)
        );
    };

    const updateCrypto = async (name: string) => {
        const { USD } = await getExchangePrice({ fsym: name, tsyms: "USD" });
        if (USD !== null) {
            setCryptos((prev) =>
                prev.map((crypto) => handleCryptoChange(crypto, name, USD))
            );
        }
    };

    const updateAllCryptos = async () => {
        await Promise.all(cryptos.map((crypto) => updateCrypto(crypto.name)));
        startAutoUpdate();
    };

    return (
        <div className="flex flex-col max-w-2xl mx-auto p-4">
            <div className="flex items-center justify-between w-full mb-4">
                <div className="flex items-center gap-2">
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Currency name"
                    />
                    <Button onClick={addCrypto}>
                        <Search />
                    </Button>
                </div>
                <div className="flex gap-2 items-center">
                    <div
                        className={cn(
                            "size-2 rounded-full",
                            isOnline ? "bg-green-500" : "bg-red-500"
                        )}
                    ></div>
                    {isOnline ? "Online" : "Offline"}
                </div>
                <Button onClick={updateAllCryptos}>Update All</Button>
            </div>
            <ScrollArea className="h-[calc(100vh-84px)] pr-2">
                <div className="space-y-4">
                    {cryptos.map((crypto) => (
                        <CryptoItem
                            key={crypto.name}
                            crypto={crypto}
                            onRefresh={() => updateCrypto(crypto.name)}
                            onDelete={() => deleteCrypto(crypto.name)}
                        />
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
