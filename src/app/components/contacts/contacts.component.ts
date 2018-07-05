import { Component, OnInit } from '@angular/core';
import { Contact, ContactClass } from '../../showcase/domain/contact';
import { ConfirmationService } from 'primeng/api';

import { ContactsService } from '../../showcase/services/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers:[ConfirmationService]
})
export class ContactsComponent implements OnInit {

  dialogContactAdd:boolean = false;
  dialogContactInformation:boolean = false;

  cols:any[];
  checked: boolean = true;
  msgs: any[] = [];

  saveRegister:boolean = true;
  saveUpdate:boolean = false;
  
  contacts:Contact[] = [];
  contactSelected:ContactClass = new ContactClass();
  contactTemp:ContactClass = new ContactClass();
  contactNew:ContactClass = new ContactClass();

  constructor(private confirmationService: ConfirmationService, private dataJson:ContactsService) { }

  ngOnInit() {
    this.cols = [
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' }
    ];

    this.dataJson.getContactsDefault().then(response =>{
      this.contacts = response;
      this.orderByName();
    });

  }

  /*
  IDs
    1:Contact Add
    2:Contact Details
  */
  dialogs(id,contact?){

    this.contactNew = new ContactClass();
    this.contactTemp = new ContactClass();

    switch (id){
      case 1:
        this.dialogContactAdd = !this.dialogContactAdd;
        break;
      case 2:
        this.dialogContactInformation = !this.dialogContactInformation;
        this.checked = true;

        this.contactSelected = contact;
        this.assigneeData(this.contactTemp , contact);
        break;
    }
  }

  confirmDropChanges() {
      this.dialogContactInformation  = false;
      this.confirmationService.confirm({
          message: 'Are you sure you want to drop the changes made to the contact?',
          accept: () => {
            this.msgs = [{severity:'info', summary:'Rejected', detail:'Changes rejected'}];
        },
        reject: () => {
            this.dialogContactInformation  = true;
        }
      });
  }

  saveContact(){
    this.saveRegister = true;
    this.dialogContactAdd = false;

    this.contactNew.contactId = this.generateId();
    this.contacts.push(this.contactNew);
    this.orderByName();

    this.msgs = [{severity:'success', summary:'Confirmed', detail:'Contact saved'}];
  }

  delete(){
    this.dialogContactInformation = false;
    for(let i = 0; i < this.contacts.length ; i++){
      if(this.contacts[i].contactId == this.contactTemp.contactId){
        this.contacts.splice(i,1);
        this.msgs = [{severity:'success', summary:'Confirmed', detail:'Contact delected'}];
      }
    }
  }

  saveInformation(){
    this.dialogContactInformation = false;
    this.assigneeData(this.contactSelected , this.contactTemp);
    this.msgs = [{severity:'success', summary:'Confirmed', detail:'Changes saved'}];
  }

  /*
  IDs
    1:Contact Add
    2:Contact Details
  */
  verifyName(name,id){
    if(id == 1){
      if(String(name).length > 0){
        this.saveRegister = false;
      }
      else{
        this.saveRegister = true;
      }
    }
    if(id == 2){
      if(String(name).length > 0){
        this.saveUpdate = false;
      }
      else{
        this.saveUpdate = true;
      }
    }
  }

  orderByName(){
    this.contacts.sort(function(a, b){
      if(a.firstName < b.firstName) return -1;
      if(a.firstName > b.firstName) return 1;
      return 0;
    })
  }

  generateId():string{
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    let string_length = 19;
    let randomstring = "";
    for (let i = 0; i < string_length; i++) {
      let rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum,rnum+1);
    }
    return randomstring;
  }

  assigneeData(contactTemp,contact){
    contactTemp.contactId = contact.contactId;
    contactTemp.firstName =  contact.firstName;
    contactTemp.lastName =  contact.lastName;
    contactTemp.phoneNumber =  contact.phoneNumber;
    contactTemp.email =  contact.email;
    contactTemp.streetAddress1 =  contact.streetAddress1;
    contactTemp.streetAddress2 =  contact.streetAddress2;
    contactTemp.city =  contact.city;
    contactTemp.state =  contact.state;
    contactTemp.zipCode =  contact.zipCode; 
  }
  
}
