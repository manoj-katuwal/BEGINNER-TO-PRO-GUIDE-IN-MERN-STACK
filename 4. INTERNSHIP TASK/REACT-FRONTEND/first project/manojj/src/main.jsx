import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CounterProvider } from "./context/CounterContext.jsx";
// import { Context2, ContextProvider } from "./context/Context2.jsx";
// import Counter3 from "./components/Counter3.jsx";
// import { CounterContext3 } from "./context/CounterContext3.jsx";

createRoot(document.getElementById("root")).render(
    <CounterProvider>
      <App />
    </CounterProvider>
);
