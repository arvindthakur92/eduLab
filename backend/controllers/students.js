import express from 'express';
// import mongoose from 'mongoose';
import StudentList from '../models/students.js';
import studentIdPDFGenenrator from '../utils/studentIdPDFGenenrator.js'
const router = express.Router();

export const generateIdCard = async (req, res) => { 
    try {
        const studentList = await StudentList.find({});
        if (studentList && studentList.length) {
            const filepath = await studentIdPDFGenenrator(studentList);
            if (filepath) {
                res.status(200).json({path: filepath});
            } else {
                res.status(500).json({message: 'failed'});
            }
        } else {
            res.status(401).json({message: 'failed'});
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;