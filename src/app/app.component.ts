import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NospaceValidator } from './validators/nospacevalidators';
import { EmpIdValidator } from './validators/empIdValidators';
import { state } from '@angular/animations';
import { countries } from './shared/const/country';
import { states } from './shared/const/state';
import { __values } from 'tslib';

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
    
    this.createSingUpForm()
    this.isAddSame()
    this.isSameAddressHandler()
    this.addDependent()
    this.isconfirmpassword()




  }

isSameAddressHandler(){
      this.formControls['isAddSame'].valueChanges
    .subscribe(val=>{

      if(val){
        let currentAdd=this.formControls['currentAddress'].value;
        this.formControls['parmanentAddress'].patchValue(currentAdd)
        this.formControls['parmanentAddress'].disable()
      }else{
        this.formControls['parmanentAddress'].reset()
        this.formControls['parmanentAddress'].enable()
      }
    })
}

isAddSame(){
      this.formControls['currentAddress'].valueChanges
    .subscribe(res=>{
     
      if(this.formControls['currentAddress'].valid){
this.formControls['isAddSame'].enable()
      }else{
  this.formControls['isAddSame'].disable();
  this.formControls['isAddSame'].reset()
      }
     
    })

}

isconfirmpassword(){
  this.formControls['password'].valueChanges
  .subscribe(val=>{
if(this.formControls['password'].valid){
  this.formControls['confirmPassword'].enable()
}else{
  this.formControls['confirmPassword'].disable()
  this.formControls['confirmPassword'].reset()
}
  })
}

createSingUpForm(){
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
          country:new FormControl("india",[Validators.required]),
          state:new FormControl(null,[Validators.required]),
          city:new FormControl(null,[Validators.required]),
          zipcode:new FormControl(null,[Validators.required])
        }),

                parmanentAddress:new FormGroup({
          country:new FormControl("india",[Validators.required]),
          state:new FormControl(null,[Validators.required]),
          city:new FormControl(null,[Validators.required]),
          zipcode:new FormControl(null,[Validators.required])
        }),

        isAddSame:new FormControl(),
       confirmPassword:new FormControl({value:null,disabled:true}),
       
        password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
        dependents:new FormArray([
          new FormGroup({
            fullName: new FormControl(null,[Validators.required]),
            relationship: new FormControl(null,[Validators.required]),
            citizineship: new FormControl(null,[Validators.required]),
            isrealingwithyou: new FormControl(null,[Validators.required])


          }),
    
    
        ])




    })

}

addDependent(){
if(this.dependentArr.valid){
    let dependentGroup= new FormGroup({
     fullName: new FormControl(null,[Validators.required]),
            relationship: new FormControl(null,[Validators.required]),
            citizineship: new FormControl(null,[Validators.required]),
            isrealingwithyou: new FormControl(null,[Validators.required])


  })
  this.dependentArr.push(dependentGroup)
}
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


get dependentArr(){
  return this.singUpForm.get('dependents') as FormArray
}
onSkillsAdd(){
  let control= new FormControl(null,[Validators.required]);
  this.skillsArr.push(control)
}

onRemove(i : number){
  this.skillsArr.removeAt(i)
}
onremove(i:number){
  this.dependentArr.removeAt(i)
}

// RemoveSkills(i:number){
// this.skillsArr.removeAt(i)
// }
}
//new formcontrol(defaultvalue,[syncvalidatores],[asuncvalidatores])