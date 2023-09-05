import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJyYWhlbW1vbnRhQGdtYWlsLmNvbSIsImlhdCI6MTY5MTc1MTk3MSwiZXhwIjoxNjkyMDExMTcxfQ.Nm_li0mHonj-BELOE_cqX5sj8K3tWZUMSnkfOlBCWXk';
const headers = new HttpHeaders({
   Authorization: `Bearer ${authToken}`

});

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  uploadImage(imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', imageFile);

    return this.http.post('http://localhost:3000/v1/api/products/upload', formData);
  }

  // getImageUrl(imageName: string): string {
  //   return `http://localhost:3000/v1/api/products/upload/${imageName}.jpg`;
  // }


  // getImage(imageName:string){
  //   return this.http.get(`http://localhost:3000/v1/api/products/photos/${imageName}.jpg`,{

  //     headers: headers,
  //   });

  // }
}
