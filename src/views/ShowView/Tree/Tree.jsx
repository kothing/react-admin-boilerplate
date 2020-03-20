import React from 'react';
import WebBreadcrumb from '@/components/WebBreadcrumb';
import { Layout, Divider, Row, Col } from 'antd';

//自定义组件
import BaseTree from './components/BaseTree';
import SearchTree from './components/SearchTree';
import ControlledTree from './components/ControlledTree';
import DraggableTree from './components/DraggableTree';

/**
 * TreeView
 */
const TreeView = () => {
    return (
        <Layout className='animated fadeIn'>
            <div>
                <WebBreadcrumb arr={['展示', '树形控件']}></WebBreadcrumb>
            </div>
            <div className='base-style'>
                <h3>何时使用</h3>
                <Divider />
                <p>
                    文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能。
                </p>
            </div>
            <Row gutter={8}>
                <Col span={12}>
                    <div className='base-style'>
                        <Divider orientation='left'>基础用法</Divider>
                        <BaseTree />
                    </div>
                    <div className='base-style'>
                        <Divider orientation='left'>可搜索</Divider>
                        <SearchTree />
                    </div>
                </Col>
                <Col span={12}>
                    <div className='base-style'>
                        <Divider orientation='left'>受控控件</Divider>
                        <ControlledTree />
                    </div>
                    <div className='base-style'>
                        <Divider orientation='left'>可拖拽</Divider>
                        <DraggableTree />
                    </div>
                </Col>
            </Row>
        </Layout>
    )
}

export default TreeView;
