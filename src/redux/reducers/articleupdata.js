const articleupdata = (prestate={
    title: "",
    classify : [],
    context : "",
    id : null,
    author : "",
    dd : ""  //这个字段用来告诉是创建还是更新，
},action)=>{
    var {type,payload} = action
    switch (type) {
        case "articleupdata":
            var newstate = {...payload}  //深复制一份payload，payload必须是对象。
            return newstate
        default:
            return prestate;
    }
}

export default articleupdata;