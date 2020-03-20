import React, { useState } from 'react';
import WebBreadcrumb from '@/components/WebBreadcrumb'
import {
    Alert,
    Layout,
    Row,
    Col,
    Divider,
    Form,
    Button,
    Input,
    InputNumber,
    Checkbox,
    Tooltip,
    // Cascader,
    Select,
    DatePicker,
    Radio,
    Rate,
    Switch,
    Slider,
    AutoComplete,
    message
} from 'antd';
import { UserOutlined, LockOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import '@/style/view-style/form.scss'

const { Option } = Select

const residences = [
    {
        value: 'beijing',
        label: '北京',
        children: [
            {
                value: 'beijing',
                label: '北京',
                children: [
                    {
                        value: 'dongcheng',
                        label: '东城区'
                    },
                    {
                        value: 'chaoyang',
                        label: '朝阳区'
                    }
                ]
            }
        ]
    },
    {
        value: 'xizang',
        label: '西藏',
        children: [
            {
                value: 'lasa',
                label: '拉萨',
                children: [
                    {
                        value: 'chengguan',
                        label: '城关区'
                    }
                ]
            },
            {
                value: 'ali',
                label: '阿里地区',
                children: [
                    {
                        value: 'gaer',
                        label: '噶尔县'
                    }
                ]
            }
        ]
    }
]

const FromView = props => {
    const [confirmDirty, setConfirmDirty] = useState(false);
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
    const [visible, setVisible] = useState(true);

    const handleLoginFinish = values => {

    }

    const handleSubmitFinish = values => {
        console.log('这就是你填好的数据' + values)
        message.info('你很棒哦,这么快就填好了!')
    };

    const handleSubmitFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleEmailChange = value => {
        if (!value) {
            setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult(['@google.com', '@163.com', '@qq.com'].map(domain => `${value}${domain}`));
        }
    };

    const formItemLayout = {
        labelCol: {
            xs: { span: 16 },
            sm: { span: 6 }
        },
        wrapperCol: {
            xs: { span: 16 },
            sm: { span: 10 }
        }
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 16,
                offset: 0
            },
            sm: {
                span: 10,
                offset: 6
            }
        }
    };

    const prefixSelector = (
        <Form.Item name="phonePrefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );

    const websiteOptions = autoCompleteResult.map(website => (
        {
            label: website,
            value: website,
        }
    ));

    return (
        <Layout className='animated fadeIn'>
            <div>
                <WebBreadcrumb arr={['表单', '基础表单']}></WebBreadcrumb>
            </div>
            <div className='base-style'>
                <h3>何时使用</h3>
                <Divider></Divider>
                <p>用于创建一个实体或收集信息。</p>
                <p>需要对输入的数据类型进行校验时。</p>
            </div>
            <Row>
                <Col>
                    <div className='base-style'>
                        <div>
                            {visible ? (
                                <Alert
                                    message='你最好认真的填写表单!'
                                    type='warning'
                                    closable
                                    banner
                                    afterClose={() => setVisible(false)}
                                />
                            ) : null}
                        </div>

                        <Divider orientation='left'>登录框</Divider>
                        <Row justify="center">
                            <Col span={12} offset={6}>
                                <Form
                                    name="simple_login"
                                    className="login-form"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={handleLoginFinish}
                                    {...formItemLayout}
                                >
                                    <Form.Item
                                        name="username"
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Username!',
                                        },
                                        ]}
                                    >
                                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Password!',
                                        },
                                        ]}
                                    >
                                        <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Form.Item name="remember" valuePropName="checked" noStyle>
                                            <Checkbox>Remember me</Checkbox>
                                        </Form.Item>
                                        <a className="login-form-forgot" href="/">
                                            Forgot password
                                        </a>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            Log in
                                        </Button> 
                                        {" "}Or <a href="/">register now!</a>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>

                        <Divider orientation='left'>基础功能</Divider>
                        <Form
                            {...formItemLayout}
                            name='normal_login'
                            onFinish={handleSubmitFinish}
                            onFinishFailed={handleSubmitFinishFailed}
                            initialValues={{
                                hobby: ['A', 'B'],
                                // adress: ['beijing', 'beijing', 'dongcheng'],
                                rate: 5,
                                phonePrefix: 86,
                                switch: true,
                                slider: 30
                            }}
                            scrollToFirstError
                        >
                            <Form.Item
                                label={
                                    <span>
                                        用户名&nbsp;
                                        <Tooltip title='可以尽量好听点，真的!'>
                                            <QuestionCircleOutlined />
                                        </Tooltip>
                                    </span>
                                }
                                name="username"
                                rules={[{ required: true, message: '请输入用户名' }]}
                                >
                                    <Input placeholder='请输入用户名' />
                            </Form.Item>
                            <Form.Item
                                label='性别'
                                name="sex"
                                rules={ [{ required: true, message: '请选择性别' }]}
                            >
                                <Radio.Group>
                                    <Radio value='man'>男</Radio>
                                    <Radio value='women'>女</Radio>
                                    <Radio value='unknow'>不详</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                label='爱好'
                                name="hobby"
                                rules={[{ required: true, message: '请至少选择一个爱好' }]}
                            >
                                <Checkbox.Group style={{ width: '100%' }}>
                                    <Row>
                                        <Col span={8}>
                                            <Checkbox value='A'>A</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox disabled value='B'>
                                                B
                                            </Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value='C'>C</Checkbox>
                                        </Col>
                                    </Row>
                                </Checkbox.Group>
                            </Form.Item>
                            <Form.Item
                                label='年龄'
                                name='age'
                                rules={[{ required: true, message: '请输入年龄' }]}
                            >
                                <InputNumber placeholder='请输入年龄' style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label='出生年月'
                                name='date-picker'
                                rules={[{ type: 'object', required: true, message: '请选择日期' }]}
                            >
                                <DatePicker style={{ width: '100%' }} placeholder='请选择日期' />
                            </Form.Item>
                            <Form.Item
                                label='邮箱'
                                name='email'
                                rules={[
                                    {
                                        type: 'email',
                                        message: '请输入正确的邮箱!'
                                    },
                                    {
                                        required: true,
                                        message: '请输入邮箱'
                                    }
                                ]}
                            >
                                <AutoComplete
                                    options={websiteOptions}
                                    onChange={handleEmailChange}
                                    placeholder='请输入邮箱'
                                >
                                    <Input />
                                </AutoComplete>
                            </Form.Item>
                            <Form.Item
                                label='密码'
                                name='password'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password placeholder='请输入密码' />
                            </Form.Item>
                            <Form.Item
                                label='确认密码'
                                name='confirm'
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: '请确认密码!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('两次输入密码不一致!');
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    onBlur={e =>
                                        setConfirmDirty(() => (confirmDirty ? confirmDirty : !!e.target.value))
                                    }
                                    placeholder='请确认密码'
                                />
                            </Form.Item>
                            {/* <Form.Item
                                label='家庭住址'
                                name='adress'
                                rules={[{ type: 'array', required: true, message: '请选择住址!' }]}
                            >
                                <Cascader options={residences} placeholder='请选择住址' />
                            </Form.Item> */}
                            <Form.Item
                                label='联系电话'
                                name='phone'
                                extra='你最好写真实的电话号码.'
                                rules={[{ required: true, message: '请输入联系电话!' }]}
                            >
                                <Input addonBefore={prefixSelector} />
                            </Form.Item>
                            <Form.Item
                                label='评分'
                                name='rate'
                                extra='这个项目怎么样.'
                            >
                                <Rate allowHalf />
                            </Form.Item>
                            <Form.Item
                                label='switch'
                                name='switch'
                                valuePropName="checked"
                            >
                                <Switch />
                            </Form.Item>
                            <Form.Item
                                label='slider'
                                shouldUpdate={true}
                            >
                                {({getFieldValue}) => {
                                    return getFieldValue('switch') === true
                                    ? <Form.Item name="slider">
                                            <Slider />
                                        </Form.Item>
                                    : <Form.Item name="slider">
                                            <Slider disabled />
                                        </Form.Item>;
                                }}
                            </Form.Item>
                            <Form.Item
                                {...tailFormItemLayout}
                                name='agreement'
                                valuePropName="checked"
                            >
                                <Checkbox>
                                    阅读并理解 <a href='/'>此协议</a>
                                </Checkbox>
                            </Form.Item>
                            <Form.Item
                                {...tailFormItemLayout}
                                shouldUpdate={true}
                            >
                                {({getFieldValue}) => {
                                    return getFieldValue('agreement') === true
                                    ? <Form.Item>
                                            <Button
                                                type='primary'
                                                htmlType='submit'
                                            >
                                                注册
                                            </Button>
                                        </Form.Item>
                                    : <Form.Item>
                                            <Button
                                                type='primary'
                                                htmlType='submit'
                                                disabled
                                            >
                                                注册
                                            </Button>
                                        </Form.Item>;
                                }}
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Layout>
    );
}

export default FromView;
