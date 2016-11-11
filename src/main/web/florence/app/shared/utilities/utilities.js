var utilities = {

    /* Strips a URI of any spaces, capitalisation */
    getSafeURI: function(uri) {
        var URIArray = uri.split('/'),
            safeURI = [],
            i;

        for (i = 0; i < URIArray.length; i++) {
            if (URIArray !== "") {
                safeURI.push(URIArray[i].replace(/[^A-Z0-9]+/ig, "").toLowerCase());
            }
        }

        safeURI = this.checkURISlashes(safeURI.join('/'));

        return safeURI;
    },

    /* Removes trailing slash and add leading slash (if necessary) to string */
    checkURISlashes: function(uri) {
        var checkedUri = uri[uri.length - 1] === '/' ? uri.substring(0, uri.length - 1) : uri;
        checkedUri = checkedUri[0] !== '/' ? '/' + checkedUri : checkedUri;
        return checkedUri;
    }

};

module.exports = utilities;
