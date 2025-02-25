import { useState } from "react";
import { Button } from "@/components/ui/button";
import StopwatchItem from "./components/stop-watch-item";

export default function StopwatchApp() {
    const [stopwatches, setStopwatches] = useState<number[]>([]);

    const addStopwatch = () => {
        setStopwatches((prev) => [...prev, Date.now()]);
    };

    const deleteStopwatch = (id: number) => {
        setStopwatches((prev) => prev.filter((sw) => sw !== id));
    };

    return (
        <div className="flex flex-col items-center p-4">
            <Button onClick={addStopwatch} className="mb-4">
                Add Stopwatch
            </Button>
            <div className="space-y-4">
                {stopwatches.map((stopwatch) => (
                    <StopwatchItem
                        key={stopwatch}
                        onDelete={() => deleteStopwatch(stopwatch)}
                    />
                ))}
            </div>
        </div>
    );
}
