import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CometChatService } from './comet-chat.service';

@Injectable({
 providedIn: 'root'
})

export class AuthGuard implements CanActivate {

 constructor(private chat: CometChatService, private router: Router) {}

 canActivate(): boolean {

   if (!this.chat.getSignedIn()) {
     this.router.navigate(['login']);
   }
   
   return !!this.chat.getSignedIn();
  }
}