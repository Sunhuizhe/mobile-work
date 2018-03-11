//1、取元素
var userid = document.getElementById('userid');
var passwd = document.getElementById('password');
var repasswd = document.getElementById('repassword');
var usererr = document.getElementById('usererr');
var pwderr = document.getElementById('pwderr');
//2、定事件--click
//3、写代码
//本地判空
userid.onblur = function(){
	if(userid.value == ''){
		usererr.innerHTML = '用户名不能为空！';
	}else{
		usererr.innerHTML = '';
	}
}
passwd.onblur = function(){
	if(passwd.value == ''){
		pwderr.innerHTML = '密码不能为空！';
	}else{
		pwderr.innerHTML = '';
	}
}
repasswd.onblur = function(){
	if(repasswd.value == passwd.value){
		pwderr.innerHTML = '';
	}else{
		pwderr.innerHTML = '两次密码不一致！';
	}
}
//ajax请求
$('#btn').click(function(){
	if(userid.value == ''){
		$('#usererr').html('用户名不能为空！');
	}else{
		if(passwd.value == ''){
			$('#pwderr').html('密码不能为空！')
		}else{
			if(repasswd.value != passwd.value){
				$('#pwderr').html('两次密码不一致！')
			}else{
				$.ajax({
					type:"get",
					url:"http://datainfo.duapp.com/shopdata/userinfo.php",
					data:{status:'register',userID:userid.value,password:passwd.value},
					success:function(data){
						console.log(data);
						if(data == 0){
							usererr.innerHTML = '用户名重名！';
						}
						else if(data == 2){
							pwderr.innerHTML = '数据库报错！';
						}
						else{
							location.href = 'regesit.html'
						}
					},
					error:function(err){
						console.log(err);
					}
				})
			}
		}
	}		
})