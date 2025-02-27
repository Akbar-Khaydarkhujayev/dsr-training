import { useState } from "react";
import { Button } from "@/components/ui/button";
import StopwatchItem from "./components/stop-watch-item";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function StopwatchApp() {
    const [stopwatches, setStopwatches] = useState<number[]>([]);

    const addStopwatch = () => {
        setStopwatches((prev) => [...prev, Date.now()]);
    };

    const deleteStopwatch = (id: number) => {
        setStopwatches((prev) => prev.filter((sw) => sw !== id));
    };

    return (
        <div className="flex flex-col items-center">
            <Button onClick={addStopwatch} className="my-4">
                Add Stopwatch
            </Button>
            {stopwatches.length > 0 && (
                <ScrollArea className="h-[calc(100vh-86px)] p-4 border-border border rounded-lg">
                    <div className="space-y-4">
                        {stopwatches.map((stopwatch) => (
                            <StopwatchItem
                                key={stopwatch}
                                onDelete={() => deleteStopwatch(stopwatch)}
                            />
                        ))}
                    </div>
                </ScrollArea>
            )}
        </div>
    );
}
