const express = require('express');
const pg = require('pg');
const database = new pg.Client({
    user: 'user17',
    host: '192.168.0.207',
    database: 'user17_db',
    password: '6DP4RST8',
    port: 5432
});

const app = express()
    .use(express.json())
    .get('/students/:student_id/grades', async (req, res) => {
        const studentId = req.params.student_id;
        const sql = 'SELECT * FROM grades WHERE student_id = $1';
        const result = await database.query(sql, [studentId]);
        
        console.table(result.rows);

        res.send(result.rows);
        res.end();
    })
    .post('/students/:student_id/grades', async (req, res) => {
        const studentId = parseInt(req.params.student_id);
        const course_id = req.body.course_id;
        const grade = req.body.grade;

        if(studentId === null || 
            !Number.isInteger(studentId) || 
            !Number.isFinite(studentId)
        ) {
            res.status(400).send({ "error": "invalid student_id" });
            return;
        }

        if(course_id === null || 
            !Number.isInteger(course_id) || 
            !Number.isFinite(course_id)
        ) {
            res.status(400).send({ "error": "invalid course_id" });
            return;
        }

        if(grade === null || 
            !Number.isInteger(grade) || 
            !Number.isFinite(grade)
        ) {
            res.status(400).send({ "error": "invalid grade" });
            return;
        }

        const sql = "INSERT INTO grades (student_id, course_id, grade) VALUES ($1, $2, $3);";
        const result = await database.query(sql, [studentId, course_id, grade]);
        
        res.end();
    })
    .patch('/grades/:grade_id', async (req, res) => {
        const grade_id = parseInt(req.params.grade_id);
        const value = parseInt(req.body.value);

        if(grade_id === null || 
            !Number.isInteger(grade_id) || 
            !Number.isFinite(grade_id)
        ) {
            res.status(400).send({ "error": "invalid grade_id" });
            return;
        }

        if(value === null || 
            !Number.isInteger(value) || 
            !Number.isFinite(value)
        ) {
            res.status(400).send({ "error": "invalid value" });
            return;
        }

        const sql = "UPDATE grades SET grade = $1 WHERE id = $2;";
        const result = await database.query(sql, [value, grade_id]);
        
        res.end();
    })
    .listen(3000, async () => {
        await database.connect();
        console.log('Server is running on port 3000');
    })
    .on('close', async () => {
        await database.end();
    });