!function(t){"function"==typeof define&&define.amd?define(["jquery","datatables.net","datatables.net-buttons"],function(e){return t(e,window,document)}):"object"==typeof exports?module.exports=function(e,n){return e||(e=window),n&&n.fn.dataTable||(n=require("datatables.net")(e,n).$),n.fn.dataTable.Buttons||require("datatables.net-buttons")(e,n),t(n,e,e.document)}:t(jQuery,window,document)}(function(t,e,n,o){"use strict";var a=t.fn.dataTable,r=n.createElement("a"),i=function(e){var n,o=t(e).clone()[0];return"link"===o.nodeName.toLowerCase()&&(r.href=o.href,n=r.host,n.indexOf("/")===-1&&0!==r.pathname.indexOf("/")&&(n+="/"),o.href=r.protocol+"//"+n+r.pathname+r.search),o.outerHTML};return a.ext.buttons.print={className:"buttons-print",text:function(t){return t.i18n("buttons.print","Print")},action:function(n,o,a,r){var u=o.buttons.exportData(r.exportOptions),s=function(t,e){for(var n="<tr>",o=0,a=t.length;o<a;o++)n+="<"+e+">"+t[o]+"</"+e+">";return n+"</tr>"},d='<table class="'+o.table().node().className+'">';r.header&&(d+="<thead>"+s(u.header,"th")+"</thead>"),d+="<tbody>";for(var c=0,f=u.body.length;c<f;c++)d+=s(u.body[c],"td");d+="</tbody>",r.footer&&u.footer&&(d+="<tfoot>"+s(u.footer,"th")+"</tfoot>");var l=e.open("",""),h=r.title;"function"==typeof h&&(h=h()),h.indexOf("*")!==-1&&(h=h.replace("*",t("title").text())),l.document.close();var m="<title>"+h+"</title>";t("style, link").each(function(){m+=i(this)});try{l.document.head.innerHTML=m}catch(e){t(l.document.head).html(m)}l.document.body.innerHTML="<h1>"+h+"</h1><div>"+("function"==typeof r.message?r.message(o,a,r):r.message)+"</div>"+d,r.customize&&r.customize(l),setTimeout(function(){r.autoPrint&&(l.print(),l.close())},250)},title:"*",message:"",exportOptions:{},header:!0,footer:!1,autoPrint:!0,customize:null},a.Buttons});