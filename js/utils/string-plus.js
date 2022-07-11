String.prototype.format = function(){
    if(arguments.length === 0){
        return this;
    }

    let s = this;

    for(let i = 0; i < arguments.length; i++){
        s = s.replace(new RegExp("\\{"+i+"\\}","g"), arguments[i]);
    }
    return s;
};
