/**
 * 为DOM元素创建渐隐效果
 * @param element DOM元素
 * @param timeout 渐隐效果持续时间
 * @param need_clear_later 是否需要清空元素中全部的其他DOM元素
 */
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

/**
 * 为DOM元素创建渐显效果
 * @param element DOM元素
 * @param timeout 渐显效果持续时间
 * @param display_type 恢复显示时，该DOM元素的display类型（默认为unset）
 */
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

/**
 * 即刻隐藏DOM元素
 * @param element DOM元素
 */
function hide(element){
    element.style.display = "none";
}