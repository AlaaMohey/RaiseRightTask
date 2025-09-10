import { Injectable, NgZone } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { DynamiConfigService } from './dynami-config.service';
@Injectable({ providedIn: 'root' })
export class SignailRService {
  // private hubConnection!: signalR.HubConnection;
    private socket!: WebSocket;
  donation$ = new Subject<{ campaignId: number; amount: number; name: string }>();

  constructor(private zone: NgZone, private loadConfig: DynamiConfigService) {
      this.connect();
  }
  private connect() {
    this.socket = new WebSocket(this.loadConfig.getConfig('wsBaseAddressForAPI'));

    this.socket.onopen = () => console.log('WS connected');
    this.socket.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        if (msg?.type === 'donation') {
          this.zone.run(() => this.donation$.next({ campaignId: msg.campaignId, amount: msg.amount, name: msg.name }));
        }
      } catch(e) { console.warn('Invalid WS msg', e); }
    };

    this.socket.onclose = () => {
      console.warn('WS closed — will retry in 3s');
      setTimeout(() => this.connect(), 3000);
    };

    this.socket.onerror = (err) => {
      console.error('WS error', err);
    };
  }
}
