import React from 'react'
import { Layout, Divider, Menu, Dropdown, Row, Col, message, Button } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import WebBreadcrumb from '@/components/WebBreadcrumb'
import '@/style/view-style/dropdown.less'

const { SubMenu } = Menu

const onClick = ({ key }) => {
    message.info(`Click on item ${key}`)
}

const menu = (
    <Menu onClick={onClick}>
        <Menu.Item key='0'>1st menu item</Menu.Item>
        <Menu.Item key='1'>2nd menu item</Menu.Item>
        <Menu.Item key='2' disabled>
            3rd menu item (disabled)
        </Menu.Item>
        <SubMenu title='sub menu'>
            <Menu.Item>4rd menu item</Menu.Item>
            <Menu.Item>5th menu item</Menu.Item>
        </SubMenu>
    </Menu>
)

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
                    <Dropdown menu={menu}>
                        <Button type='link'>
                            Hover me <DownOutlined />
                        </Button>
                    </Dropdown>
                </div>
                <div className='base-style'>
                    <Dropdown menu={menu} placement='bottomLeft'>
                        <Button>bottomLeft</Button>
                    </Dropdown>
                    <Dropdown menu={menu} placement='bottom'>
                        <Button>bottom</Button>
                    </Dropdown>
                    <Dropdown menu={menu} placement='bottomRight'>
                        <Button>bottomRight</Button>
                    </Dropdown>
                    <br />
                    <Dropdown menu={menu} placement='topLeft'>
                        <Button>topLeft</Button>
                    </Dropdown>
                    <Dropdown menu={menu} placement='top'>
                        <Button>top</Button>
                    </Dropdown>
                    <Dropdown menu={menu} placement='topRight'>
                        <Button>topRight</Button>
                    </Dropdown>
                </div>
            </Col>
            <Col span={8}>
                <div className='base-style'>
                    <Dropdown menu={menu} trigger={['click']}>
                        <Button type='link'>
                            Click me <DownOutlined />
                        </Button>
                    </Dropdown>
                </div>
            </Col>
            <Col span={8}>
                <div className='base-style'>
                    <div id='components-dropdown-demo-dropdown-button'>
                        <Dropdown.Button onClick={handleButtonClick} menu={menu}>
                            Dropdown
                        </Dropdown.Button>
                        <Dropdown.Button menu={menu} icon={<UserOutlined />}>
                            Dropdown
                        </Dropdown.Button>
                        <Dropdown.Button onClick={handleButtonClick} menu={menu} disabled>
                            Dropdown
                        </Dropdown.Button>
                        <Dropdown menu={menu}>
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
