const default_about_us = "<h1>关于我们</h1><br><h4>（DSM：by StarLight 2014-2022 - All Right Reserved）</h4><br><h3 id='default-about'>暂时没什么可显示的哦！也许你可以稍等一下...</h3><div class='about-box'><p>&nbsp;&nbsp;&nbsp;&nbsp;</p></div>"

/* 手动实现一些动画的函数 */
function fadeOut(element, timeout, need_clear_later){
    let opacity_percent = 100;
    element.style.transition = "opacity 1ms";

    let rid = setInterval(function (){
        element.style.opacity = (opacity_percent / 100).toString();
        opacity_percent -= Math.ceil(100 / timeout);

        if(opacity_percent < 0){
            if(need_clear_later){
                element.innerHTML = "";
            }
            element.style.display = "none";
            clearInterval(rid);
        }
    }, 1);
}

function fadeIn(element, timeout, display_type){
    element.style.transition = "opacity 1ms";
    element.style.opacity = "0";

    let opacity_percent = 0;

    if(display_type === undefined){
        element.style.display = "unset";
    }
    else {
        element.style.display = display_type;
    }


    let rid = setInterval(function (){
        element.style.opacity = (opacity_percent / 100).toString();
        opacity_percent += Math.ceil(100 / timeout);

        if(opacity_percent > 100){
            clearInterval(rid);
        }
    }, 1);
}

function hide(element){
    element.style.display = "none";
}


/* DOM操作相关 */
window.onload = function (){

    /* 基本DOM元素的常量声明 */
    const home_btn = document.getElementById("home-btn");
    const server_btn = document.getElementById("server-btn");
    const about_btn = document.getElementById("about-btn");

    const top_navigation_bar = document.getElementById("home-navigation-bar");
    const search_bar = document.getElementById("search-container");
    const main_frame_container = document.getElementById("main-frame-container");


    /* 侧边栏按钮逻辑 */

    // "首页"按钮
    home_btn.addEventListener("click", function (){
        fadeOut(main_frame_container, 50);
        hide(search_bar);
        fadeIn(top_navigation_bar, 200);
    });

    // "服务器"按钮
    server_btn.addEventListener("click", function (){
        fadeOut(main_frame_container, 50);
        fadeIn(search_bar, 200);
        hide(top_navigation_bar);
    });

    // "关于"按钮
    about_btn.addEventListener("click", function (){
        fadeIn(main_frame_container, 400, "flex");
        main_frame_container.innerHTML = default_about_us;
        hide(top_navigation_bar);
        hide(search_bar);
    });


    /* 顶端栏按钮逻辑 */
    let top_btn = document.getElementsByClassName("top-btn");

    for(let i = 0; i < top_btn.length; i++){
        top_btn[i].addEventListener("click", function (){
            document.getElementById("top-tab").style.left = ((33 * i) + "%")
        });
    }


    /* 搜索栏逻辑 */

    let search_btn = document.getElementById("search-btn");

    search_btn.addEventListener("click", function (){
       if(document.getElementById("checkbox").checked){
           document.getElementById("search-input").value = "";
       }
    });
}
