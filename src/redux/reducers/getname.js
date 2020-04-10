const getname = (prevState= "未知用户",action) => {
    let {type,payload} = action
    switch(type){
        case "getname":
            return payload
        default:
            return prevState
    }
}

export default getname
