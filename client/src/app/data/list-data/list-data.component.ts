import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.css'],
  providers: [DataService]
})
export class ListDataComponent implements OnInit {

  userArray: Array<any> = [];
  pageno: number;
  userId: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.dataService.listUser({ limit: 10, pageno: this.pageno })
      .subscribe(response => {
        this.userArray = response.data;
      }, err => {
        console.log(err);
      });
  }

  receiveMessage(event) {
    this.userId = event;
  }

}
