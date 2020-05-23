import React from 'react'
import { Button } from 'antd'
import { createStore, useStore } from '@/utils/HookStore'

const SubscribeExample = () => {
    const defaultStyles = {
        padding: 10,
        backgroundColor: '#f5f5f5',
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

    const SubscriptionExample = () => {
        const [state, setState] = useStore(store)

        return (
            <div style={{ ...defaultStyles }}>
                <h3>The button inside this component was clicked {state} times</h3>
                <p> After 3 clicks, you won't receive anymore alerts! </p>
                <Button onClick={() => setState(state + 1)}>Update</Button>
            </div>
        )
    }

    return <SubscriptionExample />
}

export default SubscribeExample
