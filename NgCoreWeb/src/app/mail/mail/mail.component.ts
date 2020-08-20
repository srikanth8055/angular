import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Mail } from '../../Models/Mail';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  mail: Mail;
  MyMailForm: FormGroup;

  ngOnInit() {
    this.MyMailForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      subject: ['', Validators.required],
      body: ['', Validators.required]
    })
  }

}
