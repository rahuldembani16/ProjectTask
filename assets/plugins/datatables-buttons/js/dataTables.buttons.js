!function(t){"function"==typeof define&&define.amd?define(["jquery","datatables.net"],function(n){return t(n,window,document)}):"object"==typeof exports?module.exports=function(n,e){return n||(n=window),e&&e.fn.dataTable||(e=require("datatables.net")(n,e).$),t(e,n,n.document)}:t(jQuery,window,document)}(function(t,n,e,o){"use strict";var i=t.fn.dataTable,s=0,r=0,a=i.ext.buttons,u=function(n,e){e===!0&&(e={}),t.isArray(e)&&(e={buttons:e}),this.c=t.extend(!0,{},u.defaults,e),e.buttons&&(this.c.buttons=e.buttons),this.s={dt:new i.Api(n),buttons:[],listenKeys:"",namespace:"dtb"+s++},this.dom={container:t("<"+this.c.dom.container.tag+"/>").addClass(this.c.dom.container.className)},this._constructor()};t.extend(u.prototype,{action:function(t,n){var e=this._nodeToButton(t);return n===o?e.conf.action:(e.conf.action=n,this)},active:function(n,e){var i=this._nodeToButton(n),s=this.c.dom.button.active,r=t(i.node);return e===o?r.hasClass(s):(r.toggleClass(s,e===o||e),this)},add:function(t,n){var e=this.s.buttons;if("string"==typeof n){for(var o=n.split("-"),i=this.s,s=0,r=o.length-1;s<r;s++)i=i.buttons[1*o[s]];e=i.buttons,n=1*o[o.length-1]}return this._expandButton(e,t,!1,n),this._draw(),this},container:function(){return this.dom.container},disable:function(n){var e=this._nodeToButton(n);return t(e.node).addClass(this.c.dom.button.disabled),this},destroy:function(){t("body").off("keyup."+this.s.namespace);var n,e,o=this.s.buttons.slice();for(n=0,e=o.length;n<e;n++)this.remove(o[n].node);this.dom.container.remove();var i=this.s.dt.settings()[0];for(n=0,e=i.length;n<e;n++)if(i.inst===this){i.splice(n,1);break}return this},enable:function(n,e){if(e===!1)return this.disable(n);var o=this._nodeToButton(n);return t(o.node).removeClass(this.c.dom.button.disabled),this},name:function(){return this.c.name},node:function(n){var e=this._nodeToButton(n);return t(e.node)},remove:function(n){var e=this._nodeToButton(n),o=this._nodeToHost(n),i=this.s.dt;if(e.buttons.length)for(var s=e.buttons.length-1;s>=0;s--)this.remove(e.buttons[s].node);e.conf.destroy&&e.conf.destroy.call(i.button(n),i,t(n),e.conf),this._removeKey(e.conf),t(e.node).remove();var r=t.inArray(e,o);return o.splice(r,1),this},text:function(n,e){var i=this._nodeToButton(n),s=this.c.dom.collection.buttonLiner,r=i.inCollection&&s&&s.tag?s.tag:this.c.dom.buttonLiner.tag,a=this.s.dt,u=t(i.node),c=function(t){return"function"==typeof t?t(a,u,i.conf):t};return e===o?c(i.conf.text):(i.conf.text=e,r?u.children(r).html(c(e)):u.html(c(e)),this)},_constructor:function(){var n=this,o=this.s.dt,i=o.settings()[0],s=this.c.buttons;i._buttons||(i._buttons=[]),i._buttons.push({inst:this,name:this.c.name});for(var r=0,a=s.length;r<a;r++)this.add(s[r]);o.on("destroy",function(){n.destroy()}),t("body").on("keyup."+this.s.namespace,function(t){if(!e.activeElement||e.activeElement===e.body){var o=String.fromCharCode(t.keyCode).toLowerCase();n.s.listenKeys.toLowerCase().indexOf(o)!==-1&&n._keypress(o,t)}})},_addKey:function(n){n.key&&(this.s.listenKeys+=t.isPlainObject(n.key)?n.key.key:n.key)},_draw:function(t,n){t||(t=this.dom.container,n=this.s.buttons),t.children().detach();for(var e=0,o=n.length;e<o;e++)t.append(n[e].inserter),n[e].buttons&&n[e].buttons.length&&this._draw(n[e].collection,n[e].buttons)},_expandButton:function(n,e,i,s){for(var r=this.s.dt,a=0,u=t.isArray(e)?e:[e],c=0,l=u.length;c<l;c++){var d=this._resolveExtends(u[c]);if(d)if(t.isArray(d))this._expandButton(n,d,i,s);else{var f=this._buildButton(d,i);if(f){if(s!==o?(n.splice(s,0,f),s++):n.push(f),f.conf.buttons){var h=this.c.dom.collection;f.collection=t("<"+h.tag+"/>").addClass(h.className),f.conf._collection=f.collection,this._expandButton(f.buttons,f.conf.buttons,!0,s)}d.init&&d.init.call(r.button(f.node),r,t(f.node),d),a++}}}},_buildButton:function(n,e){var o=this.c.dom.button,i=this.c.dom.buttonLiner,s=this.c.dom.collection,a=this.s.dt,u=function(t){return"function"==typeof t?t(a,l,n):t};if(e&&s.button&&(o=s.button),e&&s.buttonLiner&&(i=s.buttonLiner),n.available&&!n.available(a,n))return!1;var c=function(n,e,o,i){i.action.call(e.button(o),n,e,o,i),t(e.table().node()).triggerHandler("buttons-action.dt",[e.button(o),e,o,i])},l=t("<"+o.tag+"/>").addClass(o.className).attr("tabindex",this.s.dt.settings()[0].iTabIndex).attr("aria-controls",this.s.dt.table().node().id).on("click.dtb",function(t){t.preventDefault(),!l.hasClass(o.disabled)&&n.action&&c(t,a,l,n),l.blur()}).on("keyup.dtb",function(t){13===t.keyCode&&!l.hasClass(o.disabled)&&n.action&&c(t,a,l,n)});if("a"===o.tag.toLowerCase()&&l.attr("href","#"),i.tag){var d=t("<"+i.tag+"/>").html(u(n.text)).addClass(i.className);"a"===i.tag.toLowerCase()&&d.attr("href","#"),l.append(d)}else l.html(u(n.text));n.enabled===!1&&l.addClass(o.disabled),n.className&&l.addClass(n.className),n.titleAttr&&l.attr("title",n.titleAttr),n.namespace||(n.namespace=".dt-button-"+r++);var f,h=this.c.dom.buttonContainer;return f=h&&h.tag?t("<"+h.tag+"/>").addClass(h.className).append(l):l,this._addKey(n),{conf:n,node:l.get(0),inserter:f,buttons:[],inCollection:e,collection:null}},_nodeToButton:function(t,n){n||(n=this.s.buttons);for(var e=0,o=n.length;e<o;e++){if(n[e].node===t)return n[e];if(n[e].buttons.length){var i=this._nodeToButton(t,n[e].buttons);if(i)return i}}},_nodeToHost:function(t,n){n||(n=this.s.buttons);for(var e=0,o=n.length;e<o;e++){if(n[e].node===t)return n;if(n[e].buttons.length){var i=this._nodeToHost(t,n[e].buttons);if(i)return i}}},_keypress:function(n,e){var o=function(o,i){if(o.key)if(o.key===n)t(i).click();else if(t.isPlainObject(o.key)){if(o.key.key!==n)return;if(o.key.shiftKey&&!e.shiftKey)return;if(o.key.altKey&&!e.altKey)return;if(o.key.ctrlKey&&!e.ctrlKey)return;if(o.key.metaKey&&!e.metaKey)return;t(i).click()}},i=function(t){for(var n=0,e=t.length;n<e;n++)o(t[n].conf,t[n].node),t[n].buttons.length&&i(t[n].buttons)};i(this.s.buttons)},_removeKey:function(n){if(n.key){var e=t.isPlainObject(n.key)?n.key.key:n.key,o=this.s.listenKeys.split(""),i=t.inArray(e,o);o.splice(i,1),this.s.listenKeys=o.join("")}},_resolveExtends:function(n){var e,i,s=this.s.dt,r=function(e){for(var i=0;!t.isPlainObject(e)&&!t.isArray(e);){if(e===o)return;if("function"==typeof e){if(e=e(s,n),!e)return!1}else if("string"==typeof e){if(!a[e])throw"Unknown button type: "+e;e=a[e]}if(i++,i>30)throw"Buttons: Too many iterations"}return t.isArray(e)?e:t.extend({},e)};for(n=r(n);n&&n.extend;){if(!a[n.extend])throw"Cannot extend unknown button type: "+n.extend;var u=r(a[n.extend]);if(t.isArray(u))return u;if(!u)return!1;var c=u.className;n=t.extend({},u,n),c&&n.className!==c&&(n.className=c+" "+n.className);var l=n.postfixButtons;if(l){for(n.buttons||(n.buttons=[]),e=0,i=l.length;e<i;e++)n.buttons.push(l[e]);n.postfixButtons=null}var d=n.prefixButtons;if(d){for(n.buttons||(n.buttons=[]),e=0,i=d.length;e<i;e++)n.buttons.splice(e,0,d[e]);n.prefixButtons=null}n.extend=u.extend}return n}}),u.background=function(n,e,i){i===o&&(i=400),n?t("<div/>").addClass(e).css("display","none").appendTo("body").fadeIn(i):t("body > div."+e).fadeOut(i,function(){t(this).removeClass(e).remove()})},u.instanceSelector=function(n,e){if(!n)return t.map(e,function(t){return t.inst});var o=[],i=t.map(e,function(t){return t.name}),s=function(n){if(t.isArray(n))for(var r=0,a=n.length;r<a;r++)s(n[r]);else if("string"==typeof n)if(n.indexOf(",")!==-1)s(n.split(","));else{var u=t.inArray(t.trim(n),i);u!==-1&&o.push(e[u].inst)}else"number"==typeof n&&o.push(e[n].inst)};return s(n),o},u.buttonSelector=function(n,e){for(var i=[],s=function(t,n,e){for(var i,r,a=0,u=n.length;a<u;a++)i=n[a],i&&(r=e!==o?e+a:a+"",t.push({node:i.node,name:i.conf.name,idx:r}),i.buttons&&s(t,i.buttons,r+"-"))},r=function(n,e){var a,u,c=[];s(c,e.s.buttons);var l=t.map(c,function(t){return t.node});if(t.isArray(n)||n instanceof t)for(a=0,u=n.length;a<u;a++)r(n[a],e);else if(null===n||n===o||"*"===n)for(a=0,u=c.length;a<u;a++)i.push({inst:e,node:c[a].node});else if("number"==typeof n)i.push({inst:e,node:e.s.buttons[n].node});else if("string"==typeof n)if(n.indexOf(",")!==-1){var d=n.split(",");for(a=0,u=d.length;a<u;a++)r(t.trim(d[a]),e)}else if(n.match(/^\d+(\-\d+)*$/)){var f=t.map(c,function(t){return t.idx});i.push({inst:e,node:c[t.inArray(n,f)].node})}else if(n.indexOf(":name")!==-1){var h=n.replace(":name","");for(a=0,u=c.length;a<u;a++)c[a].name===h&&i.push({inst:e,node:c[a].node})}else t(l).filter(n).each(function(){i.push({inst:e,node:this})});else if("object"==typeof n&&n.nodeName){var b=t.inArray(n,l);b!==-1&&i.push({inst:e,node:l[b]})}},a=0,u=n.length;a<u;a++){var c=n[a];r(e,c)}return i},u.defaults={buttons:["copy","excel","csv","pdf","print"],name:"main",tabIndex:0,dom:{container:{tag:"div",className:"dt-buttons"},collection:{tag:"div",className:"dt-button-collection"},button:{tag:"a",className:"dt-button",active:"active",disabled:"disabled"},buttonLiner:{tag:"span",className:""}}},u.version="1.2.2",t.extend(a,{collection:{text:function(t){return t.i18n("buttons.collection","Collection")},className:"buttons-collection",action:function(e,o,i,s){var r=i,a=r.offset(),c=t(o.table().container()),l=!1;t("div.dt-button-background").length&&(l=t("div.dt-button-collection").offset(),t("body").trigger("click.dtb-collection")),s._collection.addClass(s.collectionLayout).css("display","none").appendTo("body").fadeIn(s.fade);var d=s._collection.css("position");if(l&&"absolute"===d)s._collection.css({top:l.top+5,left:l.left+5});else if("absolute"===d){s._collection.css({top:a.top+r.outerHeight(),left:a.left});var f=a.left+s._collection.outerWidth(),h=c.offset().left+c.width();f>h&&s._collection.css("left",a.left-(f-h))}else{var b=s._collection.height()/2;b>t(n).height()/2&&(b=t(n).height()/2),s._collection.css("marginTop",b*-1)}s.background&&u.background(!0,s.backgroundClassName,s.fade),setTimeout(function(){t("div.dt-button-background").on("click.dtb-collection",function(){}),t("body").on("click.dtb-collection",function(n){var e=t.fn.addBack?"addBack":"andSelf";t(n.target).parents()[e]().filter(s._collection).length||(s._collection.fadeOut(s.fade,function(){s._collection.detach()}),t("div.dt-button-background").off("click.dtb-collection"),u.background(!1,s.backgroundClassName,s.fade),t("body").off("click.dtb-collection"),o.off("buttons-action.b-internal"))})},10),s.autoClose&&o.on("buttons-action.b-internal",function(){t("div.dt-button-background").click()})},background:!0,collectionLayout:"",backgroundClassName:"dt-button-background",autoClose:!1,fade:400},copy:function(t,n){return a.copyHtml5?"copyHtml5":a.copyFlash&&a.copyFlash.available(t,n)?"copyFlash":void 0},csv:function(t,n){return a.csvHtml5&&a.csvHtml5.available(t,n)?"csvHtml5":a.csvFlash&&a.csvFlash.available(t,n)?"csvFlash":void 0},excel:function(t,n){return a.excelHtml5&&a.excelHtml5.available(t,n)?"excelHtml5":a.excelFlash&&a.excelFlash.available(t,n)?"excelFlash":void 0},pdf:function(t,n){return a.pdfHtml5&&a.pdfHtml5.available(t,n)?"pdfHtml5":a.pdfFlash&&a.pdfFlash.available(t,n)?"pdfFlash":void 0},pageLength:function(n){var e=n.settings()[0].aLengthMenu,o=t.isArray(e[0])?e[0]:e,i=t.isArray(e[0])?e[1]:e,s=function(t){return t.i18n("buttons.pageLength",{"-1":"Show all rows",_:"Show %d rows"},t.page.len())};return{extend:"collection",text:s,className:"buttons-page-length",autoClose:!0,buttons:t.map(o,function(t,n){return{text:i[n],action:function(n,e){e.page.len(t).draw()},init:function(n,e,o){var i=this,s=function(){i.active(n.page.len()===t)};n.on("length.dt"+o.namespace,s),s()},destroy:function(t,n,e){t.off("length.dt"+e.namespace)}}}),init:function(t,n,e){var o=this;t.on("length.dt"+e.namespace,function(){o.text(s(t))})},destroy:function(t,n,e){t.off("length.dt"+e.namespace)}}}}),i.Api.register("buttons()",function(t,n){n===o&&(n=t,t=o),this.selector.buttonGroup=t;var e=this.iterator(!0,"table",function(e){if(e._buttons)return u.buttonSelector(u.instanceSelector(t,e._buttons),n)},!0);return e._groupSelector=t,e}),i.Api.register("button()",function(t,n){var e=this.buttons(t,n);return e.length>1&&e.splice(1,e.length),e}),i.Api.registerPlural("buttons().active()","button().active()",function(t){return t===o?this.map(function(t){return t.inst.active(t.node)}):this.each(function(n){n.inst.active(n.node,t)})}),i.Api.registerPlural("buttons().action()","button().action()",function(t){return t===o?this.map(function(t){return t.inst.action(t.node)}):this.each(function(n){n.inst.action(n.node,t)})}),i.Api.register(["buttons().enable()","button().enable()"],function(t){return this.each(function(n){n.inst.enable(n.node,t)})}),i.Api.register(["buttons().disable()","button().disable()"],function(){return this.each(function(t){t.inst.disable(t.node)})}),i.Api.registerPlural("buttons().nodes()","button().node()",function(){var n=t();return t(this.each(function(t){n=n.add(t.inst.node(t.node))})),n}),i.Api.registerPlural("buttons().text()","button().text()",function(t){return t===o?this.map(function(t){return t.inst.text(t.node)}):this.each(function(n){n.inst.text(n.node,t)})}),i.Api.registerPlural("buttons().trigger()","button().trigger()",function(){return this.each(function(t){t.inst.node(t.node).trigger("click")})}),i.Api.registerPlural("buttons().containers()","buttons().container()",function(){var n=t(),e=this._groupSelector;return this.iterator(!0,"table",function(t){if(t._buttons)for(var o=u.instanceSelector(e,t._buttons),i=0,s=o.length;i<s;i++)n=n.add(o[i].container())}),n}),i.Api.register("button().add()",function(t,n){var e=this.context;if(e.length){var o=u.instanceSelector(this._groupSelector,e[0]._buttons);o.length&&o[0].add(n,t)}return this.button(this._groupSelector,t)}),i.Api.register("buttons().destroy()",function(){return this.pluck("inst").unique().each(function(t){t.destroy()}),this}),i.Api.registerPlural("buttons().remove()","buttons().remove()",function(){return this.each(function(t){t.inst.remove(t.node)}),this});var c;i.Api.register("buttons.info()",function(n,e,i){var s=this;return n===!1?(t("#datatables_buttons_info").fadeOut(function(){t(this).remove()}),clearTimeout(c),c=null,this):(c&&clearTimeout(c),t("#datatables_buttons_info").length&&t("#datatables_buttons_info").remove(),n=n?"<h2>"+n+"</h2>":"",t('<div id="datatables_buttons_info" class="dt-button-info"/>').html(n).append(t("<div/>")["string"==typeof e?"html":"append"](e)).css("display","none").appendTo("body").fadeIn(),i!==o&&0!==i&&(c=setTimeout(function(){s.buttons.info(!1)},i)),this)}),i.Api.register("buttons.exportData()",function(t){if(this.context.length)return d(new i.Api(this.context[0]),t)});var l=t("<textarea/>")[0],d=function(n,e){for(var o=t.extend(!0,{},{rows:null,columns:"",modifier:{search:"applied",order:"applied"},orthogonal:"display",stripHtml:!0,stripNewlines:!0,decodeEntities:!0,trim:!0,format:{header:function(t){return i(t)},footer:function(t){return i(t)},body:function(t){return i(t)}}},e),i=function(t){return"string"!=typeof t?t:(o.stripHtml&&(t=t.replace(/<[^>]*>/g,"")),o.trim&&(t=t.replace(/^\s+|\s+$/g,"")),o.stripNewlines&&(t=t.replace(/\n/g," ")),o.decodeEntities&&(l.innerHTML=t,t=l.value),t)},s=n.columns(o.columns).indexes().map(function(t){var e=n.column(t).header();return o.format.header(e.innerHTML,t,e)}).toArray(),r=n.table().footer()?n.columns(o.columns).indexes().map(function(t){var e=n.column(t).footer();return o.format.footer(e?e.innerHTML:"",t,e)}).toArray():null,a=n.rows(o.rows,o.modifier).indexes().toArray(),u=n.cells(a,o.columns).render(o.orthogonal).toArray(),c=n.cells(a,o.columns).nodes().toArray(),d=s.length,f=d>0?u.length/d:0,h=new Array(f),b=0,p=0,m=f;p<m;p++){for(var v=new Array(d),g=0;g<d;g++)v[g]=o.format.body(u[b],p,g,c[b]),b++;h[p]=v}return{header:s,footer:r,body:h}};return t.fn.dataTable.Buttons=u,t.fn.DataTable.Buttons=u,t(e).on("init.dt plugin-init.dt",function(t,n){if("dt"===t.namespace){var e=n.oInit.buttons||i.defaults.buttons;e&&!n._buttons&&new u(n,e).container()}}),i.ext.feature.push({fnInit:function(t){var n=new i.Api(t),e=n.init().buttons||i.defaults.buttons;return new u(n,e).container()},cFeature:"B"}),u});