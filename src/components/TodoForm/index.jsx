import { Form, Row, Col, Button, Input } from "antd";
import "./style.css";
import { useContext } from "react";
import { AppContext } from "../../context/AppContextProvider";
// import { v1 as uuidV1 } from "uuid";

const AddTodoForm = ({ onFormSubmit }) => {
  const [form] = Form.useForm();
  const { user } = useContext(AppContext);
  const authUser = user.uid;
  const onFinish = () => {
    onFormSubmit({
      userID: authUser,
      completed: false,
      title: form.getFieldValue("title"),
      createdAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
    });

    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="horizontal"
      className="todo-form"
    >
      <Row gutter={20}>
        <Col xs={24} sm={24} md={17} lg={19} xl={20}>
          <Form.Item
            name={"title"}
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input size="large" placeholder="Add Task" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={7} lg={5} xl={4}>
          <Button size="large" type="primary" htmlType="submit" block>
            Add Todo
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddTodoForm;
