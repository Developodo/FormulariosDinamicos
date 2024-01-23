import { Injectable } from '@angular/core';
import { InputData } from '../model/InputData';
import { InputType } from '../model/InputType';

@Injectable({
  providedIn: 'root'
})
export class InputService {
  private _mockData:InputData[]=[
    {
      id:1,
      name:'Peso',
      description:'Inserte peso en kgs',
      type:InputType.NUMBER,
      decimal:true,
      decimals:2,
      unit:'kgs'
    },
    {
      id:2,
      name:'Altura',
      description:'Inserte altura en cms',
      type:InputType.NUMBER,
      decimal:false,
      decimals:0,
      unit:'cms'
    },
    {
      id:3,
      name:'Fumador',
      description:'Indique si fuma',
      type:InputType.BOOLEAN,
      decimal:false,
      decimals:0,
      unit:''
    },
  ]
  constructor() { }

  get mockData(): InputData[] {
    return this._mockData;
  }
  set mockData(value: InputData[]) {
    this._mockData = value;
  }

  addInput(input:InputData){
    if(this.searchInput(input.id)){
      return
    }
    this._mockData.push(input)
  }
  removeInput(id:number){
    this._mockData=this._mockData.filter(input=>input.id!==id)
  }
  searchInput(id:number|undefined):InputData|undefined{
    return this._mockData.find(input=>input.id===id)
  }


}
