import { createContext } from "react";
import { useSelector } from "react-redux";

export const AppContext = createContext({});
const AppContextProvider = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const { todos } = useSelector((state) => state.todo);
  return (
    <AppContext.Provider value={{ user, todos }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
