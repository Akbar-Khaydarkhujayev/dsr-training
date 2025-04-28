import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import UserTable from "./pages/lesson5";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
    const queryClient = new QueryClient();

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <QueryClientProvider client={queryClient}>
                <UserTable />
                <Toaster />
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
