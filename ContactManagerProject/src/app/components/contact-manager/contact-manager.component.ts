import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Icontact } from 'src/app/models/icontact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css'],
})
export class ContactManagerComponents implements OnInit {
  public loading: boolean = false;
  public errorMessage: string | null = null;
  public filteredContacts: Icontact[] = [];
  public contact: Icontact[] = [];
  public searchText: string = '';

  constructor(private contactservice: ContactService, private router: Router) {}

  ngOnInit(): void {
   this.getNewData();
  }

  getNewData(){
    this.loading = true;
    this.contactservice.getContact().subscribe(
      (data) => {
        this.contact = data;
        this.filteredContacts = data;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }
  public isNotEmpty() {
    return Object.keys(this.contact).length > 0;
  }

  DeleteContact(id: any) {
    if (id) {
      this.contactservice.deleteContactById(id).subscribe((data) => console.log(data));
      this.router.navigate(['/']).then();
      this.getNewData();
    }
  }

  onSearch() {
    if (!this.searchText) {
      this.filteredContacts = this.contact;
    }
    this.filteredContacts = this.contact.filter((contact) =>
      JSON.stringify(contact)
        .toLowerCase()
        .includes(this.searchText.toLowerCase())
    );
  }
}
