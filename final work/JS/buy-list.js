
// 跳转详情页
function toinfo (e){
	location.href = 'info.html#' + e.getAttribute('goodid');
}

//删除商品
function del(obj){
	console.log(obj.getAttribute('goodID'));
	var goodID = obj.getAttribute('goodID');
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/updatecar.php",
		data:{userID:localStorage.getItem('userID'),goodsID:goodID,number:0},
		success:function(data){
			if(data != 0){
				location.reload();
			}
		},
		error:function(err){
			console.log(err);
		}
	});
}

// 价格，数量 
function checkChange(){
	// count： 选中几个checkbox
	var choosebtn = document.getElementById('chooseall');
	var money = 0,count = 0;
	var recount = 0;
	console.log(checks.length);		// checks 是 checkbox 的集合，全选的checkbox除外
	// 获取选中元素
	if(checks.length != 0){
		
	}
	for(var i = 0; i < checks.length; i++){
		if(checks[i].checked == true){
			//console.log(checks[i]);
			money += (parseFloat(checks[i].getAttribute('price'))*parseFloat(checks[i].getAttribute('number')));
			count++;
			console.log(money,count);
		}else if(checks[i].checked == false){
			recount++;
		}
		if(count == checks.length){
			console.log(count == checks.length);
			choosebtn.checked = true;
		}else{
			console.log(count == checks.length);
			choosebtn.checked = false;		// 如果注释掉这一句则有效果
		}
	}
	$('#paymoney').html(money);
	$('#calculate').val('结算(' + count + ')');
}

//添加商品
var goodslist = document.getElementById('goods-list');
$.ajax({
	type:"get",
	url:"http://datainfo.duapp.com/shopdata/getCar.php",
	dataType:'jsonp',
	data:{userID:localStorage.getItem('userID')},
	success:function(data){
		
		if(0 == data){
			$('#goods-list').html('<img id="empty" src = "images/empty.png"/>'
			+'<p class="em-text">购物车是空的，快去看看<a href="index.html">商品</a>吧！</p>'
		);
		}
		else{
			console.log(data);
			for(var i = 0; i < data.length; i++){
				goodslist.innerHTML += '<li class = "select"> '
				+ '<input onchange="checkChange();" class="check" type="checkbox" name="buy-list'
				+ i
				+ '" price = "'
				+ data[i].price
				+ '" number="'
				+ data[i].number
				+ '" value="buy-list"/>'
				+ '<a> <img src = "'
				+ data[i].goodsListImg
				+ '" onclick="toinfo(this);" '
				+ 'goodid = "'
				+ data[i].goodsID
				+ '"/> <span>'
				+ data[i].goodsName
				+ '</span>'
				+ '<p class="nor-icon">￥</p><p class="price">'
				+ data[i].price
				+ '</p>'
				+ '<span class="number"> 数量：×'
				+ data[i].number
				+ '</span>'
				+ '<img goodID="'
				+ data[i].goodsID
				+ '" class="icon" onclick="del(this)"; src = "images/icon-del.png"/></a></li>'
			}//for
		}//else
		//全选框
		checks = document.getElementsByClassName('check');
		checkChange();
		console.log(checks);
		var flag = true;
		$('#chooseall').click(function(){
			if(flag == true){
				for(var i = 0; i < checks.length; i++){
					checks[i].checked = true;
				}
				flag = false;
			}else{
				for(var i = 0; i < checks.length; i++){
					checks[i].checked = false;
				}
				flag = true;
			}
			
		})	//全选 click
	},
	error:function(err){
		console.log(err);
	}
});
//	回退上一页面
$('#aspan').click(function(){
	history.back();
})




