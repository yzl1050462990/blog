import React, { Component } from 'react'
import { Layout, Menu  } from 'antd';
import {withRouter} from 'react-router'
import menuList from '../views/manageboard/menu'
import Axios from 'axios';
const { SubMenu } = Menu;
const { Sider } = Layout;

 class SiderComponent extends Component {
     UNSAFE_componentWillUpdate(preprops,prestate){
        //  console.log(preprops,prestate)
         if(preprops.location.pathname === prestate.pathname){
             return false
         }else{
             this.setState({
                pathname : this.props.location.pathname
              })
              return true
         }
        //   console.log(this.state.pathname)
    }
    UNSAFE_componentWillMount() {
       var username =  localStorage.getItem("username")
        Axios.get(`/users?username=${username}`).then(res => {
            this.setState({
                roleType : res.data[0].roleType
            },()=>{
                // console.log(this.state.roleType)
            })
            
        })
    }
    
    shouldComponentUpdate(nextProps){
        if(this.state.pathname === nextProps.location.pathname && this.state.roleType !== null ){
            if(nextProps.props !== this.state.flag){
                this.setState({
                    flag : nextProps.props
                })
                return true
            }
            return false
        }else{
            return true
        }
    }
    createMeun(menuList){
        
        if(!this.state.roleType){
            return;
        }
        var menu = menuList.map(item => {
            // console.log(item)
            if(item.children && item.permission <= this.state.roleType ){
                return (
                <SubMenu key={item.path}
                title={
                    <span>
                        <item.icon />
                        <span >{item.title}</span>
                    </span>
                }>
                {
                   this.createMeun(item.children)
                }
                </SubMenu>
                
                )
            }else if(item.permission <= this.state.roleType){
            return <Menu.Item onClick={()=>{this.props.history.push(item.path)}} key={item.path}><item.icon /><span>{item.title}</span></Menu.Item>
            }else{
                return null
            }
        }) 
        // console.log(menu)
        return menu;
    }
    state = {
        pathname : this.props.location.pathname,
        roleType :  null,
        flag : null
    }

    render() {    
        var SelectedKeys = [this.state.pathname]
        var OpenKeys = ["/"+this.state.pathname.split("/")[1]]
        return (
            <Sider trigger={null} collapsible collapsed={this.props.props}>
                {/* {console.log(this.props.props)} */}
                {/* {console.log(OpenKeys)} */}
                    {/* {console.log(this.props)} */}
                    {/* {console.log(SelectedKeys)} */}
                    <div className="logo" />
                    <Menu defaultSelectedKeys={SelectedKeys} selectedKeys={SelectedKeys}  defaultOpenKeys={OpenKeys} theme="dark" mode="inline" >
                        {
                            this.createMeun(menuList)
                        }
                    </Menu>
                </Sider>
        )
    }
}

export default withRouter(SiderComponent)