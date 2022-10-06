import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PingController } from './endpoints/PingController'
import { ClassroomController } from './endpoints/ClassroomController'
import { StudentController } from './endpoints/StudentController'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || 3003, () => {
    console.log(`Server running in port ${process.env.PORT || 3003}`)
})

const pingController = new PingController()
const classroomController = new ClassroomController()
const studentController = new StudentController()

app.get("/ping", pingController.ping )

app.post("/classrooms", classroomController.createClassroom)

app.get("/classrooms/actives", classroomController.getClassroomActive )

app.put("/classrooms/:id", classroomController.editClassroomModule)

app.post("/students", studentController.createStudent)

app.get("/students/:q", studentController.searchStudentByName)

app.put("/students/:id", studentController.editStudentSClassroom)

app.get("/students/classrooms/:id", studentController.getStudentsByClassroom)