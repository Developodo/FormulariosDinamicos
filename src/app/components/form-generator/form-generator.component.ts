import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, WritableSignal, signal } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { CdkDrag, CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

interface Item {
  id: number;
  text: string;
  selected:boolean;
}

@Component({
  selector: 'app-form-generator',
  standalone: true,
  imports: [CommonModule, DragDropModule,CdkDropList, CdkDrag],
  templateUrl: './form-generator.component.html',
  styleUrl: './form-generator.component.scss'
})
export class FormGeneratorComponent {
  public inputBuffer: string = '';
  private inputBufferSubject = new Subject<string>();

  items: Item[] = [];
  selectedItemId: number | null = null;
  itemsid:number = 0;
  status:WritableSignal<any>=signal({
    error:false,
    inputs:[]
  })

  ngOnInit() {
    this.inputBufferSubject
      .pipe(debounceTime(750))
      .subscribe(() => {
        this.handleInputBuffer();
      });
  }
  handleInputBuffer() {
    if (this.inputBuffer) {
      this.insertElement(this.inputBuffer);
      this.inputBuffer = '';
    }
  }


  onDrop(event: any) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    
    //const draggedItemId = event.item.data.id;
    this.evaluateFormulas();
  }

  insertElement(newText: string) {
    const newItem: Item = { id: this.itemsid++, text: newText , selected:false};
    this.items.push(newItem);
    this.evaluateFormulas();
    //this.evaluateFormulas();
  }

  selectItem(item:any) {
      this.items=this.items.map(i => {return {...i,selected : false}});
      this.items=this.items.map(i => {return {...i,selected : i.id===item.id}});
      this.selectedItemId=item.id;
  }

  deleteItem(itemId: number) {
    this.items = this.items.filter(item => item.id !== itemId);
    this.selectedItemId = null;
    this.evaluateFormulas();
  }
  handleKeyNumber(key: string) {
    this.inputBuffer += key;
    this.inputBufferSubject.next('');
  }
  
  handleKey(...key: string[]) {
    for(const k of key){
      this.insertElement(k)
    }  
  }

  evaluateFormulas() {
    const concatenatedFormula = this.items.map(item => item.text).join('');
    try {
      // Intenta evaluar la fórmula completa
      const result = eval(concatenatedFormula);
      console.log('Resultado de la fórmula completa:', result);
      if(result){
        this.status.update(()=>{
          return {
            error:false,
            inputs:this.items
          }
        })
      }else{
        this.status.update(()=>{
          return {
            error:true,
            inputs:this.items
          }
        })
      }
    } catch (error) {
      // Si hay un error al evaluar la fórmula, puedes manejarlo aquí
      //console.error('Error al evaluar la fórmula completa:', error);
      this.status.update(()=>{
        return {
          error:true,
          inputs:this.items
        }
      })
    }
  }

  /**
   * Elimina de items el item seleccionado o no hace nada si no hay ninguno
   */
  removeItem(){
    if(this.selectedItemId){
      this.items=this.items.filter(item => item.id !== this.selectedItemId);
      this.evaluateFormulas();
    }
  }

  try(){
    this.evaluateFormulas();
  }
}