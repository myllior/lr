import {Component} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyValidator} from "./my.validators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lr5';
  form: FormGroup

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(
        '',
        [
          Validators.email,
          Validators.required,
          MyValidator.restrictedEmails
        ]
      ),
      password: new FormControl(
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10)
        ]
      ),
      address: new FormGroup({
        country: new FormControl(
          'ua',
          [
            Validators.required,
            Validators.minLength(2)
          ]),
        city: new FormControl('Запорожье', Validators.required)
      }),
      skills: new FormArray([])
    })
  }

  addSkill() {
    const control = new FormControl('', Validators.required);
    (<FormArray>this.form.get('skills')).push(control);
  }
  removeSkill(index: number) {
    (<FormArray>this.form.get('skills')).removeAt(index)
  }

  setCapital() {
    const mapCity = {ua: "Киев", pl: "Варшава", de: "Берлин"}
    const getCity = this.form.get('address').value.country
    this.form.get('address').patchValue({city: mapCity[getCity]});
  }

  submit() {
    const formControl = {...this.form.value}
    console.log(formControl)
    this.form.reset()
  }
}
