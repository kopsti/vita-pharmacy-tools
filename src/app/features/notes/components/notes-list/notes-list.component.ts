import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NotesService} from '@features/notes/notes.service';
import {Note} from '@features/notes/note.model';
import {ListComponent} from '@utils/crud/list.component';
import {GenericService} from '@core/services/generic.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, tap} from 'rxjs/operators';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('fade-actions', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(500)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(500, style({opacity: 0})))
    ])
  ]
})
export class NotesListComponent extends ListComponent<Note> implements OnInit, AfterViewInit {

  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;

  public hoveredElement: number;

  constructor(g: GenericService, s: NotesService, d: MatDialog) {
    super(g, s, d);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  importantNote(note: Note) {
    return note.important;
  }

  otherNote(note: Note) {
    return !note.important;
  }

  toggleImportant(note: Note) {
    note.important = !note.important;
    this.performSave(false, note);
  }

  toggleDone(note: Note) {
    note.completed = !note.completed;
    this.performSave(false, note);
  }

  duplicate(note: Note) {
    this.performSave(true, note);
  }

  toggleHover(id: number) {
    this.hoveredElement = id;
  }

  removeHover() {
    this.hoveredElement = null;
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(1500),
        distinctUntilChanged(),
        tap(() => {
          super.retrieveWithSearch(this.searchInput.nativeElement.value);
        })
      )
      .subscribe();
  }

}
