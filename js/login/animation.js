/* 登录页面显示逻辑 */
window.onload = function (){
    let login = document.getElementById("login");
    let register = document.getElementById("register");
    let main_box = document.getElementsByClassName("main-box")[0];
    let reg_box = document.getElementsByClassName("register-box")[0];
    let login_box = document.getElementsByClassName("login-box")[0];
    let login_guide = document.getElementById("login-guide");
    let reg_guide = document.getElementById("reg-guide");

    register.addEventListener("click", function (){
        main_box.style.transform = "translateX(80%)";
        login_box.classList.add("hidden");
        reg_guide.classList.add("hidden");
        reg_box.classList.remove("hidden");
        login_guide.classList.remove("hidden");
    });

    login.addEventListener("click", function (){
        main_box.style.transform = "translateX(0)";
        reg_box.classList.add("hidden");
        login_guide.classList.add("hidden")
        login_box.classList.remove("hidden");
        reg_guide.classList.remove("hidden");
    });
}
