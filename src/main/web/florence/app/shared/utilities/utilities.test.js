var assert = require('assert');
var utilities = require('./utilities');
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

describe('Utilities', function() {
    describe('getSafeURI', function() {
        it('should return safe uri with slash at beginning, remove trailing slash and remove any caps', function() {
            safeURIMap.forEach(function(item) {
                assert.equal(item.correctURI, utilities.getSafeURI(item.testURI));
            });
        })
    });
    describe('checkURISlashes', function() {
        it('should add leading slash and remove trailing slash', function() {
            checkURISlashesMap.forEach(function(item) {
                assert.equal(item.correctURI, utilities.checkURISlashes(item.testURI));
            });
        });
    });
});
