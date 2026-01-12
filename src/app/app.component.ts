import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NospaceValidator } from './validators/nospacevalidators';
import { EmpIdValidator } from './validators/empIdValidators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'firstReactiveForm';
  singUpForm!:FormGroup
patterns = {
    onlyText: '^[a-zA-Zg]+$',
    email: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
  }
  ngOnInit(): void {
    
    this.singUpForm= new FormGroup({
      UserName: new FormControl(null,[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
        Validators.pattern(this.patterns.onlyText),
        NospaceValidator.noSpace
      ],[]),
      email: new FormControl(null,[
        Validators.required,
        Validators.pattern(this.patterns.email)
      
      ]),
      empId:new FormControl(null,[Validators.required, EmpIdValidator.isEmpIdValid]),
     


    })


  }
onSingUp(){

}
get formControls(){
  return this.singUpForm.controls

}
 get userName(){
 return this.singUpForm.get('UserName')as FormControl
}
}
//new formcontrol(defaultvalue,[syncvalidatores],[asuncvalidatores])