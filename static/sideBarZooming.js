$(function(){
    //nav-mini切换
    $('#mini').on('click',function(){
        if (!$('.nav').hasClass('nav-mini')) {
            $('.nav-show').removeClass('nav-show');
            //$('.nav-item').children('ul').removeAttr('style');
            $('.nav').addClass('nav-mini');
            $('.contents').css("margin-left","0");
        }else{
            $('.nav').removeClass('nav-mini');
            $('.nav-item').addClass('nav-show');
            $('.contents').css("margin-left","23%");
        }
    });
});