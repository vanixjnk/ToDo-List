import { useContext } from "react";
import { AppContext } from "../../context/AppContextProvider";

const Footer = () => {
  const { todos } = useContext(AppContext);
  const totalTask = todos.length;
  const totalCompleteTrue = todos.filter(
    (todo) => todo.completed === true
  ).length;
  return (
    <div className="container-fluid mt-4">
      <div
        className="row border-top d-flex justify-content-between text-center"
        style={{ padding: "1rem" }}
      >
        <div className="col">
          <span>{totalTask} Task</span>
        </div>
        <div className="col">
          <span>{totalTask} Complete</span>
        </div>
        <div className="col">
          <span>{totalCompleteTrue} Open</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
