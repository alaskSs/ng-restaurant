import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormValue !: FormGroup;
  constructor(private _formBuilder: FormBuilder, private router: Router, private _http: HttpClient) { }

  ngOnInit(): void {
    this.loginFormValue = this._formBuilder.group({
      email: [''],
      password: ['']
    })
  }

  logIn() {
    this._http.get<any>("http://localhost:3000/signup").subscribe(res => {
      const user = res.find((a: any) => {
        return a.email === this.loginFormValue.value.email && a.password === this.loginFormValue.value.password;
      })
      if (user) {
        alert("User Login Successfull !!");
        this.loginFormValue.reset();
        this.router.navigate(['restaurant']);
      }else{
        alert("User Not Found !!");
      }
    },err =>{
      alert("Server Failed !!");
    })
  }
}
