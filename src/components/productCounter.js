"use client";
import { useState } from "react";

const ProductCounter = () => {
  const [counter, setCounter] = useState(123);

  // const handleMinus = () => setCounter(counter - 1);
  // const handlePlus = () => setCounter(counter + 1);

  const handleClick = (operator) => {
    if (operator === "plus") {
      setCounter(counter + 1);
    } else if (operator === "minus") {
      setCounter(counter - 1);
    }
  };

  return (
    <>
      <h1>Product Counter</h1>
      <h1>{counter}</h1>
      {/* <button onClick={handlePlus}>Plus</button>
      <button onClick={handleMinus}>Minus</button> */}
      <button onClick={() => handleClick("plus")}>Plus</button>
      <button onClick={() => handleClick("minus")}>Minus</button>
      <button onClick={() => alert("cek cek")}>alert</button>
    </>
  );
};

export default ProductCounter;
