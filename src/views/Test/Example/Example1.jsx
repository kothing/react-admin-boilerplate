import React, { useReducer } from 'react'
import { Button } from 'antd'

const initialState = {
    past: [],
    present: {
        count: 0
    },
    future: []
}

function init(initialState) {
    return {
        past: [],
        present: initialState.present,
        future: []
    }
}
function reducer(state, action) {
    const { past, future, present } = state
    switch (action.type) {
        case 'UNDO':
            const previous = past[past.length - 1]
            const newPast = past.slice(0, past.length - 1)
            return {
                past: newPast,
                present: previous,
                future: [present, ...future]
            }
        case 'INCREMENT':
            past.push(present)
            return {
                ...state,
                past: past,
                present: {
                    count: present.count + 1
                }
            }
        case 'REDO':
            const next = future[0]
            const newFuture = future.slice(1)
            return {
                past: [...past, present],
                present: next,
                future: newFuture
            }
        default:
            return state
    }
}

const Example1 = () => {
    const [state, dispatch] = useReducer(reducer, initialState, init)
    return (
        <div className='base-style'>
            <p>{state.present.count}</p>
            {state.past && state.past.length > 0 ? (
                <Button onClick={() => dispatch({ type: 'UNDO' })}>后退UNDO</Button>
            ) : (
                <Button disabled>后退UNDO</Button>
            )}{' '}
            <Button onClick={() => dispatch({ type: 'INCREMENT' })}>增加INCREMENT</Button>{' '}
            {state.future && state.future.length > 0 ? (
                <Button onClick={() => dispatch({ type: 'REDO' })}>前进REDO</Button>
            ) : (
                <Button disabled>前进REDO</Button>
            )}
        </div>
    )
}

export default Example1
