const backbtntitle = (prestate="",action)=>{
    var {type,payload} = action
    switch (type) {
        case "title":
            var newstate = payload
            return newstate
    
        default:
            return prestate
    }
}

export default backbtntitle;