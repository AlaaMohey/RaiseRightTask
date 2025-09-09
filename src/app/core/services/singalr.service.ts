import { Injectable, NgZone } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class SignailRService {
  private hubConnection!: signalR.HubConnection;
  donation$ = new Subject<{ campaignId: number; amount: number }>();

  constructor(private zone: NgZone) {
    this.startConnection();
  }

  private startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/donationsHub') 
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start()
      .then(() => console.log('SignalR started Connection'))
      .catch(err => console.error('Error while connecting', err));

    this.hubConnection.on('DonationReceived', (campaignId: number, amount: number) => {
      this.zone.run(() => {
        this.donation$.next({ campaignId, amount });
      });
    });
  }
}
