
$(function(){

   $("#loginbtn").click(function() {
        $("#loginform").submit();
    });

    $("#loginform").validate({
        ignore: "hidden",

        rules: {
            usercode:{
                required: true
            },
            password:{
                required: true
            }
        },

        messages: {
            newroleid: "用户名不能为空",
            newrolename: "密码不能为空"
        },

        submitHandler: function (form) {
            // login();
            f();
        }
    })
});

function f() {
    // var arr1 = new Array('1','2','3','4');
    // var date = new Date(); date.setDate(25);
    // var str = 'completed';
    var regexp = new RegExp('initialization', 'g');
    console.log(regexp.exec('12initialization34'));


}


function login() {
    let user =
        {
           usercode: $("#usercode").val(),
           password: $("#password").val()
        };

        $.ajax({
            url: systemPath + "/userlogin",
            type: "POST",
            dataType: "json",
            data: user,
            success: function (data) {
                // console.log(data);
                if(data.code=='200')
                {
                    window.location.href = "../main/welcome.jsp";
                    // window.location.href = "../email/emailinfo.jsp";
                    localStorage.setItem("token",data.token);
                    localStorage.setItem("userCode",data.userCode);
                    localStorage.setItem("userName",data.name);
                }
                else {
                    swal({
                        title: data.msg,
                        type: "warning"
                    });
                }
            },
            error: function (data) {
                swal({
                    title: "登录失败 o(╯□╰)o",
                    type: "error"
                });
            }
        });
}
