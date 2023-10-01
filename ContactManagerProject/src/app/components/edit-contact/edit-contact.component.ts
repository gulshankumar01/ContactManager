import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Icontact } from 'src/app/models/icontact';
import { IGroup } from 'src/app/models/igroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  public contactId: string | null = null;
  public contact: Icontact = {} as Icontact;
  public groups: IGroup[] = [] as IGroup[];
  //public group:IGroup={} as IGroup
  contactForm !:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contactservice: ContactService,
    private activateroute: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      id: [''],
      name: [''],
      groupId: [''],
      photo: [''],
      title:[''],
      email: [''],
      mobile: [''],
      company: ['']
    
    });

    this.activateroute.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId');
    });
    this.contactservice.getGropus().subscribe((data) => {
      this.groups = data;
    });
    if (this.contactId) {
      this.contactservice.getContactById(this.contactId).subscribe((data) => {
        this.contact = data;
        // this.contactservice.getGropuById(data.groupId).subscribe((data)=>{
        //   this.group=data})
       this.contactForm?.patchValue(this.contact);
        // this.contactForm.setValue({
        //   id:this.contact.id,
        //   name:this.contact.name,
        //   photo:this.contact.photo,
        //   title:this.contact.title,
        //   company:this.contact.company,
        //   email:this.contact.email,
        //   mobile:this.contact.mobile,
        //   groupId:this.group.name
        // })
      });
    } 
   
  }

  onSubmit(): void {
    if(this.contactId){
      console.log(this.contact)
   this.contactservice.updateContact(this.contactId,this.contactForm.value).subscribe((data)=>{
    console.log(this.contact);
    
    this.router.navigate(['/']).then()
    window.alert("Ur data updated");

   })
    }
  }
}
