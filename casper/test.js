var casper = require('casper').create();

function getHeaders(){
	return this.fetchText('h3');
}

casper.start('http://google.com/search?q=foo');

casper.then(function(){
	var text = this.fetchText('h3');
	this.echo(text);
});

casper.run();