import { useDispatch, useSelector } from "react-redux";

import { fetchAllTodoByID, postTodo } from "../utils/todoApi";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Empty, Row, message, Input } from "antd";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import Layout from "../components/Layout";
import { useContext, useEffect, useState } from "react";
import {
  getTodo,
  removeTodo,
  updateTodoStatus,
  updateTodoTitle,
} from "../store/todo/actions";
import Loading from "../components/Loading";
import { AppContext } from "../context/AppContextProvider";

const { Search } = Input;

const HomePage = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(AppContext);
  const userID = user.uid;
  const { data, isLoading, refetch } = useQuery(
    ["todos", userID],
    () => fetchAllTodoByID(userID),
    {
      staleTime: 1000,
      refetchOnMount: false,
    }
  );

  useEffect(() => {
    if (data) {
      dispatch(getTodo(data));
    }
  }, [data, dispatch]);

  const todos = useSelector((state) => state.todo.todos);

  if (isLoading) {
    return <Loading status={true} />;
  }

  const handleFormSubmit = async (todo) => {
    try {
      const huydev = await postTodo(todo, dispatch);
      if (huydev.status === false) {
        message.error(huydev.message);
      } else {
        const updatedTodos = await fetchAllTodoByID(userID);
        dispatch(getTodo(updatedTodos));
        message.success(huydev.message);
      }
      refetch();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };
  const handleRemoveTodo = (todo) => {
    dispatch(removeTodo(todo));
    refetch();
    message.warning("Todo removed!");
  };

  const handleToggleTodoStatus = (todo) => {
    dispatch(updateTodoStatus(todo));
    refetch();
    message.info("Todo state updated!");
  };

  const handleTodoUpdateTitle = (todo) => {
    dispatch(updateTodoTitle(todo));
    refetch();
    message.info("Todo title updated!");
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <Row
        justify="center"
        align="middle"
        gutter={[0, 20]}
        className="todos-container"
      >
        <Col
          xs={{ span: 23 }}
          sm={{ span: 23 }}
          md={{ span: 21 }}
          lg={{ span: 20 }}
          xl={{ span: 18 }}
        ></Col>

        <Col
          xs={{ span: 23 }}
          sm={{ span: 23 }}
          md={{ span: 21 }}
          lg={{ span: 20 }}
          xl={{ span: 18 }}
        >
          <Card title="Create To New Todo">
            <TodoForm onFormSubmit={handleFormSubmit} />
          </Card>
        </Col>

        <Col
          xs={{ span: 23 }}
          sm={{ span: 23 }}
          md={{ span: 21 }}
          lg={{ span: 20 }}
          xl={{ span: 18 }}
        >
          <Card>
            <div className="card-header">
              <div className="card-title-container">
                <span className="card-title">Todo List</span>
              </div>
              <div className="search-container">
                <Search
                  placeholder="Search"
                  allowClear
                  onChange={handleSearch}
                  style={{ width: 200 }}
                />
              </div>
            </div>
            {filteredTodos.length > 0 ? (
              <TodoList
                todos={filteredTodos}
                onTodoRemoval={handleRemoveTodo}
                onTodoToggle={handleToggleTodoStatus}
                onTodoUpdateTitle={handleTodoUpdateTitle}
              />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default HomePage;
