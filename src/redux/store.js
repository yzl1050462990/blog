import { createStore , compose,combineReducers ,applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'
import limitList from './reducers/limitlist'
import userslist from './reducers/userslist'
import getname from './reducers/getname'
import usermanage from './reducers/usermanage'
import articlelist from './reducers/articlelist'
import categorydata from './reducers/categorydata'
import router from './reducers/router'
import articleupdata from './reducers/articleupdata'
import backbtntitle from './reducers/backbtntitle'


const reducer = combineReducers({
    userlist:userslist,
    limitList:limitList,
    username:getname,
    usermanage:usermanage,
    articlelist : articlelist,
    categorydata,
    router,
    articleupdata,
    backbtntitle
})

// const reducer = (prevstate={
//     username : "未知用户",
//     userlist : [],
//     limitList: []
// },action)=>{
//     let {type,payload} = action
//     // console.log(type,payload)
//     var newstate = {...prevstate}
//     switch (type) {
//         case "getname":
//               //将老状态深复制一份
//             newstate.username = payload
//             return newstate; 
//         case "userlist":
//              newstate.userlist = payload
//             return newstate; 
//         case "limitList":
//             newstate.limitList = payload
//             return newstate
//         default:
//             return prevstate
//     }
    
//     // console.log(newstate)
// }   

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,composeEnhancers(applyMiddleware(reduxThunk,reduxPromise)))

store.dispatch({
    type : "getname",
    payload : localStorage.getItem("username")
})


export default store;