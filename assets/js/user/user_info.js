$(function () {
    //表单验证
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度在1~6之间！'
            }
        }
    });
    //渲染信息到input
    var layer = layui.layer;
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            $('[name=id]').attr('value', res.data.id);
            $('[name=username]').attr('value', res.data.username);
            $('[name=nickname]').attr('value', res.data.nickname);
            $('[name=email]').attr('value', res.data.email);
        }
    });

    //表单提交事件
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                window.parent.initUserInfo();
                layer.msg('修改成功！');
            }
        });
    })

})