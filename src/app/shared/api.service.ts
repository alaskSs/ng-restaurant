import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  // Creating POST(Create Resturant), GET PUT(update) DELETE

  postRes(data: any) {
    // Pipe used to add multiple func into single func
    return this._http.post("http://localhost:3000/posts", data).pipe(map((res: any) => { return res; }));
  }

  getRes() {
    return this._http.get<any>("http://localhost:3000/posts").pipe(map((res: any) => { return res }));
  }

  updateRes(data: any,id: any) {
    return this._http.put<any>("http://localhost:3000/posts/" + id, data).pipe(map((res: any) => { return res }));
  }

  deleteRes(id: any) {
    return this._http.delete<any>("http://localhost:3000/posts/" + id).pipe(map((res: any) => { return res }));
  }



}
