import React, { useState } from "react";
import {
  Tooltip,
  Tag,
  List,
  Button,
  Popconfirm,
  Switch,
  Modal,
  Form,
  Input,
} from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import "./style.css";

const TodoItem = ({ todo, onTodoRemoval, onTodoToggle, onTodoUpdateTitle }) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = (data) => {
    form.setFieldsValue({
      editID: data.id,
      title: data.title,
    });
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      form
        .validateFields()
        .then((values) => {
          form.resetFields();
          setOpen(false);
          setConfirmLoading(false);
          onFinish(values);
        })
        .catch((error) => {
          console.error("Validation failed:", error);
        });
    }, 1000);
  };

  const onFinish = (values) => {
    onTodoUpdateTitle({
      id: values.editID,
      title: values.title,
      updateAt: new Date().toISOString(),
    });

    form.resetFields();
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  return (
    <>
      <List.Item
        actions={[
          <Tooltip
            title={
              todo.completed ? "Huydev as uncompleted" : "Huydev as completed"
            }
          >
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              onChange={() => onTodoToggle(todo)}
              defaultChecked={todo.completed}
            />
          </Tooltip>,
          <Button
            className="edit-todo-button"
            type="primary"
            onClick={() => showModal(todo)}
          >
            !
          </Button>,
          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() => {
              onTodoRemoval(todo);
            }}
          >
            <Button className="remove-todo-button" type="primary" danger>
              X
            </Button>
          </Popconfirm>,
        ]}
        className="list-item"
        key={todo.id}
      >
        <div className="todo-item">
          <Tag
            className="todo-tag"
            style={{ textDecoration: todo.completed ? "none" : "line-through" }}
          >
            {todo.title}
          </Tag>
        </div>
      </List.Item>

      <Modal
        title="Edit Task"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form layout="horizontal" className="todo-form" form={form}>
          <Form.Item name="editID" style={{ display: "none" }}>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input size="large" placeholder="Edit Task" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TodoItem;
