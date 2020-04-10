import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import Particles from 'react-particles-js';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'
export default class Login extends Component {

  render() {
    const layout = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 4,
        span: 10,
      },
    };
    var inputValue = {
      username: "",
      password: ""
    }
    const onFinish = values => {
      // console.log('Success:', values);
      // console.log(inputValue)
      axios.get(`/users?username=${inputValue.username}&password=${inputValue.password}`).then(res => {
        if (res.data[0]) {
          // console.log(res.data[0])
          localStorage.setItem("login", "true")
          localStorage.setItem("username", res.data[0].username)
          alert("登录成功")
          if(res.data[0].roleType>0){
            this.props.history.push("/manageboard/home")
            window.location.reload()
          }else{
            this.props.history.push("")
            window.location.reload()

          }
        }else{
          alert("账号或密码错误")
        }
      })
    }


    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };

    return (
      <div className="login-from-wrap" style={{ background: 'rgb(35, 39, 65)', height: "100%" }}>
        <Particles height={window.innerHeight - 5 + "px"} />
        <Form className="loginFrom"
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            // label="用户名"
            // name="用户名"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          >
            <Input onChange={(ev) => { inputValue.username = ev.target.value }} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            // label="密码"
            // name="密码"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}

          >
            <Input.Password onChange={(ev) => { inputValue.password = ev.target.value }} prefix={<LockOutlined className="site-form-item-icon" />} placeholder="password" />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox style={{ color: "#fff" }}>记住密码</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              提交
              </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
