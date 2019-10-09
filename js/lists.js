$(function(){
	$("#header").load("../html/header.html");
	let tid = location.href.split("=")[1];
	console.log(tid);
	//获取列表数据
	$.ajax({
		type:"get",
		url:"http://47.104.244.134:8080/goodsbytid.do",
		data:{
			"tid":13,
			"page":1,
			"limit":100
		},
		success:function(data){
			console.log(data);
			let str = "";

			for(var i in data.data){
				let list = data.data[i];
				str += `<dl>
						<dt>
							<a href="detail.html?id=${list.id}">
								<img src="${list.picurl}"/>
							</a>
						</dt>
						<dd>
							<a href="detail.html?id=${list.id}">
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
				
			}
			$(".productList").eq(0).html(str);

		}
	});
});
