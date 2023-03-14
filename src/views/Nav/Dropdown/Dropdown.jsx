import React from 'react'
import { Layout, Divider, Menu, Dropdown, Row, Col, message, Button } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import WebBreadcrumb from '@/components/WebBreadcrumb'
import '@/style/view-style/dropdown.less'

const items = [
    { key: "1", label: "1st menu item" },
    { key: "2", label: "2nd menu item" },
    { key: "3", label: "3rd menu item", disabled: true, },
    {
        label: 'sub menu',
        key: 'submenu',
        children: [
            { key: "4", label: "4rd menu item" },
            { key: "5", label: "5th menu item" },
        ],
    },
];

function handleButtonClick(e) {
    message.info('Click on left button.')
    console.log('click left button', e)
}

const DropdownView = () => (
    <Layout className='animated fadeIn'>
        <div>
            <WebBreadcrumb arr={['导航', '下拉菜单']}></WebBreadcrumb>
        </div>
        <div className='base-style'>
            <h3>何时使用</h3>
            <Divider />
            <p>
                当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。
            </p>
        </div>
        <Row gutter={8}>
            <Col span={8}>
                <div className='base-style'>
                    <Dropdown menu={{items}}>
                        <Button type='link'>
                            Hover me <DownOutlined />
                        </Button>
                    </Dropdown>
                </div>
                <div className='base-style'>
                    <Dropdown menu={{items}} placement='bottomLeft'>
                        <Button>bottomLeft</Button>
                    </Dropdown>
                    <Dropdown menu={{items}} placement='bottom'>
                        <Button>bottom</Button>
                    </Dropdown>
                    <Dropdown menu={{items}} placement='bottomRight'>
                        <Button>bottomRight</Button>
                    </Dropdown>
                    <br />
                    <Dropdown menu={{items}} placement='topLeft'>
                        <Button>topLeft</Button>
                    </Dropdown>
                    <Dropdown menu={{items}} placement='top'>
                        <Button>top</Button>
                    </Dropdown>
                    <Dropdown menu={{items}} placement='topRight'>
                        <Button>topRight</Button>
                    </Dropdown>
                </div>
            </Col>
            <Col span={8}>
                <div className='base-style'>
                    <Dropdown menu={{items}} trigger={['click']}>
                        <Button type='link'>
                            Click me <DownOutlined />
                        </Button>
                    </Dropdown>
                </div>
            </Col>
            <Col span={8}>
                <div className='base-style'>
                    <div id='components-dropdown-demo-dropdown-button'>
                        <Dropdown.Button onClick={handleButtonClick} menu={{items}}>
                            Dropdown
                        </Dropdown.Button>
                        <Dropdown.Button menu={{items}} icon={<UserOutlined />}>
                            Dropdown
                        </Dropdown.Button>
                        <Dropdown.Button onClick={handleButtonClick} menu={{items}} disabled>
                            Dropdown
                        </Dropdown.Button>
                        <Dropdown menu={{items}}>
                            <Button>
                                Button <DownOutlined />
                            </Button>
                        </Dropdown>
                    </div>
                </div>
            </Col>
        </Row>
    </Layout>
)

export default DropdownView
