import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import CryptoCurrencyApp from "./pages/task2";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
    const queryClient = new QueryClient();

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <QueryClientProvider client={queryClient}>
                <CryptoCurrencyApp />
                <Toaster />
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
