import { useCallback, useState } from "react";

export type useCotnrol = (initialState?: {
  value: string;
  error: string;
}) => [
  state: { value: string; error: string },
  setValue: (value: string) => void,
  setValue: (value: string) => void
];

export const useControl: useCotnrol = (
  initialState = { value: "", error: "" }
) => {
  const [state, setState] = useState(initialState);
  const setError = useCallback((newError: string) => {
    setState((prevState) => ({
      ...prevState,
      error: newError,
    }));
  }, []);

  const setValue = useCallback((newValue: string) => {
    setState((prevState) => ({
      ...prevState,
      value: newValue,
    }));
  }, []);

  return [state, setValue, setError];
};
