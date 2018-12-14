import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service';

@Component({
  selector: 'app-filter-data',
  templateUrl: './filter-data.component.html',
  styleUrls: ['./filter-data.component.css'],
  providers: [DataService]
})
export class FilterDataComponent implements OnInit {

  @Input() userId: string;
  @Input() removeId: string;

  @Output() inputEvent = new EventEmitter<string>();

  constructor(private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
  }

  sendInputText() {
    this.inputEvent.emit(this.userId);
    localStorage.setItem('filterText', this.userId);
  }

  addUser() {
    if (localStorage.getItem('name') !== null && localStorage.getItem('name') !== '') {
      const userObj = {
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        grade: localStorage.getItem('grade'),
        subject: localStorage.getItem('subject'),
        joinedDate: localStorage.getItem('joinedDate'),
        address: {
          place: localStorage.getItem('place'),
          city: localStorage.getItem('city'),
          country: localStorage.getItem('country'),
          zip: localStorage.getItem('zip'),
        }
      };

      this.dataService.createUser(userObj)
        .subscribe(response => {
          localStorage.removeItem('name');
          localStorage.removeItem('addUser');
          this.router.navigateByUrl('/analysis', { skipLocationChange: true }).then(() =>
            this.router.navigate(['/data']));
        }, err => {
        });

    } else {
      this.inputEvent.emit(null);
    }
  }

  removeUser() {
    this.dataService.deleteUser(this.removeId)
      .subscribe(response => {
        this.router.navigateByUrl('/analysis', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/data']));
      }, err => {
        console.log(err);
      });
  }
}
