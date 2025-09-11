import { Component } from '@angular/core';
import { Campaign } from '../../../core/models/campaign';
import { Subscription } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CampaignService } from '../../../core/services/campaign.service';
import { SignailRService } from '../../../core/services/singalr.service';
import { GraphqlService } from '../../../core/services/graph-ql.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import e from 'express';
import { DonateFormComponent } from '../donate-form/donate-form.component';
import { SotialNotifyComponent } from '../sotial-notify/sotial-notify.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe,CommonModule,DonateFormComponent,SotialNotifyComponent,RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  providers: [CurrencyPipe]
})
export class DetailsComponent {
campaign!: Campaign;
  errorMessages: string[] = [];
  private subs: Subscription[] = [];
  percentValue!: number;
  constructor(
    private route: ActivatedRoute,
    private campagnService: CampaignService,
    private graphqlService: GraphqlService,
    private signalRService: SignailRService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
this.graphqlService.getCampaignDetails(id).subscribe({
  next: (res: any) => {
    this.campaign = res?.campaign;
    if (this.campaign) {
      console.log('Loaded campaign', this.campaign);
      this.campaign.currentAmount = this.campaign.currentAmount || 0;
      this.campaign.donors = this.campaign.donors || [];
    }

    // Handle partial GraphQL errors
    if (res.errors && res.errors.length > 0) {
      this.errorMessages.push('Some data could not be loaded correctly.');
      console.warn('GraphQL partial errors:', res.errors);
    }
  },
  error: err => {
    console.log('Error loading campaign details', err[0]);
    this.errorMessages.push(err[0].message || 'Failed to load campaign details.');
    console.error(err);
  }
});
    const sub = this.signalRService.donation$.subscribe(evt => {
      if (this.campaign && evt.campaignId === this.campaign.id) {
        this.campaign.currentAmount += evt.amount;
        this.percentValue = (this.campaign.currentAmount / this.campaign.goal) * 100;
        this.campaign.donors.unshift({
          name: evt.name,
          amount: evt.amount,
          new: true
        });
        this.campaign = { ...this.campaign };
      }
    });

    this.subs.push(sub);
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }
}