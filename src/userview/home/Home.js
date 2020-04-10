import React, { Component } from 'react'

import './style.css'

export default class Home extends Component {
    render() {
        function renderFun(){
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = './script.js';
            document.head.appendChild(script); 
        }
        return (
            <div>
                {
                    renderFun()
                }
                <canvas id="canvas"></canvas>
                <div id="box">
                    <div className="server">
                        搜索
                    </div>
                    <div className="article-list">
                        <div className="aritic-item"> 
                            <h4>
                                <span>原创</span>
                                Vue组件通信详解
                            </h4>
                            <p className="content">
                                vue组件通信详解。 在使用vue开发的时候，组件是必不可少的一个环节，既然用到了组件，一定会有需要组件通信的时候，今天就来捡一捡组件通信的东西！ vue组件通讯的方式有：父传子通信，子传父通信，bus中央事件总线，ref通信。 1、父传子通信。
                            </p>
                            <div className="info-box">
                                <div className="date">2020-03-01 11:54:55</div>
                                <div>阅读量：9</div>
                                <div>评论数0</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
