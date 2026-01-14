import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NospaceValidator } from './validators/nospacevalidators';
import { EmpIdValidator } from './validators/empIdValidators';
import { state } from '@angular/animations';
import { countries } from './shared/const/country';
import { states } from './shared/const/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'firstReactiveForm';
  singUpForm!:FormGroup
  genderArr=['Male','Female','Other']
  countryArr:string[]=countries
  stateArr:string[]=states
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

      adharcard:new FormControl(null,[
        Validators.required,
         Validators.pattern(/^[2-9]{1}[0-9]{11}$/),
        Validators.maxLength(12),
        NospaceValidator.noSpace
        ]),
        pancard:new FormControl(null,[
          Validators.required,
         Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/),
          NospaceValidator.noSpace,
          Validators.minLength(6),
          Validators.maxLength(10)
        ]),
        gender: new FormControl('Male'),
        skills: new FormArray([new FormControl('js')]),

        currentAddress:new FormGroup({
          country:new FormControl(null,[Validators.required]),
          state:new FormControl(null,[Validators.required]),
          city:new FormControl(null,[Validators.required]),
          zipcode:new FormControl(null,[Validators.required])
        }),
        addressSame:new FormControl(null)



    })


  }
onSingUp(){

  console.log(this.singUpForm)
  console.log(this.singUpForm.controls)

}
get formControls(){
  return this.singUpForm.controls

}
 get userName(){
 return this.singUpForm.get('UserName')as FormControl
}

get skillsArr(){
  return this.singUpForm.get('skills') as FormArray
}



onSkillsAdd(){
  let control= new FormControl(null,[Validators.required]);
  this.skillsArr.push(control)
}

onRemove(i : number){
  this.skillsArr.removeAt(i)
}


// RemoveSkills(i:number){
// this.skillsArr.removeAt(i)
// }
}
//new formcontrol(defaultvalue,[syncvalidatores],[asuncvalidatores])