import React, { useMemo, useState } from "react";

const WithUseMemo = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const expensiveCalculation = (num) => {
    console.log("function learning");
    let total = 0;

    for (let i = 0; i < 100000000; i++) {
      total = total + i;
    }
    return total + num;
  };

  const result = useMemo(() => {
    return expensiveCalculation(count);
  }, [count, text]);
  return (
    <div>
      <h2>Result : {result}</h2>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <input
        type="text "
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>
      <p>Count : {count}</p>
    </div>
  );
};

export default WithUseMemo;
