import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Campaign } from '../models/campaign';
import { GraphqlResponse } from '../models/graphqlResponse'
import { DynamiConfigService } from './dynami-config.service';
@Injectable({ providedIn: 'root' })
export class GraphqlService {
  constructor(private http: HttpClient,private loadConfig:DynamiConfigService) {}

  getCampaignDetails(id: number): Observable<{ campaign?: Campaign; errors?: any[] }> {
    const body = {
      query: `
        query getCampaignDetails($id: ID!) {
          campaign(id: $id) {
            id
            name
            goal
            currentAmount
            description
            imageUrl
            donors { name amount }
          }
        }`,
      variables: { id }
    };

    return this.http.post<GraphqlResponse<{ campaign: Campaign }>>(`${this.loadConfig.getConfig('baseAddressForAPI')}/graphql`, body).pipe(
      map(res => ({
        campaign: res.data?.campaign,
        errors: res.errors
      }))
    );
  }
}
      