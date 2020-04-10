import React, { Component } from 'react'
import { Table, Button, Tag } from 'antd';
import { FormOutlined, UserOutlined, TrademarkCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
import store from '../../redux/store'
export default class LimitList extends Component {
    getUserList(){
       return  axios.get("/roles").then(res => {
            var arr = res.data
            arr.forEach((item) => {
                var arrList = item.roleRight.map(value => {
                    return value.list
                })
                var newArr = []
                arrList.forEach(item => {
                    newArr = newArr.concat(...newArr, ...item)

                })
                // console.log(newArr,item)   
                newArr = new Set(newArr)
                item["description"] = newArr
            })
            //    console.log(arr)
            return {    //这里必须返回一个对象
                type : "userlist",
                payload: arr
            }
        })
    }
    componentDidMount() {
        // console.log(store.getState().userlist)
        if(store.getState().userlist.length === 0){
            // console.log("去请求ajax")
            store.dispatch(this.getUserList()).then(data => {
                // console.log(store.getState())
                this.setState({
                    data: data.payload
                })
            })
          
        }else{
            console.log("使用缓存")
            this.setState({
                data: store.getState().userlist
            })
        }
       
    }
    state = {
        columns: [
            { title: '角色名称', dataIndex: 'roleName', key: 'roleName' },
            {
                title: '操作',
                dataIndex: 'roleRight',
                key: 'roleRight',
                render: (item) => {
                    //   console.log(item)
                    if (Object.prototype.toString.call(item) === '[object Array]') {
                        return item.map(value => {
                            // console.log(value.category)
                            var icon = "";
                            switch (value.category) {
                                case "文章管理":
                                    icon = <FormOutlined />
                                    break;
                                case "用户管理":
                                    icon = <UserOutlined />
                                    break;
                                case "权限管理":
                                    icon = <TrademarkCircleOutlined />
                                    break;
                                default:
                                    break;
                            }
                            return <Button style={{ marginLeft: "5px" }} key={value.category} type="primary" shape="circle" icon={icon} />
                        })
                    }

                },
            },
        ],
        data: []
    }
    render() {
        return (
            <Table
                columns={this.state.columns}
                rowKey={item => {
                    return item.id
                }}
                expandable={{
                    expandedRowRender: record => {
                        // console.log(record.roleRight)
                        return <div style={{ margin: 0 }}>
                            {
                                record.roleRight.map(item =>
                                    <div key={item.category}>
                                        {
                                            item.list.map(data =>
                                                <Tag color={"green"} key={data}>{data}</Tag>
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>
                    },
                    rowExpandable: record => record.name !== 'Not Expandable',

                }}
                dataSource={this.state.data}
            />
        )
    }
}
