
import { Component } from '@angular/core';
import { CometChatService } from '../comet-chat.service';
import { Observable } from 'rxjs';

@Component({
 selector: 'app-call',
 templateUrl: './call.component.html',
 styleUrls: ['./call.component.scss']
})
export class CallComponent {
 
  public contacts: Observable<any[]> = this.chat.getUsers();
  public incomingCall$: Observable<any> = this.chat.getIncomingCalls();
  public ongoingCalls$: Observable<any> = this.chat.getOngoingCalls();
 public outgoingCall$: Observable<any> = this.chat.getOutgoingCalls();
 
 constructor(private chat: CometChatService) { }

  public voiceCall(userId: string):void {
    this.chat.startVoiceCall(userId).subscribe();
  }

  public videoCall(userId: string):void {
    this.chat.startVideoCall(userId).subscribe();
  }
}