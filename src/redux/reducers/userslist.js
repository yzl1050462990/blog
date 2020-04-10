const userlist = (prevState= [],action) => {
    let {type,payload} = action
    switch(type){
        case "userlist":
            var newstate = [...prevState,...payload]
            return newstate
        default:
            return prevState
    }
}

export default userlist