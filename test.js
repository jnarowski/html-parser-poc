var htmlparser = require('htmlparser2');
var Parser = htmlparser.Parser;
var DOM = htmlparser.DomUtils;
var Cornet = require('cornet');
var fs = require('fs');
var $ = require('cheerio');

var cornet = new Cornet();

cornet.on('dom', onDomReady);

var parser = new Parser(cornet);

var s = new Date().valueOf();

fs.createReadStream(__dirname + '/singlegrain.html').pipe(parser);

function onDomReady(dom) {
    console.log(getHTML(dom).substring(0, 200));
    console.log(new Date().valueOf() - s, ' ms taken');
}

function getHTML(dom) {
    return dom.map(function (elem) {
        return DOM.getOuterHTML(elem);
    }).join('');
}

const onTitle = cornet.select('head > title', function (elem) {
    $(elem).text('A different title');
    cornet.removeListener('element', onTitle);
});