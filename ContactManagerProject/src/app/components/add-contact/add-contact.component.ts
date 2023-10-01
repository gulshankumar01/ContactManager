import { Component, OnInit } from '@angular/core';
import { Icontact } from 'src/app/models/icontact';
import { IGroup } from 'src/app/models/igroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
public groups:IGroup[]=[]as IGroup[];
public contact:Icontact={} as Icontact;

constructor(private httpserver:ContactService){}

  ngOnInit(): void {
    this.httpserver.getGropus().subscribe((data)=>{
      this.groups=data
    })
  }

   onSubmit(){
    this.httpserver.addContacts(this.contact).subscribe((data)=>{
      console.log(data)
    })
   }
   
}
