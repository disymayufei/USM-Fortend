let DSMDisplay = {
    /**
     * 添加一个子服务器展示框
     * @param type 展示框类型，可为class或server
     * @param title 展示框标题
     * @param description 展示框描述
     * @param name 服务器或分类的名称
     */
    addServerItem: function(type, title, description, name){
        if(!type instanceof String || !title instanceof String || !description instanceof String || !name instanceof String){
            return;
        }

        let find_type;

        if(type === "class"){
            find_type = "findServerByClass";
        }
        else if(type === "server"){
            find_type = "checkServer";
        }
        else {
            return;
        }

        let card_str = "<div class='card-content noselect' id='{3}'><h3>{0}</h3><div class='card-text'><p>{1}</p><a onclick='{2}(\"{3}\")'>查看</a></div></div>".format(title, description, find_type, name);

        let card_ele = document.createElement("div");
        card_ele.classList.add("card");
        card_ele.innerHTML = card_str;

        document.getElementById("server-cards-container").appendChild(card_ele);

        DSMDisplay._updateItem(card_ele);
    },

    /**
     * 删除一个子服务器展示框
     * @param name 服务器或分类的名称
     */
    delServerItem: function (name){
        let ele = document.getElementById(name);
        if(ele != null){
            if(ele.classList.contains("card-content")){
                ele.remove();
            }
        }
    },

    _updateItem: function(element){
        VanillaTilt.init(element, {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.5
        });
    }
}
