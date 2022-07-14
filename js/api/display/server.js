let DSMDisplay = {
    /**
     * 添加一个子服务器展示框
     * @param type 展示框类型，可为class或server
     * @param title 展示框标题
     * @param description 展示框描述
     * @param name 服务器或分类的名称
     */
    addServerItem: function(type, title, description, name){
        if(UI_POSITION !== PagePosition.server){
            return;  // 仅服务器界面允许添加子服务器展示框
        }

        if(!type instanceof String || !title instanceof String || !description instanceof String || !name instanceof String){
            return;
        }

        let find_type;

        if(type === "class"){
            find_type = "DSMClientRequest.findServerByClass";
        }
        else if(type === "server"){
            find_type = "DSMClientRequest.checkServer";
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

    /**
     * 清除所有子服务器展示框
     */
    clearServerItem: function (){
        let card_list = document.getElementsByClassName("card");
        for(let i = 0; i < card_list.length; i++){
            card_list[i].remove();
        }
    },

    /**
     * 选中子服务器展示框时的动画效果
     * @param name 服务器或分类的名称
     */
    selectItem: function (name){
        let ele = document.getElementById(name);
        let ele_parent = ele.parentNode;

        ele_parent.vanillaTilt.destroy();

        document.body.style.overflow = "hidden";

        ele_parent.style.transition = "transform 0.3s ease";
        ele.style.transition = "opacity 0.5s ease";
        ele.style.opacity = "0";
        ele_parent.style.transform = "scale(10, 10)"

        setTimeout(function (){
            document.body.style.overflow = null;
            DSMDisplay.clearServerItem();
        }, 510);
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
