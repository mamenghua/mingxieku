"use strict";

$(function () {

	// 显示验证码
	var show_num = "";
	show_num = draw($("#canvas"));

	// 点击换张图片
	$(".change").on("click", function () {
		show_num = draw($("#canvas"));
	});

	// 注册点击按钮的点击事件
	$registerBtn = $("#registerBtn");
	$registerBtn.on("click", function () {
		// 得到用户名
		$username = $("#username").val();

		// 得到密码
		$password = $("#password").val();

		// 得到邮箱
		$email = $("#email").val();

		//得到性别
		$sex = $("#sex").val();

		// 得到验证码
		$yanzheng_input = $(".yanzheng_input").val();

		if ($yanzheng_input != show_num) {
			alert("验证码错误!");
			$(".yanzheng_input").val("");
			show_num = draw($("#canvas"));
			return;
		}

		$.ajax({
			type: "get",
			url: "http://47.104.244.134:8080/username.do",
			data: {
				username: $username
			},
			success: function success(data) {

				//{code: 0, msg: "成功", data: null}
				// 说明已存在

				//{code: 1, msg: "失败", data: null}
				// 说明未存在，可以注册

				// 如果用户名未存在
				if (data.code == "1") {

					$.ajax({
						type: "get",
						url: "http://47.104.244.134:8080/useremail.do",
						data: {
							email: $email
						},
						success: function success(data) {
							//{code: 0, msg: "成功", data: null}
							// 说明已存在

							//{code: 1, msg: "失败", data: null}
							// 说明未存在，可以注册
							if (data.code == "1") {
								$.ajax({
									type: "post",
									url: "http://47.104.244.134:8080/usersave.do",
									data: {
										username: $username,
										password: $password,
										email: $email,
										sex: $sex
									},
									success: function success(data) {
										console.log(data);

										//{code: 0, msg: "成功", data: null}
										// 注册成功
									}
								});
								alert("注册成功");
								location.href = "login.html";
							} else {
								alert("邮箱已存在！");
							}
						}
					});
				} else {
					alert("用户名已存在！");
				}
			}
		});
	});
});
function draw(domobj) {
	//保存生成的验证码
	var show_num = "";

	var canvas_width = domobj.width();
	var canvas_height = domobj.height();
	var canvas = domobj[0]; //获取到canvas的对象，演员
	var context = canvas.getContext("2d"); //获取到canvas画图的环境，演员表演的舞台
	canvas.width = canvas_width;
	canvas.height = canvas_height;

	var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
	var aCode = sCode.split(",");
	var aLength = aCode.length; //获取到数组的长度

	for (var i = 0; i <= 3; i++) {
		var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
		var deg = Math.random() * 10 * Math.PI / 180; //产生0~10之间的随机弧度
		var txt = aCode[j]; //得到随机的一个内容

		show_num += txt.toLowerCase();

		var x = 4 + i * 13; //文字在canvas上的x坐标
		var y = 15; //文字在canvas上的y坐标
		context.font = "bold 16px 微软雅黑";

		context.translate(x, y);
		context.rotate(deg);

		context.fillStyle = "rgb(0,0,0)";
		context.fillText(txt, 0, 0);

		context.rotate(-deg);
		context.translate(-x, -y);
	}
	console.log(show_num);
	for (var i = 0; i <= 2; i++) {
		//验证码上显示线条
		context.strokeStyle = randomColor();
		context.beginPath();
		context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
		context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
		context.stroke();
	}
	for (var i = 0; i <= 30; i++) {
		//验证码上显示小点
		context.strokeStyle = randomColor();
		context.beginPath();
		var x = Math.random() * canvas_width;
		var y = Math.random() * canvas_height;
		context.moveTo(x, y);
		context.lineTo(x + 1, y + 1);
		context.stroke();
	}
	return show_num;
}

function randomColor() {
	//得到随机的颜色值
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + "," + g + "," + b + ")";
}