import {Component, OnInit} from '@angular/core';
import {BanksService} from '@features/banks/banks.service';

import {MatDialog} from '@angular/material/dialog';
import {Bank} from '@features/banks/bank.model';
import {ListComponent} from '@utils/crud/list.component';
import {GenericService} from '@core/services/generic.service';

@Component({
  selector: 'app-banks-list',
  templateUrl: './banks-list.component.html',
  styleUrls: ['./banks-list.component.css']
})
export class BanksListComponent extends ListComponent<Bank> implements OnInit {

  constructor(g: GenericService, s: BanksService, d: MatDialog) {
    super(g, s, d);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
