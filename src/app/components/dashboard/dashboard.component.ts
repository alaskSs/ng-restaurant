import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { resData } from 'src/app/restaurant.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class NavbarComponent implements OnInit {

  formValue !: FormGroup;
  resModelObject: resData = new resData;
  allResData: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private _formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this._formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })
    this.getAllData();
    console.log(this.resModelObject);
    console.log(this.resModelObject.id);
  }


  // Note : Now Subscribing our data which is maped via services(ApiServices)
  addRes() {
    this.resModelObject.name = this.formValue.value.name;
    this.resModelObject.email = this.formValue.value.email;
    this.resModelObject.mobile = this.formValue.value.mobile;
    this.resModelObject.address = this.formValue.value.address;
    this.resModelObject.services = this.formValue.value.services;

    this.api.postRes(this.resModelObject).subscribe(res => {
      console.log(res);
      alert("Restaurant Records Added Successfully");
      this.formValue.reset();
      this.getAllData();
    },
      err => {
        alert("Something Went Wrong");
      })
  }

  getAllData() {
    this.api.getRes().subscribe(res => {
      this.allResData = res;
    })
  }

  clickAndResto() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  deleteRes(data: any) {
    this.api.deleteRes(data.id).subscribe(res => {
      alert("Record Deleted!!");
      this.getAllData(); // For Quick refresh data
    })
  }

  onEditRes(data: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.resModelObject.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }

  updateRes2() {
    this.resModelObject.name = this.formValue.value.name;
    this.resModelObject.email = this.formValue.value.email;
    this.resModelObject.mobile = this.formValue.value.mobile;
    this.resModelObject.address = this.formValue.value.address;
    this.resModelObject.services = this.formValue.value.services;
    console.log(this.resModelObject);
    console.log(this.resModelObject.id);

    this.api.updateRes(this.resModelObject, this.resModelObject.id).subscribe(res => {
      alert("Restaurant Record Updated !!");
      this.formValue.reset();
      this.getAllData();
    })

  }


}
