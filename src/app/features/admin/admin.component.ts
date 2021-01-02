import {Component, OnInit} from '@angular/core';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  currentDate = formatDate(new Date(), 'EEEE, MMMM dd, yyyy', 'en');

  constructor() {
  }

  ngOnInit(): void {
  }

}
