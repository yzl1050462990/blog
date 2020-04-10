import { Table, Button, Popconfirm, Modal, Form, Input} from 'antd';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

class Category extends Component {
    componentDidMount() {
        this.props.setListData()
    }
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                {
                    title: '分类名称',
                    dataIndex: 'title',
                    key: 'title',
                    render: text => <span>{text}</span>,
                },
                {
                    title: '权限等级',
                    dataIndex: 'grade',
                    key: 'grade',
                },
                {
                    title: '操作',
                    dataIndex: 'value',
                    key: 'value',
                    render: (item, value) =>
                        <div>

                            <Button style={{ marginRight: "5px" }} onClick={()=>this.updataFun(value.title,value.grade,value.id)} type="primary" shape="circle" icon={<EditOutlined />}></Button>
                            <Popconfirm title="你确定删除此条数据？" okText="确定" cancelText="取消">
                                <Button type="primary" shape="circle" icon={<DeleteOutlined />}></Button>
                            </Popconfirm>
                        </div>
                }
            ],
            visible: false,
            defalutFormValue : {
                title : null,
                grade : null,
                id : null,
            }
        }
    }
    updataFun = (title,grade,id) => {
        this.setState({
            visible: true,
            defalutFormValue : {
                title,
                grade,
                id,
                
            }
        });
    };

    handleOk = e => {
        // console.log(e);
        // console.log(this.refs.haha)
        // console.log(this.refs.haha.getFieldValue())
        // console.log(this.refs.haha.getFieldValue().title)
            // console.log(this.state.defalutFormValue,this.props.data)
       var listId = null
       this.props.data.forEach((item,index)=>{
        //    console.log(item)
           if(JSON.stringify(item).indexOf(JSON.stringify(this.state.defalutFormValue.id)) !== -1){
               listId = index
           }
       })
        this.setState({
            defalutFormValue : {
                title:this.refs.haha.getFieldValue().title,
                grade:this.refs.haha.getFieldValue().grade,
                id:this.state.defalutFormValue.id,
            }
        },()=>{
            // console.log("新的",this.state)
            var newdata = [...this.props.data]
            var haha = function(a,b){
                a.forEach((item) => {
                    
                    if(item.children){
                        if(item.id === b.id){
                            // console.log(item)
                            item.title = b.title;
                            item.grade = b.grade;
                            // console.log(item)
                            return
                        }
                       haha(item.children,b)
                    }else{
                        if(item.id === b.id){
                            // console.log(item)

                            item.title = b.title;
                            item.grade = b.grade;
                            return
                        }
                    }
                })
            }
            haha(newdata,this.state.defalutFormValue)
            // console.log(`/categories/${this.props.data[listId].id}`)
            // console.log(newdata[listId])
            Axios.put(`/categories/${this.props.data[listId].id}`,{
                ...newdata[listId]
            })
        })
        this.refs.haha.validateFields()
       

        this.setState({
            visible: false,
        });
        window.location.reload()
    };

    handleCancel = e => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    };
    render() {
        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };
        const onFinish = values => {
            console.log('Success:', values);
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };
        return (
            <div>
                <Table rowKey={item => item.id} columns={this.state.columns}
                    dataSource={this.props.data} >
                </Table>
                <Modal
                    destroyOnClose={true} //关闭时候销毁模态框子组件
                    title="更新数据"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                   
                    

                >
                    <Form ref="haha"
                        {...layout}
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        initialValues = {{
                            title : this.state.defalutFormValue.title,
                            grade : this.state.defalutFormValue.grade,
                            remember: true,
                        }}
                    >
                        <Form.Item
                            label="分类名称"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入分类名称！',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="权限等级"
                            name="grade"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入该分类的权限等级！',
                                },
                                {
                                    message:'只能输入数字',
                                    pattern: /^[0-9]+$/
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    // console.log(state)
    return {
        data: state.categorydata
    }
}

const mapDispatchToProps = {
    setListData: () => {
        return (dispatch) => {
            Axios.get("/categories").then(res => {
                dispatch({
                    type: "categorydata",
                    payload: res.data
                })
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Category)