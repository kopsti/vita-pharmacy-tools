import {OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CommonModel} from '@utils/models/common-model.model';
import {OnCrud} from '@utils/interfaces/on-crud';
import {Subscription} from 'rxjs';
import {CrudService} from '@utils/crud/crud.service';
import {MatDialog} from '@angular/material/dialog';
import {ComponentType} from '@utils/interfaces/component-type';
import {BankSaveComponent} from '@features/banks/components/bank-save/bank-save.component';
import {BankAccountSaveComponent} from '@features/bank-accounts/components/bank-account-save/bank-account-save.component';
import {CustomerSaveComponent} from '@features/customers/components/customer-save/customer-save.component';
import {OrderSaveComponent} from '@features/orders/components/order-save/order-save.component';
import {VerbalSaveComponent} from '@features/verbals/components/verbal-save/verbal-save.component';
import {NoteSaveComponent} from '@features/notes/components/note-save/note-save.component';
import {SupplierSaveComponent} from '@features/suppliers/components/supplier-save/supplier-save.component';
import {GenericService} from '@core/services/generic.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';

export abstract class ListComponent<M extends CommonModel> implements OnInit, OnDestroy, OnCrud<M> {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  protected constructor(private g: GenericService, private s: CrudService<M>, private d: MatDialog) {
  }

  selection = new SelectionModel<M>(true, []);

  models: M[];
  model: M;
  sub1$: Subscription;
  sub2$: Subscription;
  sub3$: Subscription;
  sub4$: Subscription;
  subs: Subscription[] = [];

  dataSource = new MatTableDataSource<M>();

  private static pickSaveComponent(origin: string): ComponentType {
    switch (origin) {
      case 'bank':
        return BankSaveComponent;
      case 'bank-account':
        return BankAccountSaveComponent;
      case 'customer':
        return CustomerSaveComponent;
      case 'order':
        return OrderSaveComponent;
      case 'verbal':
        return VerbalSaveComponent;
      case 'note':
        return NoteSaveComponent;
      case 'supplier':
        return SupplierSaveComponent;
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: M): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  ngOnInit(): void {
    this.retrieveAll();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  retrieveWithSearch(searchTerm: string): void {
    this.retrieveAll('?q=' + searchTerm);
  }

  saveModel(s: string, m: M, w: number, h: number): void {
    const dialog = this.d.open(ListComponent.pickSaveComponent(s), {data: m, height: h + '%', width: w + '%'});
    this.sub1$ = dialog.afterClosed().subscribe(
      () => {
        this.retrieveAll();
      },
      e => {
        this.g.handleError(e);
      }
    );
    this.subs.push(this.sub1$);
  }

  retrieveAll(q ?: string): void {
    this.sub2$ = this.s.getModels(q).subscribe(
      data => {
        if (data.code === 1) {
          this.models = data.models;
          this.dataSource.data = this.models;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dataSource.paginator.firstPage();
        }
      },
      e => {
        this.g.handleError(e);
      }
    );
  }

  retrieveModel(id: number): void {
    this.sub2$ = this.s.getModel(id).subscribe(
      data => {
        if (data.code === 1) {
          this.model = data.model;
        }
      },
      e => {
        this.g.handleError(e);
      }
    );
  }

  deleteModel(id: number): void {
    this.sub3$ = this.s.deleteModel(id).subscribe(
      (data) => {
        this.g.handleSaveSuccess(data);
        this.retrieveAll();
      },
      e => {
        this.g.handleSaveError(e);
      }
    );
    this.subs.push(this.sub3$);
  }

  performSave(create: boolean, m: M): void {
    if (create) {
      m.id = null;
      this.sub4$ = this.s.createModel(m)
        .subscribe(
          (data) => {
            this.g.handleSaveSuccess(data);
            this.retrieveAll();
          },
          e => {
            this.g.handleSaveError(e);
          }
        );
    } else {
      this.sub4$ = this.s.updateModel(m)
        .subscribe(
          (data) => {
            this.g.handleSaveSuccess(data);
            this.retrieveAll();
          },
          e => {
            this.g.handleSaveError(e);
          }
        );
    }
    this.subs.push(this.sub4$);
  }

}
