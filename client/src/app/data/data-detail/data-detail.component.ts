import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service';

@Component({
  selector: 'app-data-detail',
  templateUrl: './data-detail.component.html',
  styleUrls: ['./data-detail.component.css'],
  providers: [DataService]
})
export class DataDetailComponent implements OnInit {

  @Input() userData;
  addUser: string;

  constructor(private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
    this.addUser = localStorage.getItem('addUser');
    if (this.addUser === 'addUserClicked') {
      this.userData = {};
      this.userData.id = '';
      this.userData.name = '';
      this.userData.email = '';
      this.userData.grade = '';
      this.userData.subject = '';
      this.userData.joinedDate = '';
      this.userData.place = '';
      this.userData.city = '';
      this.userData.country = '';
      this.userData.zip = '';
    }
  }

  updateUserDetail(type, event) {
    let userObj;
    const value = event.target.value;
    if (localStorage.getItem('addUser') === 'addUserClicked') {
      if (type === 'name') {
        localStorage.setItem('name', value);
      } else if (type === 'email') {
        localStorage.setItem('email', value);
      } else if (type === 'grade') {
        localStorage.setItem('grade', value);
      } else if (type === 'subject') {
        localStorage.setItem('subject', value);
      } else if (type === 'joinedDate') {
        localStorage.setItem('joinedDate', value);
      } else if (type === 'place') {
        localStorage.setItem('place', value);
      } else if (type === 'city') {
        localStorage.setItem('city', value);
      } else if (type === 'country') {
        localStorage.setItem('country', value);
      } else {
        localStorage.setItem('zip', value);
      }
    } else {

      if (type === 'name') {
        userObj = { name: value };
      } else if (type === 'email') {
        userObj = { email: value };
      } else if (type === 'grade') {
        userObj = { grade: value };
      } else if (type === 'subject') {
        userObj = { subject: value };
      } else if (type === 'joinedDate') {
        userObj = { joinedDate: value };
      } else if (type === 'place') {
        userObj = {
          address: {
            place: value,
            city: this.userData.city,
            country: this.userData.country,
            zip: this.userData.zip
          }
        };
      } else if (type === 'city') {
        userObj = {
          address: {
            place: this.userData.city,
            city: value,
            country: this.userData.country,
            zip: this.userData.zip
          }
        };
      } else if (type === 'country') {
        userObj = {
          address: {
            place: this.userData.place,
            city: this.userData.city,
            country: value,
            zip: this.userData.zip
          }
        };
      } else {
        userObj = {
          address: {
            place: value,
            city: this.userData.city,
            country: this.userData.country,
            zip: value
          }
        };
      }


      this.dataService.updateUser(this.userData.id, userObj)
        .subscribe(response => {
          this.router.navigateByUrl('/analysis', { skipLocationChange: true }).then(() =>
            this.router.navigate(['/data']));
        });

    }

  }

}
