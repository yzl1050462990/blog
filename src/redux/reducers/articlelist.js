const articlelist = (preState=[],action)=>{
    let {type,payload} = action;
    switch (type) {
        case "article":
            // console.log(action)
            var newState = [...payload]
            return newState
    
        default:
            return preState
    }
}

export default articlelist