import { CourseData } from "./CourseData"

export interface CenterData{
    id?:string
    name?:string
    description?:string
    courses?:CourseData[]
}