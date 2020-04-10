import React, { Component } from 'react'
import axios from 'axios'
import BackBtn from '../../component/BackBtn'
import store from '../../mobx/store'

export default class Details extends Component {
    componentDidMount() {
        axios.get(`/articles?id=${this.props.match.params.details}`).then((res)=>{
            // console.log(res.data[0])
            this.setState({
                data : res.data[0]
            })
        })
        store.set(false)
    }
    componentWillUnmount(){
        store.set(true)
    }
    state= {
        data : []
    }
    render() {
        return (
            <div >
                <BackBtn title="预览文章"></BackBtn>
                <h3>标题：{this.state.data.title}</h3>
                 <div>所属分类：{this.state.data.classify?this.state.data.classify.join(',').replace(/,/g,"/"):null}</div>
                <div>正文:</div>
                <div dangerouslySetInnerHTML={{__html:this.state.data?this.state.data.content:null}}></div>
                <div>作者:{this.state.data.author}</div>
                {console.log()}
            </div>
        )
    }
}
