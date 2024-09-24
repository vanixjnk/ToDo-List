import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotPage from "./pages/NotPage";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContextProvider";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [user]);

  return (
    <>
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotPage />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
