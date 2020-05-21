import React from 'react';
import { Layout, Divider } from 'antd';
import WebBreadcrumb from '@/components/WebBreadcrumb';

const AboutView = () => {
    return (
        <Layout>
            <div className="web-breadcrumb">
                <WebBreadcrumb arr={['关于']}></WebBreadcrumb>
            </div>
            <div className='base-style'>
                <h3>关于作者</h3>
                <Divider />
                <p>这个人很懒，什么都没有留下……</p>
            </div>
        </Layout>
    )
}

export default AboutView;
