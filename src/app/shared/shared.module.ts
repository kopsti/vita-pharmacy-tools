import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeleteDialogComponent} from '@shared/delete-dialog/delete-dialog.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '@shared/material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CallbackPipe} from '@utils/callback.pipe';

@NgModule({
  // never add services in your shared modules, or in the modules it imports
  // otherwise, your lazy-load modules with get a service instance each, while we want them to be global singletons
  // for shared services across modules, add them in CoreModule, in providers
  declarations: [DeleteDialogComponent, CallbackPipe],
  imports: [CommonModule, RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [CommonModule, RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, CallbackPipe]
})
export class SharedModule {
}
