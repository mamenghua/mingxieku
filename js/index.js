$(function(){
	// 获取到banner
	$bannerWrap = $("#bannerWrap");
	var i = 0;
	var timer = setInterval(function(){
		i++;
		if(i>=5){
			i=0;
		}
		// banner图自动轮播
		$bannerWrap.find(".banner_con").children().eq(i)
		.fadeIn().stop().animate({"opacity":"1"})
		.siblings().fadeOut().stop().animate({"opacity":"0"});
		// 下标跟着变化
		$bannerWrap.find(".banner_nav").children().eq(i).addClass("current")
		.siblings().removeClass("current");
	},3000);
	
	// 从cookie中获取到token值
	let token = $.cookie("token");
	if(token != undefined){
		$(".navLogin").html("<span style='color:#d30000;font-weight:bold;'>欢迎用户："+token+"登录</span>");
		$(".navRegister").html("<a href='../login.html'>退出</a>");
	}
	console.log(token);
	$.ajax({
		type:"get",
		url:"http://47.104.244.134:8080/goodstypelist.do",
		data:{
			"l":1
		},
		success:function(data){
			let str = `<a href="index.html" class="first on">首页</a>`;
			for(let i in data){
				str += `<a href="html/lists.html?id=${data[i].id}" data-id="${data[i].id}">${data[i].name}</a>`;
			}
			$(".tnav").html(str);
			$.ajax({
				type:"get",
				url:"http://47.104.244.134:8080/goodstypelist.do",
				data:{
					"l":2
				},
				success:function(data){
					for(let i in data){
						//console.log(data[i]);
						$parent = $(".tnav a[data-id="+data[i].parentid+"]");
						//console.log(parent);
						let str = `<a href="html/lists.html?id=${data[i].id}" data-id="${data[i].id}">${data[i].name}</a>`;
						
						if($parent.children().length == 0){
							$parent.append("<ul><li>"+str+"</li></ul>");
						}else{
							$parent.children().append("<li>"+str+"</li>");
						}
						
					}
				}
				
			});
			
			$(".tnav a").hover(function(){
				$(this).find("ul").css({"display":"block"});
			},function(){
				$(this).find("ul").css({"display":"none"});
			});
		}
	});
	//获取列表数据
	$.ajax({
		type:"get",
		url:"http://47.104.244.134:8080/goodsbytid.do",
		data:{
			"tid":13,
			"page":1,
			"limit":10
		},
		success:function(data){
			console.log(data);
			let str = "";
			let str1 = "";
			for(var i in data.data){
				let list = data.data[i];
				str += `<dl>
						<dt>
							<a href="html/detail.html?id=${list.id}">
								<img src="${list.picurl}"/>
							</a>
						</dt>
						<dd>
							<a href="html/detail.html?id=${list.id}">
								<ul>
									<li class="tit">${list.name}</li>
									<li>
										<i class="price">￥${list.price}</i>
										<del class="del_price">￥${list.price}</del>
										<span class="buy_btn">立即抢购</span>
									</li>
								</ul>
							</a>
						</dd>
					</dl>`;
				str1 += `<li>
						<a href="html/detail.html?id=${list.id}">
							<img src="${list.picurl}"/>
							<span>+</span>
						</a>
					</li>`;
				
			}
			$(".productList").html(str);
			$(".tuijianList").html(str1);

		}
	});
	
	// 搜索框
	$("#searchText").on("input",function(){

		let val = $(this).val();
		$.ajax({
			type:"get",
			url:"https://suggest.taobao.com/sug?code=utf-8",
			data:{
				"q":val
			},
			dataType:"jsonp",
			success:function(data){
				let str = "";
				for(var i in data.result){
					str += `<li>${data.result[i][0]}</li>`;
				}
				$(".searchList").html(str);
				
				$(".searchList").children().each(function(){
					$(this).on("click",function(){
						$("#searchText").val($(this).text());
					});
				})
			}
		});
	});
	$("#searchText").on("focus",function(){
		$(".searchList").css({"display":"block"});
	});
	$("#searchText").on("blur",function(){
		setTimeout(function(){
			$(".searchList").css({"display":"none"});
		},200);
		
	});
	// 返回按钮在一定位置显示
	$(window).scroll(function(){
		if($(window).scrollTop() > 50){
			$(".rBarGoTop").fadeIn(200);
		}else{
			$(".rBarGoTop").fadeOut(200);
		}
	});
	// 返回顶部
	$(".rBarGoTop").on("click",function(){
		$("body,html").animate({"scrollTop":0},500);
	});
	
	
	$.get("http://47.104.244.134:8080/cartlist.do",{
			"token":token
		},function(data){
			let cartNum = 0;
			for(var i in data){
				cartNum += data[i].count;
			}
			if(cartNum>999){
				$(".cart-num").text("999+");
			}else{
				$(".cart-num").text(cartNum);
			}
			
			
		});
	
	$(".navLogin").html("<span style='color:#d30000;font-weight:bold;'>"+token+"</span>");
	$(".navRegister").html("<a href='html/login.html'>退出</a>");
});
