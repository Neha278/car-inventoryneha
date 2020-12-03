import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DialogFormComponent} from './dialog-form/dialog-form.component'
// import { CommonService } from './common.service';

export interface periodicElement{
  orderId:number;
  make:string;
  model:string;
  price:number;
}

const cars:periodicElement[]=[
  {orderId:1,make:"Toyota",model:"Celica",price:350000},
  {orderId:2,make:"Ford",model:"Mondeo",price:550000},
  {orderId:3,make:"Honda",model:"CRV",price:850000}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public dialog:MatDialog){}


  
  displayedColumns: string[] = ['orderId', 'make', 'model', 'price','action'];
  dataSource = cars;

 

  addCars=new FormGroup({
    orderId:new FormControl(''),
    make:new FormControl(''),
    model:new FormControl(''),
    price:new FormControl('')
  })
  
  isEdit=false;
  
  onSubmit(){
     if(!this.isEdit){
      this.dataSource.push(this.addCars.value);
      }else{
      let car={
        orderId: this.addCars.get('orderId').value,
        make:this.addCars.get('make').value,
        model:this.addCars.get('model').value,
        price:this.addCars.get('price').value
       };
       for(let i=0;i<this.dataSource.length;i++){
         if(this.dataSource[i].orderId===car.orderId){
              this.dataSource[i]=car;
         }
       }
       this.isEdit=false;
       
     }
     this.addCars=new FormGroup({
      orderId:new FormControl(''),
      make:new FormControl(''),
      model:new FormControl(''),
      price:new FormControl('')
    })
  }
  
  editCar(car:any){
    this.isEdit=true;
    let temp=new FormGroup({
      orderId:new FormControl(car.orderId),
      make:new FormControl(car.make),
      model:new FormControl(car.model),
      price:new FormControl(car.price)
    })
    this.addCars=temp;
          
  }
  deleteCar(car){
    const index=this.dataSource.indexOf(car);
    if(confirm('Do you want to delete this product?')){
      this.dataSource.splice(index,1)
    }
  }

  
    
  }  

