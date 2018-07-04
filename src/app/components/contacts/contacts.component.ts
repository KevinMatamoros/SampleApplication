import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Contact } from '../../showcase/domain/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  dialogContactAdd:boolean = false;
  dialogContactInformation:boolean = false;

  cols:any[];
  
  selectedContact:Contact;

  contacts:Contact[] = [];

  constructor(private toast:ToastrService) { }

  ngOnInit() {
    this.cols = [
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' }
    ];

    let contact:Contact = {
      contactId : "1",
      firstName: "Kevin",
      lastName: "Matamoros",
      phoneNumber: "",
      streetAddress1: "",
      streetAddress2: "",
      city: "",
      state: "",
      zipCode: "",
    };

    let contact2:Contact = {
      contactId : "2",
      firstName: "Aaron",
      lastName: "Chaves",
      phoneNumber: "",
      streetAddress1: "",
      streetAddress2: "",
      city: "",
      state: "",
      zipCode: "",
    };

    let contact3:Contact = {
      contactId : "3",
      firstName: "Fernanda",
      lastName: "Montero",
      phoneNumber: "",
      streetAddress1: "",
      streetAddress2: "",
      city: "",
      state: "",
      zipCode: "",
    };

    let contact4:Contact = {
      contactId : "4",
      firstName: "Gabo",
      lastName: "Azofeifa",
      phoneNumber: "",
      streetAddress1: "",
      streetAddress2: "",
      city: "",
      state: "",
      zipCode: "",
    };


    this.contacts.push(contact);
    this.contacts.push(contact2);
    this.contacts.push(contact3);
    this.contacts.push(contact4);
  }

  showSuccess(){
    this.toast.success('Hello world!', 'Toastr fun!');
  }

  /*
  IDs
    1:Contact Add
    2:Contact Information
  */
  dialogs(id){
    switch (id){
      case 1:
        this.dialogContactAdd = !this.dialogContactAdd;
        break;
      case 2:
        this.dialogContactInformation = !this.dialogContactInformation;
    }
  }
  
  test(contact){
    console.log(contact);
  }
  test2(){
    console.log("contact");
  }

}
