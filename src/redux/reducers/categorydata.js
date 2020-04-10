const categorydata = (prestate= [],action) => {
    let {type,payload} = action
    switch (type) {
        case "categorydata":
            var newstate = [...payload]
            return newstate  
        default:
            return prestate
    }
}

export default categorydata;