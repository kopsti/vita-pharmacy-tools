import {Component, OnInit} from '@angular/core';
import {VerbalsService} from '@features/verbals/verbals.service';
import {MatDialog} from '@angular/material/dialog';
import {Verbal} from '@features/verbals/verbal.model';
import {ListComponent} from '@utils/crud/list.component';
import {GenericService} from '@core/services/generic.service';

@Component({
  selector: 'app-verbals-list',
  templateUrl: './verbals-list.component.html',
  styleUrls: ['./verbals-list.component.css']
})
export class VerbalsListComponent extends ListComponent<Verbal> implements OnInit {

  constructor(g: GenericService, s: VerbalsService, d: MatDialog) {
    super(g, s, d);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
