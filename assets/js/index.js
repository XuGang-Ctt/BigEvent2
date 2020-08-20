$(function () {
    //退出功能
    var layer = layui.layer;
    $('.quit').on('click', function () {
        layer.confirm('您确定退出当前登录吗?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token');
            location.href = '/login.html';
            layer.close(index);
        });
    })
})

//获取用户信息
initUserInfo();
var layer = layui.layer;
function initUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('失败');
            }
            randerUserInfo(res.data);
            // console.log(res);
        }
    })
}





//渲染用户信息
function randerUserInfo(data) {
    var name = data.nickname || data.username;
    var nameStr = name[0].toUpperCase();
    $('.welcome').html('欢迎　' + name);
    if (data.user_pic !== null) {
        $('.layui-nav-img').show().siblings('.avatar').hide();
    } else {
        $('.layui-nav-img').hide().siblings('.avatar').html(nameStr).show();
    }
}