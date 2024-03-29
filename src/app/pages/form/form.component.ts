import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, inject } from '@angular/core';
import { InputData } from '../../model/InputData';
import { InputService } from '../../services/input.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OutputData } from '../../model/OutputData';
import { OutputService } from '../../services/output.service';
import { FormService } from '../../services/form.service';
import { FormsData } from '../../model/FormsData';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CdkDrag,CdkDropList,CdkDropListGroup,ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  formBuilder = inject(FormBuilder);
  formGroup!:FormGroup;
  inputsAvailable:InputData[]=inject(InputService).mockData;
  inputsSelected:InputData[]=[];
  outputsRelated:OutputData[]=[];
  outputService = inject(OutputService);
  formService = inject(FormService);

  constructor(){
    this.formGroup=this.formBuilder.group({
      name:['',Validators.required],
      outputsSelected:new FormArray([]),
      description:['']
    })
  }
  drop(event: CdkDragDrop<InputData[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const inputsId = this.inputsSelected.map(item => item.id);
      this.outputsRelated=this.outputService.getOutputsWithInputsId(inputsId as any);
    }
  }
  onCheckChange(event:any) {
    const formArray: FormArray = this.formGroup.get('outputsSelected') as FormArray;
  
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
  
      formArray.controls.forEach((ctrl: AbstractControl) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
  
        i++;
      });
    }
  }
  onSubmit(){
    //https://stackoverflow.com/questions/40927167/angular-reactiveforms-producing-an-array-of-checkbox-values
   
    const form:FormsData = {
      id:Math.floor(1000 + Math.random() * 9000)+"",
      name:this.formGroup.get('name')?.value,
      description:this.formGroup.get('description')?.value,
      outputs:this.formGroup.get('outputsSelected')?.value,
      inputs:this.inputsSelected.map(item => item.id) as any
    };
    console.log(form)
    this.formService.addForm(form);
    //this.formGroup.reset();
  }
}
