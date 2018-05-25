var res, start, end, steps = [], curr_step = 0, toBeTyped, completed, words, currs;

$.ajaxSetup({
    async: false
});


var directionsAPI = "https://maps.googleapis.com/maps/api/directions/json";
$.getJSON(directionsAPI, {
	origin: "38.935185, -77.074064",
	destination: "38.892326, -77.044000",
	key: "AIzaSyB2h4Ll8-Xki8ZGaMTnVZ7GLJUK9Zf0hrI"
}).done(function(result) {
	// console.log(result.routes[0].legs[0]);
	// console.log(result.routes[0].legs[0].steps);
	// console.log(result.routes[0].legs[0].steps[0].html_instructions);
	res = result.routes[0].legs[0].steps[0].html_instructions;
	start = result.routes[0].legs[0].start_address;
	end = result.routes[0].legs[0].end_address;
	result.routes[0].legs[0].steps.forEach(function(element) {
		steps.push(element.html_instructions.replace(/(<b>|<\/b>)/g, "").replace(/<div.+<\/div>/g, ""));
	});
});

$.ajaxSetup({
    async: true
});
$("#path").text("From: " + start + " To: " + end);

changeText(steps[curr_step]);

$("input").bind("input", function() {
	var input = $(this).val();
	var inputLen = input.length;

	if (input == words[0].substr(0, inputLen)) {
		$(this).removeClass("error");
		$("#toBeTyped").text(words[0].substr(inputLen) + toBeTyped);
		$("#curr").text(input);
		$("#curr").addClass("correct");
	} else if (input == words[0] + " ") {
		words.shift();
		$("input").val("");
		$("#completed").text($("#completed").text() + " " + $("#curr").text() + " ");
		$("#curr").text("");
		if (words.length == 0) {
			curr_step++;
			changeText(steps[curr_step]);
		} else {
			toBeTyped = toBeTyped.substr(words[0].length + 1);
		}
	} else {
		$(this).addClass("error");
	}
});

function changeText(step) {
	$("#toBeTyped").html(steps[curr_step]);
	toBeTyped = $("#toBeTyped").text();
	completed = "";
	toBeTyped = toBeTyped.replace(/\n/g, " ");
	words = toBeTyped.split(" ");
	curr = words[0];
	toBeTyped = toBeTyped.substr(curr.length);
	$("#completed").text("");
}