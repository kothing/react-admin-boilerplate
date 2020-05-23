import React from 'react'
import { Button } from 'antd'
import { createStore, useStore } from '@/utils/HookStore'

// basic-example
const BasicExample = () => {
    const basicExampleStyles = {
        padding: 10,
        backgroundColor: '#f5f5f5',
        marginTop: 10,
        color: 'black'
    }

    createStore('clickCounter', 0)

    const AnComponent = () => {
        const [timesClicked, setTimesClicked] = useStore('clickCounter')

        return (
            <div style={{ ...basicExampleStyles }}>
                <h2>An component!</h2>
                <p>The button inside this component was clicked {timesClicked} times</p>
                <Button onClick={() => setTimesClicked(timesClicked + 1)}>Update</Button>
            </div>
        )
    }

    const AnotherComponent = () => {
        // you can name the state however you want.
        const [value] = useStore('clickCounter')
        return (
            <div style={{ ...basicExampleStyles }}>
                <h2>Hello, this is a second component, with no relation to the one on thetop</h2>
                <p>But it is still aware of how many times the button was clicked: {value}</p>
            </div>
        )
    }

    return (
        <>
            <AnComponent />
            <AnotherComponent />
        </>
    )
}
export default BasicExample
