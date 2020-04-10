import React from 'react'
import {
    Route,
} from 'react-router-dom'
import Loading from '../../views/loading/Loading';
import Home from '../../userview/home/Home';
import Manage from '../../views/manageboard/Manage';

const router = (prestate=<Route path="/" component={Loading}/>,action)=>{
    var {type} = action
    switch (type) {
        case "admin":
            return <Route path="/" component={Manage}/>    
        case "user":
            return <Route path="/" component={Home}/>    
        default:
            return prestate
    }
}

export default router;