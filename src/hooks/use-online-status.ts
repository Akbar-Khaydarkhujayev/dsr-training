/* eslint-disable react-hooks/exhaustive-deps */
import { useBoolean } from "@/hooks/use-boolean";
import { useEffect } from "react";

export function useOnlineStatus() {
    const isOnline = useBoolean(navigator.onLine);

    useEffect(() => {
        window.addEventListener("online", isOnline.onTrue);
        window.addEventListener("offline", isOnline.onFalse);

        return () => {
            window.removeEventListener("online", isOnline.onTrue);
            window.removeEventListener("offline", isOnline.onFalse);
        };
    }, []);

    return isOnline.value;
}
