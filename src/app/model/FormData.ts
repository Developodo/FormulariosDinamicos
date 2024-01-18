import { InputData } from "./InputData"
import { OutputData } from "./OutputData"

export interface FormData{
    id?:string
    name?:string
    description?:string
    inputs?:InputData[],
    outputs?:OutputData[] 
}