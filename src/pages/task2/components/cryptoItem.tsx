// components/cryptoItem.tsx
import { Button } from "@/components/ui/button";
import { Trash2, RefreshCw, ArrowUp, ArrowDown } from "lucide-react";
import { Crypto } from "../index";

interface IProps {
    crypto: Crypto;
    onRefresh: () => void;
    onDelete: () => void;
}

export default function CryptoItem({ crypto, onRefresh, onDelete }: IProps) {
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
                <Button size="icon" onClick={onRefresh}>
                    <RefreshCw />
                </Button>
                <Button size="icon" variant="destructive" onClick={onDelete}>
                    <Trash2 />
                </Button>
            </div>
        </div>
    );
}
