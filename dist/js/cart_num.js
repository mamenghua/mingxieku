"use strict";

$(function () {
	var token = $.cookie("token");
	$.get("http://47.104.244.134:8080/cartlist.do", {
		"token": token
	}, function (data) {
		var cartNum = 0;
		for (var i in data) {
			cartNum += data[i].count;
		}
		if (cartNum > 999) {
			$(".cart-num").text("999+");
		} else {
			$(".cart-num").text(cartNum);
		}

		$(".navLogin").html("<span style='color:#d30000;font-weight:bold;'>" + token + "</span>");
		$(".navRegister").html("<a href='login.html'>退出</a>");
	});
});