import React, { useState } from 'react';
import WebBreadcrumb from '@/components/WebBreadcrumb';
import { Layout, Divider, Row, Col, Steps, Button, Form, Input, Select, Alert, Result } from 'antd';
import '@/style/view-style/form.scss'

const { Step } = Steps
const { Option } = Select

const formItemLayout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 8
    }
}

const tailFormItemLayout = {
    wrapperCol: {
        offset: 8
    }
}

const Step1From = props => {
    const [form] = Form.useForm();
    const handleSelectChange = value => {
        form.setFieldsValue({
            Email: `${value === 'kenan' ? 'kenan@google.com' : 'maoli@google.com'}`
        })
    }

    const step1Submit = () => {
        form.validateFields().then((values) => {
            props.getFormData(values)
            props.setCurrent(1)
        }).catch(errorInfo => {
            console.log(errorInfo);
        });
    }

    const typeSelectBefore = (
        <Form.Item
            name='type'
            noStyle
        >
            <Select style={{ width: '10rem' }}>
                <Option value='twitter'>twitter</Option>
                <Option value='facebook'>facebook</Option>
                <Option value='weixin'>微信</Option>
            </Select>
        </Form.Item>
    );
    return (
        <div className='step1From'>
            <Form 
                form={form}
                hideRequiredMark
                initialValues={{
                    user: '柯南',
                    email: 'kenan@google.com',
                    password: '真相只有一个!',
                    code: 'kenan0528',
                    type: 'twitter'
                }}
                {...formItemLayout}
            >
                <Form.Item 
                    label='接收人'
                    name='user'
                    rules={[
                        {
                            required: true,
                            message: '请选择接收人'
                        }
                    ]}
                >
                    <Select onChange={handleSelectChange}>
                        <Option value='柯南'>柯南</Option>
                        <Option value='毛利大叔'>毛利大叔</Option>
                    </Select>
                </Form.Item>
                <Form.Item 
                    label='接收邮箱'
                    name='email'
                    rules={[
                        {
                            required: true,
                            message: '请选择接收人'
                        }
                    ]}
                >
                    <Select disabled>
                        <Option value='kenan@google.com'>kenan@google.com</Option>
                        <Option value='maoli@google.com'>maoli@google.com</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label='暗号'
                    name='password'
                    relues={[
                        {
                            required: true,
                            message: '请输入对接暗号'
                        }
                    ]}
                >
                    <Input placeholder='请输入对接暗号' />
                </Form.Item>
                <Form.Item
                    label='联系方式'
                    name='code'
                    rules={[
                        {
                            required: true,
                            message: '请输入联系方式'
                        }
                    ]}
                >
                    <Input addonBefore={typeSelectBefore} placeholder='请输入联系方式' />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type='primary' onClick={step1Submit}>
                        下一步
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

const Step2From = props => {
    const [visible, setVisible] = useState(true);
    const [iconLoading, setIconLoading] = useState(false);

    const step2Submit = () => {
        setIconLoading(true)
        setTimeout(() => {
            setIconLoading(false)
            props.setCurrent(2)
        }, 2000)
    };

    const { formData } = props;
    return (
        <div className='step2From'>
            <Row>
                <Col span={8} offset={8}>
                    {visible ? (
                        <Alert
                            message='请确保输入正确的暗号，不然他们可能不会理你哦!'
                            type='warning'
                            closable
                            banner
                            afterClose={() => setVisible(false)}
                            {...formItemLayout}
                        />
                    ) : null}
                </Col>
            </Row>
            <Form
                hideRequiredMark
                className='show-data'
                {...formItemLayout}
            >
                <Form.Item label='接收人'>{formData.user}</Form.Item>
                <Form.Item label='接收邮箱'>{formData.email}</Form.Item>
                <Form.Item label='暗号'>{formData.password}</Form.Item>
                <Form.Item label='联系渠道'>{formData.type}</Form.Item>
                <Form.Item label='联系方式'>{formData.code}</Form.Item>
                <Divider />
                <Form.Item {...tailFormItemLayout}>
                    <Button type='primary' loading={iconLoading} onClick={step2Submit}>
                        发送
                    </Button>
                    <Button onClick={() => props.setCurrent(0)}>上一步</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

const Step3From = props => {
    return (
        <Result
            status='success'
            title='发送成功!'
            subTitle='耐心地等待好消息吧!'
            extra={[
                <Button type='primary' key='console' onClick={() => props.setCurrent(0)}>
                    再发一封
                </Button>,
                <Button key='buy'>查看记录</Button>
            ]}
        />
    )
}

const FormStepView = props => {
    const [current, setCurrent] = useState(0)
    const [formData, setFormData] = useState(null)

    return (
        <Layout className='animated fadeIn'>
            <div>
                <WebBreadcrumb arr={['表单', '步骤表单']}></WebBreadcrumb>
            </div>
            <div className='base-style'>
                <h3>何时使用</h3>
                <Divider />
                <p>当用户需要分步收集不同信息时</p>
            </div>
            <Row>
                <Col>
                    <div className='base-style'>
                        <Divider orientation='left'>分步表单</Divider>
                        <div>
                            <Steps style={{ margin: '3rem auto', maxWidth: '65rem' }} current={current}>
                                <Step title='填写接收信息'></Step>
                                <Step title='确认接收信息'></Step>
                                <Step title='完成'></Step>
                            </Steps>
                            {current === 0 && (
                                <Step1From getFormData={val => setFormData(val)} setCurrent={val => setCurrent(val)} />
                            )}
                            {current === 1 && <Step2From formData={formData} setCurrent={val => setCurrent(val)} />}
                            {current === 2 && <Step3From setCurrent={val => setCurrent(val)} />}
                        </div>
                    </div>
                </Col>
            </Row>
        </Layout>
    )
}

export default FormStepView;
