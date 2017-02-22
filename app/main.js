define([
	"jquery",
	"can"	
], function($, can) {
	System.import("app/pages/app/AppController").then(function(controller) {
		var div = $('<div id="App__Controller"></div>');
		$(document.body).append(div);
		var App = window.App = new controller(div, {}); //this puts the App on the window object and can be referenced from anywhere in the application
	});
});