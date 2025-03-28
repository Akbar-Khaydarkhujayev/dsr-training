import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import CryptoItem from "./components/cryptoItem";
import { getExchangePrice } from "./api/getExchangeRates";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useOnlineStatus } from "@/hooks/use-online-status";

export interface ICrypto {
    name: string;
    rate: number;
    change: "up" | "down" | "none";
}

export default function CryptoCurrencyApp() {
    const isOnline = useOnlineStatus();
    const [search, setSearch] = useState<string>("");
    const [cryptos, setCryptos] = useState<ICrypto[]>([
        { name: "DOGE", change: "none", rate: 0 },
    ]);

    const addCrypto = async () => {
        const cryptoName = search.toUpperCase();
        setSearch("");
        if (cryptos.some((crypto) => crypto.name === cryptoName)) {
            toast.error("Cryptocurrency is already in the list.");
            return;
        }

        const rate = (
            await getExchangePrice({
                fsym: cryptoName,
                tsyms: "USD",
            })
        ).USD;

        if (rate) {
            setCryptos((prev) => [
                ...prev,
                { name: cryptoName, rate, change: "none" },
            ]);
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
        const rate = (
            await getExchangePrice({
                fsym: name,
                tsyms: "USD",
            })
        ).USD;
        if (rate !== null) {
            setCryptos((prev) =>
                prev.map((crypto) =>
                    crypto.name === name
                        ? {
                              ...crypto,
                              change:
                                  rate > crypto.rate
                                      ? "up"
                                      : rate < crypto.rate
                                      ? "down"
                                      : "none",
                              rate,
                          }
                        : crypto
                )
            );
        }
    };

    const updateAllCryptos = async () => {
        cryptos.forEach((crypto) => updateCrypto(crypto.name));
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
                <div>
                    <div className="flex gap-2 items-center">
                        <div
                            className={cn(
                                "size-2 rounded-full",
                                isOnline ? "bg-green-500" : "bg-red-500"
                            )}
                        ></div>
                        {isOnline ? "Online" : "Offline"}
                    </div>
                </div>
                <Button onClick={updateAllCryptos}>Update All</Button>
            </div>
            <ScrollArea className="h-[calc(100vh-84px)] pr-2">
                <div className="space-y-4">
                    {cryptos.map((crypto) => (
                        <CryptoItem
                            key={crypto.name}
                            crypto={crypto}
                            fetchCryptoData={() => updateCrypto(crypto.name)}
                            deleteCrypto={() => deleteCrypto(crypto.name)}
                        />
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
