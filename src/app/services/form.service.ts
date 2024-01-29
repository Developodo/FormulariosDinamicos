import { Injectable } from '@angular/core';
import { FormsData } from '../model/FormsData';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private _mockData:FormsData[]=[
    {
      "id": "5799",
      "name": "Calculo de IMC",
      "description": "",
      "outputs": [
          1
      ],
      "inputs": [
          1,
          2
      ]
  }
  ]
  constructor() { }

  get mockData(): FormsData[] {
    return this._mockData;
  }
  set mockData(value: FormsData[]) {
    this._mockData = value;
  }

  addForm(form:FormsData){
    this._mockData.push(form)
  }
}
