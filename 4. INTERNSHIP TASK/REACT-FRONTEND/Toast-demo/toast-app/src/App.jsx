import React from 'react';
// Import the special container for the library toasts
import { Toaster } from 'react-hot-toast'; 
// Import your two new component files
import ToastDemo from './ToastDemo';
import HotTester from './HotTester';

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>React Toast Tutorial</h1>
      
      {/* This component acts like a canvas where library toasts are drawn */}
      <Toaster position="top-center" reverseOrder={false} />

      <section style={{ marginBottom: '40px', borderBottom: '1px solid #ccc' }}>
        <h2>Method 1: Using React-Hot-Toast Library</h2>
        <ToastDemo />
      </section>

      <section>
        <h2>Method 2: Using Custom Manual React State</h2>
        <HotTester />
      </section>
    </div>
  );
}

export default App;
