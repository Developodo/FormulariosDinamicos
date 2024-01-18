import { Injectable } from '@angular/core';
import { InputData } from '../model/InputData';

@Injectable({
  providedIn: 'root'
})
export class InputService {
  private _mockData:InputData[]=[]
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
