import React, { useState } from "react";
import { Layout, Divider, Row, Col, Menu, Button, Switch } from "antd";
import {
    AppstoreOutlined,
    MailOutlined,
    AppstoreAddOutlined,
    SettingOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    DesktopOutlined
} from "@ant-design/icons";
import WebBreadcrumb from "@/components/WebBreadcrumb";

const MenuView = () => {
    const [current, setCurrent] = useState("mail");
    const [collapsed, setCollapsed] = useState(false);
    const [openKeys, setOpenkeys] = useState(["sub1"]);
    const [mode, setMode] = useState("inline");
    const [theme, setTheme] = useState("light");

    const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

    const handleClick = e => {
        console.log("click ", e);
        setCurrent(e.key);
    };

    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        setOpenkeys(prevState => {
            if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                return openKeys;
            } else {
                return latestOpenKey ? [latestOpenKey] : [];
            }
        });
    };

    const getItem = (label, key, icon, children, type) => {
        return {
            key,
            icon,
            children,
            label,
            type
        };
    };

    const items = [
        getItem("Navigation One", "sub1", <MailOutlined />, [
            getItem("Item 1", "g1", null, [getItem("Option 1", "1"), getItem("Option 2", "2")], "group"),
            getItem("Item 2", "g2", null, [getItem("Option 3", "3"), getItem("Option 4", "4")], "group")
        ]),
        getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
            getItem("Option 5", "5"),
            getItem("Option 6", "6"),
            getItem("Submenu", "sub3", null, [getItem("Option 7", "7"), getItem("Option 8", "8")])
        ]),
        getItem("Navigation Three", "sub4", <SettingOutlined />, [
            getItem("Option 9", "9"),
            getItem("Option 10", "10"),
            getItem("Option 11", "11"),
            getItem("Option 12", "12")
        ])
    ];

    const items2 = [
        getItem("Navigation One", "sub1", <MailOutlined />, [
            getItem("Option 1", "1"),
            getItem("Option 2", "2"),
            getItem("Option 3", "3"),
            getItem("Option 4", "4")
        ]),
        getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
            getItem("Option 5", "5"),
            getItem("Option 6", "6"),
            getItem("Submenu", "sub3", null, [getItem("Option 7", "7"), getItem("Option 8", "8")])
        ]),
        getItem("Navigation Three", "sub4", <SettingOutlined />, [
            getItem("Option 9", "9"),
            getItem("Option 10", "10"),
            getItem("Option 11", "11"),
            getItem("Option 12", "12")
        ])
    ];

    const items3 = [
        {
            label: "Option One",
            key: "mail",
            icon: <MailOutlined />
        },
        {
            label: "Option Two",
            key: "app",
            icon: <AppstoreOutlined />
        },
        {
            label: "Option Tree",
            key: "store",
            icon: <AppstoreAddOutlined />
        },
        {
            label: "Navigation Three",
            key: "SubMenu",
            icon: <SettingOutlined />,
            children: [
                {
                    label: "Option 1",
                    key: "setting:1",
                    icon: <PieChartOutlined />
                },
                {
                    label: "Option 2",
                    key: "setting:2",
                    icon: <DesktopOutlined />
                },
                {
                    label: "Option 3",
                    key: "setting:3"
                },
                {
                    label: "Option 4",
                    key: "setting:4"
                }
            ]
        },
        {
            label: "Navigation Four",
            key: "SubMenu2",
            icon: <SettingOutlined />,
            children: [
                {
                    type: "group",
                    label: "Item 11",
                    children: [
                        {
                            label: "Option 11",
                            key: "setting:11"
                        },
                        {
                            label: "Option 12",
                            key: "setting:12"
                        }
                    ]
                },
                {
                    type: "group",
                    label: "Item 22",
                    children: [
                        {
                            label: "Option 23",
                            key: "setting:23"
                        },
                        {
                            label: "Option 24",
                            key: "setting:24"
                        }
                    ]
                }
            ]
        }
    ];

    return (
        <Layout className="animated fadeIn">
            <div>
                <WebBreadcrumb arr={["导航", "下拉菜单"]}></WebBreadcrumb>
            </div>
            <div className="base-style">
                <h3>何时使用</h3>
                <Divider />
                <p>
                    导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。
                </p>
            </div>
            <Row gutter={8}>
                <Col span={24}>
                    <div className="base-style">
                        <Divider orientation="left">顶部导航</Divider>
                        <Menu
                            onClick={handleClick}
                            selectedKeys={[current]}
                            mode="horizontal"
                            items={[
                                {
                                    label: "Navigation One",
                                    key: "mail",
                                    icon: <MailOutlined />
                                },
                                {
                                    label: "Navigation Two",
                                    key: "app",
                                    icon: <AppstoreOutlined />,
                                    disabled: true
                                },
                                {
                                    label: "Navigation Three - Submenu",
                                    key: "SubMenu",
                                    icon: <SettingOutlined />,
                                    children: [
                                        {
                                            type: "group",
                                            label: "Item 1",
                                            children: [
                                                {
                                                    label: "Option 1",
                                                    key: "setting:1"
                                                },
                                                {
                                                    label: "Option 2",
                                                    key: "setting:2"
                                                }
                                            ]
                                        },
                                        {
                                            type: "group",
                                            label: "Item 2",
                                            children: [
                                                {
                                                    label: "Option 3",
                                                    key: "setting:3"
                                                },
                                                {
                                                    label: "Option 4",
                                                    key: "setting:4"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    label: (
                                        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                                            Navigation Four - Link
                                        </a>
                                    ),
                                    key: "alipay"
                                }
                            ]}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div className="base-style">
                        <Divider>内嵌菜单</Divider>
                        <Menu
                            onClick={handleClick}
                            style={{ width: 256 }}
                            defaultSelectedKeys={["1"]}
                            defaultOpenKeys={["sub1"]}
                            mode="inline"
                            items={items}
                        />
                    </div>
                    <div className="base-style">
                        <Divider>只展开当前父级菜单</Divider>
                        <Menu
                            mode="inline"
                            openKeys={openKeys}
                            onOpenChange={onOpenChange}
                            style={{ width: 256 }}
                            items={items2}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div className="base-style">
                        <Divider>可收缩菜单</Divider>
                        <div style={{ width: 256 }}>
                            <Button
                                type="primary"
                                onClick={() => setCollapsed(!collapsed)}
                                style={{ marginBottom: 16 }}>
                                {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                            </Button>
                            <Menu
                                defaultSelectedKeys={["mail"]}
                                defaultOpenKeys={["SubMenu"]}
                                mode="inline"
                                theme="dark"
                                inlineCollapsed={collapsed}
                                items={items3}
                            />
                        </div>
                    </div>

                    <div className="base-style">
                        <Divider>可切换动态菜单</Divider>
                        <div>
                            <Switch onChange={val => setMode(() => (val ? "vertical" : "inline"))} /> Change Mode
                            <span className="ant-divider" style={{ margin: "0 1em" }} />
                            <Switch onChange={val => setTheme(() => (val ? "dark" : "light"))} /> Change Theme
                            <br />
                            <br />
                            <Menu
                                style={{ width: 256 }}
                                defaultSelectedKeys={["1"]}
                                defaultOpenKeys={["sub1"]}
                                mode={mode}
                                theme={theme}
                                items={items3}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </Layout>
    );
};

export default MenuView;
