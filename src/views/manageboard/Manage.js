import React, { Component } from 'react'
import { Layout ,Menu, Dropdown} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import {
    Route,
    Redirect,
    Switch
} from 'react-router-dom'
import Home from './Home'
import Create from '../article-manage/Create'
import Article from '../article-manage/List'
import Usermanage from '../usermanage/Usermanage';
// import Category from './Category';
import SiderComponent from '../../component/SiderComponent'
import NotFound from '../error/NotFound';
import Limit from '../limit/Limit';
import Details from '../article-manage/Details';
import Category from '../article-manage/Category';
import { DownOutlined } from '@ant-design/icons';
import My from '../my/My';
import store from '../../mobx/store'
import { autorun } from 'mobx';

const { Header, Content } = Layout;

export default class Manage extends Component {
    logout = ()=>{
        localStorage.clear()
        this.props.history.push("/login")
    }
    state = {
        collapsed: false,
        menu : (
            <Menu>
              <Menu.Item key="0">
                <span onClick={this.logout}>退出登录</span>
              </Menu.Item>
            </Menu>
          ),
        isheaderdisplay : store.get()
    };
    
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
        // console.log(this.state.collapsed)
    };
    componentDidMount() {
       this.unautorun = autorun(()=>{
           this.setState({
               isheaderdisplay : store.get()
           })
          })
    }
    shouldComponentUpdate(nextprops,nextstate){
        if(nextstate.isheaderdisplay === this.state.isheaderdisplay){
            return false
        }
        return true
    }
    componentWillUnmount(){
        this.unautorun()
    }
  
    render() {
        return (

            <Layout className="layout">
                <SiderComponent props={this.state.collapsed} />
                
                <Layout className="site-layout">
                    {
                        this.state.isheaderdisplay ? 
                        <Header className="site-layout-background" style={{ padding: 0 }}>
                            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: this.toggle,
                            })}

                        <span style={{float : "right" }}>
                            <Dropdown  overlay={this.state.menu} trigger={['click']}>
                                    <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                        你好，{localStorage.getItem("username")}
                                        <DownOutlined />
                                    </span>
                            </Dropdown>
                        </span>
                        </Header>
                        :
                        null

                    }
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Switch>
                            <Route path="/manageboard/home" component={Home} />
                            <Route path="/manageboard/my" component={My} />
                            <Route path="/article-manage/create" component={Create} />
                            <Route path="/article-manage/list" exact component={Article} />
                            <Route path="/article-manage/category" exact component={Category} />
                            <Route path="/article-manage/list/:details" component={Details} />
                            <Route path="/limit" component={Limit}/>                           
                            <Route path="/user-manage/usermanage" component={Usermanage} />   
                            {/* //用户列表 */}
                            <Redirect from="/manageboard" to="/manageboard/home" />
                            <Redirect from="/" to="/manageboard/home" />
                            <Route path="*" component={NotFound}/>

                        </Switch>
                    </Content>
                </Layout>
            </Layout>



        )
    }
}
