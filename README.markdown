jplaceholder.js
===============

jplaceholder is a jQuery plug-in that is complementary to both HTML5 and non-HTML5 browsers. 

Features
--------

Apply the same style to placeholder text from the input's style
Show or Hide placeholder text when input is focusing
Callbacks for events

Usage
-----

	<script src="jplaceholder.js"></script>
	<script>
		$("form").jplaceholder();
	</script>
	
Example 1
---------

Placeholder text is hidden when input field is focusing

	<form id="form1">
		<label>
			<input name="user" _jplaceholder_="User ID" />
		</label>
		<label>
			<input name="pass" _jplaceholder_"Password" />
		</label>
	</form>

	<script>
	$("#form1").jplaceholder();
	</script>
	
Example 2
---------

Placeholder text is shown when input field is focusing, and is hidden when a key is pressed

	<form id="form2">
		<label>
			<input name="user" _jplaceholder_="User ID" />
		</label>
		<label>
			<input name="pass" _jplaceholder_"Password" />
		</label>
	</form>

	<script>
	$("#form2").jplaceholder({showOnFocus:true});
	</script>
	

Example 3
---------
Callback functions. It's useful for validation or any custom triggers.

	<form id="form3">
		<label>
			<input name="user" _jplaceholder_="User ID" />
		</label>
		<label>
			<input name="pass" _jplaceholder_"Password" />
		</label>
	</form>

	<script>
	$("#form3").jplaceholder({
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


Example 4
---------
Styling placeholder text

	<form id="form4">
		<label>
			<input name="user" id="user" _jplaceholder_="User ID" />
		</label>
		<label>
			<input name="pass" id="pass" _jplaceholder_"Password" />
		</label>
	</form>

	<style>
		#form4 input {
			color:#f00;
		}
		
		#form4 input + .jplaceholder.focus {
			color:#333 !important;  /* override inline style, jplaceholder changes opacity to .5 */
		}
	</style>

### OR

	<style>
		#form4 .jplaceholder {
			color:#f00 !important;
		}
		/* focus */
		
		#form4 .jplaceholder.focus {
			color:#333 !important;
		}
	</style>
	
	
		
	