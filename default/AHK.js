var g_bDOMloaded=0
	,g_AHKtimer;

$(document).ready(function() {
	g_bDOMloaded=1;
	if(isAHK())
		g_AHKtimer=setTimeout(function() {
			try {
				AHKsys.DomLoaded();
			} catch(e) {
				return
			} clearTimeout(g_AHKtimer);
		},100);
	else DOMready()
});







function AHKinit(methods) {
	if(isIE()) {
		if(methods)
			methods=JSON.parse(methods);
		else methods=[];
		window.AHK={};
		for(var i = methods.length - 1; i >= 0; i--)
			AHK[methods[i]]=bindFunction(methods[i]);
		if(isNaN(i))
			AHK=bindFunction("");
	}



		window.AHKobject={};
		AHKobject.binds=[];
		AHKobject.events=[];
		AHKobject.dragEnabled=0;
		AHKobject.contextmenuEnabled=0;

		window.AHKerror=function(err){
			try {
				AHK.on_error('js',err);
			} catch(e) {
				log(err)
			}
		};





	$(document).bind('selectstart dragstart', function(e) {
		if(AHKobject.dragEnabled)
			return true;
		e.preventDefault();
		return false;
	});

	$(document).bind('contextmenu',function(e){
		if(AHKobject.contextmenuEnabled)
			return true;
		return false;
	});

	$(document).on("click", function(event) {
		if(!(list=AHKobject.events.unclick))
			return true;
		for (var i = 0; i < list.length; i++)
			if(list[i].unclick && $(list[i]).hasClass('active') && !isThisElement($(event.target),$(list[i])))
				list[i].unclick.call(event,event.target);
		return true;

		function isThisElement(t,e) {
			if(!e || !e.length || !t || !t.length)
				return false
			if(t[0]==e[0])
				return true
			else return isThisElement(t.parent(),e)
		}
	});



	$(window).focus();

	if(g_bDOMloaded && isAHK())
		AHKsys.DomLoaded();
	return AHKready()

	function bindFunction(foo) {
		return function() {
			try {
				var data=AHKFunc[foo](JSON.stringify(arguments)),out;
				if(out=isJson(data))
					return out;
				return data;
			} catch(e) {
				AHKerror(e);
			}
		}
	}
}




































			function log(value) {
				if(isIE()) {
					try {
						return AHKmain.msgbox(isObject(value)?obj2str(value):value);
					} catch(e) {
						alert("can't call msgbox")
					}
				} return console.log(value);
			}
			function isObject(val) {
				if(typeof(val)=='object')
					return 1
				return 0
			}
			function isAHK() {
				return window.location.href.indexOf('bAHK=1')==-1?0:1
				return window.bAHK?true:false
			}
			function isIE() {
				return isAHK();
				var msie = window.navigator.userAgent.indexOf("MSIE ");
				return true
				if (msie > 0) // If Internet Explorer, return version number
					return true //alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
				return false;
			}
			function isTrustEvent(eve) {
				if(!eve.screenX && !eve.screenY)
					return 0;
				return 1;
			}
			function isParentR(e,className) { //Recursion
				e=$(e);
				if(!e || !e.length)
					return false
				if(e.hasClass(className))
					return e
				else return isParentR($(e).parent(),className)
			}
			Object.size = function(obj) {
				var size = 0, key;
				for(key in obj)
					if (obj.hasOwnProperty(key))
						size++;
				return size;
			};
			function inStr(str1,str2,caseSen) {
				if(!caseSen)
					str1=str1.toUpperCase(),str2=str2.toUpperCase()
				if(str1.includes(str2))
					return true
				return false
			}
			function setDefaultVar(a,b,bZeroAsEmpty) {
				if(a=="false")
					return false
				if(a==(bZeroAsEmpty?0:"") && !isObject(a) || a==undefined)
					return b
				return a
			}
			function do_nothing() {}







			function blockInput(id) {
				if(id) {
					if(AHKobject.binds[id])
						return AHKobject.binds[id].bBlocked=1;
					return 0
				} else return AHKobject.bBlockedInput=1;
			} function unblockInput(id) {
				if(id) {
					if(AHKobject.binds[id])
						return AHKobject.binds[id].bBlocked=0;
					return 0
				} else return AHKobject.bBlockedInput=0;
			} function bindButton(e,callback) {
				if(!(e=$(e)) || !e.length)
					return 0;
				e.on("click", function(e){
					if(AHKobject.binds.bBlockedInput || AHKobject.bBlockedInput)
						return true;
					try {
						if(out=callback(e,this))
							return true
						return out==undefined?true:false
					} catch(e) {
						AHKerror(e)
						return true
					}
				}); return AHKobject.binds.push(e);;
			} function bindKey(e,callback) { //;TO_EDIT
			} function bindUnclickEvent(e,callback) {
				if(!(e=$(e)) || !e.length)
					return 0;
				if(!AHKobject.events.unclick)
					AHKobject.events.unclick=[];
				if(callback)
					e.unclick=callback;
				return AHKobject.events.unclick.push(e)
			}

			function isAHK_Attached() {
				return window.AHK?1:0
			}
			function isJson(str) {
				try {
					str=JSON.parse(str);
				} catch (e) {
					return false;
				} return str;
			}


			function obj2str(value) {
				return JSON.stringify(value);
			}


			function hasKey(obj,needleKey) {
				if(Array.isArray(obj)) {
					for(var i = obj.length - 1; i >= 0; i--)
						if(obj[i]==needleKey)
							return 1
				} else if(typeof(obj)=='object') {
					for(key in obj)
						if(obj[key]==needleKey)
							return 1
				} return 0
			}
			(function (arr) {
				if(Array.prototype.hasOwnProperty('hasKey'))
					return;
				Object.defineProperty(Array.prototype, 'hasKey', {
					configurable: true,
					enumerable: true,
					writable: true,
					value: function hasKey(needleKey) {
						for(var i = this.length - 1; i >= 0; i--)
							if(this[i]==needleKey)
								return 1
						return 0
					}
				});

				if(Object.prototype.hasOwnProperty('hasKey'))
					return;
				Object.defineProperty(Object.prototype, 'hasKey', {
					configurable: true,
					writable: true,
					value: function hasKey(needleKey) {
						for(key in this)
							if(this[key]==needleKey)
								return 1
						return 0
					}
				});
			})();



			// function args2str(args) {
			// 	var out=[];
			// 	for(var i = args.length - 1; i >= 0; i--)
			// 		out.push(obj2str(args[i]))
			// 	return out;
			// }
			// function showobject() {
			// 	return AHKmain.showobject(obj2str(arguments));
			// }


			function getStyle(el) {
				return  el.currentStyle || window.getComputedStyle(el, false)
			}
			function getBackgroundImageSize(el,callback) {
				var imageUrl = $(el).css('background-image').match(/^url\(["']?(.+?)["']?\)$/);

				if(imageUrl) {
					var image = new Image();
					image.onload = function() {
						callback([image.width,image.height])
					}
					image.onerror = function() {
						callback(0)
					}
					image.src = imageUrl[1];
				} else return callback(0)
			};
			function fixBackgroundImageSize(el) {
				//if($(el).css("width") || $(el).css("height"))
				//	return 1
				var imageUrl = $(el).css('background-image').match(/^url\(["']?(.+?)["']?\)$/);
				if(imageUrl) {
					var image = new Image();
					image.onload = function() {
						$(el).css("width",image.width),$(el).css("height",image.height);
					}
					image.onerror = function() {
						callback(0)
					}
					image.src = imageUrl[1];
				} else return 0
			};





			//FIX el.remove() for IE8+
			// -> https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
			(function (arr) {
			  arr.forEach(function (item) {
			    if (item.hasOwnProperty('remove')) {
			      return;
			    }
			    Object.defineProperty(item, 'remove', {
			      configurable: true,
			      enumerable: true,
			      writable: true,
			      value: function remove() {
			        if (this.parentNode !== null)
			          this.parentNode.removeChild(this);
			      }
			    });
			  });
			})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

			//FIX str.includes() for IE8+
			// -> https://stackoverflow.com/questions/36574351/includes-not-working-in-internet-explorer
			String.prototype.includes = function (str) {
				if (this.indexOf(str)!==-1)
					return true;
				return false;
			}




			const TabControl = {
				initAll: function() {
					var obj=$(".js-ctrl-tab");
					for (var i = obj.length - 1; i >= 0; i--)
						this.initTab(obj[i])

					var obj=$(".js-ctrl-tab_btn");
					for (var i = obj.length - 1; i >= 0; i--)
						this.initBtn(obj[i])
				},
				initTab: function(el) {
				},
				initBtn: function(el) {
					var tabName=el.getAttribute("data-tabname");
					if(!tabName)
						return 0;
					bindButton(el,function(event,el) {
						var tab=$('.js-ctrl-tab[data-tabname='+tabName+']')[0];
						if(!tab)
							return 0;
						var curTab=tab.getAttribute('data-current');
						var item=$(tab).find('.tab__item[data-index='+curTab+']');
						item.removeClass('displayed');

						var newTab=el.getAttribute('data-tabindex');
						var item=$(tab).find('.tab__item[data-index='+newTab+']');
						item.addClass('displayed');
						tab.setAttribute('data-current',newTab);
					});
					return 1;
				}
			}





function init_DDL() {
	var obj=$(".ddl"),out=[],yo;
	for (var i = obj.length - 1; i >= 0; i--)
		try {
			out.push(new DropDownList(obj[i]))
		} catch(e) {AHKerror(e)};
	return out
}




var it=DropDownList.prototype;
function DropDownList(el) {
	this.e_ddl = $(el);
	this.e_ddl.ctrl=this;
	this.e_placeholder = createPlaceholder(el,this.e_ddl.attr("data-placeholder"));
	this.e_list = $(this.e_ddl).find('.ddl__list');
	this.val = '';
	this.index = -1;
	this.initEvents();
	for (var i = this.e_ddl.length - 1; i >= 0; i--)
		this.e_ddl[i].ddl=this;


	function createPlaceholder(owner,title) {
		var span=document.createElement("div"); //div for  text-overflow: ellipsis; and overflow:hidden;
		span.className="ddl__placeholder";
		span.innerHTML=title?title:'';
		owner.appendChild(span);
		return span
	}
}
it.select = function(v) {
	var _this = this;
	var e_option=this.e_list.find('.ddl__option[data-value="'+v+'"]');
	if(!e_option.length || !v)
		return $(_this.e_placeholder).text(this.e_ddl.attr("data-placeholder"));
	if(e_option.hasClass('ddl__option--noclick'))
		return true
	_this.val = $(e_option).attr("data-value");
	_this.index = $(e_option).index();

	$(_this.e_list).find('.ddl__option').removeClass('ddl__option--active')
	$(e_option).addClass('ddl__option--active');

	$(_this.e_placeholder).text($(e_option).text());
	return true //close ddl__list
}
it.initEvents = function() {
	var _this = this;
	bindUnclickEvent(this.e_ddl,function(ev,e) {
		$(_this.e_ddl).find(".ddl__list").toggle(0)
		$(_this.e_ddl).removeClass('active');
	});

	this.e_ddl.on('click', function(ev){
		$(this).find(".ddl__list").toggle(0);
		$(this).toggleClass('active');
		return true;
	});

	this.e_list.on('click', function(event,e){
		if(!(e_option=isCanbeOption($(event.target))))
			return false;
		if(e_option.hasClass('ddl__option--noclick'))
			return true;
		_this.val = $(e_option).attr("data-value");
		_this.index = $(e_option).index();

		$(_this.e_list).find('.ddl__option').removeClass('ddl__option--active')
		$(e_option).addClass('ddl__option--active');

		$(_this.e_placeholder).text($(e_option).text());
		return true; //close ddl__list

		function isCanbeOption(e) {
			if(!e || !e.length || e[0]==_this.e_ddl)
				return false
			if(e.hasClass('ddl__option'))
				return e
			else return isCanbeOption($(e).parent())
		}
	});
}
it.getValue = function() {
	return this.val;
}
it.getIndex = function() {
	return this.index;
}














function init_tooltip() {
	var obj=$(".js-tooltip"),out=[],yo;
	for (var i = obj.length - 1; i >= 0; i--)
		try {
			out.push(new Tooltip(obj[i]))
		} catch(e) {AHKerror(e)};
	return out
}



var it=Tooltip.prototype;
function Tooltip(el) {
	this.el = el = $(el);
	this.placeholder = createPlaceholder(el,el.attr("data-tooltip"));
	this.initEvents();


	function createPlaceholder(owner,title) {
		var span=document.createElement("div");
		span.className="g-tooltip hidden";
		span.innerHTML=title;
		owner.append(span);
		return span
	}
}
it.initEvents = function() {
	var _this = this;
	$(this.el).hover(function(){
		$(_this.placeholder).removeClass('hidden')
		.css("visibility","visible")
		.css("opacity","1");
	},function() {
		$(_this.placeholder).addClass('hidden')
		.css("visibility","")
		.css("opacity","");
	});
}
it.getValue = function() {
	return this.val;
}
it.getIndex = function() {
	return this.index;
}
