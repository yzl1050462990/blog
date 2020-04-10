import React, { Component } from 'react'
import { Table,Button } from 'antd';
import axios from 'axios'
import { EditOutlined,DeleteOutlined,DesktopOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'

 class List extends Component {
  componentDidMount() {
      this.props.setListData()
  }
  
  state= {

    columns : [
      {
        title: '文章标题',
        dataIndex: 'title',
        key: 'title',
        render: text => <span>{text}</span>,
      },
      {
        title: '文章作者',
        dataIndex: 'author',
        key: 'author',
      },
      {
        title: '文章类别',
        dataIndex: 'classify',
        key: 'classify',
        render: item => {
          return <div>{item.join(",").replace(/,/g,"/")}</div>
        }
      },
      {
        title: '操作',
        key: 'action',
        render: (text) => (
          <span>
           <Button onClick={()=>this.props.history.push(`/article-manage/list/${text.id}`)}   shape="circle" icon={<DesktopOutlined />} />
           <Button 
           style={{marginLeft : "5px"}}
           onClick={()=>{
              this.props.setarticleTitle("更新文章")
              this.props.undataArticle(text.id,()=>{
                this.props.history.push(`/article-manage/create`)
              })
              
           }} type="primary"  shape="circle" icon={<EditOutlined />} />
           <Button onClick={()=>{
             axios.delete(`/articles/${text.id}`).then(res => {
              axios.get("/articles").then(res => {
                this.setState({
                  data : res.data
                })
              })
             })
             window.location.reload()
           }}  style={{marginLeft : "5px"}} type="primary"  danger shape="circle" icon={<DeleteOutlined />} />      
          </span>
        ),
      },
    ],
    data : []
  }
  render() {
    return (
     <div>
        <Button type="primary" onClick={()=>{
          this.props.setarticleTitle("创建文章");
          this.props.clearArticle()
          this.props.history.push("/article-manage/create")}
        }>创建文章</Button>
      <Table columns={this.state.columns} rowKey={item =>item.id} dataSource={this.props.data} />
     </div>
    )
  }
}

const mapStateToProps = (state)=>{
    return {
      data : state.articlelist
    }
}

const mapDispatchToProps = {
    setarticleTitle : (title)=>{
      return (dispatch)=>{
        dispatch({
          type : "title",
          payload : title
        })
      }
    },
    setListData : ()=>{
      return (dispatch)=>{
        axios.get("/articles").then(res => {
          // console.log(dispatch)
          dispatch({
            type : "article",
            payload : res.data
          })
        })
      } 
    },
    clearArticle : ()=>{
      return (dispatch)=>{
        dispatch({
          type : "articleupdata",
          payload : {
            title : "",
            classify : [],
            text : ""
          }
        })
      }
    },
    undataArticle : (id,callback)=>{
      return (dispatch)=>{
        axios.get(`/articles/${id}`)
        .then(res=>{
          dispatch({
            type: "articleupdata",
            payload : {
                title : res.data.title,
                classify : res.data.classify,
                text : res.data.content,
                id : id,
                author : res.data.author,
                dd : "更新"
            }
          })
          callback && callback()
        })
      }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(List)