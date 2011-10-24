/*

jplaceholder.js
Lance Vo
MIT License

usage:

$("form").jplaceholder(args);

@param args {
	force: boolean, // execute the this plug-in even the browser supports placeholder feature
	showOnFocus: booealn // hide placeholder text when form input is focusing
	
}
*/


(function($) {
$.fn.jplaceholder = function(args) {
    var el = document.createElement("input"),		
		// default config
		o = {
			force: false,
			showOnFocus: false
		};					
		
		o = $.extend(o, args);   
		
    if (!o.force && "placeholder" in el) {
        return this;
    }
	
    $(this).find('input[placeholder!=""], textarea[placeholder!=""]').each(function (i) {
        var t = $(this), 
			p = t.parent(),				
        	val = t.attr('placeholder'),
			ph = $('<span class="ieplaceholder">' + val + '</span>'),
			isPassword = t.attr('type')=='password',
			css = {
				position: 'absolute',
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
			

		p.css('position','relative');
		
		if ($.browser.msie && parseInt($.browser.version, 10) == 7) {
			p.css('zoom',1); // fixes ie7 box layout		
		}
		
		t.attr('placeholder',''); // prevent conflict with browser supports placeholder
							
		
		for (var k in css) {
			ph.css(k.replace(/_/,'-'),css[k]);
		}
		 
		ph.insertAfter(this).hide();  
		
		if (t.val()=='') {
			ph.show();	
		} 
		
		
		t.focus(function(e){						
			if (!o.showOnFocus) {
				ph.hide();
				return true;	
			}			
			
			ph.addClass('focus');
			
			if (isPassword) {			
				timer = setInterval(function(){
					if (t.val()!='') {
						ph.hide();
						timer = clearInterval(timer);
					};
				}, 50);
			} else {			
				t.keypress(function(e){
					ph.hide();
				});
			}
		}); // focus

		t.blur(function(e){
			if (timer) {
				clearInterval(timer);	
			}
			if (t.val()=='') {
				ph.show().removeClass('focus');
			}
		}); //blur
 			
	}); // find().each
	
	return this;
};// ieplaceholder

})(jQuery);