import { InputData } from "./InputData"
import { OutputData } from "./OutputData"

export interface FormsData{
    id?:string
    name?:string
    description?:string
    inputs?:number[],
    outputs?:number[] 
}