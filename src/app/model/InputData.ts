import { InputType } from "./InputType";

export interface InputData{
    id?:number;
    name?:string;
    description?:string;
    type:InputType;
    decimal:boolean;
    decimals:number;
    unit?:string
}