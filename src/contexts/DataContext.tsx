import { ReactNode, createContext, useContext, useState } from "react";

interface DataContextType {
  qrValue: string;
  setQrValue: React.Dispatch<React.SetStateAction<string>>;
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const value = useContext(DataContext);
  if (!value) {
    throw new Error("useData must be wrapped inside DataContextProvider");
  }
  return value;
};

interface DataProviderProps {
  children: ReactNode;
}
export const DataContextProvider = ({ children }: DataProviderProps) => {
  const [qrValue, setQrValue] = useState("");

  const value = { qrValue, setQrValue };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
