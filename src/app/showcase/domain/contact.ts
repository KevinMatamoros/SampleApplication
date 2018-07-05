export interface Contact {
    contactId:string,
    firstName:string,
    lastName:string,
    phoneNumber:string,
    email:string,
    streetAddress1:string,
    streetAddress2:string,
    city:string,
    state:string,
    zipCode:string
}

export class ContactClass implements Contact {
    contactId:string = "";
    firstName:string = "";
    lastName:string = "";
    phoneNumber:string = "";
    email:string = "";
    streetAddress1:string = "";
    streetAddress2:string = "";
    city:string = "";
    state:string = "";
    zipCode:string = "";
    constructor(){}
  }