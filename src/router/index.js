import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom'
import React,{PureComponent} from 'react'
import Login from '../views/login/Login'
import Axios from 'axios';
import {connect} from 'react-redux'




class BlogRouter extends PureComponent{
    componentDidMount() {
        if(localStorage.getItem("login")==="true"){
            this.props.setRouter()
        }
    }
    render(){
        return (
            <Router>
        <Switch>
        <Route path="/login" component={Login}/>
        {/* {console.log(localStorage.getItem("login")==="true")} */}
        {/* {
            localStorage.getItem("login")==="true"?
            <Route path="/" component={Manage}/>:
            <Redirect from="*" to="/login"/>
        } */}
        <Route render={()=>{
            if(localStorage.getItem("login")==="true"){
                return this.props.router
            }else{
                return  <Redirect from="*" to="/login"/>   
            }
        }
        }/>
        <Redirect from="/" to="/login" exact/>
        </Switch>
        
        
    </Router>
        )
    }
}

const mapStateToProps =(state)=>{
    return {
        router : state.router
    }
}

const mapDispatchToProps = {
    setRouter : ()=>{
        return (dispatch)=>{
            Axios.get(`/users?username=${localStorage.getItem("username")}`).then(res=>{
                if(res.data[0].roleType>0){
                    dispatch({
                        type:"admin"
                    })
                }else{
                    dispatch({
                        type:"user"
                    })
                }
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BlogRouter);