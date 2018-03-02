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

$("#btn").on('click', function() {
	event.preventDefault();
	var trainName = $("#trainName").val();
	var destination = $("#destination").val();
	var frequency = $("#frequency").val();
	var nextArrival = $("#nextArrival").val();;
	console.log("variable output", name);
	database.ref().push({
		trainName: trainName,
		destination: destination,
		frequency: frequency,
		nextArrival: nextArrival,
		dataAdded: firebase.database.ServerValue.TIMESTAMP

	});

	console.log(name);

});



database.ref().on("child_added", function (childSnapshot) {
	console.log('childSnap: ', childSnapshot.val());
	var val = childSnapshot.val();
	$("#employeeInfo").append("<tr><td class='trainName'>" + val.trainName + "</td><td class='destination'>" + val.destination + "</td>" + "</td><td class='frequency'>" + val.frequency + "</td>" + "<td class='nextArrival'>" + val.nextArrival + "</td><td class='minAway'>" + Math.abs(val.currentTime.dif()) + "</td></tr>");
});

var currentTime = moment();
// var nextArrivalTime = (nextArrival
var nextTrain = currentTime.add(frequency, 'minutes').format('HH:mm');
console.log("arrival time", nextTrain);
