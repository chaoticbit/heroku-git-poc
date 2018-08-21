const express = require('express');
var app = express();
var bodyParser = require('body-parser');

const router = express.Router();
const path = require('path')
const PORT = process.env.PORT || 5000
const db = require('./queries');

db.client.query('LISTEN account_update');
db.client.on('notification', function(data) {
    console.log('in notif');
    console.log(data);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use('/', router);  

//webhook api
router.post('/gith', db.createIssue);

router.get('/api/issues', db.getAllIssues);
router.get('/api/issues/:id', db.getSingleIssue);
router.post('/api/issues', db.createIssue);
router.put('/api/issues/:id', db.updateIssue);
router.delete('/api/issues/:id', db.removeIssue);

module.exports = router;

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

/**
 * org domain: https://na57.my.salesforce.com/
 * username: ad@mycompany.com
 * password: michbhariid3g7
 * 
 *
 */