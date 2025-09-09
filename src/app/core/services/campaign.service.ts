import { Injectable } from '@angular/core';
import { Campaign } from '../models/campaign';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DynamiConfigService } from './dynami-config.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  getCampaignDetails(id: number) {
    throw new Error('Method not implemented.');
  }
  constructor(private http:HttpClient,private loadConfig: DynamiConfigService) { }

   getAllCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(`${this.loadConfig.getConfig('baseAddressForAPI')}/api/campaigns`); 
   }
}
