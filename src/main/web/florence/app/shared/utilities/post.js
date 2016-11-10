
var post = function(uri, body) {

    return new Promise(function(resolve, reject) {

        fetch(uri, {
            credentials: "include",
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }).then(function(response) {
            return response.json().then(function(data) {
                if (response.ok) {
                    return data
                } else {
                    reject({status: response.status, message: data.message})
                }
            });
        }).then(function(responseJSON) {
            resolve(responseJSON);
        }).catch(function(fetchError) {
            reject(fetchError);
        });

    });
};

module.exports = post;
