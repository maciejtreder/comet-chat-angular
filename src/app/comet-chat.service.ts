
import { Injectable } from '@angular/core';
import { CometChat } from "@cometchat-pro/chat"
import { environment } from 'src/environments/environment';
import { Observable, ReplaySubject, Subject, from } from 'rxjs';
import { filter, flatMap, tap } from 'rxjs/operators';

@Injectable({
 providedIn: 'root'
})
export class CometChatService {
 
  private initialized: Subject<boolean> = new ReplaySubject<boolean>();
  private incomingCall$: Subject<any> = new ReplaySubject();
  private outgoingCall$: Subject<any> = new ReplaySubject();
  private ongoingCall$: Subject<any> = new ReplaySubject();
  private users$: Subject<any> = new ReplaySubject();
  private signedIn: string;

  constructor() {
    CometChat.init(environment.appId).then(_ => {
      console.log('Comet Chat initialized.');
      this.initialized.next(true);
    }, error => {
      console.log('Initialization error: ' + error);
    });
    
    this.ongoingCall$.pipe(filter(call => !!call)).subscribe(call => {
      CometChat.startCall(
        call.sessionId,
        document.getElementById('callScreen'),
        //@ts-ignore
        new CometChat.OngoingCallListener({
          onCallEnded: call => {
            this.ongoingCall$.next(null);
          }
        })
      );
    });
  }
 
  private retrieveUsers(): void {
    new CometChat.UsersRequestBuilder().setLimit(20).build().fetchNext().then(response => {
      this.users$.next(response);
    });
  }
 
  public login(uid: string): Observable<any> {
    uid = uid.toLowerCase();
    return this.initialized.pipe(filter(v => v), flatMap(_ => {
      return from(CometChat.login(uid, environment.apiKey)).pipe(tap(_ => {
        this.retrieveUsers();
        this.signedIn = uid;
        CometChat.addCallListener(
          'CALL_LISTENER_ID',
          //@ts-ignore
          new CometChat.CallListener({
            onIncomingCallReceived: call => {
              this.incomingCall$.next(call);
            },
            onOutgoingCallAccepted: call => {
              this.ongoingCall$.next(call);
              this.outgoingCall$.next(null);
            },
            onOutgoingCallRejected: _ => {
              this.outgoingCall$.next(null);
              this.incomingCall$.next(null);
            },
            onIncomingCallCancelled: call => {
              this.incomingCall$.next(null);
            }
          })
        );
  
        CometChat.addUserListener(
          'USER_LISTENER_ID',
          //@ts-ignore
          new CometChat.UserListener({
            onUserOnline: _ => this.retrieveUsers(),
            onUserOffline: _ => this.retrieveUsers()
          })
        );
      }));
    }));
  }
 
  public getSignedIn(): string {
    return this.signedIn;
  }
 
  public getIncomingCalls(): Observable<any> {
    return this.incomingCall$;
  }
 
  public getOutgoingCalls(): Observable<any> {
    return this.outgoingCall$;
  }
 
  public getOngoingCalls(): Observable<any> {
    return this.ongoingCall$;
  }
 
  public startVoiceCall(receiverID: string): Observable<any> {
    if (!this.signedIn) {
      throw new Error('Not logged in.');
    }
    const call = new CometChat.Call(receiverID, CometChat.CALL_TYPE.AUDIO, CometChat.RECEIVER_TYPE.USER);
    return from(CometChat.initiateCall(call)).pipe(tap(call => this.outgoingCall$.next(call)));
  }
 
  public startVideoCall(receiverID: string): Observable<any> {
    if (!this.signedIn) {
     throw new Error('Not logged in.');
    }
    const call = new CometChat.Call(receiverID, CometChat.CALL_TYPE.VIDEO, CometChat.RECEIVER_TYPE.USER);
    return from(CometChat.initiateCall(call));
  }
  public accept(sessionId: string): Observable<any> {
    return from(CometChat.acceptCall(sessionId)).pipe(tap(call => {
      this.incomingCall$.next(null);
      this.ongoingCall$.next(call);
    }));
  }
  public reject(sessionId: string): Observable<any> {
    return from(CometChat.rejectCall(sessionId, CometChat.CALL_STATUS.REJECTED)).pipe(tap(_ => {
      this.incomingCall$.next(null);
    }));
  }
  public getUsers(): Observable<any> {
    return this.users$;
  }
}