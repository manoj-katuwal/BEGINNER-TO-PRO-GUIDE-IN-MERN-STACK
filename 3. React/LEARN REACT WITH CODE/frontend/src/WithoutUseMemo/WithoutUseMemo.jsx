import React, { useState } from "react";

const WithoutUseMemo = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const expensiveCalculation = () => {
    console.log("function learning");
    let total = 0;

    for (let i = 0; i < 100000000; i++) {
      total = total + i;
    }
    return total;
  };

  const result = expensiveCalculation();
  return (
    <div>
      <h2>Result : {result}</h2>
      <button onClick={()=> setCount(count + 1 )}>Increase Count</button>
      <input type="text " value={text} onChange={(e)=> setText(e.target.value)}></input>
      <p>Count : {count}</p>
      
    </div>
  );
};

export default WithoutUseMemo;
