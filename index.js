const express = require('express');
const app = express()
    .use(express.json())
    .get('/', (req, res) => {
        res.send('Hello, World!');
    })
    .get('/grades/:student_id/', (req, res) => {
        const studentId = req.params.student_id;
        console.log("Student ID:", studentId);
        
        res.end();
    })
    .post('/grades/:student_id/', (req, res) => {
        const studentId = req.params.student_id;
        console.log("Student ID:", studentId);
        console.log('Request Body:', req.body);

        res.end();
    })
    .listen(3000, () => {
        console.log('Server is running on port 3000');
    });