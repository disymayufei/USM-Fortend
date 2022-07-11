/* DOM操作相关 */
window.onload = function (){

    /* 基本DOM元素的常量声明 */
    const home_btn = document.getElementById("home-btn");
    const server_btn = document.getElementById("server-btn");
    const about_btn = document.getElementById("about-btn");

    const top_navigation_bar = document.getElementById("home-navigation-bar");
    const search_bar = document.getElementById("search-container");
    const main_frame_container = document.getElementById("main-frame-container");


    /* 添加卡片的动画效果 */
    VanillaTilt.init(document.querySelectorAll(".card"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.5
    })


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
