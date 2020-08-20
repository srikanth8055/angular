import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgControl, ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  RegistrationForm: FormGroup;
  submitted = false;


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.RegistrationForm = this.fb.group(
      {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
      }
    );
  }

  get f() { return this.RegistrationForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.RegistrationForm.valid) {
      console.log(this.RegistrationForm.value)
    }
  }

}
