const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.APP_PORT || 8080;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/students_db';

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Student Schema
const studentSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    edad: Number,
    email: String
});

const Student = mongoose.model('Student', studentSchema);

app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/students', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).send("Student not found");
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Student API (Node) running on port ${port}`);
});
