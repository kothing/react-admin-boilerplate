import React from 'react'
import '../style.less'
import './example2.less'
import BasicExample from './Basic.jsx'
import ReducerExample from './Reducer.jsx'
import SubscribeExample from './Subscribe.jsx'

const Example2 = () => {
    return (
        <div className='base-style'>
            <h1>React hook state management tool</h1>
            <div className='example-box'>
                <h2>1. Basic example</h2>
                <BasicExample />
            </div>

            <div className='example-box'>
                <h2>2. Reducer example</h2>
                <ReducerExample />
            </div>

            <div className='example-box'>
                <h2>3. Subscribe example</h2>
                <SubscribeExample />
            </div>

            <div className='example-box'></div>
        </div>
    )
}

export default Example2
