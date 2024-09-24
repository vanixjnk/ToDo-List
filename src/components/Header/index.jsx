import { Button } from "antd";
import { AppContext } from "../../context/AppContextProvider";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../store/auth/actions/auth.actions";
import { removeLocal } from "../../store/todo/actions";

const Header = () => {
  const { user } = useContext(AppContext);
  const authUser = user.providerData[0];
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.clear();
    dispatch(logoutSuccess());
    dispatch(removeLocal());
  };

  return (
    <div className="container-fluid">
      <div
        className="row border-bottom"
        style={{ padding: "1rem", overflowX: "hidden" }}
      >
        <Link
          to={"/"}
          className="col-8 col-sm-6 d-flex align-items-center justify-content-sm-start"
        >
          <img
            src={`${
              authUser.photoURL
                ? authUser.photoURL
                : `https://ui-avatars.com/api/name=${authUser.uid}`
            }`}
            alt="Logo"
            height={32}
            width={34}
            className="ms-3 me-3 rounded-circle"
          />
        </Link>
        <div className="col-8 col-sm-6 d-none d-sm-flex align-items-start justify-content-end">
          {authUser ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              Login
            </Link>
          )}
        </div>
        <div className="col-4 d-flex d-sm-none align-items-center justify-content-center">
          {authUser ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
