var assert = require('assert');
//var utilities = require('../app/shared/utilities/utilities');
var safeURIMap = [
    {testURI: '/economy/environmentalaccounts/bulletins/ukenvironmentalaccounts/2016/', correctURI: '/economy/environmentalaccounts/bulletins/ukenvironmentalaccounts/2016'},
    {testURI: 'THIS/IS/ALL/CAPS', correctURI: '/this/is/all/caps'},
    {testURI: 'a/slash/at/the/end/', correctURI: '/a/slash/at/the/end'}
];
var checkURISlashesMap = [
    {testURI: '/economy/environmentalaccounts/bulletins/ukenvironmentalaccounts/2016/', correctURI: '/economy/environmentalaccounts/bulletins/ukenvironmentalaccounts/2016'},
    {testURI: 'employmentandlabourmarket/peopleinwork/employmentandemployeetypes/bulletins/uklabourmarket/july2016', correctURI: '/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/bulletins/uklabourmarket/july2016'},
    {testURI: '/economy/environmentalaccounts/', correctURI: '/economy/environmentalaccounts'},
];

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1,2,3].indexOf(4));
        });
    });
});

describe('Utilities', function() {
    describe('getSafeURI', function() {
        it('should return safe uri with slash at beginning, remove trailing slash and remove any caps', function() {
            safeURIMap.forEach(function(item) {
                assert.equal(item.correctURI, getSafeURI(item.testURI));
            });
        })
    });
    describe('checkURISlashes', function() {
        it('should add leading slash and remove trailing slash', function() {
            checkURISlashesMap.forEach(function(item) {
                assert.equal(item.correctURI, checkURISlashes(item.testURI));
            });
        });
    });
});

// temporary here - test real functions

function getSafeURI (uri) {
    var URIArray = uri.split('/'),
        safeURI = [],
        i;

    for (i = 0; i < URIArray.length; i++) {
        if (URIArray !== "") {
            safeURI.push(URIArray[i].replace(/[^A-Z0-9]+/ig, "").toLowerCase());
        }
    }

    safeURI = checkURISlashes(safeURI.join('/'));

    return safeURI;
}

function checkURISlashes (uri) {
    var checkedUri = uri[uri.length - 1] === '/' ? uri.substring(0, uri.length - 1) : uri;
    checkedUri = checkedUri[0] !== '/' ? '/' + checkedUri : checkedUri;
    return checkedUri;
}

//console.log(checkURISlashes('economy/environmentalaccounts/bulletins/ukenvironmentalaccounts/2016'));