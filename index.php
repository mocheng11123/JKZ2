
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=0">
	<title>电子健康证</title>
	<link href="/%E9%87%8D%E5%BA%86/occ/static/m/css/common.css?v=2024-01-20" rel="stylesheet" type="text/css" />
	<link href="/%E9%87%8D%E5%BA%86/occ/static/m/css/style.css?v=2024-01-20" rel="stylesheet" type="text/css" />
	<link href="https://res.wx.qq.com/open/libs/weui/2.3.0/weui.min.css" rel="stylesheet" /><script type="text/javascript" src="/%E9%87%8D%E5%BA%86/occ/static/m/js/jquery-3.2.1.min.js"></script><script type="text/javascript" src="/%E9%87%8D%E5%BA%86/occ/static/js/g.js?v=2024-01-20"></script><script type="text/javascript" src="/%E9%87%8D%E5%BA%86/occ/static/m/js/common.js"></script><script type="text/javascript" src="/%E9%87%8D%E5%BA%86/occ/static/m/js/qrcode.min.js"></script><script type="text/javascript" src="/%E9%87%8D%E5%BA%86/occ/static/m/js/weixin_font_style.js?v=2024-01-20"></script>
	<style type="text/css">body{
        margin: 0;
    }
    .nav{
        display: flex;
        justify-content: center;
    }
    #qrcode{
        padding: 5px;
        border-color: #fff;
        border-radius: 6px;
        margin-top: 15px;
        background: #fff;
    }
    .name{
        font-size: 17px;
        font-weight: 500;
        color: #fff;
    }
    .names{
        font-size: 15px;
        font-weight: 500;
        color: #fff;
        margin-top: 11px;
    }
    .type{
        font-size: 17px;
        font-weight: 500;
        color: #fff;
    }
    .bg{
        background-image: url(/%E9%87%8D%E5%BA%86/occ/static/m/img/Background.png);
        background-size: 100%;
        height: 313px;
        padding-top: 15px;
    }
    .top{
        margin-top: 10px;
        margin-bottom: 15px;
    }
    .weui-btn{
        font-weight: 400;
        font-size: 13px;
        padding: 8px 0;
        border-radius: 15px;
        width: 95px;
        background: #fff;
    }
    .radios{
        width: 15px;
        height: 15px;
        border-radius: 5px;
        margin-right: 15px;
        display: inline-block;
    }
    .details{
        background: #F8F8F8;
        font-size: 15px;
    }
    .navtitle{
        padding: 8px 0 8px 19px;
    }
    a{
        text-decoration:none;
    }
	</style>
</head>
<body>
<div class="bg">
<div class="nav top"><span class="name">龙勇</span><span style="width: 23px;"></span><span class="type">食品</span></div>

<div class="nav"><a class="setbutton weui-btn weui-btn_default remove" href="/%E9%87%8D%E5%BA%86/index" role="button">换绑身份证</a></div>

<div class="nav">
<div id="qrcode" style="width:150px; height:150px;" title="//"></div>
</div>

<div class="nav"><span class="names">有效期至 2025.02.22</span></div>

<div class="weui-cells"><a aria-labelledby="js_cell_itl1_hd js_cell_itl1_bd js_cell_itl1_ft" class="weui-cell weui-cell_access weui-cell_example" href="/%E9%87%8D%E5%BA%86/fysB.php"><span aria-hidden="true" class="weui-cell__hd" id="js_cell_itl1_hd"><img src="/%E9%87%8D%E5%BA%86/occ/static/m/img/img1.png" style="width: 20px; margin-right: 16px; display: block;" /></span> <span aria-hidden="true" class="weui-cell__bd" id="js_cell_itl1_bd"> <span style="font-size: 15px;">电子健康证</span> </span> </a> <!--         <a id="cilck" aria-labelledby="js_cell_itl2_hd js_cell_itl2_bd js_cell_itl2_ft" class="weui-cell weui-cell_access weui-cell_example" href="javascript:"> --> <!--             <span class="weui-cell__hd" id="js_cell_itl2_hd" aria-hidden="true"> --> <!--             <span class="weui-cell__bd" id="js_cell_itl2_bd" aria-hidden="true"> --> <!--                 <span style="font-size: 15px;">绿码：体检合格且在有效期内</span> --> <!--             </span> --> <!--             <span class="weui-cell__ft" id="js_cell_itl2_ft" aria-hidden="true"></span> --> <!--         </a> --></div>

<div class="details">
<div class="navtitle">
<p class="radios" style="background: #319B3C;"></p>
绿码：体检合格且在有效期内</div>

<div class="navtitle">
<p class="radios" style="background: #FFA32C;"></p>
黄码：临近失效请及时续办</div>

<div class="navtitle">
<p class="radios" style="background: #EA3323;"></p>
红码：体检不合格或已过有效期</div>
</div>
</div>
<script type="text/javascript">
        var state = "1";
        var color = "#319a42";
        if(state==2){
            color = "#FFA32C";
        }else if(state==3){
            color = "#EA3323";
        }
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        width : 150,
        height : 150,
        colorDark : color,
        colorLight : "#ffffff"
    });

    function makeCode () {
        var elText = window.location.protocol+"//"+window.location.host+"/%E9%87%8D%E5%BA%86/fysA.php";
        qrcode.makeCode(elText);
    }
    makeCode();
    $("#cilck").click(function(){
        if($('.details').css('display') == 'none'){
            $('.details').css('display','block')
        }else{
            $('.details').css('display','none')
        }
    })
    /*接触绑定*/
    $(".remove").click(function () {

            var r = confirm("您确认要解除绑定吗？");
            if (r == true) {
                var cardID = '500231198402157597';
                //获取参数
                ajaxSubmit('/occ/m/binding/remove', 'POST', {cardID:cardID}, function(d) {
                    if(d.code=200){
                        window.location.href="/%E9%87%8D%E5%BA%86/AAAA.HTML";
                    }else{
                        layer.alert(d.msg,{icon:2});
                    }
                },function(e) { },'json')
            }
    })

</script>

<p></p>
</body>
</html>