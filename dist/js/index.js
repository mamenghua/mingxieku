"use strict";

$(function () {
	// 获取到banner
	$bannerWrap = $("#bannerWrap");
	var i = 0;
	var timer = setInterval(function () {
		i++;
		if (i >= 5) {
			i = 0;
		}
		// banner图自动轮播
		$bannerWrap.find(".banner_con").children().eq(i).fadeIn().stop().animate({ "opacity": "1" }).siblings().fadeOut().stop().animate({ "opacity": "0" });
		// 下标跟着变化
		$bannerWrap.find(".banner_nav").children().eq(i).addClass("current").siblings().removeClass("current");
	}, 3000);

	// 从cookie中获取到token值
	var token = $.cookie("token");
	if (token != undefined) {
		$(".navLogin").html("<span style='color:#d30000;font-weight:bold;'>欢迎用户：" + token + "登录</span>");
		$(".navRegister").html("<a href='../login.html'>退出</a>");
	}
	console.log(token);
	$.ajax({
		type: "get",
		url: "http://47.104.244.134:8080/goodstypelist.do",
		data: {
			"l": 1
		},
		success: function success(data) {
			var str = "<a href=\"index.html\" class=\"first on\">\u9996\u9875</a>";
			for (var _i in data) {
				str += "<a href=\"html/lists.html?id=" + data[_i].id + "\" data-id=\"" + data[_i].id + "\">" + data[_i].name + "</a>";
			}
			$(".tnav").html(str);
			$.ajax({
				type: "get",
				url: "http://47.104.244.134:8080/goodstypelist.do",
				data: {
					"l": 2
				},
				success: function success(data) {
					for (var _i2 in data) {
						//console.log(data[i]);
						$parent = $(".tnav a[data-id=" + data[_i2].parentid + "]");
						//console.log(parent);
						var _str = "<a href=\"html/lists.html?id=" + data[_i2].id + "\" data-id=\"" + data[_i2].id + "\">" + data[_i2].name + "</a>";

						if ($parent.children().length == 0) {
							$parent.append("<ul><li>" + _str + "</li></ul>");
						} else {
							$parent.children().append("<li>" + _str + "</li>");
						}
					}
				}

			});

			$(".tnav a").hover(function () {
				$(this).find("ul").css({ "display": "block" });
			}, function () {
				$(this).find("ul").css({ "display": "none" });
			});
		}
	});
	//获取列表数据
	$.ajax({
		type: "get",
		url: "http://47.104.244.134:8080/goodsbytid.do",
		data: {
			"tid": 13,
			"page": 1,
			"limit": 10
		},
		success: function success(data) {
			console.log(data);
			var str = "";
			var str1 = "";
			for (var i in data.data) {
				var list = data.data[i];
				str += "<dl>\n\t\t\t\t\t\t<dt>\n\t\t\t\t\t\t\t<a href=\"html/detail.html?id=" + list.id + "\">\n\t\t\t\t\t\t\t\t<img src=\"" + list.picurl + "\"/>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</dt>\n\t\t\t\t\t\t<dd>\n\t\t\t\t\t\t\t<a href=\"html/detail.html?id=" + list.id + "\">\n\t\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\t\t<li class=\"tit\">" + list.name + "</li>\n\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t<i class=\"price\">\uFFE5" + list.price + "</i>\n\t\t\t\t\t\t\t\t\t\t<del class=\"del_price\">\uFFE5" + list.price + "</del>\n\t\t\t\t\t\t\t\t\t\t<span class=\"buy_btn\">\u7ACB\u5373\u62A2\u8D2D</span>\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</dd>\n\t\t\t\t\t</dl>";
				str1 += "<li>\n\t\t\t\t\t\t<a href=\"html/detail.html?id=" + list.id + "\">\n\t\t\t\t\t\t\t<img src=\"" + list.picurl + "\"/>\n\t\t\t\t\t\t\t<span>+</span>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</li>";
			}
			$(".productList").html(str);
			$(".tuijianList").html(str1);
		}
	});

	// 搜索框
	$("#searchText").on("input", function () {

		var val = $(this).val();
		$.ajax({
			type: "get",
			url: "https://suggest.taobao.com/sug?code=utf-8",
			data: {
				"q": val
			},
			dataType: "jsonp",
			success: function success(data) {
				var str = "";
				for (var i in data.result) {
					str += "<li>" + data.result[i][0] + "</li>";
				}
				$(".searchList").html(str);

				$(".searchList").children().each(function () {
					$(this).on("click", function () {
						$("#searchText").val($(this).text());
					});
				});
			}
		});
	});
	$("#searchText").on("focus", function () {
		$(".searchList").css({ "display": "block" });
	});
	$("#searchText").on("blur", function () {
		setTimeout(function () {
			$(".searchList").css({ "display": "none" });
		}, 200);
	});
	// 返回按钮在一定位置显示
	$(window).scroll(function () {
		if ($(window).scrollTop() > 50) {
			$(".rBarGoTop").fadeIn(200);
		} else {
			$(".rBarGoTop").fadeOut(200);
		}
	});
	// 返回顶部
	$(".rBarGoTop").on("click", function () {
		$("body,html").animate({ "scrollTop": 0 }, 500);
	});
});