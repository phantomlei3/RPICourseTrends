$(function()
{
    //nav-mini切换
    $('#mini').on('click',function()
    {
        if (!$('.sideBar').hasClass('sideBar-mini'))
        {
            $('.sideBar').addClass('sideBar-mini');
        }

        else
        {
            $('.sideBar').removeClass('sideBar-mini');
        }
    });
});