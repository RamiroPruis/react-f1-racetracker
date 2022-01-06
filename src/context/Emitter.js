import { createContext, useContext, useState } from "react";

const EmitterContext = createContext({
  data: null,
  setValue: (value) => {}
});

export const useEmitter = () => useContext(EmitterContext);

function Emitter({ children }) {
  const [data, setData] = useState();

  const setDataEvent = (data) => {
    setData(data);
  };

  const value = { data, setDataEvent };

  return (
    <EmitterContext.Provider value={value}>{children}</EmitterContext.Provider>
  );
}

export default Emitter;

