import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FooterComponent} from '@core/components/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MainLayoutComponent} from './components/main-layout/main-layout.component';
import {GenericService} from '@core/services/generic.service';
import {MaterialModule} from '@shared/material/material.module';
import {WINDOW_PROVIDERS} from '@utils/window.providers';
import {MainSidebarComponent} from './components/main-sidebar/main-sidebar.component';
import {SidenavService} from '@core/services/sidenav.service';
import {JWTInterceptor} from '@utils/token.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthModule} from '@features/auth/auth.module';

@NgModule({
  declarations: [FooterComponent, MainLayoutComponent, MainSidebarComponent],
  providers: [
    GenericService,
    {provide: 'Window', useValue: window}, WINDOW_PROVIDERS,
    SidenavService,
    {provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true}
  ],
  imports: [BrowserModule, BrowserAnimationsModule, RouterModule, FormsModule, ReactiveFormsModule, MaterialModule, AuthModule],
  exports: [MainLayoutComponent]
})
export class CoreModule {
}
