import {NgModule} from '@angular/core';

import {AppRoutingModule} from '@app/app-routing.module';
import {AppComponent} from '@app/app.component';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from '@core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, CoreModule, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
