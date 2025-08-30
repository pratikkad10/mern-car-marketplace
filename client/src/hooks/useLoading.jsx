import { useState } from "react";

export default function useLoading(initial = false) {
  const [isLoading, setIsLoading] = useState(initial);

  const start = () => setIsLoading(true);
  const stop = () => setIsLoading(false);
  const toggle = () => setIsLoading(prev => !prev);

  return { isLoading, start, stop, toggle };
}
