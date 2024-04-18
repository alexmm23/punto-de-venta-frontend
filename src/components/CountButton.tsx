import React from "react";
function CountButton() {
  const [count, setCount] = React.useState<number>(0);
  return <button onClick={() => setCount(count + 1)}>count is {count}</button>;
}

export default CountButton;
