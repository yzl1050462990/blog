import React, { Component } from 'react'
import axios from 'axios'
import { Table, Button, Switch, Modal } from 'antd';
import AddUser from '../../component/AddUser';
import { EditOutlined , DeleteOutlined} from '@ant-design/icons';
import store from '../../redux/store'

export default class Usermanage extends Component {
  getDataList(){
    return axios.get("/users").then(res => {
      var stringData = JSON.stringify(res.data).replace(/"id"/g,'"key"')
      return {
        type : "usermanage",
        payload : JSON.parse(stringData)
      }
    })
  }
  componentDidMount() {
    if(store.getState().usermanage.length === 0){
      store.dispatch(this.getDataList()).then(data=>{
        this.setState({
          dataList: data.payload
        })
      })
    }else{
      console.log("使用缓存")
      this.setState({
        dataList : store.getState().usermanage
      })
    }
  }

  state = {
    fromData: {},
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
    dataList: [],
    columns: [
      {
        title: '角色名称',
        dataIndex: 'roleName',
        key: 'roleName',
        align: "center",
        render: text => <h4>{text}</h4>,
      },
      {
        title: '用户名',
        dataIndex: 'username',
        align: "center",
        key: 'username',
      },
      {
        title: '用户状态',
        dataIndex: 'roleState',
        align: "center",
        key: 'roleState',
        render: (item,data) => <Switch defaultChecked={data.roleState === false ? false:true} disabled={data.default === false ? false:true}  onChange={this.onChange.bind(this,data)} />
      },
      {
        title: '操作',
        key: 'roleType',
        align: "center",
        dataIndex: 'roleType',
        render: (item,data) => <div >
          <Button type="primary" disabled={data.roleState === true ? false:true} shape="circle" icon={<EditOutlined />} />
          &nbsp;
        <Button type="primary" disabled={data.roleState === true ? false:true} shape="circle" icon={<DeleteOutlined />} /></div>
      },
    ]
  }
  render() {
    return (
      <div>
        <Button type="primary" shape="round" onClick={this.showModal} style={{ margin: "10px 0px" }}>添加用户</Button>
        <Table  columns={this.state.columns} dataSource={this.state.dataList} pagination={
          {defaultPageSize : 5}
        }/>
        <Modal
          title="添加用户"
          cancelText = "取消"
          okText = "提交"
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.stateconfirmLoading}
          onCancel={this.handleCancel}
        >
          <AddUser handleEvent={this.acceptData} />
        </Modal>
      </div>
    )
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    this.setState({
      ModalText: "正在添加新用户",
      confirmLoading: true,
    });

    
    var roleName = ""
    switch (this.state.fromData.roleType) {
      case "3":
        roleName = "超级管理员"
        break;
      case "2":
        roleName = "管理员"
        break;
      case "1":
        roleName = "小编"
        break;
      default:
        roleName = "小编"
        break;
    }
    // console.log(this.state.fromData,roleName)
    axios.post("/users", {
      username: this.state.fromData.username,
      password: Number(this.state.fromData.password),
      roleName:roleName,
      roleState: true,
      default: false,
      roleType: Number(this.state.fromData.roleType)
    }).then(()=>{
      this.setState({
        visible: false,
        confirmLoading: false,
      });
      window.location.reload()
    })
  };

  handleCancel = () => {
    // console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };
  onChange(data,checked) {
    // console.log(`switch to ${checked}`, checked,data);
    axios.put(`/users/${data.key}`,{
      ...data,
      roleState : checked
    })
  }
  acceptData = (data) => {
    this.setState({
      fromData: data
    })
  }
}
