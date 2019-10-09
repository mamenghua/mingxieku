"use strict";

$(function () {
	$("#header").load("../html/header.html");
	// 从地址栏得到id值，保存
	var gid = window.location.search.split("=")[1];

	$.ajax({
		type: "get",
		url: "http://47.104.244.134:8080/goodsbyid.do",
		data: {
			"id": gid
		},
		success: function success(data) {
			console.log(data);
			var imgStr = "";
			var infoStr = "";
			imgStr += "<div class=\"bigImg\">\n\t\t\t\t\t<img src=\"" + data.picurl + "\"/>\n\t\t\t\t\t<div class=\"zoomBox\"></div>\n\t\t\t\t\t<div class=\"rightImgBox\">\n\t\t\t\t\t\t<img src=\"" + data.picurl + "\"/>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<ul class=\"smallImg clearfix\">\n\t\t\t\t\t<li class=\"current\">\n\t\t\t\t\t\t<a href=\"#\">\n\t\t\t\t\t\t\t<img src=\"" + data.picurl + "\"/>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<a href=\"#\">\n\t\t\t\t\t\t\t<img src=\"../img/login.jpg\"/>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>";
			infoStr += "<h3 class=\"title\">" + data.name + "</h3>\n\t\t\t\t<ul class=\"goods-price\">\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<span>\u540A&nbsp;&nbsp;\u724C&nbsp;&nbsp;\u4EF7\uFF1A</span>\n\t\t\t\t\t\t<del>\uFFE5" + data.price + ".00</del>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<span>\u9500&nbsp;&nbsp;\u552E&nbsp;&nbsp;\u4EF7\uFF1A</span>\n\t\t\t\t\t\t<span class=\"price\">\uFFE5" + data.price + ".00</span>\n\t\t\t\t\t\t&nbsp;&nbsp;(&nbsp;1.7\u6298&nbsp;)&nbsp;&nbsp;\n\t\t\t\t\t\t<span>\u7ACB\u7701\uFF1A\uFFE5496.00</span>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<span>\u597D&nbsp;&nbsp;\u8BC4&nbsp;&nbsp;\u5EA6\uFF1A</span>\n\t\t\t\t\t\t&nbsp;\n\t\t\t\t\t\t<span class=\"comBar\">\n\t\t\t\t\t\t\t<i></i>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t&nbsp;&nbsp;5\u5206&nbsp;&nbsp;\n\t\t\t\t\t\t\uFF08\u5DF2\u67093\u4EBA\u8BC4\u4EF7\uFF09\n\t\t\t\t\t</li>\n\t\t\t\t\t<li>\n\t\t\t\t\t\t\u8FD0&nbsp;&nbsp;&emsp;&nbsp;&nbsp;\u8D39\uFF1A\n\t\t\t\t\t\t&nbsp;&nbsp;\u540D\u978B\u5E93\u4F1A\u5458\u6EE1399\u5305\u90AE&nbsp;&nbsp;\n\t\t\t\t\t\t\uFF08\u4E0D\u5305\u62EC\u8D27\u5230\u4ED8\u6B3E\uFF09\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t\t<table class=\"specinfo\">\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th>\u5C3A\u7801\uFF1A</th>\n\t\t\t\t\t\t<td>37</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th>\u989C\u8272\uFF1A</th>\n\t\t\t\t\t\t<td></td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th>\u8D2D\u4E70\u6570\u91CF\uFF1A</th>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<span class=\"numadjust decrease\"></span>\n\t\t\t\t\t\t\t<input type=\"text\" class=\"goodsNum\" size=5 value=\"1\">\n\t\t\t\t\t\t\t<span class=\"numadjust increase\"></span>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</table>\n\t\t\t\t<div class=\"btnBar clearfix\">\n\t\t\t\t\t<span class=\"goods_info\">\u60A8\u8D2D\u4E70\u4E86 <i class=\"buyNums\">1</i>\u4EF6 <i class=\"buyCm\">37</i>\u7801 \u9ED1\u8272</span>\n\t\t\t\t\t<input type=\"button\" class=\"addCartBtn\" />\n\t\t\t\t\t<input type=\"button\" class=\"fastBuyBtn\" />\n\t\t\t\t</div>\n\t\t\t\t<div class=\"baozhang\">\n\t\t\t\t\t<i>\u540D\u978B\u5E93\u4FDD\u969C\uFF1A</i>&nbsp;\n\t\t\t\t\t<img src=\"../img/baozhang_img1.png\"/>\n\t\t\t\t\t&nbsp;\u6B63\u54C1\u4FDD\u8BC1&nbsp;&nbsp;&nbsp;&nbsp;\n\t\t\t\t\t<img src=\"../img/baozhang_img2.png\"/>\n\t\t\t\t\t&nbsp;\u81EA\u7531\u9000\u8D27&nbsp;&nbsp;&nbsp;&nbsp;\n\t\t\t\t\t<img src=\"../img/baozhang_img3.png\"/>\n\t\t\t\t\t&nbsp;\u5168\u573A\u6EE1399\u514D\u90AE\n\t\t\t\t</div>";
			$(".imgArea").html(imgStr);
			$(".infoArea").html(infoStr);

			// 数量加减
			$(".decrease").on("click", function () {
				var num = parseInt($(".goodsNum").val());
				num--;
				if (num < 1) {
					num = 1;
				}
				$(".goodsNum").val(num);
				$(".buyNums").text(num);
			});
			$(".increase").on("click", function () {
				var num = parseInt($(".goodsNum").val());
				num++;
				$(".goodsNum").val(num);
				$(".buyNums").text(num);
			});
			// 文本框数字改变事件
			$(".goodsNum").on("change", function () {
				var num = $(this).val();
				if (num < 1) {
					num = 1;
					$(this).val(num);
				}
				$(".buyNums").text(num);
			});
			// 设置文本框只能输入数字
			$(".goodsNum").on("input", function () {
				var val = $(this).val();
				var reg = /\D/g;
				val = val.replace(reg, "");
				$(this).val(val);
			});
			// 购物车按钮点击事件
			$(".addCartBtn").on("click", function () {
				// num 为文本框中的数字
				var num = parseInt($(".goodsNum").val());
				// 获取cookie中的token值
				var token = $.cookie("token");

				// 查询购物车,判断购物车中是否存在该商品
				$.get("http://47.104.244.134:8080/cartlist.do", {
					token: $.cookie("token")
				}, function (data) {
					for (var i in data) {
						if (data[i].gid == gid) {
							// 如果存在,则直接加
							$.get("http://47.104.244.134:8080/cartupdate.do", {
								"id": data[i].id,
								"gid": gid,
								"num": num,
								"token": $.cookie("token")
							}, function (data) {
								alert("成功加入" + num + "条到购物车!");
							});
							// 如果购物车之前有,则直接加入,return,不再执行下面的代码
							return;
						}
					}
					// 如果没有执行return,能够继续向下走,说明购物车中未存在
					// 先向购物车中加1条
					$.get("http://47.104.244.134:8080/cartsave.do", {
						"gid": gid,
						"token": $.cookie("token")
					}, function (data) {
						if (data.code == "0") {
							// 向购物车中加数据之后,判断数量是否不为1,不为1,要继续加num-1条
							if (num != 1) {
								$.get("http://47.104.244.134:8080/cartlist.do", {
									token: $.cookie("token")
								}, function (data) {
									for (var i in data) {
										if (data[i].gid == gid) {
											$.ajax({
												type: "get",
												url: "http://47.104.244.134:8080/cartupdate.do",
												data: {
													"id": data[i].id,
													"gid": gid,
													"num": num - 1,
													"token": $.cookie("token")
												},
												success: function success(data) {
													alert("成功加入" + num + "条到购物车!");
												}
											});
										}
									}
								});
							} else {
								alert("成功加入1条到购物车!");
							}
						} else {
							alert("添加购物车失败!");
						}
					});
				});
			});

			// 写数据结束
			$(".smallImg li").on("click", function () {
				// 加当前的样式
				$(this).addClass("current").siblings().removeClass("current");
				// 更换大图src
				$(".bigImg img").prop("src", $(this).find("img").prop("src"));
				$(".rightImgBox img").prop("src", $(this).find("img").prop("src"));
			});

			//中图划上的时候,显示黑色块,和右边大图的块
			$(".bigImg").on("mouseover", function (e) {
				var evt = e || event;

				$(".zoomBox").css({ "display": "block" });
				$(".rightImgBox").css({ "display": "block" });

				$(this).on("mousemove", function (e) {

					var evt = e || event;
					// 最大临界值,最小临界值
					var maxX = $(".bigImg").width() - $(".zoomBox").width();
					var maxY = $(".bigImg").height() - $(".zoomBox").height();
					// 取得左边距和上边距
					var x = evt.pageX - parseInt($(".bigImg").position().left) - $(".zoomBox").width() / 2;
					var y = evt.pageY - parseInt($(".bigImg").position().top) - $(".zoomBox").height() / 2;
					x = x <= 0 ? 0 : x > maxX ? maxX : x;
					y = y <= 0 ? 0 : y > maxY ? maxY : y;
					$(".zoomBox").css({ "left": x, "top": y });

					$(".rightImgBox img").css({ "left": -x * $(".rightImgBox").width() / $(".zoomBox").width(), "top": -y * $(".rightImgBox").height() / $(".zoomBox").height() });
				});
				$(this).on("mouseout", function () {
					$(".zoomBox").css({ "display": "none" });
					$(".rightImgBox").css({ "display": "none" });
				});
			});
		}

	});
});