var config = {
	apiKey: "AIzaSyAiXwMPzJfs5tsIfSqgoROoHfCpdXaP-HE",
	authDomain: "train-638c4.firebaseapp.com",
	databaseURL: "https://train-638c4.firebaseio.com",
	projectId: "train-638c4",
	storageBucket: "train-638c4.appspot.com",
	messagingSenderId: "537339644224"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#btn").on('click', function () {
	event.preventDefault();
	var trainName = $("#trainName").val();
	var destination = $("#destination").val();
	var frequency = $("#frequency").val();
	var nextArrival = $("#nextArrival").val();;
	database.ref().push({
		trainName: trainName,
		destination: destination,
		frequency: frequency,
		nextArrival: nextArrival,
		dataAdded: firebase.database.ServerValue.TIMESTAMP

	});


});


database.ref().on("child_added", function (childSnapshot) {
	var val = childSnapshot.val();
	function getTimeInterval() {
		var arrival = val.nextArrival;
		var arrivalTimeStamp = moment().format("YYYY-MM-DD") + " " + arrival
		var minutesAway = Math.abs(moment(arrivalTimeStamp).diff(moment(currentTime), "minutes"));
		return minutesAway
	}
	$("#employeeInfo").append("<tr><td class='trainName'>" + val.trainName + "</td><td class='destination'>" + val.destination + "</td>" + "</td><td class='frequency'>" + val.frequency + "</td>" + "<td class='nextArrival'>" + val.nextArrival + "</td><td class='minAway'>" + getTimeInterval() + "</td></tr>");
});

var currentTime = moment().format("YYYY-MM-DD HH:mm");
