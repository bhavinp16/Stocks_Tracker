const express = require('express');
const searchGoogle = require('./searchGoogle');

const router = express.Router();

router.get('/', (request, response) => {

    const searchQuery = request.query.searchquery;

    if (searchQuery != null) {
        searchGoogle(searchQuery)
            .then(results => {
                //Returns a 200 Status OK with Results JSON back to the client.
                response.status(200);
                response.json(results);
            });
    } else {
        response.end();
    }

});

module.exports = router;
