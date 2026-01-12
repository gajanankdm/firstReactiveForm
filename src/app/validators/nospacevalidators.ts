import { AbstractControl, ValidationErrors } from "@angular/forms";


export class NospaceValidator {
    static noSpace(control: AbstractControl): ValidationErrors | null {
        let val:string = control.value
        if (!val) {
            return null
        }

if(val.includes(' ')){
    return {
        npSpaceBar:`space is not allowed`
    }
}else{
    return null
}

    }

}