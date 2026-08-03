import { useState } from "react";
import { useCounter } from "../../context/CounterContext";

const Counter = () => {
  const [count, setCount] = useState(1);
  const {count, increment, decrement,reset} = useCounter()
  return (
    <main className="flex min-h-screen flex-col items-center  p-2 mt-20">
      <h1 className="text-center text-2xl font-bold">Counter</h1>

      <p className="text-4xl my-4">{count}</p>

      <div className="flex gap-4">
        <button
          onClick={() => increment}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Increment
        </button>
        <button
          onClick={() => reset
          }
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Reset
        </button>
        <button
          onClick={() => { decrement
          }}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Decrement
        </button>
         <button
          onClick={() => {
            setCount(count * 2);
          }}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Muntiply
        </button>
      </div>
    </main>
  );
};

export default Counter;
