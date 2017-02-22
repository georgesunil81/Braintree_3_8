console.log('Preparing to build...');

var stealTools = require("steal-tools");

var promise = stealTools.build({
  	config: __dirname + "/package.json!npm",
  	bundlesPath: "dist/bundles/braintree_3_8"
}, {
  	bundleAssets: true
});

promise.then(function(result) {
	console.log('Build SUCCESSFUL.');
}).catch(function(result) {
	console.log('ERROR in building: ', result);
});