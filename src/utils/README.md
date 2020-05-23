# React hook store

A Lightweight React state management library based on Hooks

# Table of Contents

-   [Installation](#installation)
-   Usage
    -   [Basic](#usage_basic)
    -   [Referencing stores](#usage_namespace)
    -   [Reducer powered stores](#usage_reducer)
    -   [More examples](#more_examples)
-   API
    -   [createStore](#api_createStore)
    -   [getStoreByName](#api_getStoreByName)
    -   [StoreInterface](#api_storeInterface)
    -   [useStore](#api_useStore)

## <a name="usage">Usage</a>

### <a name="usage_basic">Basic</a>

This is the most basic implementation of the library. create a store with its initial state.
Later, call `useStore` inside components to retrieve its state and setState method.
The value passed as the first argument to the setState method will be the new state. no reducer required (but you can use a reducer, see the advanced example down below).

```javascript
import React from 'react'
import { createStore, useStore } from './react-hook-store'

createStore('clickStore', 0)

function StatefullHello() {
    // just use the useStore method to grab the state and the setState methods
    const [timesClicked, setClicks] = useStore('clickStore')

    return (
        <div>
            <h1>Hello, component!</h1>
            <h2>The button inside this component was clicked {timesClicked} times</h2>
            <button type='button' onClick={() => setClicks(timesClicked + 1)}>
                Update
            </button>
        </div>
    )
}

function AnotherComponent() {
    // you can name the state whatever you want
    const [timesClicked] = useStore('clickStore')
    return (
        <div>
            <h1>Hello, this is a second component, with no relation to the one on the top</h1>
            <h2>But it is still aware of how many times the button was clicked: {timesClicked} </h2>
        </div>
    )
}
```

### <a name="usage_namespace">Referencing stores</a>

It is possible to create multiple stores in an app.
Stores can be referenced by using their instance that is returned by the createStore method, as well as using their name.

```javascript
import React from 'react'
import { createStore, useStore } from './react-hook-store'

const clickCount = createStore('clickCountStore', 0)
createStore('nameStore', 'John Doe')

// counter will start at 2
clickCount.setState(2)

function StatefullHello() {
    // this line will reference a store by its instance
    const [clicks, setClicks] = useStore(clickCount)
    // this line will reference a store by its name
    const [name] = useStore('nameStore')

    return (
        <div>
            <h1>Hello, {name}!</h1>
            <h2>The button inside this component was clicked {clicks} times</h2>
            <button type='button' onClick={() => setClicks(clicks + 1)}>
                Update
            </button>
        </div>
    )
}
```

Both methods can be used and mixed according to the needs, but we recomend using the instance identifiers.

### <a name="usage_reducer">Reducer powered stores</a>

We can delegate the state management to reducers (just like redux!) if we want.

```javascript
import React from 'react'
import { createStore, useStore } from './react-hook-store'

const todoListStore = createStore(
    'todoList',
    {
        idCount: 0,
        todos: [{ id: 0, text: 'buy milk' }]
    },
    (state, action) => {
        // when a reducer is being used, you must return a new state value
        switch (action.type) {
            case 'add':
                const id = ++state.idCount
                return {
                    ...state,
                    todos: [...state.todos, { id, text: action.payload }]
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

function AddTodo() {
    const [state, dispatch] = useStore('todoList')
    const inputRef = React.useRef(null)

    const onSubmit = e => {
        e.preventDefault()
        const todo = inputRef.current.value
        inputRef.current.value = ''
        dispatch({ type: 'add', payload: todo })
    }

    return (
        <form onSubmit={onSubmit}>
            <input ref={inputRef} />
            <button>Create TODO</button>
        </form>
    )
}

function TodoList() {
    const [{ todos }, dispatch] = useStore(todoListStore)
    const deleteTodo = id => dispatch({ type: 'delete', payload: id })
    return (
        <ul>
            <h2>TODOLIST</h2>
            {todos.map(todo => (
                <li key={todo.id}>
                    {todo.text}{' '}
                    <button onClick={() => deleteTodo(todo.id)} type='button'>
                        X
                    </button>
                </li>
            ))}
        </ul>
    )
}

export { TodoList, AddTodo }
```

### <a name="more_examples">More examples</a>

**basic-example**

```javascript
import React from 'react'
import { createStore, useStore } from './react-hook-store'

const defaultStyles = {
    padding: 10,
    backgroundColor: 'navy',
    marginTop: 10,
    color: 'white'
}

createStore('clickCounter', 0)

export function StatefulHello() {
    const [timesClicked, setTimesClicked] = useStore('clickCounter')

    return (
        <div style={{ ...defaultStyles }}>
            <h2>Hello, component!</h2>
            <p>The button inside this component was clicked {timesClicked} times</p>
            <button type='button' onClick={() => setTimesClicked(timesClicked + 1)}>
                Update
            </button>
        </div>
    )
}

export function AnotherComponent() {
    // you can name the state however you want.
    const [value] = useStore('clickCounter')
    return (
        <div style={{ ...defaultStyles, backgroundColor: 'lightgray', color: 'black' }}>
            <h2>Hello, this is a second component, with no relation to the one on the top</h2>
            <p>But it is still aware of how many times the button was clicked: {value}</p>
        </div>
    )
}
```

**reducer-example**

```javascript
import React, { useRef } from 'react'
import { createStore, useStore } from './react-hook-store'

// this one is more complex, it has a name and a reducer function
createStore(
    'todoList',
    {
        idCount: 0,
        todos: [{ id: 0, text: 'buy milk' }]
    },
    (state, action) => {
        // when a reducer is being used, you must return a new state object
        switch (action.type) {
            case 'create':
                const id = ++state.idCount
                return {
                    ...state,
                    todos: [...state.todos, { id, text: action.payload }]
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

export function AddTodo() {
    const [state, dispatch] = useStore('todoList')
    const inputRef = useRef(null)

    const onSubmit = e => {
        e.preventDefault()
        if (inputRef.current.value.trim() === '') {
            return
        }
        const todo = inputRef.current.value
        inputRef.current.value = ''
        dispatch({ type: 'create', payload: todo })
    }

    return (
        <form onSubmit={onSubmit}>
            <input ref={inputRef} />
            <button>Create TODO</button>
        </form>
    )
}

export function TodoList() {
    // Grab the correct store by specifying its namespace
    const [state, dispatch] = useStore('todoList')
    const deleteTodo = id => dispatch({ type: 'delete', payload: id })
    return (
        <ul>
            <h2>TODOLIST</h2>
            {state.todos.map(todo => (
                <li key={todo.id}>
                    {todo.text}{' '}
                    <button onClick={() => deleteTodo(todo.id)} type='button'>
                        X
                    </button>
                </li>
            ))}
        </ul>
    )
}
```

**subscribe-example**

```javascript
import React from 'react'
import { createStore, useStore } from './react-hook-store'

const defaultStyles = {
    padding: 10,
    backgroundColor: 'turquoise',
    marginTop: 10,
    color: 'black'
}

const store = createStore('clickCounter2', 0)

// this will execute everytime the state is updated
const unsubscribe = store.subscribe(state => {
    alert('You increased the counter!')
    if (state >= 3) {
        //after three executions, lets unsubscribe to get rid of the alert!
        unsubscribe()
    }
})

export default function SubscriptionExample() {
    const [state, setState] = useStore(store)

    return (
        <div style={{ ...defaultStyles }}>
            <h2>Hello, component!</h2>
            <h3>The button inside this component was clicked {state} times</h3>
            <p> After 3 clicks, you won't receive anymore alerts! </p>
            <button type='button' onClick={() => setState(state + 1)}>
                Update
            </button>
        </div>
    )
}
```

## Methods API

### <a name="api_createStore">`createStore(name:String, state?:*, reducer?:Function):StoreInterface`</a>

Creates a store to be used across the entire application. Returns a StoreInterface object.

#### Arguments

**`name:String`**  
The namespace for your store, it can be used to identify the store across the application.

**`state:* = {}`**  
The store's initial state. it can be any data type. defaults to an empty object. Optional

**`reducer:Function`**  
You can specify a reducer function to take care of state changes. the reducer functions receives two arguments, the previous state and the action that triggered the state update. the function must return a new state, if not, the new state will be `null`. Optional

### <a name="api_getStoreByName">`getStoreByName(name:String):StoreInterface`</a>

Finds a store by its name and returns its instance.

#### Arguments

**`name:String`**  
The name of the store.

### <a name="api_useStore">`useStore(identifier:String|StoreInterface):Array[state, setState|dispatch]`</a>

A function that returns a pair with the current state and a function to trigger state updates for the specified store.

#### Arguments

**`Identifier:String|StoreInterface`**  
The store identifier. It can be either its string name or its StoreInterface instance returned by a createStore or getStoreByName method.

## Objects API

### <a name="api_storeInterface">`StoreInterface`</a>

The store instance that is returned by the createStore and getStoreByName methods.

#### Interface

**`name:String`**  
The name of the store;

**`getState:Function():*`**  
A method that returns the store's current state

**`setState:Function(state:*, callback?:Function)`**  
Sets the state of the store. works if the store does not use a reducer state handler. Otherwise, use `dispatch`. callback is optional and will be invoked once the state is updated, receiving the updated state as argument.

**`dispatch:Function(action:*, callback?:Function)`**  
Dispatches whatever is passed into this function to the store. works if the store uses a reducer state handler. Otherwise, use `setState`. callback is optional and will be invoked once the state is updated, receiving the updated state as argument.

**`subscribe:Function(callback:Function):unsubscribe:Function`**  
The callback function will be invoked everytime the store state changes. If the store is reducer-based, the callback function will be called with `action` as the first argument and `state` as the second. otherwise, it'll be called with `state` as the only argument.

the subscribe method returns a function that can be called in order to cancel the subscription for the callback function.
