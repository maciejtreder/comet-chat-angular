
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CometChatService } from '../comet-chat.service';
import { Router } from '@angular/router';
@Component({
 selector: 'app-login',
 templateUrl: './login.component.html',
 styleUrls: ['./login.component.scss']
})
export class LoginComponent {
 public loginForm = new FormGroup({
   uid: new FormControl('', Validators.required)
 });
 constructor(private chat: CometChatService, private router: Router) {}
  public signIn(): void {
   this.chat.login(this.loginForm.value['uid']).subscribe(signedUser => {
     this.router.navigate(['call']);
   });
  }
}