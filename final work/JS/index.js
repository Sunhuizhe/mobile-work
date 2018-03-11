
// 是否播放启动动画
// 是否登录 
if(!localStorage.getItem('userID')){
	if(!localStorage.getItem('install')){
		location.href = 'first.html';
	}else{
		location.href = 'login.html';		
	}
}

var goodslist = document.getElementById('goods-list');
// 跳转详情页
function toinfo (e){
	location.href = 'info.html#' + e.getAttribute('goodid');
}
//跳转搜索页
$('.searchinp').click(function(){
	location.href = 'search.html';
})
// 列表数据更新
function updatebody (e){
	var classid = e.getAttribute('classid');
	console.log(classid);
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		dataType:'jsonp',
		data:{classID:classid},
		success:function(data){
			//console.log(data);
			goodslist.innerHTML = '';
			for(var i = 0; i < data.length; i++){
				goodslist.innerHTML += '<li> <a class="addevent"> <img goodID="'
				+ data[i].goodsID
				+'" onclick="toinfo(this)" src = "'
				+ data[i].goodsListImg
				+ '"/> <span>' 
				+ data[i].goodsName.slice(0,5) 
				+ '...' 
				+'</span><img goodID="'
				+ data[i].goodsID
				+'" class="icon" onclick="updatecar(this);" src = "images/icon-in.png"/></a></li>'
			}
		},
		error:function(err){
			console.log(err);
		}
	});
}
// 购物车更新
function updatecar(obj){
		console.log(obj.getAttribute('goodID'));
		var goodID = obj.getAttribute('goodID');
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/updatecar.php",
			data:{userID:localStorage.getItem('userID'),goodsID:goodID,number:1},
			success:function(data){
				if(data == 0){
					console.log(0);
					$('.fadeudfail').fadeIn();
					setTimeout(function(){$('.fadeudfail').fadeOut();},1500);
				}else{
					console.log(1);
					$('.fadeud').fadeIn();
					setTimeout(function(){$('.fadeud').fadeOut();},1500);
				}
			},
			error:function(err){
				console.log(err);
			}
		});
	}
window.onload = function(){
	
	// 绑定事件加点击样式
	var adds = document.getElementsByClassName('addevent');
	console.log(adds);
	for(var i = 0; i < adds.length; i++){
		(function(i){
			adds[i].addEventListener('touchstart', function () { });
			adds[i].addEventListener('touchstop', function () { });
		}(i))
	}
}

// 初始化Swiper对象
var mySwiper = new Swiper ('.swiper-container', {
		    direction: 'horizontal',
		    loop: true,
		    pagination: '.swiper-pagination',
		    autoplay:3000
		 });
//列表数据更新
$.ajax({
	type:"get",
	url:"http://datainfo.duapp.com/shopdata/getGoods.php",
	dataType:'jsonp',
	success:function(data){
		console.log(data);
		goodslist.innerHTML = '';
		for(var i = 0; i < data.length; i++){
			goodslist.innerHTML += '<li> <a class="addevent"> <img goodID="'
			+ data[i].goodsID
			+'" onclick="toinfo(this)" src = "'
			+ data[i].goodsListImg
			+ '"/> <span>' 
			+ data[i].goodsName.slice(0,5) 
			+ '...' 
			+'</span><img goodID="'
			+ data[i].goodsID
			+'" class="icon" onclick="updatecar(this);" src = "images/icon-in.png"/></a></li>'
		}
	},
	error:function(err){
		console.log(err);
	}
});
// 请求分类页面
$.ajax({
	type:'get',
	url:'http://datainfo.duapp.com/shopdata/getclass.php',
	dataType:'json',
	success:function(data){
		console.log(data);
		for(var i = 0; i < data.length; i++){
			$('.nav-ul').html($('.nav-ul').html()
			+ '<li><a onclick="updatebody(this);" classid="'
			+data[i].classID
			+'">'
			+data[i].className
			+'</a></li>');
		}
	},
	error:function(err){
		console.log(err);
	}
});
// 请求、设置banner
$.ajax({
	type:"get",
	url:"http://datainfo.duapp.com/shopdata/getBanner.php",
	dataType:'jsonp',
	success:function(data){
		console.log(data);
		var banner = document.getElementsByClassName('swiper-slide');
		for(var i = 0; i<4; i++){
			banner[i+1].innerHTML = '<img onclick="toinfo(this);" src='
			+ data[i].goodsBenUrl.split(',')[0].slice(1)
			+ ' goodID="' 
			+ data[i].goodsID 
			+ '"/>';
		}
		banner[0].innerHTML = '<img onclick="toinfo(this);" src=' 
			+ data[3].goodsBenUrl.split(',')[0].slice(1)
			+ ' goodid="' 
			+ data[3].goodsID 
			+ '"/>';
		banner[5].innerHTML = '<img onclick="toinfo(this);" src=' 
			+ data[0].goodsBenUrl.split(',')[0].slice(1)
			+ ' goodid="' 
			+ data[0].goodsID 
			+ '"/>';
	},
	error:function(err){
		console.log(err);
	}
});
