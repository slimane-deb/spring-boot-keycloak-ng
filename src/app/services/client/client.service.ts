import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(public http: HttpClient) { }

  getUserFromBackend(url: any){
    return this.http.get<any>(url);
  }
}
