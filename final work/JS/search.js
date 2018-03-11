
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

//1、取元素
var goodslist = document.getElementById('goods-list');
//2、定事件--页面加载完成
//3、写代码
// 跳转详情页
function toinfo (e){
	location.href = 'info.html#' + e.getAttribute('goodid');
}
window.onload=function(){
	//自动获得焦点
	$('.searchinp').focus();
	//购物车更新
	$('#searchimg').click(function(){
		if($('.searchinp').val() != ''){
			$.ajax({
				type:"get",
				url:"http://datainfo.duapp.com/shopdata/selectGoodes.php",
				dataType:'jsonp',
				data:{selectText:encodeURI($('.searchinp').val()),pageCode:0,linenumber:10},
				success:function(data){
					console.log(data);
					if(0 == data){
						$('#goods-list').html('<p>搜索到0件商品</p>');
					}else{
						goodslist.innerHTML='';
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
					}
				},
				error:function(err){
					console.log(err);
				}
			});
		}else{
			location.href='index.html';
		}
	})
}