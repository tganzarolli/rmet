const POSITIONS = ['#bt-nw', '#bt-ne', '#bt-sw', '#bt-se'];

function next(taskList, e) {
	var index = $('#main-image').data('index');
	var nextIndex = index + 1;
	var newText = "PROGRESS, FACE " + nextIndex + " of 36";
	if (index == 0) {
		if (e) {
			if (e.text().toLowerCase() != 'panicked') {
				alert('Oops, this is the wrong one, click on Panicked to clear the practice');
				return;		
			}
			else {
				$('#instructions').html('<br><br>');
			}	
		}
		else {
			var inst = $('#instructions');
			inst.fadeOut(400, function(){
				inst.html("This is a guided example of the task, try hovering over the options. The correct answer is: <strong>Panicked.</strong><br>Once you click on a button, you are forwarded to the next face. Please, don't refresh your browser, as it will reset the test.");
				$('#instructions').fadeIn(300);
			});
			newText = "PRACTICE TASK";
			nextIndex = 0;
		}
	}
	else if (index == 36) {
		alert('End of the test!');
		window.location.href = "results.html";
	}
	//save the data goes here
	var task = taskList[nextIndex];
	var i = 0;
	$('#mainTitle').fadeOut(400, function(){
		$('#mainTitle').text(newText);
		$('#mainTitle').fadeIn(300);
	});
	$('#main-image-div').fadeOut(400, function(){
		$('#main-image').attr('src', 'assets/images/faces/' + task.image);		
		$('#main-image-div').fadeIn(300);
	});
	
	task.options.forEach(function(answer) {
		var currButton = $(POSITIONS[i]);
		currButton.fadeOut(400, function(){
			currButton.text(answer.emotion);
			currButton.css('textTransform', 'capitalize');
			currButton.fadeIn(300);
		});
		// maybe move to a css file
		currButton.attr('title', "<span><em>Description:</em> " + answer.description + "<br/> <em>Sentence: </em>" + answer.sentence + "</span>")
		.tooltip('_fixTitle');
		i++;
	});
	$('#main-image').data('index', nextIndex);
	
	//set form value
	// set individual timestap? or just general? (optional)
	// re-set the id, answers, tooltips and image. Change the progress on top
	//if id== 37, show the next and attahed to submit the form
}

$(document).ready(function() { 
	$(function () {
	  $('[data-toggle="tooltip"]').tooltip()
	});
	POSITIONS.forEach(function(pos){
		$(pos).click(function() {
			$(this).blur();
			next(taskData, $(this));
		});		
	});
	next(taskData);
});
