import React from 'react';
import toast from 'react-hot-toast';

export default function ToastDemo() {
  return (
    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
      <button onClick={() => toast('Hello!')}>
        Standard
      </button>

      <button onClick={() => toast.success('Saved successfully!')}>
        Success 🟢
      </button>

      <button onClick={() => toast.error('Something went wrong!')}>
        Error 🔴
      </button>
    </div>
  );
}