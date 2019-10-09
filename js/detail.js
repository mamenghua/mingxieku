$(function(){
	$("#header").load("../html/header.html");
	// 从地址栏得到id值，保存
	let gid = window.location.search.split("=")[1];
	
	$.ajax({
		type:"get",
		url:"http://47.104.244.134:8080/goodsbyid.do",
		data:{
			"id":gid
		},
		success:function(data){
			console.log(data);
			let imgStr = "";
			let infoStr = "";
			imgStr += `<div class="bigImg">
					<img src="${data.picurl}"/>
					<div class="zoomBox"></div>
					<div class="rightImgBox">
						<img src="${data.picurl}"/>
					</div>
				</div>
				<ul class="smallImg clearfix">
					<li class="current">
						<a href="#">
							<img src="${data.picurl}"/>
						</a>
					</li>
					<li>
						<a href="#">
							<img src="../img/login.jpg"/>
						</a>
					</li>
				</ul>`;
			infoStr += `<h3 class="title">${data.name}</h3>
				<ul class="goods-price">
					<li>
						<span>吊&nbsp;&nbsp;牌&nbsp;&nbsp;价：</span>
						<del>￥${data.price}.00</del>
					</li>
					<li>
						<span>销&nbsp;&nbsp;售&nbsp;&nbsp;价：</span>
						<span class="price">￥${data.price}.00</span>
						&nbsp;&nbsp;(&nbsp;1.7折&nbsp;)&nbsp;&nbsp;
						<span>立省：￥496.00</span>
					</li>
					<li>
						<span>好&nbsp;&nbsp;评&nbsp;&nbsp;度：</span>
						&nbsp;
						<span class="comBar">
							<i></i>
						</span>
						&nbsp;&nbsp;5分&nbsp;&nbsp;
						（已有3人评价）
					</li>
					<li>
						运&nbsp;&nbsp;&emsp;&nbsp;&nbsp;费：
						&nbsp;&nbsp;名鞋库会员满399包邮&nbsp;&nbsp;
						（不包括货到付款）
					</li>
				</ul>
				<table class="specinfo">
					<tr>
						<th>尺码：</th>
						<td>37</td>
					</tr>
					<tr>
						<th>颜色：</th>
						<td></td>
					</tr>
					<tr>
						<th>购买数量：</th>
						<td>
							<span class="numadjust decrease"></span>
							<input type="text" class="goodsNum" size=5 value="1">
							<span class="numadjust increase"></span>
						</td>
					</tr>
				</table>
				<div class="btnBar clearfix">
					<span class="goods_info">您购买了 <i class="buyNums">1</i>件 <i class="buyCm">37</i>码 黑色</span>
					<input type="button" class="addCartBtn" />
					<input type="button" class="fastBuyBtn" />
				</div>
				<div class="baozhang">
					<i>名鞋库保障：</i>&nbsp;
					<img src="../img/baozhang_img1.png"/>
					&nbsp;正品保证&nbsp;&nbsp;&nbsp;&nbsp;
					<img src="../img/baozhang_img2.png"/>
					&nbsp;自由退货&nbsp;&nbsp;&nbsp;&nbsp;
					<img src="../img/baozhang_img3.png"/>
					&nbsp;全场满399免邮
				</div>`;
			$(".imgArea").html(imgStr);
			$(".infoArea").html(infoStr);
			
			// 数量加减
			$(".decrease").on("click",function(){
				let num = parseInt($(".goodsNum").val());
				num--;
				if(num<1){
					num=1;
				}
				$(".goodsNum").val(num);
				$(".buyNums").text(num);
			});
			$(".increase").on("click",function(){
				let num = parseInt($(".goodsNum").val());
				num++;
				$(".goodsNum").val(num);
				$(".buyNums").text(num);
			});
			// 文本框数字改变事件
			$(".goodsNum").on("change",function(){
				let num = $(this).val();
				if(num<1){
					num=1;
					$(this).val(num);
				}
				$(".buyNums").text(num);
			});
			// 设置文本框只能输入数字
			$(".goodsNum").on("input",function(){
				let val = $(this).val();
				let reg = /\D/g;
				val = val.replace(reg,"");
				$(this).val(val);
			});
			// 购物车按钮点击事件
			$(".addCartBtn").on("click",function(){
				// num 为文本框中的数字
				let num = parseInt($(".goodsNum").val());
				// 获取cookie中的token值
				let token = $.cookie("token");
				
				// 查询购物车,判断购物车中是否存在该商品
				$.get("http://47.104.244.134:8080/cartlist.do",{
						token:$.cookie("token")
					},function(data){
						for(var i in data){
							if(data[i].gid == gid){
								// 如果存在,则直接加
								$.get("http://47.104.244.134:8080/cartupdate.do",{
										"id":data[i].id,
										"gid":gid,
										"num":num,
										"token":$.cookie("token")
									},function(data){
										alert("成功加入"+num+"条到购物车!");
									}
								);
								// 如果购物车之前有,则直接加入,return,不再执行下面的代码
								return;
							}
							
						}
						// 如果没有执行return,能够继续向下走,说明购物车中未存在
						// 先向购物车中加1条
						$.get("http://47.104.244.134:8080/cartsave.do",{
								"gid":gid,
								"token":$.cookie("token")
							},function(data){
								if(data.code == "0"){
									// 向购物车中加数据之后,判断数量是否不为1,不为1,要继续加num-1条
									if(num != 1){
										$.get("http://47.104.244.134:8080/cartlist.do",{
												token:$.cookie("token")
											},function(data){
												for(var i in data){
													if(data[i].gid == gid){
														$.ajax({
															type:"get",
															url:"http://47.104.244.134:8080/cartupdate.do",
															data:{
																"id":data[i].id,
																"gid":gid,
																"num":num-1,
																"token":$.cookie("token")
															},
															success:function(data){
																alert("成功加入"+num+"条到购物车!");
															}
														});
													}
												}
											}
										);
									}else{
										alert("成功加入1条到购物车!");
									}
									
									
								}else{
									alert("添加购物车失败!");
								}
	
							}
						);
						
					}
				);
				
				

			});
			
			// 写数据结束
			$(".smallImg li").on("click",function(){
				// 加当前的样式
				$(this).addClass("current").siblings().removeClass("current");
				// 更换大图src
				$(".bigImg img").prop("src",$(this).find("img").prop("src"));
				$(".rightImgBox img").prop("src",$(this).find("img").prop("src"));
			});
			
			//中图划上的时候,显示黑色块,和右边大图的块
			$(".bigImg").on("mouseover",function(e){
				let evt = e || event;
				
				$(".zoomBox").css({"display":"block"});
				$(".rightImgBox").css({"display":"block"});
				
				$(this).on("mousemove",function(e){
					
					let evt = e || event;
					// 最大临界值,最小临界值
					let maxX = $(".bigImg").width() - $(".zoomBox").width();
					let maxY = $(".bigImg").height() - $(".zoomBox").height();
					// 取得左边距和上边距
					let x = evt.pageX - parseInt($(".bigImg").position().left) - $(".zoomBox").width()/2;
					let y = evt.pageY - parseInt($(".bigImg").position().top) - $(".zoomBox").height()/2;
					x = x<=0 ? 0 : x>maxX ? maxX : x ;
					y = y<=0 ? 0 : y>maxY ? maxY : y ;
					$(".zoomBox").css({"left":x,"top":y});
					
					$(".rightImgBox img").css({"left":-x*$(".rightImgBox").width()/$(".zoomBox").width(),"top":-y*$(".rightImgBox").height()/$(".zoomBox").height()});
				});
				$(this).on("mouseout",function(){
					$(".zoomBox").css({"display":"none"});
					$(".rightImgBox").css({"display":"none"});
				});
			});
			
		}
		
		
	});
	
	
});
