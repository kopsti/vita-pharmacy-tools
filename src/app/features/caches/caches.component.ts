import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {GenericService} from '@core/services/generic.service';
import {CachesService} from '@features/caches/caches.service';

@Component({
  selector: 'app-caches',
  templateUrl: './caches.component.html',
  styleUrls: ['./caches.component.css']
})
export class CachesComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  cacheField: FormControl;

  sub1$: Subscription;
  subs: Subscription[] = [];
  cleared = false;

  caches: any[] = [
    {value: 'all', title: 'All'},
    {value: 'users', title: 'User data'},
    {value: 'verbals', title: 'Verbals'}
  ];

  constructor(private generic: GenericService, private cache: CachesService) {
  }

  ngOnInit(): void {
    this.cacheField = new FormControl('');
    this.formGroup = new FormGroup({
      cacheField: this.cacheField
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  doClear(data: string) {
    this.sub1$ = this.cache.clearCache(data).subscribe(
      response => {
        console.log(response);
        if (response.code === 1) {
          this.cleared = true;
        }
      },
      e => {
        this.generic.handleError(e);
      }
    );
    this.subs.push(this.sub1$);
  }

  handleSubmit(event: any, dir, formGroup: FormGroup) {
    event.preventDefault();
    if (dir.submitted) {
      this.doClear(formGroup.value.cacheField);
      dir.resetForm({});
    }
  }

}
