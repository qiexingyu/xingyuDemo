$(function() {

	//最新添加内容
	$("#wei").hover(function() {
		$("#jmtWeiBoImg1").css("display", "block");
	}, function() {
		$("#jmtWeiBoImg1").css("display", "none");
	});

	showBanner();// 展示banner图
	getHotList(); // 首页推荐项目
	getLoanHerald(); // 获取项目预告
	getSuccessList(); // 获取成功项目
	getNodeList("hyzx"); // 获取行业咨询
	$("#leftTitle a[iname]").unbind("click").click(function() {
		$("#leftTitle a[iname]").removeClass("cur");
		$(this).addClass("cur");
		getNodeList($("#leftTitle a[iname].cur").attr("iname"));
	});
	getActiveList();// 获取首页活动列表
	getHzhbList(); // 获取首页合作伙伴列表
	getYqljList(); // 获取首页友情链接
});

// 获取首页友情链接
function getYqljList() {
	var yArr = [], yStr = '', l;
	$.ajax({
		url : path + "/banner/getBannerByCode.html",
		type : "post",
		dataType : "json",
		data : {
			"code" : "yqlj"
		},
		success : function(data) {
			l = data.length;
			//yArr.push('友情链接：');
			for ( var i = 0; i < l; i++) {
				yArr.push('<a href="' + data[i]["url"] + '" target="_blank">'
						+ data[i]["title"] + '</a>');
			}
			hStr = yArr.join("");
			$("#yqljList").html(hStr);
		},
		error : function(error) {
			console.log("获取首页友情链接异常");
		}
	});
}
// 获取首页合作伙伴列表
function getHzhbList() {
	var bArr = [], bStr = '', l;
	
			$.ajax({
				url : path + "/banner/getBannerByCode.html",
				type : "post",
				dataType : "json",
				data : {
					"code" : "hzhb"
				},
				success : function(data) {
					l = data.length;
					if (l == 0) {
						bStr = '<li style="padding:15px;color:red;">暂无数据</li>';
						$("#hzhbList").html(bStr);
						return false;
					}
					for ( var i = 0; i < l; i++) {
						bArr.push('<li>');
						if (data[i]["url"]) {
							bArr.push('<a href="' + data[i]["url"]
									+ '" target="_blank">');
							bArr
									.push('<img src="'
											+ cv["fileAddress"]
											+ data[i]["picture"]
											+ '" style="max-height:50px;"/></a></li>');
						} else {
							bArr
									.push('<img src="'
											+ cv["fileAddress"]
											+ data[i]["picture"]
											+ '" style="max-height:50px"/></li>');
						}
					}
					bStr = bArr.join("");
					$("#hzhbList").html(bStr);
				},
				error : function(request) {
					console.log("获取banner图片信息异常");
				}
			});
}
// 获取活动列表
function getActiveList() {
	var hArr = [], hStr = '', l;
	$
			.ajax({
				url : path + "/roadshowActivity/getRoadshowActivity.html",
				type : "post",
				dataType : "json",
				data : {
					"activityStateFlag" : "1",
					"rows" : 5,
					"page" : 1
				},
				success : function(data) {
					if (!data["success"]) {
						hStr = '<li style="padding:15px;color:red;">暂无数据</li>';
						$("#activeList").html(hStr);
						return false;
					}
					data = data["msg"]["rows"], l = data.length;
					if (l == 0) {
						hStr = '<li style="padding:15px;color:red;">暂无数据</li>';
						$("#activeList").html(hStr);
						return false;
					}
					for ( var i = 0; i < l; i++) {
						if (i == 0) {
							hArr
									.push('<div style="overflow:hidden;padding-bottom:20px;border-bottom:1px dashed #777;margin-bottom:10px;">');
							hArr.push('<div class="fl">');
							hArr
									.push('<a  target="_blank" href="'
											+ path
											+ '/common/activityDetail.html?id='
											+ data[i]["id"]
											+ '"><img src="'
											+ cv["fileAddress"]
											+ data[i]["activityPhoto"]
													.split(",")[0]
											+ '" style="width:253px;height:191px;"/></a>');
							hArr.push('</div>');
							hArr.push('<div class="fl txt">');
							hArr.push('<p><a   target="_blank" href="' + path
									+ '/common/activityDetail.html?id='
									+ data[i]["id"] + '">'
									+ data[i]["activityTitle"] + '</a></p>');
							hArr.push('<span class="txt_nr">'
									+ data[i]["activity_des"] + '</span>');
							hArr.push('</div></div>');
							continue;
						}
						hArr.push('<p class="clearfix">');
						hArr.push('<a  target="_blank" class="fl" href="'
								+ path
								+ '/common/activityDetail.html?id='
								+ data[i]["id"]
								+ '">'
								+ data[i]["activityTitle"]
								+ '</a><span class="fr">'
								+ data[i]["activityCreateTime"]
										.substring(0, 10) + '</span>');
						hArr.push('</p>');
					}
					hStr = hArr.join("");
					$("#activeList").html(hStr);
				},
				error : function(error) {
					console.log("获取首页node异常");
				}
			});
}
function getNodeList(nodeType) {
	// 更多按钮赋值Href
	$("#leftMoreA").attr("href",
			path + "/common/newZXList.html?nodeType=" + nodeType);
	var hArr = [], hStr = '', l;
	$
			.ajax({
				url : path + "/node/getPageNode.html",
				type : "post",
				dataType : "json",
				data : {
					"nodeType" : nodeType,
					"rows" : 8,
					"page" : 1
				},
				success : function(data) {
					if (!data["success"]) {
						hStr = '<li style="padding:15px;color:red;">暂无数据</li>';
						$("#indexNodeList").html(hStr);
						return false;
					}
					data = data["msg"]["rows"], l = data.length;
					if (l == 0) {
						hStr = '<li style="padding:15px;color:red;">暂无数据</li>';
						$("#indexNodeList").html(hStr);
						return false;
					}
					for ( var i = 0; i < l; i++) {
						if (i == 0) {
							hArr.push('<h3 ><a target="_blank" href="' + path
									+ '/common/newZXdetail.html?id='
									+ data[i]["id"] + '&nodeType='
									+ data[i]["nodeType"] + '">'
									+ data[i]["title"] + '</a></h3>');
							// hArr.push('<span
							// style="float:right;color:#999;">'+data[i]["createTime"].substring(0,
							// 10)+'</span></h3>');
							hArr
									.push('<p class="p1" style="border-bottom:1px dashed #777;padding-btop:10px;padding-bottom:10px;"><span href="javascript:void(0);" style="display:inline-block;height:50px;overflow:hidden;" title="'
											+ data[i]["description"]
											+ '">'
											+ data[i]["description"]
											+ '</span></p>');

						} else {
							hArr.push('<p class="clearfix">');
							hArr.push('<a  target="_blank" class="fl" href="' + path
									+ '/common/newZXdetail.html?id='
									+ data[i]["id"] + '&nodeType='
									+ data[i]["nodeType"] + '">'
									+ data[i]["title"]
									+ '</a><span class="fr">'
									+ data[i]["createTime"].substring(0, 10)
									+ '</span>');
							hArr.push('</p>');
						}
					}
					hStr = hArr.join("");
					$("#indexNodeList").html(hStr);
				},
				error : function(error) {
					console.log("获取首页node异常");
				}
			});
}
// 展示banner图片效果
function showBanner() {
	$
			.ajax({
				url : path + "/banner/getBannerByCode.html",
				type : "post",
				dataType : "json",
				data : {
					"code" : "index"
				},
				success : function(data) {
					var bArr = [], bStr = '', l = data.length;
					for ( var i = 0; i < l; i++) {
						if (!data[i]["url"]) {
							bArr.push('<li style="background:url('
									+ cv.fileAddress + data[i]["picture"]
									+ ') no-repeat center center;">');
						} else {
							bArr.push('<li>');
							bArr
									.push('<a target="_blank" href ="'
											+ data[i]["url"]
											+ '" target="_blank" style="background:url('
											+ cv.fileAddress
											+ data[i]["picture"]
											+ ') no-repeat center center;display:inline-block;width:100%;height:560px;" alt="'
											+ data[i]["title"] + '">');
							bArr.push('</a>');
						}
						bArr.push('</li>');
					}
					bStr = bArr.join("");

					$("#banner_pig").html(bStr);
					$.focus("#index_pic");// 调用banner幻灯片效果
				},
				error : function(request) {
					console.log("获取banner图片信息异常");
				}
			});
}

/**
 * 获取首页的项目列表 ， 默认loanType为全部 loanProcess : 项目进程 sort: 排序 id: 预加载的html id
 */
function getHotList() {
	var iArr = [], iStr = '', l;
	var remainDays = 0;
	$
			.ajax({
				url : path + "/crowdfunding/getPageCrowdList.html",
				type : "post",
				dataType : "json",
				data : {
					"loanType" : "",
					"loanProcess" : "hot",
					"sort" : "hot",
					"page" : 1,
					"rows" : 6
				},
				success : function(data) {
					if (!data["success"]) {
						iStr = '<li style="color:red;padding:15px;">暂无数据</li>';
						$("#hotList").html(iStr);
						return false;
					}
					data = data["msg"]["rows"], l = data.length;
					if (l == 0) {
						iStr = '<li style="color:red;padding:15px;">暂无数据</li>';
						$("#hotList").html(iStr);
						return false;
					}
					for ( var i = 0; i < l; i++) {
						if (i % 3 == 2) {
							iArr.push('<li style="margin-right:0">');
						} else {
							iArr.push('<li>');
						}
						iArr.push('<div class="img_div">');
						if (data[i]["loanState"] == "preheat") {

							iArr.push('<img src="'
											+ path
											+ '/images/jinmentou/yr.png" class="yrz"/>');

						} else if (data[i]["loanState"] == "funding") {

							iArr.push('<img src="'
											+ path
											+ '/images/jinmentou/zcz.png" class="yrz"/>');

						} else {

							iArr.push('<img src="'
											+ path
											+ '/images/jinmentou/ycg.png" class="yrz"/>');

						}
						// alert();
						// 如果是股权项目，登录后才能进去项目详情
						if (data[i]["loanType"] == "stock") {
							// if(siteUserId == "null"){ //未登录
							// iArr.push('<a href="javascript:go2Login();">');
							// iArr.push('<img
							// src="'+cv["fileAddress"]+data[i]["loanLogo"]+'"
							// style="width:391px;height:300px;border-radius:6px
							// 6px 0 0;"/>');
							// iArr.push('</a>');
							// }else{
							iArr.push('<a href="' + path
									+ '/common/loanDetail-'
									+ data[i]["loanType"] + '.html?loanNo='
									+ data[i]["loanNo"] + '&state='
									+ data[i]["loanState"]
									+ '" target="_blank">');
							iArr.push('<img src="'
											+ cv["fileAddress"]
											+ data[i]["loanLogo"]
											+ '" style="width:391px;height:300px;border-radius:6px 6px 0 0;"/>');
							iArr.push('</a>');

						} else {
							iArr.push('<a href="' + path
									+ '/common/loanDetail-'
									+ data[i]["loanType"] + '.html?loanNo='
									+ data[i]["loanNo"] + '&state='
									+ data[i]["loanState"]
									+ '" target="_blank">');
							iArr.push('<img src="'
											+ cv["fileAddress"]
											+ data[i]["loanLogo"]
											+ '" style="width:391px;height:300px;border-radius:6px 6px 0 0;"/>');
							iArr.push('</a>');
						}

						// iArr.push('<a
						// href="'+path+'/common/loanDetail-'+data[i]["loanType"]+'.html?loanNo='+data[i]["loanNo"]+'&state='+data[i]["loanState"]+'"
						// target="_blank">');
						// iArr.push('<img
						// src="'+cv["fileAddress"]+data[i]["loanLogo"]+'"
						// style="width:391px;height:300px;border-radius:6px 6px
						// 0 0;"/>');
						// iArr.push('</a>');
						// '+data[i]["loanName"]+'
						iArr.push('</div>');
						iArr.push('<div class="cont_div">');
						// 如果是股权项目，登录后才能进去项目详情
						// if(data[i]["loanType"] == "stock"){
						// if(siteUserId == "null"){ //未登录
						// iArr.push('<p><a
						// href="javascript:go2Login();">'+data[i]["loanName"]+'</a></p>');
						// }else{
						iArr.push('<p><a href="' + path + '/common/loanDetail-'
								+ data[i]["loanType"] + '.html?loanNo='
								+ data[i]["loanNo"] + '&state='
								+ data[i]["loanState"]
								+ '" target="_blank"></a></p>');
						// }
						// }else{
						iArr.push('<p><a href="' + path + '/common/loanDetail-'
								+ data[i]["loanType"] + '.html?loanNo='
								+ data[i]["loanNo"] + '&state='
								+ data[i]["loanState"] + '" target="_blank">'
								+ data[i]["loanName"] + '</a></p>');
						// }

						iArr.push('<div class="clearfix">');
						iArr.push('<div class="fl">');
						if (data[i]["loanType"] == "earnings") { // 收益类众筹
							iArr.push('<p>到期时间：'
									+ data[i]["fundEndTime"].substring(0, 10)
									+ '</p>');
						} else {
							iArr.push('<p>剩余时间：30天</p>');
						}
						if (data[i]["fundAmt"] > 10000) {
							iArr.push('<p>筹集目标：<span><em>'
									+ (data[i]["fundAmt"] / 10000).toFixed(2)
									+ '</em>万</span></p>');
						} else {
							iArr.push('<p>筹集目标：<span><em>' + data[i]["fundAmt"]
									+ '</em>元</span></p>');
						}
						if (data[i]["loanType"] == "earnings") { // 收益类众筹
							iArr.push('<p>预期收益：<span><em>'
									+ (data[i]["expectProfit"] * 100)
											.toFixed(0) + '%-'
									+ (data[i]["floatIncone"] * 100).toFixed(0)
									+ '%</em></span></p>');
						} else {
							if (data[i]["approveAmt"] > 10000) {
								iArr.push('<p>已融资：<span><em>'
										+ (data[i]["approveAmt"] / 10000)
												.toFixed(2)
										+ '</em>万</span></p>');
							} else {
								iArr.push('<p>已融资：<span><em>'
										+ data[i]["approveAmt"]
										+ '</em>元</span></p>');
							}
						}
						iArr.push('</div>');
						if (data[i]["supportRatio"] * 100 > 100) {
							iArr.push('<div class="fr per2">');
							iArr.push('<p>' + (data[i]["supportRatio"] * 100)
									+ '</p>');
							iArr.push('<p>项目进度</p>');
							iArr.push('</div>');
						} else {
							iArr
									.push('<p class="col_5 daquan"><font class="cycle_font">'
											+ (data[i]["supportRatio"] * 100)
													.toFixed(0)
											+ '<em style="font-size:22px;">%</em></font></p>');
						}
						iArr.push('</div></div></li>');
					}
					iStr = iArr.join("");
					$("#hotList").html(iStr);
					$("#scriptDiv").html(
							'<script type="text/javascript" src="' + path
									+ '/js/common/cycle.js"></script');
				},
				error : function(error) {
					console.log("获取首页推荐项目异常");
				}
			});
}
// 获取项目预告
function getLoanHerald() {
	var hArr = [], hStr = '', l;
	$
			.ajax({
				url : path + "/node/getPageNode.html",
				type : "post",
				dataType : "json",
				data : {
					"nodeType" : "xmyg",
					"rows" : 4,
					"page" : 1
				},
				success : function(data) {
					if (!data["success"]) {
						hStr = '<li style="padding:15px;color:red;">暂无数据</li>';
						$("#xmygList").html(hStr);
						return false;
					}
					data = data["msg"]["rows"], l = data.length;
					if (l == 0) {
						hStr = '<li style="padding:15px;color:red;">暂无数据</li>';
						$("#xmygList").html(hStr);
						return false;
					}
					for ( var i = 0; i < l; i++) {
						hArr.push('<li class="clearfix">');
						hArr.push('<div class="fl">');
						hArr
								.push('<a  target="_blank" style="display:block;" href="'
										+ path
										+ '/common/newZXdetail.html?id='
										+ data[i]["id"]
										+ '&nodeType='
										+ data[i]["nodeType"]
										+ '"><img src="'
										+ cv["fileAddress"]
										+ data[i]["thumb"]
										+ '" style="width:253px;height:191px;border-radius:6px;"/></a>');
						hArr.push('</div>');
						hArr.push('<div class="fl txt">');
						hArr.push('<p><a  target="_blank" href="' + path
								+ '/common/newZXdetail.html?id='
								+ data[i]["id"] + '&nodeType='
								+ data[i]["nodeType"] + '">' + data[i]["title"]
								+ '</a></p>');
						hArr.push('<span class="txt_nr">'
								+ data[i]["description"] + '</span>');
						hArr.push('</div></li>');
					}
					hStr = hArr.join("");
					$("#xmygList").html(hStr);
				},
				error : function(error) {
					console.log("获取首页项目预告异常");
				}
			});
}
// 获取成功项目
function getSuccessList() {
	var sArr = [], sStr = '', l;
	$
			.ajax({
				url : path + "/crowdfunding/getPageCrowdList.html",
				type : "post",
				dataType : "json",
				data : {
					"loanType" : "",
					"loanProcess" : "vsuccess",
					"sort" : "defaultSort",
					"rows" : 3,
					"page" : 1
				},
				success : function(data) {
					if (!data["success"]) {
						hStr = '<li style="padding:15px;color:red;">暂无数据</li>';
						$("#successList").html(hStr);
						return false;
					}
					data = data["msg"]["rows"], l = data.length;
					if (l == 0) {
						hStr = '<li style="padding:15px;color:red;">暂无数据</li>';
						$("#successList").html(hStr);
						return false;
					}
					for ( var i = 0; i < l; i++) {
						sArr.push('<li>');
						sArr.push('<img src="' + path
								+ '/images/jinmentou/ycg.png" class="yrz"/>');
						sArr.push('<img src="'
										+ cv["fileAddress"]
										+ data[i]["loanLogo"]
										+ '" style="width:391px;height:300px;border-radius:6px;"/>');
						sArr.push('<div class="pop"></div>');
						// sArr.push('<a
						// style="display:block;width:321px;height:300px;"
						// href="'+path+'/common/loanDetail-'+data[i]["loanType"]+'.html?loanNo='+data[i]["loanNo"]+'&state='+data[i]["loanState"]+'"
						// target="_blank">');
						sArr.push('<div class="pop_div cont_div"  >');
						// sArr.push('');
						// sArr.push('<a
						// style="display:block;width:321px;height:300px;"
						// href="'+path+'/common/loanDetail-'+data[i]["loanType"]+'.html?loanNo='+data[i]["loanNo"]+'&state='+data[i]["loanState"]+'"
						// target="_blank">');
						// 如果是股权项目，登录后才能进去项目详情
						if (data[i]["loanType"] == "stock") {
//							if (siteUserId == "null") { // 未登录
//								sArr
//										.push('<p><a href="javascript:go2Login(data[i]["loanType"],data[i]["loanState"]);">'
//												+ data[i]["loanName"]
//												+ '</a></p>');
//							} else {
								sArr.push('<p><a  target="_blank" href="' + path
										+ '/common/loanDetail-'
										+ data[i]["loanType"] + '.html?loanNo='
										+ data[i]["loanNo"] + '&state='
										+ data[i]["loanState"]
										+ '" target="_blank">'
										+ data[i]["loanName"] + '</a></p>');
//							}
						} 
						else {
							sArr.push('<p><a target="_blank" href="' + path
									+ '/common/loanDetail-'
									+ data[i]["loanType"] + '.html?loanNo='
									+ data[i]["loanNo"] + '&state='
									+ data[i]["loanState"]
									+ '" target="_blank">'
									+ data[i]["loanName"] + '</a></p>');
						}

						sArr.push('<div class="clearfix">');
						sArr.push('<div class="fl">');
						if (data[i]["loanType"] == "earnings") { // 收益类项目
							sArr.push('<p>到期时间：'
									+ data[i]["fundEndTime"].substring(0, 10)
									+ '</p>');
						} else {
							sArr.push('<p>剩余时间：0天</p>');
						}
						if (data[i]["fundAmt"] > 10000) {
							sArr.push('<p>筹集目标：<span><em>'
									+ (data[i]["fundAmt"] / 10000).toFixed(2)
									+ '</em>万</span></p>');
						} else {
							sArr.push('<p>筹集目标：<span><em>' + data[i]["fundAmt"]
									+ '</em>元</span></p>');
						}
						if (data[i]["loanType"] == "earnings") { // 收益类众筹
							sArr.push('<p>预期收益：<span><em>'
									+ (data[i]["expectProfit"] * 100)
											.toFixed(0) + '%-'
									+ (data[i]["floatIncone"] * 100).toFixed(0)
									+ '%</em></span></p>');
						} else {
							if (data[i]["approveAmt"] > 10000) {
								sArr.push('<p>已融资：<span><em>'
										+ (data[i]["approveAmt"] / 10000)
												.toFixed(2)
										+ '</em>万</span></p>');
							} else {
								sArr.push('<p>已融资：<span><em>'
										+ data[i]["approveAmt"]
										+ '</em>元</span></p>');
							}
						}
						sArr.push('</div>');
						if (data[i]["supportRatio"] * 100 > 100) {
							sArr.push('<div class="fr per2">');
							sArr.push('<p>' + data[i]["supportRatio"] * 100
									+ '</p>');
							sArr.push('<p>项目进度</p>');
							sArr.push('</div>');
						} else {
							sArr
									.push('<p class="col_5 daquan"><font class="cycle_font" style="+margin-top:50px;">'
											+ ((data[i]["supportRatio"] * 100)
													.toFixed(0))
											+ '<em style="font-size:22px;color:#E60B11;">%</em></font></p>');
						}
						sArr.push('</div>></div></li>');
					}
					sStr = sArr.join("");
					$("#successList").html(sStr);
					$("#scriptDiv")
							.html(
									'<script type="text/javascript" src="'
											+ path
											+ '/js/common/raphael.js"></script><script type="text/javascript" src="'
											+ path
											+ '/js/common/cycle.js"></script>');
					// 显示遮盖曾和项目内容

					$("#successList li").mouseover(function() {
						$(this).children("div.pop").show();
						$(this).children("div.pop_div").show();
						var _this = $(this);
						_this.children("div.pop_div").mouseout(function() {
							$(this).hide();
							_this.children("div.pop").hide();
						});
					});
				},
				error : function(error) {
					console.log("获取成功项目异常");
				}
			});
}
