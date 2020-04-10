import React, { Component } from 'react'
import { Table, Tag } from 'antd';
import axios from 'axios'
import store from '../../redux/store'

export default class LimitManage extends Component {
    getLimitData = ()=>{
       return (dispatch) => {
        axios.get("/rights").then(res => {
            // console.log(res.data)
            var arr = []
            res.data.forEach(function(value){
                var obj = {}
                for(var i in value){
                   if(i === "id" || i === "title" || i=== "grade"){
                       obj[i] = value[i]
                   }
                }
                arr.push(obj)
            })
           dispatch({
               type : "limitList",
               payload: arr
           })
            // this.setState({
            //     data : arr
            // })
        })
       }
       
    }
    componentDidMount() {
        if(store.getState().limitList.length === 0){
            store.dispatch(this.getLimitData())        
        }else{
            console.log("使用缓存")
            this.setState({
                data : store.getState().limitList
            })
        }
        this.unscribe = store.subscribe(()=>{
            // console.log("请求数据结束",store.getState().roleList)
            this.setState({
                data :store.getState().limitList
            })
        })
    }

    componentWillUnmount(){
        this.unscribe() //取消订阅
    }
    
    state= {
        columns : [
            {
              title: '#',
              dataIndex: 'id',
              key: 'id',
              align : "center",
              render: text => <h4>{text}</h4>,
            },
            {
              title: '权限列表',
              dataIndex: 'title',
              key: 'title',
              align : "center",
            },
            {
              title: '权限等级',
              dataIndex: 'grade',
              key: 'grade',
              align : "center",
              render: item =>  <Tag color="magenta">{item}</Tag>
            }
          ],
          data :  []
        
    }
    render() {
        return (
            <Table columns={this.state.columns} dataSource={this.state.data} rowKey= {item=>{
                return item.id
            }} 
            pagination={{defaultPageSize : 5}}
            />
        )
    }
}
