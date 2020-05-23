import React, { useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import { createStore, useStore } from '@/utils/HookStore'
import axios from '@/api'

let initState = {
    idCount: 0,
    todos: [{ id: 0, title: 'buy milk' }]
}

// 创建store,
// 把createStore()放在组件外面，防止组件重新渲染时再次createStore()重复创建同名Store name
createStore(
    // Store name
    'todoList',

    //Store state
    initState,

    //Reducer
    (state, action) => {
        // when a reducer is being used, you must return a new state object
        switch (action.type) {
            case 'init':
                return {
                    ...state,
                    todos: action.payload
                }
            case 'create':
                const id = ++state.idCount
                return {
                    ...state,
                    todos: [...state.todos, { id, title: action.payload }]
                }
            case 'delete':
                return {
                    ...state,
                    todos: state.todos.filter(todo => todo.id !== action.payload)
                }
            default:
                return state
        }
    }
)

// reducer-example
const ReducerExample = () => {
    // Grab the correct store by specifying its namespace
    const [state, dispatch] = useStore('todoList')

    useEffect(() => {
        async function init() {
            const todlist = await axios
                .get('/todos')
                .then(res => {
                    console.log(res.data)
                    return res.data.slice(-10, -1)
                })
                .catch(err => {
                    console.error(err)
                })
            dispatch({
                type: 'init',
                payload: todlist
            })
        }
        init()
    }, [dispatch])

    // AddTodo
    const AddTodo = () => {
        const [form] = Form.useForm()

        const onFinish = values => {
            console.log('Success:', values)
            dispatch({ type: 'create', payload: values.todo })
            form.resetFields()
        }

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo)
        }

        return (
            <Form name='addTodo' onFinish={onFinish} onFinishFailed={onFinishFailed} layout='inline' form={form}>
                <Form.Item label='Todo' name='todo' rules={[{ required: true, message: 'Please input your content!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        )
    }

    // TodoList
    const TodoList = () => {
        const deleteTodo = id => dispatch({ type: 'delete', payload: id })
        return (
            <ul>
                {state.todos.map(todo => (
                    <li key={todo.id}>
                        <span>{todo.title}</span>{' '}
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            type='button'
                            style={{ border: 'none', padding: '0 6px', cursor: 'pointer' }}>
                            X
                        </button>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div style={{ backgroundColor: '#f5f5f5', padding: 10 }}>
            <h2>TODOLIST</h2>
            <AddTodo />
            <TodoList />
        </div>
    )
}

export default ReducerExample
