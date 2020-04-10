import React, { Component } from 'react'
import { Form, Input, Select } from 'antd';
const { Option } = Select;
export default class AddUser extends Component {
    state = {
        addUserData: {
            username : "",
            password : "",
            roleType : ""
        }
    }
    render() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };


        const onFinish = values => {
            console.log('Success:', values);
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };
        return (
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="用户名"
                    name="用户名"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input onChange={this.transmitData.bind(this,"username")}  />
                    {/* value={this.state.addUserData.username} */}
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="密码"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password onChange={this.transmitData.bind(this,"password")}/>
                </Form.Item>
                <Form.Item
                    name="角色"
                    label="角色"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择用户的权限"
                        allowClear
                        onChange={this.transmitData.bind(this,"roleType")}
                    >
                        <Option value="3">超级管理员</Option>
                        <Option value="2">管理员</Option>
                        <Option value="1">小编</Option>
                    </Select>
                </Form.Item>


            </Form>
        )
    };
    
    transmitData(key,ev){
        var data = this.state.addUserData
        if(key === "roleType"){
            data[key] = ev
        }else{
            data[key] = ev.target.value            
        }
       
        this.setState({
            addUserData : data
        })
        this.props.handleEvent(this.state.addUserData)  //子传父
    }
}
