import React, { useEffect, useRef } from 'react';
import { Layout, Divider } from 'antd';
import WebBreadcrumb from '@/components/WebBreadcrumb';
import { createStore, useStore } from "@/utils/React-Storage-Factory";
import axios from '@/api'

// this one is more complex, it has a name and a reducer function
createStore(
    // Store name
    "todoList",

    //Store state
    {
        idCount: 0,
        todos: [{ id: 0, text: "buy milk" }]
    },

    //Reducer
    (state, action) => {
        // when a reducer is being used, you must return a new state object
        switch (action.type) {
            case "create":
                const id = ++state.idCount;
                return {
                    ...state,
                    todos: [...state.todos, { id, text: action.payload }]
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

const AboutView = () => {
    useEffect(() => {
        axios.get(`/todolist`).then(res => {
            console.log(res)
        }).catch(err => {
            console.error(err)
        })
    });


    //TodoList
    function TodoList() {
        // Grab the correct store by specifying its namespace
        const [state, dispatch] = useStore("todoList");
        const inputRef = useRef(null);
        const onSubmit = e => {
            e.preventDefault();
            const todo = inputRef.current.value;
            inputRef.current.value = "";
            dispatch({ type: "create", payload: todo });
        };
        const deleteTodo = id => dispatch({ type: "delete", payload: id });

        return (
            <div>
                <form onSubmit={onSubmit}>
                    <input ref={inputRef} />
                    <button>Create TODO</button>
                </form>
                <ul>
                    <h2>TODOLIST</h2>
                    {state.todos.map(todo => (
                        <li key={todo.id}>
                            {todo.text}{" "}
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                type="button"
                            >
                                X
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <Layout>
            <div className="web-breadcrumb">
                <WebBreadcrumb arr={['关于']}></WebBreadcrumb>
            </div>
            <div className='base-style'>
                <h3>关于作者</h3>
                <Divider />
                <p>这个人很懒，什么都没有留下……</p>
    
                <hr/>
                <br/>
                <TodoList />
            </div>
        </Layout>
    )
}

export default AboutView;
