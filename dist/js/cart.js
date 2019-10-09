"use strict";

$(function () {

	function Cart() {}
	Cart.prototype.showList = function () {
		console.log($.cookie("token"));
		$cartList = $("#cart_list_table");
		// 获取到全选按钮
		$checkAll = $("#checkAll");

		$.ajax({
			type: "get",
			url: "http://47.104.244.134:8080/cartlist.do",
			data: {
				token: $.cookie("token")
			},
			success: function success(data) {
				var str = "";
				for (var i in data) {
					var info = data[i];
					console.log(info);
					str += "<tr id=" + info.id + " gid=" + info.gid + ">\n\t\t\t\t\t\t\t<td><input type=\"checkbox\" /></td>\n\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t<a href=\"detail.html?id=" + info.goods.id + "\">\n\t\t\t\t\t\t\t\t\t<img src=\"" + info.goods.picurl + "\" width=\"50\" height=\"50\"/>\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t<h3 class=\"tit\">" + info.goods.name + "</h3>\n\t\t\t\t\t\t\t\t<i>( \u5C3A\u7801:39,\u989C\u8272:\u767D\u8272+\u7070\u8272 )</i>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t<td>0</td>\n\t\t\t\t\t\t\t<td>\uFFE5<i class=\"price\">" + info.goods.price + "</i>.00</td>\n\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t<span class=\"numdec\"></span>\n\t\t\t\t\t\t\t\t<input type=\"text\" class=\"num\" value=\"" + info.count + "\"/>\n\t\t\t\t\t\t\t\t<span class=\"numadd\"></span>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t<td>-</td>\n\t\t\t\t\t\t\t<td>\uFFE5<i class=\"perPrice\">" + info.goods.price * info.count + "</i>.00</td>\n\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t<a class=\"delBtn\" href=\"javascript:void(0);\">\u5220\u9664</a>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t</tr>";
				}
				$("#cart_list_table").html(str);
				// 全选按钮注册点击事件
				$checkAll.click(function () {
					$("#cart_list_table input").prop("checked", $(this).prop("checked"));
					// 重新计算数量总和,总价
					countSum();
				});
				// 下面列表的input点击，会影响全选按钮
				// 判断如果选中的input长度值等于tr的长度，则选中，否则不选中
				$("#cart_list_table").find("input[type='checkbox']").click(function () {
					if ($("#cart_list_table input:checked").length == $("#cart_list_table tr").length) {
						$checkAll.prop("checked", true);
					} else {
						$checkAll.prop("checked", false);
					}
					// 重新计算数量总和,总价
					countSum();
				});
				// 给每个numadd注册点击事件，数字增加
				$(".numadd").each(function (index) {
					$(this).on("click", function () {
						var id = $(this).parents("tr").attr("id");
						var gid = $(this).parents("tr").attr("gid");
						$.ajax({
							type: "get",
							url: "http://47.104.244.134:8080/cartupdate.do",
							data: {
								"id": id,
								"gid": gid,
								"num": 1,
								"token": $.cookie("token")
							},
							success: function success(data) {
								console.log("按钮加");
								console.log(data);
							}
						});
						// 对应索引的num框数字加1
						var num = parseInt($(this).prev().val()) + 1;
						$(this).prev().val(num);
						$(this).parents("tr").find(".perPrice").text(num * $(this).parents("tr").find(".price").text());
						// 重新计算数量总和,总价
						countSum();
					});
				});
				// 给每个numdec注册点击事件，数字减少
				$(".numdec").each(function (index) {
					$(this).on("click", function () {

						var num = parseInt($(this).next().val()) - 1;
						if (num < 1) {
							num = 1;
							$(this).val(num);
						} else {
							$.ajax({
								type: "get",
								url: "http://47.104.244.134:8080/cartupdate.do",
								data: {
									"id": $(this).parents("tr").attr("id"),
									"gid": $(this).parents("tr").attr("gid"),
									"num": -1,
									"token": $.cookie("token")
								},
								success: function success(data) {
									console.log(data);
								}
							});
						}
						$(this).next().val(num);
						$(this).parents("tr").find(".perPrice").text(num * $(this).parents("tr").find(".price").text());
						// 重新计算数量总和,总价
						countSum();
					});
				});

				// 给每个num注册遍历事件
				$(".num").each(function () {

					var originNum = 0;
					var beginNum = 0;
					// 设置文本框只能输入数字
					$(this).on("input", function () {
						console.log("正则验证,只能输入数字");
						var val = $(this).val();
						var reg = /\D/g;
						val = val.replace(reg, "");
						$(this).val(val);
					});
					// 给文本框设置聚焦事件,获取到改变之前的数字
					$(this).focus(function () {
						originNum = $(this).val();
					});
					// 给文本框设置失焦事件
					$(this).blur(function () {
						beginNum = parseInt($(this).val());

						if (beginNum < 1) {
							beginNum = 1;
							$(this).val(beginNum);
						}
						var differ = beginNum - originNum;
						console.log(originNum, beginNum, differ);

						var id = $(this).parents("tr").attr("id");
						var gid = $(this).parents("tr").attr("gid");
						console.log(id, gid);
						// 为0时不执行
						if (differ != 0) {
							$.ajax({
								type: "get",
								url: "http://47.104.244.134:8080/cartupdate.do",
								data: {
									"id": id,
									"gid": gid,
									"num": differ,
									"token": $.cookie("token")
								},
								success: function success(data) {
									console.log("文本框改变");
									console.log(data);
								}
							});
						}

						$(this).parents("tr").find(".perPrice").text(beginNum * $(this).parents("tr").find(".price").text());
						// 重新计算数量总和,总价
						countSum();
					});
				});

				// 删除按钮
				$(".delBtn").each(function () {
					$(this).on("click", function () {

						$.ajax({
							type: "get",
							url: "http://47.104.244.134:8080/cartupdate.do",
							data: {
								"id": $(this).parents("tr").attr("id"),
								"gid": $(this).parents("tr").attr("gid"),
								"num": 0,
								"token": $.cookie("token")
							},
							success: function success(data) {
								console.log(data);
							}
						});
						// DOM中删除
						$(this).parents("tr").remove();
						// 重新计算数量总和,总价
						countSum();
					});
				});
			}
		});
	};
	// 创建一个cart对象
	var cart = new Cart();
	// 调用showList方法，显示购物车数据
	cart.showList();

	// 计算所有的数量总价
	function countSum() {
		var sumNum = 0;
		var sumPri = 0;
		$("#cart_list_table").find("input[type='checkbox']").each(function (index) {
			// 被勾选中的数量
			if ($(this).prop("checked")) {
				sumNum += parseInt($(".num").eq(index).val());
				sumPri += parseInt($(".perPrice").eq(index).text());
			}
		});
		$(".totalNum").text(sumNum);
		$(".totalPri").text(sumPri);
	}
});