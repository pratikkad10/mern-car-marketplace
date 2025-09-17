import { useState } from "react";

export function useSpin(duration = 1000) {
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    setSpinning(true);
    setTimeout(() => setSpinning(false), duration);
  };

  return { spinning, spin };
}
