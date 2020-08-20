$(function () {
    //表单验证
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        newPwd: function (value) {
            if ($('[name=oldPwd]').val() == value) {
                return '新密码不能与旧密码相同!'
            }
        },
        rePwd: function (value) {
            if ($('[name=newPwd]').val() !== value) {
                return '两次密码不一致！'
            }
        }
    });
    var layer = layui.layer;
    // 表单提交
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: {
                oldPwd: $('[name=oldPwd]').val(),
                newPwd: $('[name=newPwd]').val(),
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('修改成功，请重新登录！', { time: 1000 }, function () {
                    localStorage.removeItem('token');
                    window.parent.location.href = '/login.html'
                })
            }
        });
    });
})