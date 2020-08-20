$(function () {

    //点击去注册
    $('#goReg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    //点击去登录
    $('#goLogin').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 表单验证
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        rePwd: function (value) {
            $('#reg-password]').val()
            if ($('#reg-password]').val() !== value) {
                return '两次密码不一致！';
            }
        }
    });

    // 点击登录表单提交按钮
    $('#loginForm').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 1, time: 1000 })
                }
                layui.layer.msg('登陆成功！', { icon: 1, time: 1000 }, function () {
                    localStorage.setItem('token', res.token);
                    location.href = '/index.html';
                });
            }
        });
    });

    // 点击注册表单提交按钮
    $('#regForm').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('注册成功,去登录！', { icon: 1, time: 1000 }, function () {
                    $('#goLogin').click();
                })
            }
        })
    });
})


