const limitlist = (prevState= [],action) => {
    let {type,payload} = action
    switch(type){
        case "limitList":
            var newstate = [...prevState,...payload]
            return newstate
        default:
            return prevState
    }
}
export default limitlist
