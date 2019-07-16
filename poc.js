var htmlparser = require('htmlparser2');
var Parser = htmlparser.Parser;
var DOM = htmlparser.DomUtils;
var Cornet = require('cornet');
var fs = require('fs');
var $ = require('cheerio');

var cornet = new Cornet();

var fs = require("fs")
var path = require("path")

var readFixture = (fixture) =>
	fs.readFileSync(path.join(__dirname, `./${fixture}`)).toString()

var s = new Date().valueOf();
const html = readFixture('singlegrain.html')

const doParsing = () => {
	return new Promise(function (resolve, reject) {

		var parser = new Parser(cornet);
		var output = ''

		parser.write(html)

		const onDomReady = (dom) => {
			output = getHTML(dom).substring(0, 200)
			console.log(new Date().valueOf() - s, ' ms taken');
			resolve(output)
		}

		const getHTML = (dom) => {
			return dom.map(function (elem) {
				return DOM.getOuterHTML(elem);
			}).join('');
		}

		cornet.on('dom', onDomReady);

		const rules = ['head > title', 'h1']

		for (let rule of rules) {
			(rule => {
				const onTitle = cornet.select(rule, elem => {
					$(elem).text('A different title');
					cornet.removeListener('element', onTitle);
				})
			})(rule)
		}

		parser.end()
	})
}

doParsing().then(out => {
	console.log('finished', out)
})