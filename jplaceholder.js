// jplaceholder.js - v1.0 (February 2012) - jQuery placeholder plugin
// Author: Lance Vo - MIT License
// https://github.com/lancevo/jplaceholder

/*
usage:

$("elements").jplaceholder(args);

@param args {
	force: boolean,			// enable placeholder even in browsers that are supporting placeholder
	showOnFocus: booealn		// show placeholder text when the element is focusing
	focusFn: function(obj, event)	// callback function when element is focusing, object is the current element itself
	keypressFn: function(obj, event)// callback function when a key pressed
	blurFn: function(obj, event)	// callback function when element is not focused
}

*/


(function($) {
$.fn.jplaceholder = function(args) {
    var testEl = document.createElement("input"),
		base = $(this),
		// default config
		o = {
			force: false,
			showOnFocus: false,
			focusFn: null,
			keypressFn: null,
			blurFn: null			
		};					
		
		o = $.extend(o, args);   
	
    if (!o.force && "placeholder" in testEl && !o.showOnFocus) {
        return this;
    }
	
	if (!base.is('input, textarea')) {
		base = base.find('input[type!="hidden"], textarea');
	}
	
    base.each(function (i) {
		var el = $(this);
		
		if (!el.attr('placeholder') && !el.attr('jplaceholder')) {
			console.log(el);
			return this;
		}
          
		var	p = el.parent(),				
        	val = el.attr('placeholder') || el.attr('jplaceholder'), // placeholder takes priority over jplaceholder
			ph = $('<span class="jplaceholder">' + val + '</span>'),
			isPassword = el.attr('type')=='password',
			// make to use underscore for attribute name 
			// ie font_family instead of font-family, it will be converted to font-family
			css = {
				position: 'absolute',
				// feel to adjust the top & left in CSS file when the font is bigger or Arial
				top: (el.offset().top - p.offset().top + 2) + 'px',
				left: (el.offset().left - p.offset().left + 2) + 'px',
				font_family: el.css('font-family'),
				font_size: el.css('font-size'),
				font_weight: el.css('font-weight'),
				padding_left: el.css('padding-left'),  
				padding_top: el.css('padding-top'),
				color: el.css('color')
			},		
			timer;
			
		p.css('position','relative').css('zoom',1);

		for (var k in css) {
			ph.css(k.replace(/_/,'-'),css[k]);
		}
		
		el.attr('placeholder',''); // prevent conflict with browser supports placeholder
		el.css('visibility','visible');					
		
		 
		ph.insertAfter(this).hide();  
		
		// fix ie prefill data after jplaceholder executed
		setTimeout(function() {
			if (el.val()=='') {				
				ph.show();
			}
		}, 50); 
		
		
		
		function onfocus(e){									
			if ((!o.showOnFocus) || (el.val()!='')) {
				ph.fadeTo('fast', 0);			
			} else {								
				ph.addClass('focus').fadeTo('fast',0.5);
			}
			o.focusFn ? o.focusFn(t, e) : null;
		}
		
		
		ph.click(function(){
			// get around ie fire event twice for password
			if ( $.browser.msie && isPassword) {
				el.select();	
			} else {
				el.focus();
			}
		});
		el.focus(function(e){
			onfocus(e);
		}); // focus
		el.keypress(function(e){
			ph.fadeTo('fast', 0);
			o.keypressFn ? o.keypressFn(t, e) : null;
		});							

		el.blur(function(e){			
			if (el.val()=='') {
				ph.fadeTo('fast', 1).removeClass('focus');
			}
			o.blurFn ? o.blurFn(t, e) : null;
		}); //blur
 			
	}); // find().each
	
	return this;
};// jplaceholder

})(jQuery);
