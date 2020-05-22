import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { createStore, useStore } from "@/utils/React-Storage-Factory";
import axios from "@/api";

// this one is more complex, it has a name and a reducer function
createStore(
  // Store name
  "todoList",

  //Store state
  {
    idCount: 0,
    todos: [{ id: 0, title: "buy milk" }]
  },

  //Reducer
  (state, action) => {
    // when a reducer is being used, you must return a new state object
    switch (action.type) {
      case "init":
        return {
          ...state,
          todos: action.payload,
        };
      case "create":
        const id = ++state.idCount;
        return {
          ...state,
          todos: [...state.todos, { id, title: action.payload }]
        };
      case "delete":
        return {
          ...state,
          todos: state.todos.filter(todo => todo.id !== action.payload)
        };
      default:
        return state;
    }
  }
);

const Example2 = () => {

  //TodoList
  function TodoList() {
    // Grab the correct store by specifying its namespace
    const [state, dispatch] = useStore("todoList");
    const [form] = Form.useForm();

    useEffect(() => {
      async function ts () {
        let d = await axios.get("/todos").then(res => {
          console.log(res.data);
          return res.data.slice(-10, -1);
        }).catch(err => {
          console.error(err);
        });
        dispatch({
          type: "init",
          payload: d
        });
      };
      ts();
    }, [dispatch]);
    
    const onFinish = values => {
      console.log("Success:", values);
      dispatch({ type: "create", payload: values.todo });
      form.resetFields();
    };

    const onFinishFailed = errorInfo => {
      console.log("Failed:", errorInfo);
    };
    
    const deleteTodo = id => dispatch({ type: "delete", payload: id });

    return (
      <>
        <h2>TODOLIST</h2>
        <Form
          name="todolist"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="inline"
          form={form}
        >
          <Form.Item
            label="Todo"
            name="todo"
            rules={[{ required: true, message: "Please input your content!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <br />
        <ul>
          {state.todos.map(todo => (
            <li key={todo.id}>
              <span>{todo.title}</span>{" "}
              <button
                onClick={() => deleteTodo(todo.id)}
                type="button"
                style={{cursor: "pointer"}}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <div className="base-style">
      <TodoList />
    </div>
  );
};

export default Example2;
