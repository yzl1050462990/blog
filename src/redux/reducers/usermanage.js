const usermange = (prevState=[],action) =>{
    let {type,payload} = action;
    switch (type) {
        case "usermanage":
            var newstate = [...prevState,...payload] 
            return newstate
        default:
            return prevState
    }
}

export default usermange