import React from 'react'
import { Layout, Divider } from 'antd'
import WebBreadcrumb from '@/components/WebBreadcrumb'

const SubLevel = () => (
    <Layout>
        <div>
            <WebBreadcrumb arr={['多级导航']} />
        </div>
        <div className='base-style'>
            <h3>多级导航</h3>
            <Divider />
            <p>这个是多级导航</p>
        </div>
    </Layout>
)

export default SubLevel
