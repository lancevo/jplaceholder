jplaceholder.js
===============

jplaceholder is a jQuery plug-in that is complementary to both HTML5 and non-HTML5 browsers. 

*Notes: I removed **placeholder** attribute, and will add it later. Use **jplaceholder** attribute for now.* 
Features
--------

- Apply the same styles from input to placeholder text
- Show or Hide placeholder text when input is focusing
- Events callback

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
			<input name="user" jplaceholder="User ID" />
		</label>
		<label>
			<input name="pass" jplaceholder="Password" />
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
			<input name="user" jplaceholder="User ID" />
		</label>
		<label>
			<input name="pass" jplaceholder="Password" />
		</label>
	</form>

	<script>
	$("#form2").jplaceholder({showOnFocus:true});
	</script>
	

Example 3
---------
Callback functions. It's useful for validation or event triggers.

	<form id="form3">
		<label>
			<input name="user" jplaceholder="User ID" />
		</label>
		<label>
			<input name="pass" jplaceholder="Password" />
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
			<input name="user" id="user" jplaceholder="User ID" />
		</label>
		<label>
			<input name="pass" id="pass" jplaceholder="Password" />
		</label>
	</form>

	<style>
		#form4 input {
			color:#f00;
			font-size:16px;
		}
		
		#form4 input + .jplaceholder.focus {
			color:#333 !important;  /* override inline style, jplaceholder changes opacity to .5 */
		}
	</style>

### OR

	<style>
		#form4 .jplaceholder {
			color:#f00 !important;
			font-size:16px;
		}
		/* focus */
		
		#form4 .jplaceholder.focus {
			color:#333 !important;
		}
	</style>
	
	<script>
		$("#form4").jplaceholder({showOnFocus:true});
	</script>
	
	
		
	