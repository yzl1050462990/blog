import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Usermanage from '../limit/UsersList'
import LimitManage from '../limit/LimitManage'
import { Tabs } from 'antd';
const { TabPane } = Tabs;

export default class Limit extends Component {
    
    render() {
        return (

            <div>
                <Tabs defaultActiveKey={this.props.location.pathname} activeKey={this.props.location.pathname} onChange={this.callback.bind(this)}>
                    <TabPane tab="角色列表" key="/limit/usersList">
                      </TabPane>
                    <TabPane tab="权限列表" key="/limit/LimitManage">
                     </TabPane>
                  
                </Tabs>
                <Route path="/limit/usersList" component={Usermanage} />
                {/* 角色列表 */}
                <Route path="/limit/limitManage" component={LimitManage} />
                {/* 权限管理  */}
            </div>
        )
    }
    callback(key) {
        this.props.history.push(key)
    }

}
