import { ThemeProvider } from "@/components/theme-provider";
import Home from "./pages/Home";
// import { ModeToggle } from "./components/mode-toggle";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <ModeToggle /> */}
      <Home />
    </ThemeProvider>
  );
}

export default App;
