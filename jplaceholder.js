/*

jplaceholder.js
Lance Vo
MIT License

https://github.com/lvo811/jplaceholder

usage:

$("form").jplaceholder(args);

@param args {
	force: boolean, // execute the this plug-in even the browser supports placeholder feature
	showOnFocus: booealn // hide placeholder text when form input is focusing
	focusFn: function(obj, event) // callback function when input is focusing
	keypressFn: function(obj, event) // callback function when a key is pressed
	blurFn: function(obj, event) // callback function when input is blurred
}
*/


(function($) {
$.fn.jplaceholder = function(args) {
    var el = document.createElement("input"),		
		// default config
		o = {
			force: true,
			showOnFocus: false,
			focusFn: null,
			keypressFn: null,
			blurFn: null			
		};					
		
		o = $.extend(o, args);   
	/*
    if (!o.force && "placeholder" in el) {
        return this;
    }
	*/
    $(this).find('input[type!="hidden"], textarea').each(function (i) {
		var t = $(this);
		
		if (!t.attr('jplaceholder')) {return this;}
          
		var	p = t.parent(),				
        	val = t.attr('jplaceholder'),
			ph = $('<span class="jplaceholder">' + val + '</span>'),
			isPassword = t.attr('type')=='password',
			// make to use underscore for attribute name 
			// ie font_family instead of font-family, it will be converted to font-family
			css = {
				position: 'absolute',
				// feel to adjust the top & left in CSS file when the font is bigger or Arial
				top: (t.offset().top - p.offset().top + 2) + 'px',
				left: (t.offset().left - p.offset().left + 2) + 'px',
				font_family: t.css('font-family'),
				font_size: t.css('font-size'),
				font_weight: t.css('font-weight'),
				padding_left: t.css('padding-left'),  
				padding_top: t.css('padding-top'),
				color: t.css('color')
			},		
			timer;
			
		p.css('position','relative').css('zoom',1);

		for (var k in css) {
			ph.css(k.replace(/_/,'-'),css[k]);
		}
		
		t.attr('placeholder',''); // prevent conflict with browser supports placeholder
		t.css('visibility','visible');					
		
		 
		ph.insertAfter(this).hide();  
		
		// fix ie prefill data after jplaceholder executed
		setTimeout(function() {
			if (t.val()=='') {				
				ph.show();
			}
		}, 50); 
		
		
		
		function onfocus(e){									
			if ((!o.showOnFocus) || (t.val()!='')) {
				ph.fadeTo('fast', 0);			
			} else {								
				ph.addClass('focus').fadeTo('fast',0.5);
			}
			o.focusFn ? o.focusFn(t, e) : null;
		}
		
		
		ph.click(function(){
			// get around ie fire event twice for password
			if ( $.browser.msie && isPassword) {
				t.select();	
			} else {
				t.focus();
			}
		});
		t.focus(function(e){
			onfocus(e);
		}); // focus
		t.keypress(function(e){
			ph.fadeTo('fast', 0);
			o.keypressFn ? o.keypressFn(t, e) : null;
		});							

		t.blur(function(e){			
			if (t.val()=='') {
				ph.fadeTo('fast', 1).removeClass('focus');
			}
			o.blurFn ? o.blurFn(t, e) : null;
		}); //blur
 			
	}); // find().each
	
	return this;
};// jplaceholder

})(jQuery);