import { Component, WritableSignal, inject, signal } from '@angular/core';
import { InputService } from '../../services/input.service';
import { OutputService } from '../../services/output.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGeneratorComponent } from '../../components/form-generator/form-generator.component';
import { OutputData } from '../../model/OutputData';

@Component({
  selector: 'app-output',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,FormGeneratorComponent],
  templateUrl: './output.component.html',
  styleUrl: './output.component.scss'
})
export class OutputComponent {
  inputService = inject(InputService);
  outputService = inject(OutputService);
  
  formBuilder = inject(FormBuilder);
  formGroup!:FormGroup;

  ids:number[]=[];

  constructor(){

    this.formGroup=this.formBuilder.group({
      name:['',Validators.required],
      description:[''],
      calculation:['',Validators.required],
      calculation_valid:[false,Validators.required],
      text_lower:[''],
      value_lower:[0],
      text_upper:[''],
      value_upper:[0],
      unit:['',Validators.required]
    })
  }

  onSubmit(event:any){
    console.log(event)
    console.log(this.formGroup)
    const output:OutputData={
      id:Math.floor(1000 + Math.random() * 9000),
      name:this.formGroup.get('name')?.value,
      description:this.formGroup.get('description')?.value,
      inputsIds:this.getIdsFromCalculation(),
      calculations:this.formGroup.get('calculation')?.value,
      lowerValue:{
        value:this.formGroup.get('value_lower')?.value,
        text:this.formGroup.get('text_lower')?.value
      },
      upperValue:{
        value:this.formGroup.get('value_upper')?.value,
        text:this.formGroup.get('text_upper')?.value
      }
    }
    console.log(output);
    this.outputService.addOutput(output);


    this.formGroup.reset();
  }

  /**
   * Lee el valor del textarea y valida si es una expresión matemática correcta con eval
   * @param event 
   */
  validCalculation(event:any){
    if(event.srcElement.value.trim().length==0){
      this.formGroup.get('calculation_valid')?.setValue(false);
      return;
    }
    try{
      const test = eval(event.srcElement.value);
    
      this.formGroup.get('calculation_valid')?.setValue(test===undefined?false:true);
    }catch(error){
      this.formGroup.get('calculation_valid')?.setValue(false)
    }

  }
  getIdsFromCalculation(){
    const patronRegex = /#(\d+){([^}]+)}/gi;
    const inputs = [...this.formGroup.get('calculation')?.value.matchAll(patronRegex)];
    const inputsValues = [];
    for (const input of inputs) {
      inputsValues.push(input[1]);
    }
    return inputsValues;
   
  }
  setCalculation(event:any){
    console.log("QUE PASA")
    this.formGroup.get('calculation')?.setValue(event);
  }
}
