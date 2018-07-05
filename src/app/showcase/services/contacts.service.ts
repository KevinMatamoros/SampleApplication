import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Contact } from '../domain/contact';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient ) { }

  getContactsDefault(){
    return this.http.get("./assets/showcase/data/contacts.json")
                .toPromise()
                .then(res => <Contact[]> res)
                .then(data => { return data; });
  }

}
