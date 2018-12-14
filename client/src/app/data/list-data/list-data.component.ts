import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { DataDetailComponent } from '../data-detail/data-detail.component';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.css'],
  providers: [DataService, DataDetailComponent]
})
export class ListDataComponent implements OnInit {

  userArray: Array<any> = [];
  userId: string;
  removeId: string;
  userData: any;
  localFilterText: string;

  count;
  currentPage: number = 1;
  pageno: number = 1;

  constructor(private dataService: DataService,
    private dataDetailComp: DataDetailComponent) { }

  ngOnInit() {
    this.localFilterText = localStorage.getItem('filterText');
    if (this.localFilterText !== null) {
      this.userId = this.localFilterText;
    }
    this.getUsers();
  }

  getUsers() {
    this.dataService.listUser({ limit: 10, pageno: this.pageno })
      .subscribe(response => {
        this.userArray = response.data;
        this.count = response.total;
      }, err => {
        console.log(err);
      });
  }

  showDetail(user) {
    localStorage.removeItem('addUser');
    const userObj = {
      id: user.id,
      name: user.name,
      grade: user.grade,
      email: user.email,
      subject: user.subject,
      joinedDate: user.joinedDate,
      place: user.address.place,
      city: user.address.city,
      country: user.address.country,
      zip: user.address.zip,
    };
    this.userData = userObj;
    this.removeId = user.id;
  }

  receiveInput(event) {
    if (event === null) {
      this.userData = {};
      localStorage.setItem('addUser', 'addUserClicked');
      this.dataDetailComp.ngOnInit();
    } else {
      this.userId = event;
    }
  }

  pageChanged(event: any) {
    this.pageno = event;
    this.currentPage = event;
    this.getUsers();
  }

}
