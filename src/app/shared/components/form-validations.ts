import { FormArray, FormControl, FormGroup } from '@angular/forms';


export class FormValidations{
    static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
        const config: any = {
          'required': `${fieldName} é obrigatório.`,
          'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
          'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
          'emailInvalido': 'Email já cadastrado!',
          'equalsTo': 'Campos não são iguais',
          'pattern': 'Campo inválido'
        };
    
        return config[validatorName];
      }
}