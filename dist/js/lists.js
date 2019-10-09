"use strict";

$(function () {
	$("#header").load("../html/header.html");
	var tid = location.href.split("=")[1];
	console.log(tid);
	//获取列表数据
	$.ajax({
		type: "get",
		url: "http://47.104.244.134:8080/goodsbytid.do",
		data: {
			"tid": 13,
			"page": 1,
			"limit": 100
		},
		success: function success(data) {
			console.log(data);
			var str = "";

			for (var i in data.data) {
				var list = data.data[i];
				str += "<dl>\n\t\t\t\t\t\t<dt>\n\t\t\t\t\t\t\t<a href=\"detail.html?id=" + list.id + "\">\n\t\t\t\t\t\t\t\t<img src=\"" + list.picurl + "\"/>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</dt>\n\t\t\t\t\t\t<dd>\n\t\t\t\t\t\t\t<a href=\"detail.html?id=" + list.id + "\">\n\t\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\t\t<li class=\"tit\">" + list.name + "</li>\n\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t<i class=\"price\">\uFFE5" + list.price + "</i>\n\t\t\t\t\t\t\t\t\t\t<del class=\"del_price\">\uFFE5" + list.price + "</del>\n\t\t\t\t\t\t\t\t\t\t<span class=\"buy_btn\">\u7ACB\u5373\u62A2\u8D2D</span>\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</dd>\n\t\t\t\t\t</dl>";
			}
			$(".productList").eq(0).html(str);
		}
	});
});