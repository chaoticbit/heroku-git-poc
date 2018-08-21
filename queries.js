const { Client } = require('pg');
const client = new Client({
    connectionString: 'postgres://gksuoskpfwifab:0a6c63bb4043bd5675c0aad46ea1c6559d97210436ac46ffea3edbff7e745ede@ec2-50-16-196-138.compute-1.amazonaws.com:5432/dbqp368cbnpgdr',
    ssl: true,
});

client.connect();

// add query functions

function getAllIssues(req, res, next) {
    client.query('select * from salesforce.account', (err, result) => {
        if (err) throw err;
        res.status(200).json({
            status: 'success',
            data: result.rows
        });
        client.end();
    });    
}

function getSingleIssue(req, res, next) {
    
}

function createIssue(req, res, next) {    
    if(req.body.issue) {
        let { id, title, url, number, state, created_at } = req.body.issue;        
        let strDate = new Date(created_at).toLocaleString();
        let sfid = Math.round((Math.random() * 36 ** 12)).toString(11); //18 chars
        const text = 'INSERT into salesforce.account(createddate, isdeleted, name, systemmodstamp, sfid) VALUES($1, $2, $3, $4, $5) RETURNING *';
        const values = [strDate, false, title, strDate, sfid];
        client.query(text, values, (err, result) => {
            if (err) {
                console.log(err.stack)
            } else { 
                res.status(200).json({
                    status: 'success',
                    data: result.rows
                });
            }
        });   
    } else {
        res.sendStatus(200);     
    }    
}

function updateIssue(req, res, next) {

}

function removeIssue(req, res, next) {
    
}

module.exports = {
    getAllIssues: getAllIssues,
    getSingleIssue: getSingleIssue,
    createIssue: createIssue,
    updateIssue: updateIssue,
    removeIssue: removeIssue,
    client: client
};
