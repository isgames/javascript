/* Download by http://www.codefans.net*/
(function(){var _location=window.location.href;var regex=/([^.]+)\.(?:com|net)\/?.*$/i;var homePath='http://news.1616.net/';if(regex.test(_location)&&(RegExp.$1.indexOf('1616')==-1)){var _path=RegExp.$1,homePath='http://www.'+_path+'.com';document.title=document.title.replace('1616',_path);$('#logo').attr('href','http://www.'+_path+'.com/').html('<img alt="返回首页" src="http://www.'+_path+'.com/img/logo.gif" />');$('#adviceHref').hide();$('#homeHref, #pathl>a').attr('href','http://www.'+_path+'.com');if(!document.all){$('#pathr > a:eq(0)').hide();}}
$('#logo,#pathr').show();$('#pathr > a:eq(0)').click(function(){J1616.Util.setHome(this,homePath)});})();J1616.news={currCity:"北京",currDate:null,load:function(dateFolder){var _this=this,ac=J1616.Util.getQueryString("ac");ac=ac?ac:"qb";$("#news_title").html($("#nav_"+ac.toLocaleLowerCase()).text().replace("{channel}",_this.currCity));$("#nav_kj").text(_this.currCity+"新闻");var news_date="今天";if(this.currDate.toLocaleDateString()!=(new Date()).toLocaleDateString()){news_date=this.currDate.toLocaleDateString();}
$("#news_date").html(news_date);$("#nav_"+ac.toLocaleLowerCase()).addClass("currently");$("#text_news").html("<div class='loading'>正在载入新闻数据……</div>");var todayFolder=_this._makePath(new Date());$.ajax({url:"http://news.1616.net/grab/news/"+dateFolder+"/"+_makeFile(ac)+".js",dataType:"script",cache:true,success:function(){var timer=setInterval(function(){if(typeof J1616_news_data!='undefined'){todayFolder==dateFolder&&typeof _this.todayHotKeyData=='undefined'&&(_this.todayHotKeyData=J1616_news_data.hotKey);_showTextList(J1616_news_data.textList);_showImgList(J1616_news_data.imgList);todayFolder==dateFolder&&_showHotKey(J1616_news_data.hotKey);_showPage();clearInterval(timer,timer=null);}},500);},error:function(){$("#text_news").html("<div class='loading'>未找到相关新闻</div>");$("#pic_zq").hide();$("#pic_news").hide();}});function _makeFile(ac){var re=ac;if(ac.toString().toLocaleLowerCase()=="kj"){re=encodeURIComponent(encodeURIComponent(_this.currCity));}
return re;}
function _showPage(){if(_this.currDate.toLocaleDateString()==(new Date()).toLocaleDateString()){$(".next").hide();$(".today").hide();}else{$(".next").show();$(".today").show();}}
function _createLimit(pages,N,list){var html=['<a class="pagePrav '+(!N[0]?'pagenum-n':'')+'" href="#">上一页</a>'];for(var i=0;i<N[1];i++){html.push('<a'+(N[0]==i?' class="pagenum-h"':'')+' href="#">'+(i+1)+'</a>');}
html.push('<a class="pageNext '+(N[1]==N[0]+1?'pagenum-n':'')+'" href="#">下一页</a>');pages.html(html.join('')).data('N',N);$('a',pages).each(function(i){$(this).click(function(){var jt=$(this);if(jt.hasClass('pagenum-n')||jt.hasClass('pagenum-h')){return false;}else if(jt.hasClass('pagePrav')){N[0]=N[0]-1;_showTextList(list,N);}else if(jt.hasClass('pageNext')){N[0]=N[0]+1;_showTextList(list,N);}else{N[0]=i-1;_showTextList(list,N);}
return false;});});}
function _showTextList(list){if(!list.length)return;if(typeof arguments[1]!='undefined'){var N=arguments[1];var pages=$('div.pages p.pagenum');_createLimit(pages,N,list);}else{$('div.pages p.pagenum').remove();var N=[0,0,20];N[1]=Math.ceil(list.length/N[2]);if(N[1]>1){var pages=$('<p class="pagenum"></p>').prependTo('div.pages');_createLimit(pages,N,list);}}
var html=["<ul>"],s=[];for(var i=0,j=N[0]*N[2],lt;(lt=list[j])&&j<(N[0]+1)*N[2];i++,j++){s.length=0;if(ac.toLocaleLowerCase()=="qb"){s[0]="<li><a href='"+lt[1]+"' target='_blank' title=\""+lt[0]+"\">"+lt[0]+"</a> <span class='ns_t08'>"+lt[2]+"</span> <span class='incat ns_t08'>[<a class='ns_t01' href='?ac="+lt[3][1]+"'>"+lt[3][0]+"</a>]</span></li>";if(i!=(list.length-1))
s[1]=((i+1)%5==0?"</ul><ul>":"");}
else{s[0]="<li><a href='"+lt[1]+"' target='_blank' title=\""+lt[0]+"\">"+lt[0]+"</a> <span class='ns_t08'>"+lt[2]+"</span></li>";if(i!=(list.length-1))
s[1]=((i+1)%5==0?"</ul><ul>":"");}
html[html.length]=s.join("");}
html[html.length]="</ul>";$("#text_news").html(html.join(""));$('#text_news a').each(function(){$(this).html()=='热点'&&$(this).attr('href','#');});}
function _showImgList(list){var cjImgs=["http://image.sinajs.cn/newchart/small/nsh000001.gif","http://image.sinajs.cn/newchart/small/nsz399001.gif","http://image.sinajs.cn/newchart/small/nsh000300.gif"];var cjUrls=["http://finance.sina.com.cn/realstock/company/sh000001/nc.shtml","http://finance.sina.com.cn/realstock/company/sz399001/nc.shtml","http://finance.sina.com.cn/realstock/company/sh000300/nc.shtml"];var imgPrefix="http://news.1616.net/grab/news/"+dateFolder;if(ac.toLowerCase()!="cj"){if(!list.length)return;$("#pic_zq").hide();$("#pic_news").show();$("#pic_news li").each(function(i){$(this).find('a').attr('href',list[i][1]).eq(1).text(list[i][0]);$(this).find('img').attr({"src":imgPrefix+list[i][2],"alt":list[i][0]});});}else{$("#pic_zq").show();$("#pic_news").hide();(function(){var callee=arguments.callee;$.ajax({url:"http://hq.sinajs.cn/list=s_sh000001,s_sz399001,s_sh000300",dataType:"script",cache:true,success:function(){try{var listA=[hq_str_s_sh000001.split(","),hq_str_s_sz399001.split(","),hq_str_s_sh000300.split(",")];$('#pic_zq li').each(function(i){$(this).find('em:eq(0)').html(listA[i][1]);__makeColor($(this),listA[i]);$(this).find('img').attr('src',cjImgs[i]+"?_="+J1616.getRandom(1,1000));$(this).find('a').attr('href',cjUrls[i]);});}catch(e){}
finally{setTimeout(callee,5000);}}});})();}
function __makeColor(_t,s){var em1=_t.find('em:eq(1)'),em2=_t.find('em:eq(2)');if(parseFloat(s[3])>0){em1.css('color','red').html(s[2]);em2.css('color','red').html(s[3]+'%');}else{em1.css('color','green').html(s[2]);em2.css('color','green').html(s[3]+'%');}}}
function _showHotKey(list){if(!list.length)return;var html=[];for(var i=0;i<10;i++){html[i]="<li><a href ="+list[i][1]+" target=\"_blank\">"+list[i][0]+"</a></li>";}
$("#hotkeywords").html(html.join(""));}},_makePath:function(date){var year,month,day;year=date.getFullYear();month=date.getMonth()+1>=10?""+(date.getMonth()+1):"0"+(date.getMonth()+1);day=date.getDate()>=10?""+date.getDate():"0"+date.getDate();return year+"/"+month+day;},bindEvents:function(){var _this=this;$(".prev").click(function(){_this.currDate.setDate(_this.currDate.getDate()-1);_this.load(_this._makePath(_this.currDate));});$(".next").click(function(){_this.currDate.setDate(_this.currDate.getDate()+1);_this.load(_this._makePath(_this.currDate));});$(".today").click(function(){_this.currDate=new Date();_this.load(_this._makePath(_this.currDate));});$("a").live("mousedown",function(e){referrer(this);});},init:function(){var _this=this,c=J1616.Util.getCookie("city");if(document.all){try{document.execCommand("BackgroundImageCache",false,true);}catch(e){}}
_this.currDate=new Date();if(c&&c!="undefined"){c=c.split("_");if(c.length>2){if(c[2]!="Z 直辖市"&&c[2]!="直辖市"){_this.currCity=c[2].replace(/[A-Z\s]/,"");}else{_this.currCity=c[0]!=c[1]?c[0].replace(c[1],""):c[0];}}}
else{$.getScript("http://chaxun.1616.net/iptolocal.php",function(){_this.currCity=WData[1];});}
_this.load(_this._makePath(_this.currDate));_this.bindEvents();}};J1616.news.init();