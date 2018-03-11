//获取商品id
var goodID = location.hash.slice(1);
console.log(goodID);

// 购物车更新
function updatecar(){
	var num = document.getElementById('buy-number').value;
	console.log(num);
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/updatecar.php",
			data:{userID:localStorage.getItem('userID'),goodsID:goodID,number:num},
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

//返回
$('.back').click(function(){
	window.history.back();
})
//获取商品数据
$.ajax({
	type:"get",
	url:"http://datainfo.duapp.com/shopdata/getGoods.php",
	dataType:'jsonp',
	data:{goodsID:goodID},
	success:function(data){
		console.log(data);
		//banner设置
		var banner = document.getElementsByClassName('swiper-slide');
		for(var i = 1; i< 3; i++){
			banner[i+1].innerHTML = '<img src='
			+ data[0].goodsBenUrl.split(',')[i]
			//+ ' goodID="' 
			//+ data[i].goodsID 
			+ '"/>';
		}
		banner[1].innerHTML = '<img src=' 
			+ data[0].goodsBenUrl.split(',')[0].slice(1)
			+ '"/>';
		banner[0].innerHTML = '<img src=' 
			+ data[0].goodsBenUrl.split(',')[2]
			//+ ' goodid="' 
			//+ data[3].goodsID 
			+ '"/>';
		banner[4].innerHTML = '<img src=' 
			+ data[0].goodsBenUrl.split(',')[0].slice(1)
			+ '"/>';
			
		//详情信息设置
		$('.good-info').html(data[0].goodsName);
		//价格设置
		$('.price-icon').html(data[0].price);
		//月销量设置
		$('#count-id').html(data[0].buynumber);
		//设置图片
		$('.imgs').html($('.imgs').html()
			+ '<img src='
			+ data[0].goodsBenUrl.split(',')[0].slice(1)
			+ '/>');
		for(var i = 1; i < 4; i++){
			$('.imgs').html($('.imgs').html()
			+ '<img src='
			+ data[0].goodsBenUrl.split(',')[i]
			+ '/>');
		}
		
		//设置参数信息
		$('.info').html(data[0].detail);
	},
	error:function(err){
		console.log(err);
	}
});

// 初始化Swiper对象
var mySwiper = new Swiper ('.swiper-container', {
		    direction: 'horizontal',
		    loop: true,
		    pagination: '.swiper-pagination',
		    autoplay:3000
		 });

//购买数量
$('#plus').click(function(){
	console.log($('#buy-number').val());
	$('#buy-number').val(parseInt($('#buy-number').val())+1);
})
$('#reduce').click(function(){
	console.log($('#buy-number').val());
	$('#buy-number').val(parseInt($('#buy-number').val())-1);
})
