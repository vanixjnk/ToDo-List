import React from "react";
import { List, Empty } from "antd";
import TodoItem from "../TodoItem";

const TodoList = ({
  todos,
  onTodoRemoval,
  onTodoToggle,
  onTodoUpdateTitle,
}) => {
  return (
    <div>
      <List
        locale={<Empty />}
        dataSource={todos}
        renderItem={(todo) => (
          <TodoItem
            todo={todo}
            onTodoToggle={onTodoToggle}
            onTodoRemoval={onTodoRemoval}
            onTodoUpdateTitle={onTodoUpdateTitle}
          />
        )}
        pagination={{
          position: "bottom",
          pageSize: 5,
        }}
      />
    </div>
  );
};

export default TodoList;
