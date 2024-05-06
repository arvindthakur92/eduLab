import mongoose from 'mongoose';
const studentSchema = mongoose.Schema({
    id_number: String,
    firstName: String,
    lastName: String,
    gender: String,
    email: String,
    age: Number,
    phone: Number,
    photo_url: String,
    blood_group: String,
    issued_on: String
}, { collection: 'student' })

var StudentList = mongoose.model('student', studentSchema);

export default StudentList;