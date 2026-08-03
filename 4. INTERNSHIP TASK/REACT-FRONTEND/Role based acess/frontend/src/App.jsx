import React, { Suspense } from "react";
import AppRoutes from "./routes/AppRoutes";
import Animations from "./components/Animation/Animation";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Animations />}>
        <AppRoutes />
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
