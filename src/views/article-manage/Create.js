import React, { Component } from 'react'
import { Steps, Button, message,Input,Cascader } from 'antd';
import Edit from '../manageboard/Edit'
import Axios from 'axios';
import store from '../../redux/store'
import BackBtn from '../../component/BackBtn';
import {connect} from 'react-redux'

const options = [
    {
      value: 'IT',
      label: 'IT',
      children: [
        {
          value: '前端',
          label: '前端',
          children: [
            {
              value: 'Vue',
              label: 'Vue',
            },
            {
                value: 'React',
                label: 'React'
            },
            {
                value: 'Js原生',
                label: 'Js原生'
            },
            {
                value: 'CSS3',
                label: 'CSS3'
            },
          ],
        },
        {
            value: '后端',
            label: '后端',
            children: [
              {
                value: 'Java',
                label: 'Java',
              },
              {
                  value: 'Nodejs',
                  label: 'Nodejs'
              },
              {
                  value: 'C',
                  label: 'C'
              },
              {
                  value: 'C#',
                  label: 'C#'
              },
            ],
          },
      ],
    },
    {
      value: '娱乐',
      label: '娱乐',
      children: [
        {
          value: '电影',
          label: '电影',
          children: [
            {
              value: '日韩',
              label: '日韩',
            },
          ],
        },
      ],
    },
  ];

var articleData = {   //这个对象存放创建文章时候所有的信息
  title : "",
  classify : "",
  content : "",
  author : "",
  id : ""
}
var handler = function(data){
  articleData.content = data
  // console.log(articleData.content)  
  // console.log(articleData)
}


const { Step } = Steps;
 class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
          current: 0,
          steps : [
            {
              title: '基本信息',
              content: (
                  <form  className="article-from">
                      <div className="item">
                         <label htmlFor="article-title">文章标题</label>
                        <Input  defaultValue={this.props.data.title}   onChange={(item)=>{articleData.title = item.target.value}}  id="article-title" placeholder="请选择文章标题" />
                      </div>
                      <div  className="item">
                         <label htmlFor="article-classify">文章分类</label>
                        <Cascader defaultValue={this.props.data.classify} onChange={(item)=>{ articleData.classify = item}}  style={{ width: '70%' }} options={options} placeholder="请选择分类" />
                      </div>
                  </form>
              ),
            },
            {
              title: '文章内容',
              content: <div><Edit text={this.props.data.text} editHandler={handler}/></div>,
            },
            {
              title: '提交文章',
              content: '你已经到了最后一步',
            },
          ]
        };
      }
      componentDidMount() {
        console.log(this.props)
        if(this.props.data.dd === "更新"){
          articleData.title = this.props.data.title;
          articleData.classify = this.props.data.classify;
          articleData.content = this.props.data.text;
          articleData.id = this.props.data.id;
          articleData.author = this.props.data.author;
        }else{
          articleData.author = store.getState().username
        }

      }
      
      next() {
        // console.log(this.state.current)
        const current = this.state.current + 1;
        this.setState({ current });
      }
      submit(){
        message.success('你成功了你知道吗')
        if(this.props.data.dd !== "更新"){     
          Axios.post("/articles",{
            ...articleData
          }).then(res=>{
            this.props.history.push("/article-manage/list")
          })
        }else{
          Axios.put(`/articles/${articleData.id}`,{
            ...articleData
          }).then(res=>{
            this.props.history.push("/article-manage/list")
            
          })
        }
        
        // console.log(articleData)
      }
      prev() {
        const current = this.state.current - 1;
        this.setState({ current });
      }
    render() {
        const { current } = this.state;
        return (
            <div>
            <BackBtn title={this.props.title}></BackBtn>
            <Steps current={current}>
              {this.state.steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div className="steps-content">{this.state.steps[current].content}</div>
            <div className="steps-action">
              {current < this.state.steps.length - 1 && (
                <Button type="primary" onClick={() => this.next()}>
                  下一步
                </Button>
              )}
              {current === this.state.steps.length - 1 && (
                <Button type="primary" onClick={() => this.submit()}>
                  提交
                </Button>
              )}
              {current > 0 && (
                <Button style={{ margin: 8 }} onClick={() => this.prev()}>
                  上一步
                </Button>
              )}
            </div>
          </div>
        )
    }
}

const mapStateToProps = (state)=>{
  return {
    data : state.articleupdata, 
    title : state.backbtntitle
  }
}


export default connect(mapStateToProps)(Category)