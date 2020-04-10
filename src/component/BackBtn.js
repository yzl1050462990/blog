import React, { Component } from 'react'
import { LeftOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router'

 class BackBtn extends Component {
    render() {
        return (
            <div>
                <h2>
                <LeftOutlined style={{marginRight: "10px"}} onClick={()=>this.props.history.goBack()} />{this.props.title}
                </h2>
            </div>
        )
    }
}

export default withRouter(BackBtn)