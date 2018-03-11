//是否已走过欢迎页
if(!localStorage.getItem('install')){
	location.href = 'first.html';
}

//1、取元素
var userid = document.getElementById('userid');
var pwd = document.getElementById('password');
var usererr = document.getElementById('usererr');
var pwderr = document.getElementById('pwderr');

//2、定事件--失去焦点，
//3、写代码
//本地判空
userid.onblur = function(){
	if(userid.value == ''){
		usererr.innerHTML = '用户名不能为空！';
	}else{
		usererr.innerHTML = '';
	}
}
pwd.onblur = function(){
	if(pwd.value == ''){
		pwderr.innerHTML = '密码不能为空！';
	}else{
		pwderr.innerHTML = '';
	}
}
// Ajax登录请求
$('#btn').click(function(){
	if(userid.value == ''){
		$('#usererr').html('用户名不能为空！');
	}else{
		if(pwd.value == ''){
			$('#pwderr').html('密码不能为空！')
		}else{
			$.ajax({
				type:"get",
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				data:{status:'login',userID:userid.value,password:pwd.value},
				success:function(data){
					console.log(data);
					if(data == 0){
						usererr.innerHTML = '用户名不存在！';
					}
					else if(data == 2){
						usererr.innerHTML = '用户名与密码不符！';
					}
					else{
						localStorage.setItem('userID',userid.value);
						location.href = 'index.html';
					}
				},
				error:function(err){
					console.log(err);
				}
			})
		}
	}		
})