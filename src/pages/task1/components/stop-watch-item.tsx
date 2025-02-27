import { useEffect, useRef, useState } from "react";
import { Play, Pause, Trash2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
        .toString()
        .padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60)
        .toString()
        .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
};

export default function StopwatchItem({ onDelete }: { onDelete: () => void }) {
    const [time, setTime] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const startInterval = () => {
        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
    };

    const stopInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = undefined;
        }
    };

    useEffect(() => {
        return () => {
            stopInterval();
        };
    }, []);

    const toggleStartPause = () => {
        if (intervalRef.current) {
            stopInterval();
        } else {
            startInterval();
        }
    };

    const clearStopwatch = () => {
        stopInterval();
        setTime(0);
    };

    return (
        <div className="flex items-center space-x-3 border p-3 rounded-lg shadow-md">
            <span className="text-xl font-semibold w-20">
                {formatTime(time)}
            </span>
            <Button onClick={toggleStartPause} size="icon">
                {intervalRef && !intervalRef.current ? <Play /> : <Pause />}
            </Button>
            <Button onClick={clearStopwatch} size="icon">
                <RefreshCw />
            </Button>
            <Button onClick={onDelete} size="icon" variant="destructive">
                <Trash2 />
            </Button>
        </div>
    );
}
