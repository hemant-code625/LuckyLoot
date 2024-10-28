import { ThemeProvider } from "@/components/theme-provider";
import Home from "./pages/Home";
// import { ModeToggle } from "./components/mode-toggle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomizableWheel from "./components/Wheel";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route
            path="/"
            element={
              <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 transition-colors duration-500">
                <CustomizableWheel />
              </div>
            }
          ></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
