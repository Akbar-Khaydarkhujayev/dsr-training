import { useEffect, useState } from "react";
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
    const [time, setTime] = useState({
        time: 0,
        running: false,
    });

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (time.running) {
            interval = setInterval(() => {
                setTime((prev) => {
                    return { time: prev.time + 1, running: prev.running };
                });
            }, 1000);
        } else if (interval) {
            clearInterval(interval);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [time.running]);

    const toggleStartPause = () => {
        setTime((prev) => {
            return {
                time: prev.time,
                running: !prev.running,
            };
        });
    };

    const clearStopwatch = () => {
        setTime({
            time: 0,
            running: false,
        });
    };
    console.log(time.time * 1000);
    return (
        <div className="flex items-center space-x-3 border p-3 rounded-lg shadow-md">
            <span className="text-xl font-semibold w-20">
                {formatTime(time.time)}
            </span>
            <Button onClick={toggleStartPause} size="icon">
                {!time.running ? <Play /> : <Pause />}
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
