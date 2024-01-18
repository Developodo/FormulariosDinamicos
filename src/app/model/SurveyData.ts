import { CourseData } from "./CourseData"

export interface SurveyData{
    id?:string
    name?:string
    description?:string
    formData?:FormData 
    date:Date,
    courseData?:CourseData
}