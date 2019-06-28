
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CallComponent } from './call/call.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OutgoingCallComponent } from './outgoing-call/outgoing-call.component';
import { IncomingCallComponent } from './incoming-call/incoming-call.component';
import { OngoingCallComponent } from './ongoing-call/ongoing-call.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CallComponent,
    OutgoingCallComponent,
    IncomingCallComponent,
    OngoingCallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }