import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {NotesService} from '@features/notes/notes.service';
import {Note} from '@features/notes/note.model';
import {GenericService} from '@core/services/generic.service';

@Component({
  selector: 'app-note-save',
  templateUrl: './note-save.component.html',
  styleUrls: ['./note-save.component.css']
})
export class NoteSaveComponent implements OnInit, OnDestroy {

  modelForm: FormGroup;
  modelDir: NgForm;
  content: FormControl;
  newModel: Note;
  insertTimestamp: Date;
  updateTimestamp: Date;

  modelCreation: boolean;

  sub1$: Subscription;
  sub2$: Subscription;
  subs: Subscription[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private g: GenericService, private s: NotesService, private d: MatDialog) {
  }

  ngOnInit(): void {
    this.initForm(this.data == null || this.data.id == null);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  initForm(isCreate: boolean) {
    this.modelCreation = isCreate;
    this.content = new FormControl(this.data == null ? null : this.data.content);
    if (!isCreate) {
      this.insertTimestamp = new Date(this.data.common.insertTimestamp);
      this.updateTimestamp = new Date(this.data.common.updateTimestamp);
    }
    this.modelForm = new FormGroup({
      content: this.content
    });
  }

  modelSubmit(event: any, modelDir: FormGroupDirective, modelForm: FormGroup) {
    event.preventDefault();
    if (modelDir.submitted) {
      this.newModel = new Note();
      this.newModel.content = modelForm.value.content;
      if (this.modelCreation) {
        this.sub1$ = this.s.createModel(this.newModel)
          .subscribe(
            (data) => {
              this.g.handleSaveSuccess(data, this.d);
            },
            e => {
              this.g.handleSaveError(e, this.d);
            }
          );
      } else {
        this.newModel.id = this.data.id;
        this.newModel.important = this.data.important;
        this.sub1$ = this.s.updateModel(this.newModel)
          .subscribe(
            (data) => {
              this.g.handleSaveSuccess(data, this.d);
            },
            e => {
              this.g.handleSaveError(e, this.d);
            }
          );
      }
      this.subs.push(this.sub1$);
    }
  }

}
