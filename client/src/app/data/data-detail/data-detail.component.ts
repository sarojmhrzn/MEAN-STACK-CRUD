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

  constructor(private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
  }

  updateUserDetail(type, event) {
    let userObj;
    const value = event.target.value;
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
          city: this.userData.address.city,
          country: this.userData.address.country,
          zip: this.userData.address.zip
        }
      };
    } else if (type === 'city') {
      userObj = {
        address: {
          place: this.userData.address.city,
          city: value,
          country: this.userData.address.country,
          zip: this.userData.address.zip
        }
      };
    } else if (type === 'country') {
      userObj = {
        address: {
          place: this.userData.address.place,
          city: this.userData.address.city,
          country: value,
          zip: this.userData.address.zip
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
      }, err => {
        console.log(err);
      });
  }

}
