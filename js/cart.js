$(function() {
	
	function Cart(){
		
	}
	Cart.prototype.showList = function(){
		console.log($.cookie("token"));
		$cartList = $("#cart_list_table");
		// 获取到全选按钮
		$checkAll = $("#checkAll");
	
		$.ajax({
			type:"get",
			url:"http://47.104.244.134:8080/cartlist.do",
			data:{
				token:$.cookie("token")
			},
			success:function(data){
				let str = "";
				for(var i in data){
					let info = data[i];
					console.log(info);
					str += `<tr id=${info.id} gid=${info.gid}>
							<td><input type="checkbox" /></td>
							<td>
								<a href="detail.html?id=${info.goods.id}">
									<img src="${info.goods.picurl}" width="50" height="50"/>
								</a>
							</td>
							<td>
								<h3 class="tit">${info.goods.name}</h3>
								<i>( 尺码:39,颜色:白色+灰色 )</i>
							</td>
							<td>0</td>
							<td>￥<i class="price">${info.goods.price}</i>.00</td>
							<td>
								<span class="numdec"></span>
								<input type="text" class="num" value="${info.count}"/>
								<span class="numadd"></span>
							</td>
							<td>-</td>
							<td>￥<i class="perPrice">${info.goods.price*info.count}</i>.00</td>
							<td>
								<a class="delBtn" href="javascript:void(0);">删除</a>
							</td>
						</tr>`;
				}
				$("#cart_list_table").html(str);
				// 全选按钮注册点击事件
				$checkAll.click(function() {
					$("#cart_list_table input").prop("checked",$(this).prop("checked"));
					// 重新计算数量总和,总价
					countSum();
				});
				// 下面列表的input点击，会影响全选按钮
				// 判断如果选中的input长度值等于tr的长度，则选中，否则不选中
				$("#cart_list_table").find("input[type='checkbox']").click(function() {
					if($("#cart_list_table input:checked").length == $("#cart_list_table tr").length) {
						$checkAll.prop("checked", true);
					} else {
						$checkAll.prop("checked", false);
					}
					// 重新计算数量总和,总价
					countSum();
				});
				// 给每个numadd注册点击事件，数字增加
				$(".numadd").each(function(index){
					$(this).on("click",function(){
						let id = $(this).parents("tr").attr("id");
						let gid = $(this).parents("tr").attr("gid");
						$.ajax({
							type:"get",
							url:"http://47.104.244.134:8080/cartupdate.do",
							data:{
								"id":id,
								"gid":gid,
								"num":1,
								"token":$.cookie("token")
							},
							success:function(data){
								console.log("按钮加");
								console.log(data);
							}
						});
						// 对应索引的num框数字加1
						let num = parseInt($(this).prev().val())+1;
						$(this).prev().val(num);
						$(this).parents("tr").find(".perPrice").text(num*$(this).parents("tr").find(".price").text());
						// 重新计算数量总和,总价
						countSum();
					});
				});
				// 给每个numdec注册点击事件，数字减少
				$(".numdec").each(function(index){
					$(this).on("click",function(){
						
						let num = parseInt($(this).next().val())-1;
						if(num<1){
							num = 1;
							$(this).val(num);
						}else{
							$.ajax({
								type:"get",
								url:"http://47.104.244.134:8080/cartupdate.do",
								data:{
									"id":$(this).parents("tr").attr("id"),
									"gid":$(this).parents("tr").attr("gid"),
									"num":-1,
									"token":$.cookie("token")
								},
								success:function(data){
									console.log(data);
								}
							});
						}
						$(this).next().val(num);
						$(this).parents("tr").find(".perPrice").text(num*$(this).parents("tr").find(".price").text());
						// 重新计算数量总和,总价
						countSum();
					});
				});
				
				// 给每个num注册遍历事件
				$(".num").each(function(){
					
					let originNum = 0;
					let beginNum = 0;
					// 设置文本框只能输入数字
					$(this).on("input",function(){
						console.log("正则验证,只能输入数字");
						let val = $(this).val();
						let reg = /\D/g;
						val = val.replace(reg,"");
						$(this).val(val);
					});
					// 给文本框设置聚焦事件,获取到改变之前的数字
					$(this).focus(function(){
						originNum = $(this).val();
					});
					// 给文本框设置失焦事件
					$(this).blur(function(){
						beginNum = parseInt($(this).val());
						
					    
						if(beginNum<1){
							beginNum=1;
							$(this).val(beginNum);
						}
						let differ = beginNum-originNum;
						console.log(originNum,beginNum,differ);

						let id = $(this).parents("tr").attr("id");
						let gid = $(this).parents("tr").attr("gid");
						console.log(id,gid);
						// 为0时不执行
						if(differ!=0){
							$.ajax({
								type:"get",
								url:"http://47.104.244.134:8080/cartupdate.do",
								data:{
									"id":id,
									"gid":gid,
									"num":differ,
									"token":$.cookie("token")
								},
								success:function(data){
									console.log("文本框改变");
									console.log(data);
								}
							});
						}
						
						$(this).parents("tr").find(".perPrice").text(beginNum*$(this).parents("tr").find(".price").text());
						// 重新计算数量总和,总价
						countSum();
	
					});
				});
				
				
				

				// 删除按钮
				$(".delBtn").each(function(){
					$(this).on("click",function(){
						
						$.ajax({
							type:"get",
							url:"http://47.104.244.134:8080/cartupdate.do",
							data:{
								"id":$(this).parents("tr").attr("id"),
								"gid":$(this).parents("tr").attr("gid"),
								"num":0,
								"token":$.cookie("token")
							},
							success:function(data){
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
	}
	// 创建一个cart对象
	var cart = new Cart();
	// 调用showList方法，显示购物车数据
	cart.showList();
	
	
	
	
	
	
	// 计算所有的数量总价
	function countSum(){
		let sumNum = 0;
		let sumPri = 0;
		$("#cart_list_table").find("input[type='checkbox']").each(function(index){
			// 被勾选中的数量
			if($(this).prop("checked")){
				sumNum += parseInt($(".num").eq(index).val());
				sumPri += parseInt($(".perPrice").eq(index).text());
			}
		});
		$(".totalNum").text(sumNum);
		$(".totalPri").text(sumPri);
	}
	
	
	
});