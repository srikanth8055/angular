import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormsModule, NgModel, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../Service/user/user.service';
import { User } from '../Models/user.model';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  constructor(private rest: UserService, private fb: FormBuilder) { 
  }
  useraddform: FormGroup;
  user: User = {
    name: '',
    password: '',
    mailId: '',
    role: '',
    token: '',
    id:0
  };
 
  ngOnInit() {
    this.useraddform = this.fb.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
      mailId: ['', [Validators.required, Validators.email]]
    });
    this.rest.useredit.subscribe(data => {this.user = data; } );
//this.useraddform.setValue(this.user);
  }

  formclear() {
    this.useraddform.reset();
  }
  Data: any;
  AddUser() {
    var userData = this.useraddform.value;
    this.rest.AddUsers(userData).subscribe((data: User) => {
      this.Data = data;
      this.rest.onChange(this.Data.user);
      this.formclear()
    },
      (error) => {
        console.log(error);
      });
  }
}
