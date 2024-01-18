import { Component, WritableSignal, inject, signal } from '@angular/core';
import { InputService } from '../../services/input.service';
import { OutputService } from '../../services/output.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGeneratorComponent } from '../../components/form-generator/form-generator.component';

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

  onSubmit(){
   
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
}
