const express = require('express');
const pg = require('pg');
const client = new pg.Client({
    user: "user17",
    host: "192.168.0.207",
    database: "user17_db",
    password: "6DP4RST8",
    port: 5432
});

const app = express()
    .use(express.json())
    .get('/grades/:student_id/', async (req, res) => {
        const studentId = req.params.student_id;
        const sql = "SELECT * FROM grades WHERE student_id = $1";
        const result = await client.query(sql, [studentId]);
        
        console.table(result.rows);

        res.send(result.rows);
        res.end();
    })
    .post('/grades/:student_id/', async (req, res) => {
        const studentId = req.params.student_id;
        console.log("Student ID:", studentId);
        console.log('Request Body:', req.body);

        res.end();
    })
    .listen(3000, async () => {
        await client.connect();
        console.log('Server is running on port 3000');
    })
    .on("close", async () => {
        await client.end();
    });