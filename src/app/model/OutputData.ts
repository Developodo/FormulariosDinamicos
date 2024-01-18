import { InputData } from "./InputData";

export interface OutputData{
    id?:string,
    name?:string,
    description?:string,
    inputs?:InputData[],
    calculations?:string
    lowerValue:{
        value:number,
        text:string
    },
    upperValue:{
        value:number,
        text:string
    }
    unit?:string
}