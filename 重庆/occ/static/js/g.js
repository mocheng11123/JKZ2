//											
//											                   _ooOoo_
//											                  o8888888o
//											                  88" . "88
//											                  (| -_- |)
//											                  O\  =  /O
//											               ____/`---'\____
//											             .'  \\|     |//  `.
//											            /  \\|||  :  |||//  \
//											           /  _||||| -:- |||||-  \
//											           |   | \\\  -  /// |   |
//											           | \_|  ''\---/''  |   |
//											           \  .-\__  `-`  ___/-. /
//											         ___`. .'  /--.--\  `. . __
//											      ."" '<  `.___\_<|>_/___.'  >'"".
//											     | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//											     \  \ `-.   \_ __\ /__ _/   .-` /  /
//											======`-.____`-.___\_____/___.-`____.-'======
//											                   `=---='
//											^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//											*              	 浣涚淇濅綉       姘告棤BUG              *
//											^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
/**
 * 寮傛鎻愪氦Ajax.
 * url: 鎻愪氦鐨剈rl
 * method: 鎻愪氦鏂瑰紡锛坧ost,get锛�
 * param: 鎻愪氦鍙傛暟锛坘ey-value锛�
 * fn: 鎴愬姛杩斿洖鏂规硶
 * err: 澶辫触杩斿洖鏂规硶
 * dt: 鏁版嵁绫诲瀷锛堥粯璁son锛�
 */
var ajaxSubmit = function(url, method, param, fn, err, dt) {
	$.ajax({
		async : true,
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		url : url + '?' + new Date().getTime(),
		type : method,
		data : param,

		success : function(d, s, m) {
			fn(d, s, m);
		},
		error : function(e, s, m) {
			/*if (err) {
				err(e, s, m);
			}*/
			if (e.responseText == 'No authority.') {
				alert('No authority!!!');
			}
		},
		dataType : dt || 'json'
	});
};

/**
 * 鍚屾鎻愪氦Ajax.
 * url: 鎻愪氦鐨剈rl
 * method: 鎻愪氦鏂瑰紡锛坧ost,get锛�
 * param: 鎻愪氦鍙傛暟锛坘ey-value锛�
 * fn: 鎴愬姛杩斿洖鏂规硶
 * err: 澶辫触杩斿洖鏂规硶
 * dt: 鏁版嵁绫诲瀷锛堥粯璁son锛�
 */
var asyncSubmit = function(url, method, param, fn, err, dt) {
	$.ajax({
		async : false,//鍚屾
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		url : url + '?' + new Date().getTime(),
		type : method,
		data : param,
		success : function(d, s, m) {
			fn(d, s, m);
		},
		error : function(e, s, m) {
			/*if (err) {
				err(e, s, m);
			}*/
			if (e.responseText == 'No authority.') {
				alert('No authority!!!');
			}
		},
		dataType : dt || 'json'
	});
};

/**
 * Determine whether there are operation permissions.
 */
var hasPermis = function(per) {
	// 璋冪敤鍏ㄥ眬鏂规硶鍒ゆ柇鏄惁鏈夋搷浣滄潈闄�
	return window.top.isPermis(per);
}

var fromSubmit = function(url, params) {
	var tempForm = document.createElement("form");
	tempForm.action = url;
	tempForm.method = "post";
	tempForm.style.display = "none";
	for ( var x in params) {
		var opt = document.createElement("input");
		opt.name = x;
		opt.value = params[x];
		opt.type = 'hidden';
		tempForm.appendChild(opt);
	}
	document.body.appendChild(tempForm);
	tempForm.submit();
	document.body.removeChild(tempForm);
};

/* 鑾峰彇cookice */
function getCookie(c_name){
	if (document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name + "=")
		if (c_start!=-1){
			c_start=c_start + c_name.length+1
			c_end=document.cookie.indexOf(";",c_start)
			if (c_end==-1) c_end=document.cookie.length
			return unescape(document.cookie.substring(c_start,c_end))
		}
	}
	return ""
}
/* 娣诲姞cookice */
function setCookie(c_name,value,expiretimes){
	var exdate=new Date();
	exdate.setTime(exdate.getTime()+expiretimes);
	document.cookie=c_name+ "=" +escape(value)+((expiretimes==null) ? "" : ";expires="+exdate.toGMTString());
}

/**
 * city2county
 * 閫氳繃甯傝幏鍙栧幙
 * 鍚戜笅鑾峰彇骞堕€変腑
 * value :indexof,瀵瑰簲鐨剆elect瀵硅薄
 * value 锛歝ounty 锛屽搴旂殑鍘縤d
 */
function city2county(indexof,id,childid){
	ajaxSubmit("/occ/utils/downcounty", "post", {id:id}, function(d){
		var list = d.result;
		$(indexof).html('<option value="0">璇烽€夋嫨</option>');
		for (var i = 0; i < list.length; i++) {
			$(indexof).append('<option value="'+list[i].id+'" '+((childid==list[i].id)?'selected="selected"':'')+'>'+list[i].name+'</option>');
		}

	}, function(err){
	}, "json");
}

/**
 * city2city
 * 閫氳繃鐪佽幏鍙栧競
 * 骞崇骇鑾峰彇
 * value :indexof,瀵瑰簲鐨剆elect瀵硅薄
 * value 锛歝ounty 锛屽搴旂殑甯俰d
 */
function city2city(indexof,id){
	ajaxSubmit("/occ/utils/county", "post", {id:id}, function(d){
		var list = d.result;
		$(indexof).html('<option value="0">璇烽€夋嫨</option>');
		for (var i = 0; i < list.length; i++) {
			$(indexof).append('<option value="'+list[i].id+'" '+((id==list[i].id)?'selected="selected"':'')+'>'+list[i].name+'</option>');
		}
	}, function(err){
	}, "json");
}

/**
 * 璇诲彇鐪佸競鍘跨殑鏂规硶
 * 娉細select鍚嶅瓧蹇呴』涓庢柟娉曢噷闈㈢殑鍚嶅瓧瀵瑰簲鎵嶈兘浣跨敤
 */
function readcity(province,city,county){
	//city2county
	if(province>0){
		city2city("select[name='province']",province);
		city2county("select[name='city']",province,city);
		if(city>0){
			city2county("select[name='county']",city,county);
		}else{
			$("select[name='county']").html('<option value="0">璇烽€夋嫨</option>');
		}
	}else{
		city2county("select[name='province']",0);
		$("select[name='city']").html('<option value="0">璇烽€夋嫨</option>');
		$("select[name='county']").html('<option value="0">璇烽€夋嫨</option>');
	}
}

/**
 * 璇诲彇鐪佸競鍘胯閬撶殑鏂规硶
 * 娉細select鍚嶅瓧蹇呴』涓庢柟娉曢噷闈㈢殑鍚嶅瓧瀵瑰簲鎵嶈兘浣跨敤
 */
function readcity2street(province,city,county,street){
	//city2county
	if(province>0){
		city2city("select[name='province']",province);
		city2county("select[name='city']",province,city);
		if(city>0){
			city2county("select[name='county']",city,county);
			city2county("select[name='street']",county,street);
		}else{
			$("select[name='county']").html('<option value="0">璇烽€夋嫨</option>');
			$("select[name='street']").html('<option value="0">璇烽€夋嫨</option>');
		}
	}else{
		city2county("select[name='province']",0);
		$("select[name='city']").html('<option value="0">璇烽€夋嫨</option>');
		$("select[name='county']").html('<option value="0">璇烽€夋嫨</option>');
		$("select[name='street']").html('<option value="0">璇烽€夋嫨</option>');
	}
}

/**
 * 閫氳繃浠绘剰灞傜骇id璇诲彇鐪佸競鍘跨殑鏂规硶
 * 娉細select鍚嶅瓧蹇呴』涓庢柟娉曢噷闈㈢殑鍚嶅瓧瀵瑰簲鎵嶈兘浣跨敤
 */
function readcitybyobjid(cityid){
	
}

/**
 * 鏃堕棿閫夋嫨鎻掍欢
 * @author 鏉庡厓蹇�
 * @param date
 * @returns
 */
function datecom(date){
	laydate({
		 elem: date, //闇€鏄剧ず鏃ユ湡鐨勫厓绱犻€夋嫨鍣�,濡傛灉鏄涓垯鐢╟lass
		 event: 'click', //瑙﹀彂浜嬩欢
		 format: 'YYYY-MM-DD', //鏃ユ湡鏍煎紡
		 istime: false, //鏄惁寮€鍚椂闂撮€夋嫨
//		 isclear: true, //鏄惁鏄剧ず娓呯┖
		 istoday: true, //鏄惁鏄剧ず浠婂ぉ
		 issure: true, //鏄惁鏄剧ず纭
		 festival: true, //鏄惁鏄剧ず鑺傛棩
		 min: '1900-01-01', //鏈€灏忔棩鏈�
		 max: '2099-12-31', //鏈€澶ф棩鏈�
		 start: laydate.now(),  //寮€濮嬫棩鏈�
		 fixed: false, //鏄惁鍥哄畾鍦ㄥ彲瑙嗗尯鍩�
		 zIndex: 99999999//css z-index
//		 choose: function(dates){ }//閫夋嫨濂芥棩鏈熺殑鍥炶皟
	});
}

/**
 * 甯﹀洖璋冨嚱鏁扮殑鏃堕棿閫夋嫨鎻掍欢
 * @author 鏉庡厓蹇�
 * @param date
 * @returns
 */
function datecomC(date,dateChange){
	laydate({
		 elem: date, //闇€鏄剧ず鏃ユ湡鐨勫厓绱犻€夋嫨鍣�,濡傛灉鏄涓垯鐢╟lass
		 event: 'click', //瑙﹀彂浜嬩欢
		 format: 'YYYY-MM-DD', //鏃ユ湡鏍煎紡
		 istime: false, //鏄惁寮€鍚椂闂撮€夋嫨
//		 isclear: true, //鏄惁鏄剧ず娓呯┖
		 istoday: true, //鏄惁鏄剧ず浠婂ぉ
		 issure: true, //鏄惁鏄剧ず纭
		 festival: true, //鏄惁鏄剧ず鑺傛棩
		 min: '1900-01-01', //鏈€灏忔棩鏈�
		 max: '2099-12-31', //鏈€澶ф棩鏈�
		 start: laydate.now(),  //寮€濮嬫棩鏈�
		 fixed: false, //鏄惁鍥哄畾鍦ㄥ彲瑙嗗尯鍩�
		 zIndex: 99999999, //css z-index
		 choose: dateChange//閫夋嫨濂芥棩鏈熺殑鍥炶皟
	});
}

/**
 * 鍗曢€夋 鐘舵€� 鍚敤 绂佺敤 鐨勯€変腑
 * @param id 鍗曢€夋鐨刬d
 */
function changeStart(id){
    $(id).attr("checked",true);
	$('.radio input').siblings('i').css({ color: '#ddd' });
	$('.radio input:checked').siblings('i').css({ color: '#36a5ff' });
}

//鑾峰彇瀵瑰簲宀椾綅鐘舵€佹枃瀛�
function getStageTypeName(type){
	var stageTypeName="";//1涓婂矖鍓� 2鍦ㄥ矖鏈熼棿 3绂诲矖鏃� 4绂诲矖鍚� 5搴旀€� 
	stageTypeName=type==0?" ":type==1?"涓婂矖鍓�":type==2?"鍦ㄥ矖鏈熼棿":type==3?"绂诲矖鏃�":type==4?"绂诲矖鍚�":"搴旀€�";
	return stageTypeName;
}
//鑾峰彇瀵瑰簲浣撴绫诲瀷鐘舵€佹枃瀛�
function getPhysicalTypeName(type){
	var physicalTypeName="";
	physicalTypeName=type==0?'':type==1?"鏅€氫綋妫€":type==2?"浠庝笟浣撴":type==3?"鑱屼笟浣撴":type==4?"鏀惧皠浣撴":"澶嶆煡浣撴";
	return physicalTypeName;
}
//鑾峰彇瀵瑰簲鍗卞鍥犵礌绉嶇被鐘舵€佹枃瀛� 1绮夊皹 2鏀惧皠 3鍖栧鍥犵礌  4鐗╃悊鍥犵礌 5鐢熺墿鍥犵礌 6鐗规畩浣滀笟
function getHazardsType(type){
	var hazardsType="";
	hazardsType=type==0?'':type==1?"绮夊皹":type==2?"鏀惧皠":type==3?"鍖栧鍥犵礌":type==4?"鐗╃悊鍥犵礌":type==5?"鐢熺墿鍥犵礌":type==6?"鐗规畩浣滀笟":"";
	return hazardsType;
}

/**
 * 绐冨彇瀛楄妭闀垮害锛屼腑鏂囧鐞�
 */
function getTextLength(valu,leng){
	var bytesCount=0;
	var ylength = 0;
	var s = 0;
	for (var i = 0; i < valu.length; i++) {
		if(ylength>=leng){break;}
		聽var c = valu.charAt(i);
		聽聽if (/^[\u0000-\u00ff]$/.test(c)){
		聽聽	bytesCount += 1;
			ylength+=1;
		聽聽}else{
			ylength+=2;
			if(s==1){
				bytesCount += 2;
				s=0;
			}else{
				s=1;
			}
		聽聽}
	}
	return bytesCount;
}

/**
 * 瀛楃涓茶浆json
 * @param d
 * @returns
 */
function get2json(d){
	return jQuery.parseJSON(d);
}

/**
 * 鑾峰彇褰撳墠鐪佸競涓嬩綋妫€鍗曚綅
 * @param level,榛樿涓�0
 * @param cityid,榛樿涓�0
 * @returns
 */
//var companyList={};
function getCompany(level,cityid,index,institutionsId){
	var companyList={};
	if(!institutionsId){
		layer.alert("璇烽€夋嫨浣撴鏈烘瀯锛屼翰锛�");
		return false;
	}
	//鑾峰彇鍙傛暟
//	if(level==1||level==-1){
//		if(!localStorage.companyList){
			//鑾峰彇鍙傛暟
			console.log(level+"---"+cityid);
			ajaxSubmit('/occ/utils/company', 'POST', {level:level,cityid:cityid,institutionsId:(institutionsId==-2?0:institutionsId)}, function(d) {
				if(d.code==200){
					companyList=d.result;
					if(companyList[0]){
						var content = '<li data-id="0" style="width: 100%">璇烽€夋嫨</li>';
						for (var i = 0; i < companyList.length; i++) {
							content+='<li data-id="'+companyList[i].id+'" data-hazards="'+companyList[i].usedHazards+'" data-combinations="'+companyList[i].useCombinations+'" data-discountrate="'+companyList[i].discountRate+'" data-discounttime="'+companyList[i].discountTime+'" style="width: 100%">'+companyList[i].companyName+'</li>';
						}
						$(index).html(content);
					}
//					localStorage.companyList=JSON.stringify(d.result);
				}
			},function(e) {},'json')
//		}else{
//			companyList=JSON.parse(localStorage.companyList);
//		}
//	}
//	if(companyList[0]){
//		var content = '<li data-id="0" style="width: 100%">璇烽€夋嫨</li>';
//		for (var i = 0; i < companyList.length; i++) {
//			if(institutionsId!=-2){
//				if(level==2&&cityid==companyList[i].city){
//					content+='<li data-id="'+companyList[i].id+'" style="width: 100%">'+companyList[i].companyName+'</li>';
//				}else if(level==3&&cityid==companyList[i].county){
//					content+='<li data-id="'+companyList[i].id+'" style="width: 100%">'+companyList[i].companyName+'</li>';
//				}else if(level==1){
//					content+='<li data-id="'+companyList[i].id+'" style="width: 100%">'+companyList[i].companyName+'</li>';
//				}
//			}else{
//				content+='<li data-id="'+companyList[i].id+'" style="width: 100%">'+companyList[i].companyName+'</li>';
//			}
//		}
//		$(index).html(content);
//	}
}

//妯＄硦鏌ユ壘
function searchinstitutions1(th,indexs,institutionsId){
	var companyName = $(th).val();
	var str = /^[A-Za-z]*$/;
	if (!str.test(companyName)){
		var companyList={};
		//鑾峰彇鍙傛暟
		ajaxSubmit('/occ/utils/listCompany', 'POST', {companyName:companyName,institutionsId:institutionsId,pageSize:40}, function(d) {
			if(d.code==200){
				companyList=d.result;
				if(companyList[0]){
					var content = '<li data-id="0" data-discountrate="1" style="width: 100%">璇烽€夋嫨</li>';
					for (var i = 0; i < companyList.length; i++) {
						content+='<li data-id="'+companyList[i].id+'" data-hazards="'+companyList[i].usedHazards+'" data-combinations="'+companyList[i].useCombinations+'" data-discountrate="'+companyList[i].discountRate+'" data-discounttime="'+companyList[i].discountTime+'" data-companynote="'+companyList[i].note+'" style="width: 100%">'+companyList[i].companyName+'</li>';
					}
					$(indexs).parent().html(content);
					$("#saveCompany").hide();
				}else{
					if($("#saveCompany").length>0){
						$("#saveCompany").show();
						$("#companyNote").hide();
					}
				}
//			localStorage.companyList=JSON.stringify(d.result);
			}
		},function(e) {},'json')
	}
//	$(indexs).each(function(){
//	    if(($(this).text()).indexOf($(th).val())==-1){
//	    	$(this).hide();
//	    }else{
//	    	$(this).show();
//	    }
//	});
}

//妯＄硦鏌ユ壘
function searchinstitutions(th,indexs){
	$(indexs).each(function(){
	    if(($(this).text()).indexOf($(th).val())==-1){
	    	$(this).hide();
	    }else{
	    	$(this).show();
	    }
	});
}
//<!-- ------------------------------------------------------------- -->
var chargeTypeDictionary;
/*鏀惰垂绫诲瀷瀛楀吀*/
function getchargeTypeDictionary(temp,type) {
	var op = "";
	ajaxSubmit("/occ/chargeType/getDictionary", "post", {"type":type}, function (d) {
		if(d.code==200){
			var data = d.result;
			for (var i=0;i<data.length;i++){
				if(data[i].id==temp){
					op +="<option value='"+data[i].id+"' selected='selected'>"+data[i].name+"</option>";
				}else{
					op +="<option value='"+data[i].id+"'>"+data[i].name+"</option>";
				}
			}
			$("select[name=chargeType]").html(op);
			$("select[name=payType]").append(op);
			chargeTypeDictionary = d.result;
		}else{
			layer.msg("鏀惰垂绫诲瀷鍔犺浇澶辫触~");
		}
	}, "", "json");
}

/*鑾峰彇閲囨牱绫诲瀷鍒楄〃 鑾峰彇鎵€鏈�*/
var samplingTypeList = {};
function getSamplingType() {
	if(localStorage.samplingTypeList){
		samplingTypeList = JSON.parse(localStorage.samplingTypeList);
	}else{
		asyncSubmit('/occ/samplingType/list', 'POST', {'isLimit':1}, function(d) {
			if(d.code==200){
				samplingTypeList = d.result;
				localStorage.samplingTypeList=JSON.stringify(samplingTypeList);
				return samplingTypeList;
			}
		},function(e) {},'json');
	}
	return samplingTypeList;
}


/*鑾峰彇閲囨牱绫诲瀷鍒楄〃 鑾峰彇褰撳墠浜烘潈闄愮殑*/
var samplingTypeListOnly = {};
function getSamplingTypeOnly() {
	if(localStorage.samplingTypeListOnly){
		samplingTypeListOnly = JSON.parse(localStorage.samplingTypeListOnly);
	}else{
		asyncSubmit('/occ/samplingType/listOnly', 'POST', {'isLimit':1}, function(d) {
			if(d.code==200){
				samplingTypeListOnly = d.result;
				localStorage.samplingTypeListOnly=JSON.stringify(samplingTypeListOnly);
				return samplingTypeListOnly;
			}
		},function(e) {},'json');
	}
	return samplingTypeListOnly;
}


/**
 * 鑾峰彇宸ョ
 * @returns
 */
var workTypeList={};
function getWorkType(index){
	if(localStorage.workTypeList){
		workTypeList=JSON.parse(localStorage.workTypeList);
	}else {
		//鑾峰彇鍙傛暟
		asyncSubmit('/occ/workType/workTypeAll', 'POST', '', function(d) {
			if(d.code==200){
				workTypeList=d.result;
				localStorage.workTypeList=JSON.stringify(workTypeList);
			}
		},function(e) {},'json');
	}

	if(workTypeList[0]){
		var content = '<li data-id="0" style="width: 100%">璇烽€夋嫨</li>';
		for (var i = 0; i < workTypeList.length; i++) {
			content+='<li style="width: 100%">'+workTypeList[i].workName+'</li>';
		}
		$(index).html(content);
	}
}
//<!-- ------------------------------------------------------------- -->

//瀵笵ate鐨勬墿灞曪紝灏� Date 杞寲涓烘寚瀹氭牸寮忕殑String
//鏈�(M)銆佹棩(d)銆佸皬鏃�(h)銆佸垎(m)銆佺(s)銆佸搴�(q) 鍙互鐢� 1-2 涓崰浣嶇锛� 
//骞�(y)鍙互鐢� 1-4 涓崰浣嶇锛屾绉�(S)鍙兘鐢� 1 涓崰浣嶇(鏄� 1-3 浣嶇殑鏁板瓧) 
//渚嬪瓙锛� 
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
//author: liyuanzhi 
Date.prototype.Format = function (fmt) { 
 var o = {
     "M+": this.getMonth() + 1, //鏈堜唤 
     "d+": this.getDate(), //鏃� 
     "h+": this.getHours(), //灏忔椂 
     "m+": this.getMinutes(), //鍒� 
     "s+": this.getSeconds(), //绉� 
     "q+": Math.floor((this.getMonth() + 3) / 3), //瀛ｅ害 
     "S": this.getMilliseconds() //姣 
 };
 if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
 for (var k in o)
 if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
 return fmt;
}  

//淇濈暀涓や綅灏忔暟  
//鍔熻兘锛氬皢娴偣鏁板洓鑸嶄簲鍏ワ紝鍙栧皬鏁扮偣鍚�2浣� 
function toDecimal(x) { 
  var f = parseFloat(x); 
  if (isNaN(f)) { 
    return; 
  } 
  f = Math.round(x*100)/100; 
  return f; 
} 

//鍗曢€�
oneCheck = function(th){
	if ($(th).is(':checked')) {
		if((","+cacheids+",").indexOf((","+$(th).val()+","))==-1){
			if(cacheids){
				cacheids+=","+$(th).val();
			}else{
				cacheids=$(th).val();
			}
		}
  } else {
  	if((","+cacheids+",").indexOf((","+$(th).val()+","))!=-1){
  		var asldk = ","+cacheids+",";
  		asldk = asldk.replace((","+$(th).val()+","),",");
  		cacheids = asldk.substring(1,asldk.length-1);
  		if(cacheids.length==1){
  			cacheids = "";
  		}
	}
  }
}

//澶嶉€�
allCheck = function(th,obj){
//	alert(12);
	if($(th).attr("checked") == 'checked') {
		$('.findtable tbody .checkbox input').attr('checked', true);
		$('.checkbox input:checked').siblings('i').css({
			display: 'none'
		});
		$('.checkbox input:checked').siblings('b').css({
			display: 'block'
		});
	} else {
		$('.findtable tbody .checkbox input').attr('checked', false);
		$('.checkbox input').siblings('i').css({
			display: 'block'
		});
		$('.checkbox input').siblings('b').css({
			display: 'none'
		});
	}	
	//鎹綅缃埌鐐瑰嚮涓嬩竴椤电殑鏃跺€�
	$(""+obj+" input[type='checkbox']").each(function(){
		if ($(this).is(':checked')) {
			if((","+cacheids+",").indexOf((","+$(this).val()+","))==-1){
				if(cacheids){
					cacheids+=","+$(this).val();
				}else{
					cacheids=$(this).val();
				}
			}
	    } else {
	    	if((","+cacheids+",").indexOf((","+$(this).val()+","))!=-1){
	    		var asldk = ","+cacheids+",";
	    		asldk = asldk.replace((","+$(this).val()+","),",");
	    		cacheids = asldk.substring(1,asldk.length-1);
	    		if(cacheids.length==1){
	    			cacheids = "";
	    		}
			}
	    }
	});
}

//椤甸潰璺抽〉澶勭悊
function getpageN(rest){
	var pageNo = getCookiePage(rest);
	if(pageNo){
		return pageNo;
	}else{
		return 1;
	}
}

//閿欒鎻愮ず缁戝畾浜嬩欢
function errorBing(th,value){
	$(th+"").after('<b class="error-tip" style="display: inline">'+value+'</b>');
	$(th+"").change(function(){
		if($(this).val()){
			$(th+"").parent().children("b").remove();
		}else{
			$(th+"").after('<b class="error-tip" style="display: inline">'+value+'</b>');
		}
	})
}
/**
 * 閰嶇疆瀹㈡埛鐢佃剳鎵撳嵃鏈�
 * val 	1:鏉＄爜鎵撳嵃鏈築arCodePrinter 2:鍙戠エ鎵撳嵃鏈篒nvoicePrinter 
 * 		3:鎶ュ憡鎵撳嵃鏈篟eportPrinter 4:鍗¤瘉鎵撳嵃鏈篊ardPrinter 5:鎸囧紩鍗曞嵃鏈篋irectSheetPrinter
 * @returns
 */
//function getdayinconfig(val,configName){
	//椤甸潰灞�
//	var content = "";
//	var pintobj = get2json(PrintOCX.GetPrinterInformation());
//	console(pintobj);
//	if(pintobj&&pintobj.PrinterName.length>0){
//		content += "<span style='margin-left:15px;margin-top:20px'>"+val+"锛�</span>";
//		content += "<select name='printerName' style='border:1px solid #ddd;margin-top:20px'>";
//		content+='<option value="">--璇烽€夋嫨--</option>';
//		for (var i = 0; i < pintobj.PrinterName.length; i++) {
//			content+='<option value="'+pintobj.PrinterName[i]+'">'+pintobj.PrinterName[i]+'</option>';
//		}
//		content += "</select>";
//		content += '<button type="button" data-type="1" onclick="configpoint(\''+configName+'\');" class="btn" style="position: absolute; top: 145px;left: 185px">&nbsp;&nbsp;纭�&nbsp;瀹�&nbsp;&nbsp;</button>';
//		layer.open({
//			  type: 1,
//			  skin: 'layui-layer-rim', //鍔犱笂杈规
//			  area: ['420px', '240px'], //瀹介珮
//			  content: content
//		});
//	}
//}

/**
 * 閰嶇疆瀹㈡埛鐢佃剳鎵撳嵃鏈�
 * val 	1:鏉＄爜鎵撳嵃鏈築arCodePrinter 2:鍙戠エ鎵撳嵃鏈篒nvoicePrinter 
 * 		3:鎶ュ憡鎵撳嵃鏈篟eportPrinter 4:鍗¤瘉鎵撳嵃鏈篊ardPrinter 5:鎸囧紩鍗曞嵃鏈篋irectSheetPrinter
 * @returns
 */
function exeobjdata6(date){
	try {
		if(loadidcardmsg){ 
			//鍏抽棴韬唤璇佽鍙�
			loadidcardmsg=0;
		}
	} catch (e) {
	}
	if(date&&date!="404"){
		var val=$("#exeobjdata6").data("printer1");//鎵撳嵃鏈哄悕绉帮細鎸囧紩鍗曞嵃鏈�,鏉＄爜鎵撳嵃鏈�
		var configName=$("#exeobjdata6").data("printer2");//鎵撳嵃鏈哄瀷鍙�
		var content = "";
		var pintobj = get2json(date);
		if(pintobj&&pintobj.PrinterName.length>0){
			var vals=val.split(",");
			for(var j=0;j<vals.length;j++){
				content += "<span style='margin-left:15px;margin-top:20px'>"+vals[j]+"锛�</span>";
				content += "<select name='printerName"+j+"' style='border:1px solid #ddd;margin-top:20px'>";
				content+='<option value="">--璇烽€夋嫨--</option>';
				for (var i = 0; i < pintobj.PrinterName.length; i++) {
					content+='<option value="'+pintobj.PrinterName[i]+'">'+pintobj.PrinterName[i]+'</option>';
				}
				content += "</select>";
			}
			content += '<button type="button" data-type="1" onclick="configpoint(\''+configName+'\');" class="btn" style="position: absolute; top: 145px;left: 185px">&nbsp;&nbsp;纭�&nbsp;瀹�&nbsp;&nbsp;</button>';
			layer.open({
				  type: 1,
				  skin: 'layui-layer-rim', //鍔犱笂杈规
				  area: ['420px', '240px'], //瀹介珮
				  content: content
			});
		}
	}else if(date=="404"){
		layer.alert("娌℃壘鍒版墦鍗版満锛岃鎮ㄩ厤缃數鑴戠殑鎵撳嵃鏈�",{icon:2});
	}else{
		if(isWsConnected){
			sendCommand("{\"communicationType\":6}");
		}else{
			layer.msg("璇锋墦寮€鏈満鐨勬湇鍔℃敮鎸�");
		}
	}
}

/**
 * 璁剧疆鎵撳嵃鏈哄弬鏁板叧闂獥鍙�
 * @param val
 * @returns
 */
function configpoint(val){
	//sendCommand("{\"communicationType\":7,\""+val+"\":\""+$("select[name='printerName']").val().replace(/\\/g,"\\\\")+"\"}");
	var configNames=val.split(",");
	var printerNameList=new Array();
	var pintstring="";
	for(var i=0;i<configNames.length;i++){
		if(i==(configNames.length-1)){
			pintstring+="\""+configNames[i]+"\":\""+$("select[name='printerName"+i+"']").val().replace(/\\/g,"\\\\")+"\"";
		}else{
			pintstring+="\""+configNames[i]+"\":\""+$("select[name='printerName"+i+"']").val().replace(/\\/g,"\\\\")+"\",";
		}
	}
	pintstring+="";
	console.log("{\"communicationType\":7,"+pintstring+"}");
	sendCommand("{\"communicationType\":7,"+pintstring+"}");
}

/**
 * 璁剧疆鎵撳嵃鏈烘垚鍔熷洖璋�
 * @returns
 */
function exeobjdata7(date){
	try {
		if(loadidcardmsg||loadidcardmsg==0){ 
			//鎵撳紑韬唤璇佽鍙�
			loadidcardmsg=1; 
		}
	} catch (e) {
	}
	if(date==1){
		layer.alert("璁剧疆鎴愬姛",{icon:1},function(){
			layer.closeAll();//鍏抽棴鎵€鏈夊眰
		});
		//alert("璁剧疆鎴愬姛!");
		//layer.close(layer.index);
		
		//layer.alert("璁剧疆鎴愬姛",{icon:1},function(){
			//$('.layui-layer-close1').click();
		//});
	}else{
		layer.alert("璁剧疆澶辫触锛岃閲嶆柊璁剧疆",{icon:2},function(){
			layer.closeAll();//鍏抽棴鎵€鏈夊眰
		});
		//alert("璁剧疆澶辫触锛岃閲嶆柊璁剧疆");
		//layer.close(layer.index);
		
		/*layer.alert("璁剧疆澶辫触锛岃閲嶆柊璁剧疆",{icon:2},function(){
			$('.layui-layer-close1').click();
		});*/
	}
}

//楠岃瘉韬唤璇�
function validationIdcard(idcard) {
	var Errors = new Array("楠岃瘉閫氳繃!", "韬唤璇佸彿鐮佷綅鏁颁笉瀵�!", "韬唤璇佸彿鐮佸嚭鐢熸棩鏈熻秴鍑鸿寖鍥存垨鍚湁闈炴硶瀛楃!", "韬唤璇佸彿鐮佹牎楠岄敊璇紝鎴�'X'蹇呴』涓哄ぇ鍐�!", "韬唤璇佸湴鍖洪潪娉�!");
	var area = {
		11: "鍖椾含",
		12: "澶╂触",
		13: "娌冲寳",
		14: "灞辫タ", 
		15: "鍐呰挋鍙�",
		21: "杈藉畞",
		22: "鍚夋灄",
		23: "榛戦緳姹�",
		31: "涓婃捣",
		32: "姹熻嫃",
		33: "娴欐睙",
		34: "瀹夊窘",
		35: "绂忓缓",
		36: "姹熻タ",
		37: "灞变笢",
		41: "娌冲崡",
		42: "婀栧寳",
		43: "婀栧崡",
		44: "骞夸笢",
		45: "骞胯タ",
		46: "娴峰崡",
		50: "閲嶅簡",
		51: "鍥涘窛",
		52: "璐靛窞",
		53: "浜戝崡",
		54: "瑗胯棌",
		61: "闄曡タ",
		62: "鐢樿們",
		63: "闈掓捣",
		64: "瀹佸",
		65: "鏂扮枂",
		71: "鍙版咕",
		81: "棣欐腐",
		82: "婢抽棬",
		91: "鍥藉"
	}
	var retflag = false;
	var idcard, Y, JYM;
	var S, M;
	var idcard_array = new Array();
	idcard_array = idcard.split("");
	//鍦板尯妫€楠�
	if (area[parseInt(idcard.substr(0, 2))] == null) return Errors[4];
	//韬唤鍙风爜浣嶆暟鍙婃牸寮忔楠�
	switch (idcard.length) {
	case 15:
		if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
			ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //娴嬭瘯鍑虹敓鏃ユ湡鐨勫悎娉曟€�
		} else {
			ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //娴嬭瘯鍑虹敓鏃ユ湡鐨勫悎娉曟€�
		}

		if (ereg.test(idcard)){
			
			return Errors[0];
		} 
		else {
			return Errors[2];
		}
		break;
	case 18:
		//18浣嶈韩浠藉彿鐮佹娴�
		//鍑虹敓鏃ユ湡鐨勫悎娉曟€ф鏌� 
		//闂板勾鏈堟棩:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
		//骞冲勾鏈堟棩:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
		var erega1 = "";		
		if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
			ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闂板勾鍑虹敓鏃ユ湡鐨勫悎娉曟€ф鍒欒〃杈惧紡
			erega1 = /^[1-9][0-9]{5}20[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闂板勾鍑虹敓鏃ユ湡鐨勫悎娉曟€ф鍒欒〃杈惧紡
		} else {
			ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //骞冲勾鍑虹敓鏃ユ湡鐨勫悎娉曟€ф鍒欒〃杈惧紡
			erega1 = /^[1-9][0-9]{5}20[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //骞冲勾鍑虹敓鏃ユ湡鐨勫悎娉曟€ф鍒欒〃杈惧紡
		}
		if (ereg.test(idcard)||erega1.test(idcard)) { //娴嬭瘯鍑虹敓鏃ユ湡鐨勫悎娉曟€�
			//璁＄畻鏍￠獙浣�
			S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
			Y = S % 11;

			M = "F";
			JYM = "10X98765432";
			M = JYM.substr(Y, 1); //鍒ゆ柇鏍￠獙浣�
			if (M == idcard_array[17]) return Errors[0]; //妫€娴婭D鐨勬牎楠屼綅
			else return Errors[3];
		} else return Errors[2];
		break;
	default:
		return Errors[1];
		break;
	}
}
var getPy = (function() {
	//鍑芥暟浣跨敤,鏈〃鏀跺綍鐨勫瓧绗︾殑Unicode缂栫爜鑼冨洿涓�19968鑷�40869
	var strChineseFirstPY = "YDYQSXMWZSSXJBYMGCCZQPSSQBYCDSCDQLDYLYBSSJGYZZJJFKCCLZDHWDWZJLJPFYYNWJJTMYHZWZHFLZPPQHGSCYYYNJQYXXGJHHSDSJNKKTMOMLCRXYPSNQSECCQZGGLLYJLMYZZSECYKYYHQWJSSGGYXYZYJWWKDJHYCHMYXJTLXJYQBYXZLDWRDJRWYSRLDZJPCBZJJBRCFTLECZSTZFXXZHTRQHYBDLYCZSSYMMRFMYQZPWWJJYFCRWFDFZQPYDDWYXKYJAWJFFXYPSFTZYHHYZYSWCJYXSCLCXXWZZXNBGNNXBXLZSZSBSGPYSYZDHMDZBQBZCWDZZYYTZHBTSYYBZGNTNXQYWQSKBPHHLXGYBFMJEBJHHGQTJCYSXSTKZHLYCKGLYSMZXYALMELDCCXGZYRJXSDLTYZCQKCNNJWHJTZZCQLJSTSTBNXBTYXCEQXGKWJYFLZQLYHYXSPSFXLMPBYSXXXYDJCZYLLLSJXFHJXPJBTFFYABYXBHZZBJYZLWLCZGGBTSSMDTJZXPTHYQTGLJSCQFZKJZJQNLZWLSLHDZBWJNCJZYZSQQYCQYRZCJJWYBRTWPYFTWEXCSKDZCTBZHYZZYYJXZCFFZZMJYXXSDZZOTTBZLQWFCKSZSXFYRLNYJMBDTHJXSQQCCSBXYYTSYFBXDZTGBCNSLCYZZPSAZYZZSCJCSHZQYDXLBPJLLMQXTYDZXSQJTZPXLCGLQTZWJBHCTSYJSFXYEJJTLBGXSXJMYJQQPFZASYJNTYDJXKJCDJSZCBARTDCLYJQMWNQNCLLLKBYBZZSYHQQLTWLCCXTXLLZNTYLNEWYZYXCZXXGRKRMTCNDNJTSYYSSDQDGHSDBJGHRWRQLYBGLXHLGTGXBQJDZPYJSJYJCTMRNYMGRZJCZGJMZMGXMPRYXKJNYMSGMZJYMKMFXMLDTGFBHCJHKYLPFMDXLQJJSMTQGZSJLQDLDGJYCALCMZCSDJLLNXDJFFFFJCZFMZFFPFKHKGDPSXKTACJDHHZDDCRRCFQYJKQCCWJDXHWJLYLLZGCFCQDSMLZPBJJPLSBCJGGDCKKDEZSQCCKJGCGKDJTJDLZYCXKLQSCGJCLTFPCQCZGWPJDQYZJJBYJHSJDZWGFSJGZKQCCZLLPSPKJGQJHZZLJPLGJGJJTHJJYJZCZMLZLYQBGJWMLJKXZDZNJQSYZMLJLLJKYWXMKJLHSKJGBMCLYYMKXJQLBMLLKMDXXKWYXYSLMLPSJQQJQXYXFJTJDXMXXLLCXQBSYJBGWYMBGGBCYXPJYGPEPFGDJGBHBNSQJYZJKJKHXQFGQZKFHYGKHDKLLSDJQXPQYKYBNQSXQNSZSWHBSXWHXWBZZXDMNSJBSBKBBZKLYLXGWXDRWYQZMYWSJQLCJXXJXKJEQXSCYETLZHLYYYSDZPAQYZCMTLSHTZCFYZYXYLJSDCJQAGYSLCQLYYYSHMRQQKLDXZSCSSSYDYCJYSFSJBFRSSZQSBXXPXJYSDRCKGJLGDKZJZBDKTCSYQPYHSTCLDJDHMXMCGXYZHJDDTMHLTXZXYLYMOHYJCLTYFBQQXPFBDFHHTKSQHZYYWCNXXCRWHOWGYJLEGWDQCWGFJYCSNTMYTOLBYGWQWESJPWNMLRYDZSZTXYQPZGCWXHNGPYXSHMYQJXZTDPPBFYHZHTJYFDZWKGKZBLDNTSXHQEEGZZYLZMMZYJZGXZXKHKSTXNXXWYLYAPSTHXDWHZYMPXAGKYDXBHNHXKDPJNMYHYLPMGOCSLNZHKXXLPZZLBMLSFBHHGYGYYGGBHSCYAQTYWLXTZQCEZYDQDQMMHTKLLSZHLSJZWFYHQSWSCWLQAZYNYTLSXTHAZNKZZSZZLAXXZWWCTGQQTDDYZTCCHYQZFLXPSLZYGPZSZNGLNDQTBDLXGTCTAJDKYWNSYZLJHHZZCWNYYZYWMHYCHHYXHJKZWSXHZYXLYSKQYSPSLYZWMYPPKBYGLKZHTYXAXQSYSHXASMCHKDSCRSWJPWXSGZJLWWSCHSJHSQNHCSEGNDAQTBAALZZMSSTDQJCJKTSCJAXPLGGXHHGXXZCXPDMMHLDGTYBYSJMXHMRCPXXJZCKZXSHMLQXXTTHXWZFKHCCZDYTCJYXQHLXDHYPJQXYLSYYDZOZJNYXQEZYSQYAYXWYPDGXDDXSPPYZNDLTWRHXYDXZZJHTCXMCZLHPYYYYMHZLLHNXMYLLLMDCPPXHMXDKYCYRDLTXJCHHZZXZLCCLYLNZSHZJZZLNNRLWHYQSNJHXYNTTTKYJPYCHHYEGKCTTWLGQRLGGTGTYGYHPYHYLQYQGCWYQKPYYYTTTTLHYHLLTYTTSPLKYZXGZWGPYDSSZZDQXSKCQNMJJZZBXYQMJRTFFBTKHZKBXLJJKDXJTLBWFZPPTKQTZTGPDGNTPJYFALQMKGXBDCLZFHZCLLLLADPMXDJHLCCLGYHDZFGYDDGCYYFGYDXKSSEBDHYKDKDKHNAXXYBPBYYHXZQGAFFQYJXDMLJCSQZLLPCHBSXGJYNDYBYQSPZWJLZKSDDTACTBXZDYZYPJZQSJNKKTKNJDJGYYPGTLFYQKASDNTCYHBLWDZHBBYDWJRYGKZYHEYYFJMSDTYFZJJHGCXPLXHLDWXXJKYTCYKSSSMTWCTTQZLPBSZDZWZXGZAGYKTYWXLHLSPBCLLOQMMZSSLCMBJCSZZKYDCZJGQQDSMCYTZQQLWZQZXSSFPTTFQMDDZDSHDTDWFHTDYZJYQJQKYPBDJYYXTLJHDRQXXXHAYDHRJLKLYTWHLLRLLRCXYLBWSRSZZSYMKZZHHKYHXKSMDSYDYCJPBZBSQLFCXXXNXKXWYWSDZYQOGGQMMYHCDZTTFJYYBGSTTTYBYKJDHKYXBELHTYPJQNFXFDYKZHQKZBYJTZBXHFDXKDASWTAWAJLDYJSFHBLDNNTNQJTJNCHXFJSRFWHZFMDRYJYJWZPDJKZYJYMPCYZNYNXFBYTFYFWYGDBNZZZDNYTXZEMMQBSQEHXFZMBMFLZZSRXYMJGSXWZJSPRYDJSJGXHJJGLJJYNZZJXHGXKYMLPYYYCXYTWQZSWHWLYRJLPXSLSXMFSWWKLCTNXNYNPSJSZHDZEPTXMYYWXYYSYWLXJQZQXZDCLEEELMCPJPCLWBXSQHFWWTFFJTNQJHJQDXHWLBYZNFJLALKYYJLDXHHYCSTYYWNRJYXYWTRMDRQHWQCMFJDYZMHMYYXJWMYZQZXTLMRSPWWCHAQBXYGZYPXYYRRCLMPYMGKSJSZYSRMYJSNXTPLNBAPPYPYLXYYZKYNLDZYJZCZNNLMZHHARQMPGWQTZMXXMLLHGDZXYHXKYXYCJMFFYYHJFSBSSQLXXNDYCANNMTCJCYPRRNYTYQNYYMBMSXNDLYLYSLJRLXYSXQMLLYZLZJJJKYZZCSFBZXXMSTBJGNXYZHLXNMCWSCYZYFZLXBRNNNYLBNRTGZQYSATSWRYHYJZMZDHZGZDWYBSSCSKXSYHYTXXGCQGXZZSHYXJSCRHMKKBXCZJYJYMKQHZJFNBHMQHYSNJNZYBKNQMCLGQHWLZNZSWXKHLJHYYBQLBFCDSXDLDSPFZPSKJYZWZXZDDXJSMMEGJSCSSMGCLXXKYYYLNYPWWWGYDKZJGGGZGGSYCKNJWNJPCXBJJTQTJWDSSPJXZXNZXUMELPXFSXTLLXCLJXJJLJZXCTPSWXLYDHLYQRWHSYCSQYYBYAYWJJJQFWQCQQCJQGXALDBZZYJGKGXPLTZYFXJLTPADKYQHPMATLCPDCKBMTXYBHKLENXDLEEGQDYMSAWHZMLJTWYGXLYQZLJEEYYBQQFFNLYXRDSCTGJGXYYNKLLYQKCCTLHJLQMKKZGCYYGLLLJDZGYDHZWXPYSJBZKDZGYZZHYWYFQYTYZSZYEZZLYMHJJHTSMQWYZLKYYWZCSRKQYTLTDXWCTYJKLWSQZWBDCQYNCJSRSZJLKCDCDTLZZZACQQZZDDXYPLXZBQJYLZLLLQDDZQJYJYJZYXNYYYNYJXKXDAZWYRDLJYYYRJLXLLDYXJCYWYWNQCCLDDNYYYNYCKCZHXXCCLGZQJGKWPPCQQJYSBZZXYJSQPXJPZBSBDSFNSFPZXHDWZTDWPPTFLZZBZDMYYPQJRSDZSQZSQXBDGCPZSWDWCSQZGMDHZXMWWFYBPDGPHTMJTHZSMMBGZMBZJCFZWFZBBZMQCFMBDMCJXLGPNJBBXGYHYYJGPTZGZMQBQTCGYXJXLWZKYDPDYMGCFTPFXYZTZXDZXTGKMTYBBCLBJASKYTSSQYYMSZXFJEWLXLLSZBQJJJAKLYLXLYCCTSXMCWFKKKBSXLLLLJYXTYLTJYYTDPJHNHNNKBYQNFQYYZBYYESSESSGDYHFHWTCJBSDZZTFDMXHCNJZYMQWSRYJDZJQPDQBBSTJGGFBKJBXTGQHNGWJXJGDLLTHZHHYYYYYYSXWTYYYCCBDBPYPZYCCZYJPZYWCBDLFWZCWJDXXHYHLHWZZXJTCZLCDPXUJCZZZLYXJJTXPHFXWPYWXZPTDZZBDZCYHJHMLXBQXSBYLRDTGJRRCTTTHYTCZWMXFYTWWZCWJWXJYWCSKYBZSCCTZQNHXNWXXKHKFHTSWOCCJYBCMPZZYKBNNZPBZHHZDLSYDDYTYFJPXYNGFXBYQXCBHXCPSXTYZDMKYSNXSXLHKMZXLYHDHKWHXXSSKQYHHCJYXGLHZXCSNHEKDTGZXQYPKDHEXTYKCNYMYYYPKQYYYKXZLTHJQTBYQHXBMYHSQCKWWYLLHCYYLNNEQXQWMCFBDCCMLJGGXDQKTLXKGNQCDGZJWYJJLYHHQTTTNWCHMXCXWHWSZJYDJCCDBQCDGDNYXZTHCQRXCBHZTQCBXWGQWYYBXHMBYMYQTYEXMQKYAQYRGYZSLFYKKQHYSSQYSHJGJCNXKZYCXSBXYXHYYLSTYCXQTHYSMGSCPMMGCCCCCMTZTASMGQZJHKLOSQYLSWTMXSYQKDZLJQQYPLSYCZTCQQPBBQJZCLPKHQZYYXXDTDDTSJCXFFLLCHQXMJLWCJCXTSPYCXNDTJSHJWXDQQJSKXYAMYLSJHMLALYKXCYYDMNMDQMXMCZNNCYBZKKYFLMCHCMLHXRCJJHSYLNMTJZGZGYWJXSRXCWJGJQHQZDQJDCJJZKJKGDZQGJJYJYLXZXXCDQHHHEYTMHLFSBDJSYYSHFYSTCZQLPBDRFRZTZYKYWHSZYQKWDQZRKMSYNBCRXQBJYFAZPZZEDZCJYWBCJWHYJBQSZYWRYSZPTDKZPFPBNZTKLQYHBBZPNPPTYZZYBQNYDCPJMMCYCQMCYFZZDCMNLFPBPLNGQJTBTTNJZPZBBZNJKLJQYLNBZQHKSJZNGGQSZZKYXSHPZSNBCGZKDDZQANZHJKDRTLZLSWJLJZLYWTJNDJZJHXYAYNCBGTZCSSQMNJPJYTYSWXZFKWJQTKHTZPLBHSNJZSYZBWZZZZLSYLSBJHDWWQPSLMMFBJDWAQYZTCJTBNNWZXQXCDSLQGDSDPDZHJTQQPSWLYYJZLGYXYZLCTCBJTKTYCZJTQKBSJLGMGZDMCSGPYNJZYQYYKNXRPWSZXMTNCSZZYXYBYHYZAXYWQCJTLLCKJJTJHGDXDXYQYZZBYWDLWQCGLZGJGQRQZCZSSBCRPCSKYDZNXJSQGXSSJMYDNSTZTPBDLTKZWXQWQTZEXNQCZGWEZKSSBYBRTSSSLCCGBPSZQSZLCCGLLLZXHZQTHCZMQGYZQZNMCOCSZJMMZSQPJYGQLJYJPPLDXRGZYXCCSXHSHGTZNLZWZKJCXTCFCJXLBMQBCZZWPQDNHXLJCTHYZLGYLNLSZZPCXDSCQQHJQKSXZPBAJYEMSMJTZDXLCJYRYYNWJBNGZZTMJXLTBSLYRZPYLSSCNXPHLLHYLLQQZQLXYMRSYCXZLMMCZLTZSDWTJJLLNZGGQXPFSKYGYGHBFZPDKMWGHCXMSGDXJMCJZDYCABXJDLNBCDQYGSKYDQTXDJJYXMSZQAZDZFSLQXYJSJZYLBTXXWXQQZBJZUFBBLYLWDSLJHXJYZJWTDJCZFQZQZZDZSXZZQLZCDZFJHYSPYMPQZMLPPLFFXJJNZZYLSJEYQZFPFZKSYWJJJHRDJZZXTXXGLGHYDXCSKYSWMMZCWYBAZBJKSHFHJCXMHFQHYXXYZFTSJYZFXYXPZLCHMZMBXHZZSXYFYMNCWDABAZLXKTCSHHXKXJJZJSTHYGXSXYYHHHJWXKZXSSBZZWHHHCWTZZZPJXSNXQQJGZYZYWLLCWXZFXXYXYHXMKYYSWSQMNLNAYCYSPMJKHWCQHYLAJJMZXHMMCNZHBHXCLXTJPLTXYJHDYYLTTXFSZHYXXSJBJYAYRSMXYPLCKDUYHLXRLNLLSTYZYYQYGYHHSCCSMZCTZQXKYQFPYYRPFFLKQUNTSZLLZMWWTCQQYZWTLLMLMPWMBZSSTZRBPDDTLQJJBXZCSRZQQYGWCSXFWZLXCCRSZDZMCYGGDZQSGTJSWLJMYMMZYHFBJDGYXCCPSHXNZCSBSJYJGJMPPWAFFYFNXHYZXZYLREMZGZCYZSSZDLLJCSQFNXZKPTXZGXJJGFMYYYSNBTYLBNLHPFZDCYFBMGQRRSSSZXYSGTZRNYDZZCDGPJAFJFZKNZBLCZSZPSGCYCJSZLMLRSZBZZLDLSLLYSXSQZQLYXZLSKKBRXBRBZCYCXZZZEEYFGKLZLYYHGZSGZLFJHGTGWKRAAJYZKZQTSSHJJXDCYZUYJLZYRZDQQHGJZXSSZBYKJPBFRTJXLLFQWJHYLQTYMBLPZDXTZYGBDHZZRBGXHWNJTJXLKSCFSMWLSDQYSJTXKZSCFWJLBXFTZLLJZLLQBLSQMQQCGCZFPBPHZCZJLPYYGGDTGWDCFCZQYYYQYSSCLXZSKLZZZGFFCQNWGLHQYZJJCZLQZZYJPJZZBPDCCMHJGXDQDGDLZQMFGPSYTSDYFWWDJZJYSXYYCZCYHZWPBYKXRYLYBHKJKSFXTZJMMCKHLLTNYYMSYXYZPYJQYCSYCWMTJJKQYRHLLQXPSGTLYYCLJSCPXJYZFNMLRGJJTYZBXYZMSJYJHHFZQMSYXRSZCWTLRTQZSSTKXGQKGSPTGCZNJSJCQCXHMXGGZTQYDJKZDLBZSXJLHYQGGGTHQSZPYHJHHGYYGKGGCWJZZYLCZLXQSFTGZSLLLMLJSKCTBLLZZSZMMNYTPZSXQHJCJYQXYZXZQZCPSHKZZYSXCDFGMWQRLLQXRFZTLYSTCTMJCXJJXHJNXTNRZTZFQYHQGLLGCXSZSJDJLJCYDSJTLNYXHSZXCGJZYQPYLFHDJSBPCCZHJJJQZJQDYBSSLLCMYTTMQTBHJQNNYGKYRQYQMZGCJKPDCGMYZHQLLSLLCLMHOLZGDYYFZSLJCQZLYLZQJESHNYLLJXGJXLYSYYYXNBZLJSSZCQQCJYLLZLTJYLLZLLBNYLGQCHXYYXOXCXQKYJXXXYKLXSXXYQXCYKQXQCSGYXXYQXYGYTQOHXHXPYXXXULCYEYCHZZCBWQBBWJQZSCSZSSLZYLKDESJZWMYMCYTSDSXXSCJPQQSQYLYYZYCMDJDZYWCBTJSYDJKCYDDJLBDJJSODZYSYXQQYXDHHGQQYQHDYXWGMMMAJDYBBBPPBCMUUPLJZSMTXERXJMHQNUTPJDCBSSMSSSTKJTSSMMTRCPLZSZMLQDSDMJMQPNQDXCFYNBFSDQXYXHYAYKQYDDLQYYYSSZBYDSLNTFQTZQPZMCHDHCZCWFDXTMYQSPHQYYXSRGJCWTJTZZQMGWJJTJHTQJBBHWZPXXHYQFXXQYWYYHYSCDYDHHQMNMTMWCPBSZPPZZGLMZFOLLCFWHMMSJZTTDHZZYFFYTZZGZYSKYJXQYJZQBHMBZZLYGHGFMSHPZFZSNCLPBQSNJXZSLXXFPMTYJYGBXLLDLXPZJYZJYHHZCYWHJYLSJEXFSZZYWXKZJLUYDTMLYMQJPWXYHXSKTQJEZRPXXZHHMHWQPWQLYJJQJJZSZCPHJLCHHNXJLQWZJHBMZYXBDHHYPZLHLHLGFWLCHYYTLHJXCJMSCPXSTKPNHQXSRTYXXTESYJCTLSSLSTDLLLWWYHDHRJZSFGXTSYCZYNYHTDHWJSLHTZDQDJZXXQHGYLTZPHCSQFCLNJTCLZPFSTPDYNYLGMJLLYCQHYSSHCHYLHQYQTMZYPBYWRFQYKQSYSLZDQJMPXYYSSRHZJNYWTQDFZBWWTWWRXCWHGYHXMKMYYYQMSMZHNGCEPMLQQMTCWCTMMPXJPJJHFXYYZSXZHTYBMSTSYJTTQQQYYLHYNPYQZLCYZHZWSMYLKFJXLWGXYPJYTYSYXYMZCKTTWLKSMZSYLMPWLZWXWQZSSAQSYXYRHSSNTSRAPXCPWCMGDXHXZDZYFJHGZTTSBJHGYZSZYSMYCLLLXBTYXHBBZJKSSDMALXHYCFYGMQYPJYCQXJLLLJGSLZGQLYCJCCZOTYXMTMTTLLWTGPXYMZMKLPSZZZXHKQYSXCTYJZYHXSHYXZKXLZWPSQPYHJWPJPWXQQYLXSDHMRSLZZYZWTTCYXYSZZSHBSCCSTPLWSSCJCHNLCGCHSSPHYLHFHHXJSXYLLNYLSZDHZXYLSXLWZYKCLDYAXZCMDDYSPJTQJZLNWQPSSSWCTSTSZLBLNXSMNYYMJQBQHRZWTYYDCHQLXKPZWBGQYBKFCMZWPZLLYYLSZYDWHXPSBCMLJBSCGBHXLQHYRLJXYSWXWXZSLDFHLSLYNJLZYFLYJYCDRJLFSYZFSLLCQYQFGJYHYXZLYLMSTDJCYHBZLLNWLXXYGYYHSMGDHXXHHLZZJZXCZZZCYQZFNGWPYLCPKPYYPMCLQKDGXZGGWQBDXZZKZFBXXLZXJTPJPTTBYTSZZDWSLCHZHSLTYXHQLHYXXXYYZYSWTXZKHLXZXZPYHGCHKCFSYHUTJRLXFJXPTZTWHPLYXFCRHXSHXKYXXYHZQDXQWULHYHMJTBFLKHTXCWHJFWJCFPQRYQXCYYYQYGRPYWSGSUNGWCHKZDXYFLXXHJJBYZWTSXXNCYJJYMSWZJQRMHXZWFQSYLZJZGBHYNSLBGTTCSYBYXXWXYHXYYXNSQYXMQYWRGYQLXBBZLJSYLPSYTJZYHYZAWLRORJMKSCZJXXXYXCHDYXRYXXJDTSQFXLYLTSFFYXLMTYJMJUYYYXLTZCSXQZQHZXLYYXZHDNBRXXXJCTYHLBRLMBRLLAXKYLLLJLYXXLYCRYLCJTGJCMTLZLLCYZZPZPCYAWHJJFYBDYYZSMPCKZDQYQPBPCJPDCYZMDPBCYYDYCNNPLMTMLRMFMMGWYZBSJGYGSMZQQQZTXMKQWGXLLPJGZBQCDJJJFPKJKCXBLJMSWMDTQJXLDLPPBXCWRCQFBFQJCZAHZGMYKPHYYHZYKNDKZMBPJYXPXYHLFPNYYGXJDBKXNXHJMZJXSTRSTLDXSKZYSYBZXJLXYSLBZYSLHXJPFXPQNBYLLJQKYGZMCYZZYMCCSLCLHZFWFWYXZMWSXTYNXJHPYYMCYSPMHYSMYDYSHQYZCHMJJMZCAAGCFJBBHPLYZYLXXSDJGXDHKXXTXXNBHRMLYJSLTXMRHNLXQJXYZLLYSWQGDLBJHDCGJYQYCMHWFMJYBMBYJYJWYMDPWHXQLDYGPDFXXBCGJSPCKRSSYZJMSLBZZJFLJJJLGXZGYXYXLSZQYXBEXYXHGCXBPLDYHWETTWWCJMBTXCHXYQXLLXFLYXLLJLSSFWDPZSMYJCLMWYTCZPCHQEKCQBWLCQYDPLQPPQZQFJQDJHYMMCXTXDRMJWRHXCJZYLQXDYYNHYYHRSLSRSYWWZJYMTLTLLGTQCJZYABTCKZCJYCCQLJZQXALMZYHYWLWDXZXQDLLQSHGPJFJLJHJABCQZDJGTKHSSTCYJLPSWZLXZXRWGLDLZRLZXTGSLLLLZLYXXWGDZYGBDPHZPBRLWSXQBPFDWOFMWHLYPCBJCCLDMBZPBZZLCYQXLDOMZBLZWPDWYYGDSTTHCSQSCCRSSSYSLFYBFNTYJSZDFNDPDHDZZMBBLSLCMYFFGTJJQWFTMTPJWFNLBZCMMJTGBDZLQLPYFHYYMJYLSDCHDZJWJCCTLJCLDTLJJCPDDSQDSSZYBNDBJLGGJZXSXNLYCYBJXQYCBYLZCFZPPGKCXZDZFZTJJFJSJXZBNZYJQTTYJYHTYCZHYMDJXTTMPXSPLZCDWSLSHXYPZGTFMLCJTYCBPMGDKWYCYZCDSZZYHFLYCTYGWHKJYYLSJCXGYWJCBLLCSNDDBTZBSCLYZCZZSSQDLLMQYYHFSLQLLXFTYHABXGWNYWYYPLLSDLDLLBJCYXJZMLHLJDXYYQYTDLLLBUGBFDFBBQJZZMDPJHGCLGMJJPGAEHHBWCQXAXHHHZCHXYPHJAXHLPHJPGPZJQCQZGJJZZUZDMQYYBZZPHYHYBWHAZYJHYKFGDPFQSDLZMLJXKXGALXZDAGLMDGXMWZQYXXDXXPFDMMSSYMPFMDMMKXKSYZYSHDZKXSYSMMZZZMSYDNZZCZXFPLSTMZDNMXCKJMZTYYMZMZZMSXHHDCZJEMXXKLJSTLWLSQLYJZLLZJSSDPPMHNLZJCZYHMXXHGZCJMDHXTKGRMXFWMCGMWKDTKSXQMMMFZZYDKMSCLCMPCGMHSPXQPZDSSLCXKYXTWLWJYAHZJGZQMCSNXYYMMPMLKJXMHLMLQMXCTKZMJQYSZJSYSZHSYJZJCDAJZYBSDQJZGWZQQXFKDMSDJLFWEHKZQKJPEYPZYSZCDWYJFFMZZYLTTDZZEFMZLBNPPLPLPEPSZALLTYLKCKQZKGENQLWAGYXYDPXLHSXQQWQCQXQCLHYXXMLYCCWLYMQYSKGCHLCJNSZKPYZKCQZQLJPDMDZHLASXLBYDWQLWDNBQCRYDDZTJYBKBWSZDXDTNPJDTCTQDFXQQMGNXECLTTBKPWSLCTYQLPWYZZKLPYGZCQQPLLKCCYLPQMZCZQCLJSLQZDJXLDDHPZQDLJJXZQDXYZQKZLJCYQDYJPPYPQYKJYRMPCBYMCXKLLZLLFQPYLLLMBSGLCYSSLRSYSQTMXYXZQZFDZUYSYZTFFMZZSMZQHZSSCCMLYXWTPZGXZJGZGSJSGKDDHTQGGZLLBJDZLCBCHYXYZHZFYWXYZYMSDBZZYJGTSMTFXQYXQSTDGSLNXDLRYZZLRYYLXQHTXSRTZNGZXBNQQZFMYKMZJBZYMKBPNLYZPBLMCNQYZZZSJZHJCTZKHYZZJRDYZHNPXGLFZTLKGJTCTSSYLLGZRZBBQZZKLPKLCZYSSUYXBJFPNJZZXCDWXZYJXZZDJJKGGRSRJKMSMZJLSJYWQSKYHQJSXPJZZZLSNSHRNYPZTWCHKLPSRZLZXYJQXQKYSJYCZTLQZYBBYBWZPQDWWYZCYTJCJXCKCWDKKZXSGKDZXWWYYJQYYTCYTDLLXWKCZKKLCCLZCQQDZLQLCSFQCHQHSFSMQZZLNBJJZBSJHTSZDYSJQJPDLZCDCWJKJZZLPYCGMZWDJJBSJQZSYZYHHXJPBJYDSSXDZNCGLQMBTSFSBPDZDLZNFGFJGFSMPXJQLMBLGQCYYXBQKDJJQYRFKZTJDHCZKLBSDZCFJTPLLJGXHYXZCSSZZXSTJYGKGCKGYOQXJPLZPBPGTGYJZGHZQZZLBJLSQFZGKQQJZGYCZBZQTLDXRJXBSXXPZXHYZYCLWDXJJHXMFDZPFZHQHQMQGKSLYHTYCGFRZGNQXCLPDLBZCSCZQLLJBLHBZCYPZZPPDYMZZSGYHCKCPZJGSLJLNSCDSLDLXBMSTLDDFJMKDJDHZLZXLSZQPQPGJLLYBDSZGQLBZLSLKYYHZTTNTJYQTZZPSZQZTLLJTYYLLQLLQYZQLBDZLSLYYZYMDFSZSNHLXZNCZQZPBWSKRFBSYZMTHBLGJPMCZZLSTLXSHTCSYZLZBLFEQHLXFLCJLYLJQCBZLZJHHSSTBRMHXZHJZCLXFNBGXGTQJCZTMSFZKJMSSNXLJKBHSJXNTNLZDNTLMSJXGZJYJCZXYJYJWRWWQNZTNFJSZPZSHZJFYRDJSFSZJZBJFZQZZHZLXFYSBZQLZSGYFTZDCSZXZJBQMSZKJRHYJZCKMJKHCHGTXKXQGLXPXFXTRTYLXJXHDTSJXHJZJXZWZLCQSBTXWXGXTXXHXFTSDKFJHZYJFJXRZSDLLLTQSQQZQWZXSYQTWGWBZCGZLLYZBCLMQQTZHZXZXLJFRMYZFLXYSQXXJKXRMQDZDMMYYBSQBHGZMWFWXGMXLZPYYTGZYCCDXYZXYWGSYJYZNBHPZJSQSYXSXRTFYZGRHZTXSZZTHCBFCLSYXZLZQMZLMPLMXZJXSFLBYZMYQHXJSXRXSQZZZSSLYFRCZJRCRXHHZXQYDYHXSJJHZCXZBTYNSYSXJBQLPXZQPYMLXZKYXLXCJLCYSXXZZLXDLLLJJYHZXGYJWKJRWYHCPSGNRZLFZWFZZNSXGXFLZSXZZZBFCSYJDBRJKRDHHGXJLJJTGXJXXSTJTJXLYXQFCSGSWMSBCTLQZZWLZZKXJMLTMJYHSDDBXGZHDLBMYJFRZFSGCLYJBPMLYSMSXLSZJQQHJZFXGFQFQBPXZGYYQXGZTCQWYLTLGWSGWHRLFSFGZJMGMGBGTJFSYZZGZYZAFLSSPMLPFLCWBJZCLJJMZLPJJLYMQDMYYYFBGYGYZMLYZDXQYXRQQQHSYYYQXYLJTYXFSFSLLGNQCYHYCWFHCCCFXPYLYPLLZYXXXXXKQHHXSHJZCFZSCZJXCPZWHHHHHAPYLQALPQAFYHXDYLUKMZQGGGDDESRNNZLTZGCHYPPYSQJJHCLLJTOLNJPZLJLHYMHEYDYDSQYCDDHGZUNDZCLZYZLLZNTNYZGSLHSLPJJBDGWXPCDUTJCKLKCLWKLLCASSTKZZDNQNTTLYYZSSYSSZZRYLJQKCQDHHCRXRZYDGRGCWCGZQFFFPPJFZYNAKRGYWYQPQXXFKJTSZZXSWZDDFBBXTBGTZKZNPZZPZXZPJSZBMQHKCYXYLDKLJNYPKYGHGDZJXXEAHPNZKZTZCMXCXMMJXNKSZQNMNLWBWWXJKYHCPSTMCSQTZJYXTPCTPDTNNPGLLLZSJLSPBLPLQHDTNJNLYYRSZFFJFQWDPHZDWMRZCCLODAXNSSNYZRESTYJWJYJDBCFXNMWTTBYLWSTSZGYBLJPXGLBOCLHPCBJLTMXZLJYLZXCLTPNCLCKXTPZJSWCYXSFYSZDKNTLBYJCYJLLSTGQCBXRYZXBXKLYLHZLQZLNZCXWJZLJZJNCJHXMNZZGJZZXTZJXYCYYCXXJYYXJJXSSSJSTSSTTPPGQTCSXWZDCSYFPTFBFHFBBLZJCLZZDBXGCXLQPXKFZFLSYLTUWBMQJHSZBMDDBCYSCCLDXYCDDQLYJJWMQLLCSGLJJSYFPYYCCYLTJANTJJPWYCMMGQYYSXDXQMZHSZXPFTWWZQSWQRFKJLZJQQYFBRXJHHFWJJZYQAZMYFRHCYYBYQWLPEXCCZSTYRLTTDMQLYKMBBGMYYJPRKZNPBSXYXBHYZDJDNGHPMFSGMWFZMFQMMBCMZZCJJLCNUXYQLMLRYGQZCYXZLWJGCJCGGMCJNFYZZJHYCPRRCMTZQZXHFQGTJXCCJEAQCRJYHPLQLSZDJRBCQHQDYRHYLYXJSYMHZYDWLDFRYHBPYDTSSCNWBXGLPZMLZZTQSSCPJMXXYCSJYTYCGHYCJWYRXXLFEMWJNMKLLSWTXHYYYNCMMCWJDQDJZGLLJWJRKHPZGGFLCCSCZMCBLTBHBQJXQDSPDJZZGKGLFQYWBZYZJLTSTDHQHCTCBCHFLQMPWDSHYYTQWCNZZJTLBYMBPDYYYXSQKXWYYFLXXNCWCXYPMAELYKKJMZZZBRXYYQJFLJPFHHHYTZZXSGQQMHSPGDZQWBWPJHZJDYSCQWZKTXXSQLZYYMYSDZGRXCKKUJLWPYSYSCSYZLRMLQSYLJXBCXTLWDQZPCYCYKPPPNSXFYZJJRCEMHSZMSXLXGLRWGCSTLRSXBZGBZGZTCPLUJLSLYLYMTXMTZPALZXPXJTJWTCYYZLBLXBZLQMYLXPGHDSLSSDMXMBDZZSXWHAMLCZCPJMCNHJYSNSYGCHSKQMZZQDLLKABLWJXSFMOCDXJRRLYQZKJMYBYQLYHETFJZFRFKSRYXFJTWDSXXSYSQJYSLYXWJHSNLXYYXHBHAWHHJZXWMYLJCSSLKYDZTXBZSYFDXGXZJKHSXXYBSSXDPYNZWRPTQZCZENYGCXQFJYKJBZMLJCMQQXUOXSLYXXLYLLJDZBTYMHPFSTTQQWLHOKYBLZZALZXQLHZWRRQHLSTMYPYXJJXMQSJFNBXYXYJXXYQYLTHYLQYFMLKLJTMLLHSZWKZHLJMLHLJKLJSTLQXYLMBHHLNLZXQJHXCFXXLHYHJJGBYZZKBXSCQDJQDSUJZYYHZHHMGSXCSYMXFEBCQWWRBPYYJQTYZCYQYQQZYHMWFFHGZFRJFCDPXNTQYZPDYKHJLFRZXPPXZDBBGZQSTLGDGYLCQMLCHHMFYWLZYXKJLYPQHSYWMQQGQZMLZJNSQXJQSYJYCBEHSXFSZPXZWFLLBCYYJDYTDTHWZSFJMQQYJLMQXXLLDTTKHHYBFPWTYYSQQWNQWLGWDEBZWCMYGCULKJXTMXMYJSXHYBRWFYMWFRXYQMXYSZTZZTFYKMLDHQDXWYYNLCRYJBLPSXCXYWLSPRRJWXHQYPHTYDNXHHMMYWYTZCSQMTSSCCDALWZTCPQPYJLLQZYJSWXMZZMMYLMXCLMXCZMXMZSQTZPPQQBLPGXQZHFLJJHYTJSRXWZXSCCDLXTYJDCQJXSLQYCLZXLZZXMXQRJMHRHZJBHMFLJLMLCLQNLDXZLLLPYPSYJYSXCQQDCMQJZZXHNPNXZMEKMXHYKYQLXSXTXJYYHWDCWDZHQYYBGYBCYSCFGPSJNZDYZZJZXRZRQJJYMCANYRJTLDPPYZBSTJKXXZYPFDWFGZZRPYMTNGXZQBYXNBUFNQKRJQZMJEGRZGYCLKXZDSKKNSXKCLJSPJYYZLQQJYBZSSQLLLKJXTBKTYLCCDDBLSPPFYLGYDTZJYQGGKQTTFZXBDKTYYHYBBFYTYYBCLPDYTGDHRYRNJSPTCSNYJQHKLLLZSLYDXXWBCJQSPXBPJZJCJDZFFXXBRMLAZHCSNDLBJDSZBLPRZTSWSBXBCLLXXLZDJZSJPYLYXXYFTFFFBHJJXGBYXJPMMMPSSJZJMTLYZJXSWXTYLEDQPJMYGQZJGDJLQJWJQLLSJGJGYGMSCLJJXDTYGJQJQJCJZCJGDZZSXQGSJGGCXHQXSNQLZZBXHSGZXCXYLJXYXYYDFQQJHJFXDHCTXJYRXYSQTJXYEFYYSSYYJXNCYZXFXMSYSZXYYSCHSHXZZZGZZZGFJDLTYLNPZGYJYZYYQZPBXQBDZTZCZYXXYHHSQXSHDHGQHJHGYWSZTMZMLHYXGEBTYLZKQWYTJZRCLEKYSTDBCYKQQSAYXCJXWWGSBHJYZYDHCSJKQCXSWXFLTYNYZPZCCZJQTZWJQDZZZQZLJJXLSBHPYXXPSXSHHEZTXFPTLQYZZXHYTXNCFZYYHXGNXMYWXTZSJPTHHGYMXMXQZXTSBCZYJYXXTYYZYPCQLMMSZMJZZLLZXGXZAAJZYXJMZXWDXZSXZDZXLEYJJZQBHZWZZZQTZPSXZTDSXJJJZNYAZPHXYYSRNQDTHZHYYKYJHDZXZLSWCLYBZYECWCYCRYLCXNHZYDZYDYJDFRJJHTRSQTXYXJRJHOJYNXELXSFSFJZGHPZSXZSZDZCQZBYYKLSGSJHCZSHDGQGXYZGXCHXZJWYQWGYHKSSEQZZNDZFKWYSSTCLZSTSYMCDHJXXYWEYXCZAYDMPXMDSXYBSQMJMZJMTZQLPJYQZCGQHXJHHLXXHLHDLDJQCLDWBSXFZZYYSCHTYTYYBHECXHYKGJPXHHYZJFXHWHBDZFYZBCAPNPGNYDMSXHMMMMAMYNBYJTMPXYYMCTHJBZYFCGTYHWPHFTWZZEZSBZEGPFMTSKFTYCMHFLLHGPZJXZJGZJYXZSBBQSCZZLZCCSTPGXMJSFTCCZJZDJXCYBZLFCJSYZFGSZLYBCWZZBYZDZYPSWYJZXZBDSYUXLZZBZFYGCZXBZHZFTPBGZGEJBSTGKDMFHYZZJHZLLZZGJQZLSFDJSSCBZGPDLFZFZSZYZYZSYGCXSNXXCHCZXTZZLJFZGQSQYXZJQDCCZTQCDXZJYQJQCHXZTDLGSCXZSYQJQTZWLQDQZTQCHQQJZYEZZZPBWKDJFCJPZTYPQYQTTYNLMBDKTJZPQZQZZFPZSBNJLGYJDXJDZZKZGQKXDLPZJTCJDQBXDJQJSTCKNXBXZMSLYJCQMTJQWWCJQNJNLLLHJCWQTBZQYDZCZPZZDZYDDCYZZZCCJTTJFZDPRRTZTJDCQTQZDTJNPLZBCLLCTZSXKJZQZPZLBZRBTJDCXFCZDBCCJJLTQQPLDCGZDBBZJCQDCJWYNLLZYZCCDWLLXWZLXRXNTQQCZXKQLSGDFQTDDGLRLAJJTKUYMKQLLTZYTDYYCZGJWYXDXFRSKSTQTENQMRKQZHHQKDLDAZFKYPBGGPZREBZZYKZZSPEGJXGYKQZZZSLYSYYYZWFQZYLZZLZHWCHKYPQGNPGBLPLRRJYXCCSYYHSFZFYBZYYTGZXYLXCZWXXZJZBLFFLGSKHYJZEYJHLPLLLLCZGXDRZELRHGKLZZYHZLYQSZZJZQLJZFLNBHGWLCZCFJYSPYXZLZLXGCCPZBLLCYBBBBUBBCBPCRNNZCZYRBFSRLDCGQYYQXYGMQZWTZYTYJXYFWTEHZZJYWLCCNTZYJJZDEDPZDZTSYQJHDYMBJNYJZLXTSSTPHNDJXXBYXQTZQDDTJTDYYTGWSCSZQFLSHLGLBCZPHDLYZJYCKWTYTYLBNYTSDSYCCTYSZYYEBHEXHQDTWNYGYCLXTSZYSTQMYGZAZCCSZZDSLZCLZRQXYYELJSBYMXSXZTEMBBLLYYLLYTDQYSHYMRQWKFKBFXNXSBYCHXBWJYHTQBPBSBWDZYLKGZSKYHXQZJXHXJXGNLJKZLYYCDXLFYFGHLJGJYBXQLYBXQPQGZTZPLNCYPXDJYQYDYMRBESJYYHKXXSTMXRCZZYWXYQYBMCLLYZHQYZWQXDBXBZWZMSLPDMYSKFMZKLZCYQYCZLQXFZZYDQZPZYGYJYZMZXDZFYFYTTQTZHGSPCZMLCCYTZXJCYTJMKSLPZHYSNZLLYTPZCTZZCKTXDHXXTQCYFKSMQCCYYAZHTJPCYLZLYJBJXTPNYLJYYNRXSYLMMNXJSMYBCSYSYLZYLXJJQYLDZLPQBFZZBLFNDXQKCZFYWHGQMRDSXYCYTXNQQJZYYPFZXDYZFPRXEJDGYQBXRCNFYYQPGHYJDYZXGRHTKYLNWDZNTSMPKLBTHBPYSZBZTJZSZZJTYYXZPHSSZZBZCZPTQFZMYFLYPYBBJQXZMXXDJMTSYSKKBJZXHJCKLPSMKYJZCXTMLJYXRZZQSLXXQPYZXMKYXXXJCLJPRMYYGADYSKQLSNDHYZKQXZYZTCGHZTLMLWZYBWSYCTBHJHJFCWZTXWYTKZLXQSHLYJZJXTMPLPYCGLTBZZTLZJCYJGDTCLKLPLLQPJMZPAPXYZLKKTKDZCZZBNZDYDYQZJYJGMCTXLTGXSZLMLHBGLKFWNWZHDXUHLFMKYSLGXDTWWFRJEJZTZHYDXYKSHWFZCQSHKTMQQHTZHYMJDJSKHXZJZBZZXYMPAGQMSTPXLSKLZYNWRTSQLSZBPSPSGZWYHTLKSSSWHZZLYYTNXJGMJSZSUFWNLSOZTXGXLSAMMLBWLDSZYLAKQCQCTMYCFJBSLXCLZZCLXXKSBZQCLHJPSQPLSXXCKSLNHPSFQQYTXYJZLQLDXZQJZDYYDJNZPTUZDSKJFSLJHYLZSQZLBTXYDGTQFDBYAZXDZHZJNHHQBYKNXJJQCZMLLJZKSPLDYCLBBLXKLELXJLBQYCXJXGCNLCQPLZLZYJTZLJGYZDZPLTQCSXFDMNYCXGBTJDCZNBGBQYQJWGKFHTNPYQZQGBKPBBYZMTJDYTBLSQMPSXTBNPDXKLEMYYCJYNZCTLDYKZZXDDXHQSHDGMZSJYCCTAYRZLPYLTLKXSLZCGGEXCLFXLKJRTLQJAQZNCMBYDKKCXGLCZJZXJHPTDJJMZQYKQSECQZDSHHADMLZFMMZBGNTJNNLGBYJBRBTMLBYJDZXLCJLPLDLPCQDHLXZLYCBLCXZZJADJLNZMMSSSMYBHBSQKBHRSXXJMXSDZNZPXLGBRHWGGFCXGMSKLLTSJYYCQLTSKYWYYHYWXBXQYWPYWYKQLSQPTNTKHQCWDQKTWPXXHCPTHTWUMSSYHBWCRWXHJMKMZNGWTMLKFGHKJYLSYYCXWHYECLQHKQHTTQKHFZLDXQWYZYYDESBPKYRZPJFYYZJCEQDZZDLATZBBFJLLCXDLMJSSXEGYGSJQXCWBXSSZPDYZCXDNYXPPZYDLYJCZPLTXLSXYZYRXCYYYDYLWWNZSAHJSYQYHGYWWAXTJZDAXYSRLTDPSSYYFNEJDXYZHLXLLLZQZSJNYQYQQXYJGHZGZCYJCHZLYCDSHWSHJZYJXCLLNXZJJYYXNFXMWFPYLCYLLABWDDHWDXJMCXZTZPMLQZHSFHZYNZTLLDYWLSLXHYMMYLMBWWKYXYADTXYLLDJPYBPWUXJMWMLLSAFDLLYFLBHHHBQQLTZJCQJLDJTFFKMMMBYTHYGDCQRDDWRQJXNBYSNWZDBYYTBJHPYBYTTJXAAHGQDQTMYSTQXKBTZPKJLZRBEQQSSMJJBDJOTGTBXPGBKTLHQXJJJCTHXQDWJLWRFWQGWSHCKRYSWGFTGYGBXSDWDWRFHWYTJJXXXJYZYSLPYYYPAYXHYDQKXSHXYXGSKQHYWFDDDPPLCJLQQEEWXKSYYKDYPLTJTHKJLTCYYHHJTTPLTZZCDLTHQKZXQYSTEEYWYYZYXXYYSTTJKLLPZMCYHQGXYHSRMBXPLLNQYDQHXSXXWGDQBSHYLLPJJJTHYJKYPPTHYYKTYEZYENMDSHLCRPQFDGFXZPSFTLJXXJBSWYYSKSFLXLPPLBBBLBSFXFYZBSJSSYLPBBFFFFSSCJDSTZSXZRYYSYFFSYZYZBJTBCTSBSDHRTJJBYTCXYJEYLXCBNEBJDSYXYKGSJZBXBYTFZWGENYHHTHZHHXFWGCSTBGXKLSXYWMTMBYXJSTZSCDYQRCYTWXZFHMYMCXLZNSDJTTTXRYCFYJSBSDYERXJLJXBBDEYNJGHXGCKGSCYMBLXJMSZNSKGXFBNBPTHFJAAFXYXFPXMYPQDTZCXZZPXRSYWZDLYBBKTYQPQJPZYPZJZNJPZJLZZFYSBTTSLMPTZRTDXQSJEHBZYLZDHLJSQMLHTXTJECXSLZZSPKTLZKQQYFSYGYWPCPQFHQHYTQXZKRSGTTSQCZLPTXCDYYZXSQZSLXLZMYCPCQBZYXHBSXLZDLTCDXTYLZJYYZPZYZLTXJSJXHLPMYTXCQRBLZSSFJZZTNJYTXMYJHLHPPLCYXQJQQKZZSCPZKSWALQSBLCCZJSXGWWWYGYKTJBBZTDKHXHKGTGPBKQYSLPXPJCKBMLLXDZSTBKLGGQKQLSBKKTFXRMDKBFTPZFRTBBRFERQGXYJPZSSTLBZTPSZQZSJDHLJQLZBPMSMMSXLQQNHKNBLRDDNXXDHDDJCYYGYLXGZLXSYGMQQGKHBPMXYXLYTQWLWGCPBMQXCYZYDRJBHTDJYHQSHTMJSBYPLWHLZFFNYPMHXXHPLTBQPFBJWQDBYGPNZTPFZJGSDDTQSHZEAWZZYLLTYYBWJKXXGHLFKXDJTMSZSQYNZGGSWQSPHTLSSKMCLZXYSZQZXNCJDQGZDLFNYKLJCJLLZLMZZNHYDSSHTHZZLZZBBHQZWWYCRZHLYQQJBEYFXXXWHSRXWQHWPSLMSSKZTTYGYQQWRSLALHMJTQJSMXQBJJZJXZYZKXBYQXBJXSHZTSFJLXMXZXFGHKZSZGGYLCLSARJYHSLLLMZXELGLXYDJYTLFBHBPNLYZFBBHPTGJKWETZHKJJXZXXGLLJLSTGSHJJYQLQZFKCGNNDJSSZFDBCTWWSEQFHQJBSAQTGYPQLBXBMMYWXGSLZHGLZGQYFLZBYFZJFRYSFMBYZHQGFWZSYFYJJPHZBYYZFFWODGRLMFTWLBZGYCQXCDJYGZYYYYTYTYDWEGAZYHXJLZYYHLRMGRXXZCLHNELJJTJTPWJYBJJBXJJTJTEEKHWSLJPLPSFYZPQQBDLQJJTYYQLYZKDKSQJYYQZLDQTGJQYZJSUCMRYQTHTEJMFCTYHYPKMHYZWJDQFHYYXWSHCTXRLJHQXHCCYYYJLTKTTYTMXGTCJTZAYYOCZLYLBSZYWJYTSJYHBYSHFJLYGJXXTMZYYLTXXYPZLXYJZYZYYPNHMYMDYYLBLHLSYYQQLLNJJYMSOYQBZGDLYXYLCQYXTSZEGXHZGLHWBLJHEYXTWQMAKBPQCGYSHHEGQCMWYYWLJYJHYYZLLJJYLHZYHMGSLJLJXCJJYCLYCJPCPZJZJMMYLCQLNQLJQJSXYJMLSZLJQLYCMMHCFMMFPQQMFYLQMCFFQMMMMHMZNFHHJGTTHHKHSLNCHHYQDXTMMQDCYZYXYQMYQYLTDCYYYZAZZCYMZYDLZFFFMMYCQZWZZMABTBYZTDMNZZGGDFTYPCGQYTTSSFFWFDTZQSSYSTWXJHXYTSXXYLBYQHWWKXHZXWZNNZZJZJJQJCCCHYYXBZXZCYZTLLCQXYNJYCYYCYNZZQYYYEWYCZDCJYCCHYJLBTZYYCQWMPWPYMLGKDLDLGKQQBGYCHJXY";
	//姝ゅ鏀跺綍浜�375涓闊冲瓧,鏁版嵁鏉ヨ嚜浜巋ttp://www.51window.net/page/pinyin
	var oMultiDiff = {"19969": "DZ", "19975": "WM", "19988": "QJ", "20048": "YL", "20056": "SC", "20060": "NM", "20094": "QG", "20127": "QJ", "20167": "QC", "20193": "YG", "20250": "KH", "20256": "ZC", "20282": "SC", "20285": "QJG", "20291": "TD", "20314": "YD", "20340": "NE", "20375": "TD", "20389": "YJ", "20391": "CZ", "20415": "PB", "20446": "YS", "20447": "SQ", "20504": "TC", "20608": "KG", "20854": "QJ", "20857": "ZC", "20911": "PF", "20504": "TC", "20608": "KG", "20854": "QJ", "20857": "ZC", "20911": "PF", "20985": "AW", "21032": "PB", "21048": "XQ", "21049": "SC", "21089": "YS", "21119": "JC", "21242": "SB", "21273": "SC", "21305": "YP", "21306": "QO", "21330": "ZC", "21333": "SDC", "21345": "QK", "21378": "CA", "21397": "SC", "21414": "XS", "21442": "SC", "21477": "JG", "21480": "TD", "21484": "ZS", "21494": "YX", "21505": "YX", "21512": "HG", "21523": "XH", "21537": "PB", "21542": "PF", "21549": "KH", "21571": "E", "21574": "DA", "21588": "TD", "21589": "O", "21618": "ZC", "21621": "KHA", "21632": "ZJ", "21654": "KG", "21679": "LKG", "21683": "KH", "21710": "A", "21719": "YH", "21734": "WOE", "21769": "A", "21780": "WN", "21804": "XH", "21834": "A", "21899": "ZD", "21903": "RN", "21908": "WO", "21939": "ZC", "21956": "SA", "21964": "YA", "21970": "TD", "22003": "A", "22031": "JG", "22040": "XS", "22060": "ZC", "22066": "ZC", "22079": "MH", "22129": "XJ", "22179": "XA", "22237": "NJ", "22244": "TD", "22280": "JQ", "22300": "YH", "22313": "XW", "22331": "YQ", "22343": "YJ", "22351": "PH", "22395": "DC", "22412": "TD", "22484": "PB", "22500": "PB", "22534": "ZD", "22549": "DH", "22561": "PB", "22612": "TD", "22771": "KQ", "22831": "HB", "22841": "JG", "22855": "QJ", "22865": "XQ", "23013": "ML", "23081": "WM", "23487": "SX", "23558": "QJ", "23561": "YW", "23586": "YW", "23614": "YW", "23615": "SN", "23631": "PB", "23646": "ZS", "23663": "ZT", "23673": "YG", "23762": "TD", "23769": "ZS", "23780": "QJ", "23884": "QK", "24055": "XH", "24113": "DC", "24162": "ZC", "24191": "GA", "24273": "QJ", "24324": "NL", "24377": "TD", "24378": "QJ", "24439": "PF", "24554": "ZS", "24683": "TD", "24694": "WE", "24733": "LK", "24925": "TN", "25094": "ZG", "25100": "XQ", "25103": "XH", "25153": "PB", "25170": "PB", "25179": "KG", "25203": "PB", "25240": "ZS", "25282": "FB", "25303": "NA", "25324": "KG", "25341": "ZY", "25373": "WZ", "25375": "XJ", "25384": "A", "25457": "A", "25528": "SD", "25530": "SC", "25552": "TD", "25774": "ZC", "25874": "ZC", "26044": "YW", "26080": "WM", "26292": "PB", "26333": "PB", "26355": "ZY", "26366": "CZ", "26397": "ZC", "26399": "QJ", "26415": "ZS", "26451": "SB", "26526": "ZC", "26552": "JG", "26561": "TD", "26588": "JG", "26597": "CZ", "26629": "ZS", "26638": "YL", "26646": "XQ", "26653": "KG", "26657": "XJ", "26727": "HG", "26894": "ZC", "26937": "ZS", "26946": "ZC", "26999": "KJ", "27099": "KJ", "27449": "YQ", "27481": "XS", "27542": "ZS", "27663": "ZS", "27748": "TS", "27784": "SC", "27788": "ZD", "27795": "TD", "27812": "O", "27850": "PB", "27852": "MB", "27895": "SL", "27898": "PL", "27973": "QJ", "27981": "KH", "27986": "HX", "27994": "XJ", "28044": "YC", "28065": "WG", "28177": "SM", "28267": "QJ", "28291": "KH", "28337": "ZQ", "28463": "TL", "28548": "DC", "28601": "TD", "28689": "PB", "28805": "JG", "28820": "QG", "28846": "PB", "28952": "TD", "28975": "ZC", "29100": "A", "29325": "QJ", "29575": "SL", "29602": "FB", "30010": "TD", "30044": "CX", "30058": "PF", "30091": "YSP", "30111": "YN", "30229": "XJ", "30427": "SC", "30465": "SX", "30631": "YQ", "30655": "QJ", "30684": "QJG", "30707": "SD", "30729": "XH", "30796": "LG", "30917": "PB", "31074": "NM", "31085": "JZ", "31109": "SC", "31181": "ZC", "31192": "MLB", "31293": "JQ", "31400": "YX", "31584": "YJ", "31896": "ZN", "31909": "ZY", "31995": "XJ", "32321": "PF", "32327": "ZY", "32418": "HG", "32420": "XQ", "32421": "HG", "32438": "LG", "32473": "GJ", "32488": "TD", "32521": "QJ", "32527": "PB", "32562": "ZSQ", "32564": "JZ", "32735": "ZD", "32793": "PB", "33071": "PF", "33098": "XL", "33100": "YA", "33152": "PB", "33261": "CX", "33324": "BP", "33333": "TD", "33406": "YA", "33426": "WM", "33432": "PB", "33445": "JG", "33486": "ZN", "33493": "TS", "33507": "QJ", "33540": "QJ", "33544": "ZC", "33564": "XQ", "33617": "YT", "33632": "QJ", "33636": "XH", "33637": "YX", "33694": "WG", "33705": "PF", "33728": "YW", "33882": "SR", "34067": "WM", "34074": "YW", "34121": "QJ", "34255": "ZC", "34259": "XL", "34425": "JH", "34430": "XH", "34485": "KH", "34503": "YS", "34532": "HG", "34552": "XS", "34558": "YE", "34593": "ZL", "34660": "YQ", "34892": "XH", "34928": "SC", "34999": "QJ", "35048": "PB", "35059": "SC", "35098": "ZC", "35203": "TQ", "35265": "JX", "35299": "JX", "35782": "SZ", "35828": "YS", "35830": "E", "35843": "TD", "35895": "YG", "35977": "MH", "36158": "JG", "36228": "QJ", "36426": "XQ", "36466": "DC", "36710": "JC", "36711": "ZYG", "36767": "PB", "36866": "SK", "36951": "YW", "37034": "YX", "37063": "XH", "37218": "ZC", "37325": "ZC", "38063": "PB", "38079": "TD", "38085": "QY", "38107": "DC", "38116": "TD", "38123": "YD", "38224": "HG", "38241": "XTC", "38271": "ZC", "38415": "YE", "38426": "KH", "38461": "YD", "38463": "AE", "38466": "PB", "38477": "XJ", "38518": "YT", "38551": "WK", "38585": "ZC", "38704": "XS", "38739": "LJ", "38761": "GJ", "38808": "SQ", "39048": "JG", "39049": "XJ", "39052": "HG", "39076": "CZ", "39271": "XT", "39534": "TD", "39552": "TD", "39584": "PB", "39647": "SB", "39730": "LG", "39748": "TPB", "40109": "ZQ", "40479": "ND", "40516": "HG", "40536": "HG", "40583": "QJ", "40765": "YQ", "40784": "QJ", "40840": "YK", "40863": "QJG"};
	//鍙傛暟,涓枃瀛楃涓�
	//杩斿洖鍊�:鎷奸煶棣栧瓧姣嶄覆鏁扮粍
	function getPy(str) {
		var arrResult = new Array(); //淇濆瓨涓棿缁撴灉鐨勬暟缁�
		for (var i = 0, len = str.length; i < len; i++) {
			//鑾峰緱unicode鐮�
			var ch = str.charAt(i);
			//妫€鏌ヨunicode鐮佹槸鍚﹀湪澶勭悊鑼冨洿涔嬪唴,鍦ㄥ垯杩斿洖璇ョ爜瀵规槧姹夊瓧鐨勬嫾闊抽瀛楁瘝,涓嶅湪鍒欒皟鐢ㄥ叾瀹冨嚱鏁板鐞�
			arrResult.push(checkCh(ch));
		}
		//澶勭悊arrResult,杩斿洖鎵€鏈夊彲鑳界殑鎷奸煶棣栧瓧姣嶄覆鏁扮粍
		return mkRslt(arrResult);
	}
	function checkCh(ch) {
		var uni = ch.charCodeAt(0);
		//濡傛灉涓嶅湪姹夊瓧澶勭悊鑼冨洿涔嬪唴,杩斿洖鍘熷瓧绗�,涔熷彲浠ヨ皟鐢ㄨ嚜宸辩殑澶勭悊鍑芥暟
		if (uni > 40869 || uni < 19968) {
			return ch;
		}
		//dealWithOthers(ch);
		//妫€鏌ユ槸鍚︽槸澶氶煶瀛�,鏄寜澶氶煶瀛楀鐞�,涓嶆槸灏辩洿鎺ュ湪strChineseFirstPY瀛楃涓蹭腑鎵惧搴旂殑棣栧瓧姣�
		return (oMultiDiff[uni] ? oMultiDiff[uni] : (strChineseFirstPY.charAt(uni - 19968)));
	}
	function mkRslt(arr) {
		var arrRslt = [""];
		for (var i = 0, len = arr.length; i < len; i++) {
			var str = arr[i];
			var strlen = str.length;
			if (strlen == 1) {
				for (var k = 0; k < arrRslt.length; k++) {
					arrRslt[k] += str;
				}
			} else {
				var tmpArr = arrRslt.slice(0);
				arrRslt = [];
				for (k = 0; k < strlen; k++) {
					//澶嶅埗涓€涓浉鍚岀殑arrRslt
					var tmp = tmpArr.slice(0);
					//鎶婂綋鍓嶅瓧绗tr[k]娣诲姞鍒版瘡涓厓绱犳湯灏�
					for (var j = 0; j < tmp.length; j++) {
						tmp[j] += str.charAt(k);
					}
					//鎶婂鍒跺苟淇敼鍚庣殑鏁扮粍杩炴帴鍒癮rrRslt涓�
					arrRslt = arrRslt.concat(tmp);
				}
			}
		}
		return arrRslt;
	}
	//涓ょ鍘荤┖鏍煎嚱鏁�
	String.prototype.trim = function () {
		return this.replace(/(^\s*)|(\s*$)/g, "");
	}
	return getPy;
})();

/**
鏍规嵁鍑虹敓鏃ユ湡鑾峰彇骞撮緞
 */ 
function byage(strBirthday ){
	var returnAge;  
	var strBirthdayArr=strBirthday.split("-");  
        var birthYear = strBirthdayArr[0];  
        var birthMonth = strBirthdayArr[1];  
        var birthDay = strBirthdayArr[2];  
        d = new Date();  
        var nowYear = d.getFullYear();  
	var nowMonth = d.getMonth() + 1;  
	var nowDay = d.getDate();  
	if(nowYear == birthYear){  
	  returnAge = 0;//鍚屽勾 鍒欎负0宀�  
	}  
	else{  
	var ageDiff = nowYear - birthYear ; //骞翠箣宸�  
		if(ageDiff > 0){  
		if(nowMonth == birthMonth) {  
		var dayDiff = nowDay - birthDay;//鏃ヤ箣宸�  
		if(dayDiff < 0)  
		returnAge = ageDiff - 1;  
		else  
		returnAge = ageDiff ;  
		}  
		else  
		{  
		var monthDiff = nowMonth - birthMonth;//鏈堜箣宸�  
		if(monthDiff < 0)  
		returnAge = ageDiff - 1;  
		else  
		returnAge = ageDiff ;  
		}  
		}  
		else  
		returnAge = -1;//杩斿洖-1 琛ㄧず鍑虹敓鏃ユ湡杈撳叆閿欒 鏅氫簬浠婂ぉ  
		}  
		return returnAge;//杩斿洖鍛ㄥ瞾骞撮緞
	}


