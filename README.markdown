jplaceholder.js
===============

A jQuery plugin to enable HTML5 placeholder on most browsers. 

Features
--------
- Use it as a fallback for browser doesn't support placeholder
- Force it to display on all browsers even browsers that are supporting placeholder
- Show placeholder text when input field is focusing
- Events callback
- Automatically applies the same styles from input field to placeholder text


Usage
-----

You can use HTML5 *placeholder* or *jplaceholder* attribute if you're experiencing [FOUT](#FOUT) (Flash Of Unstyled Text)

	<form>
		<input name="phone" type="text" placeholder="Enter your phone number" />
		<input name="pass" type="password" placeholder="Password" />
		<input name="id" type="text" jplaceholder="User ID" />
	</form>	

	<script src="jplaceholder.js"></script>
	<script>
		$("form").jplaceholder();
		
	*or*
	 
		$("input, textarea").jplaceholder();
	</script>


 


	
Settings
--------
$(elements).jplaceholder({ force, showOnFocus, focusFn, keypressFn, blurFn	});

**force** : *boolean* enable placeholder even in browsers that are supporting placeholder

**showOnFocus** : *boolean* show placeholder text when the element is focusing

**focusFn** : *function(object, event)* callback function when element is focusing, object is the current element itself

**keypressFn** : *function(object, event)* callback function when a key pressed 

**blurFn** : *function(object, event)* callback function when element is not focused
	
	
Fallback method
---------------

Use jplaceholder as a fallback method for older browsers that don't support HTML5 placeholder. 

	<form>
		<input name="user" jplaceholder="User ID" />
		<input name="pass" jplaceholder="Password" />
		</label>
	</form>

	<script>
	$("form").jplaceholder();
	</script>
	
	
	
Show placeholder when input's focusing
--------------------------------------

Placeholder text will goes away when the a key entered. It reduces the text opacity to 50%.

	$("form").jplaceholder({*showOnFocus:true*});


Callback functions
------------------

	<form>
		<input name="user" jplaceholder="User ID" />
		<input name="pass" jplaceholder="Password" />
	</form>

	<script>
	$("form").jplaceholder({
		focusFn: function(obj, event) {
			console.log('focus event  input name= ' + obj.attr('name'));
		},
		keypressFn: function(obj, event) {
			console.log('keypress event, input value is ' + obj.val());
		},
		blurFn: function(obj, event) {
			console.log('blur event');
		}
	});
	</script>


Styling placeholder
-------------------

	<form>
			<input name="user" id="user" jplaceholder="User ID" />
			<input name="pass" id="pass" jplaceholder="Password" />
	</form>



	<style>
		.jplaceholder {
			color:#f00 !important; /* override inline styles */
			font-size:16px;
		}
		
		.jplaceholder.focus {
			color:#333 !important;
		}
	</style>

### OR

	<style>
		/* jplaceholder plug-in retrieve the styles automatically */
		input {
			color:#f00;
			font-size:16px;
		}
		
		.jplaceholder.focus {
			color:#333 !important;  /* override inline style */
		}
	</style>



<span id="FOUT" />
FOUT
----
To prevent FOUT in HTML5 browsers, either use *jplaceholder* attribute inside the element, or set the element's visibility to hidden in CSS until jplaceholder javascript is executed.

		
	<style>
		input { 
			visibility: hidden;
		}
	</style>
	
	<form>
		<input name="phone" placeholder="enter your phone number" />
	</form>
	
	<script>
		$(form).jplaceholder();
	</script>
