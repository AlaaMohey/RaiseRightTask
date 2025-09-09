import { Component } from '@angular/core';
import { Campaign } from '../../../core/models/campaign';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from '../../../core/services/campaign.service';
import { SignailRService } from '../../../core/services/singalr.service';
import { GraphqlService } from '../../../core/services/graph-ql.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  providers: [CurrencyPipe]
})
export class DetailsComponent {
campaign!: Campaign;
  errorMessages: string[] = [];
  private subs: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
   private campagnService:CampaignService, 
   private graphqlService: GraphqlService,
       private signalRService: SignailRService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // ✅ GraphQL query للحصول على تفاصيل الحملة
    this.graphqlService.getCampaignDetails(id).subscribe({
      next: (res: any) => {
        this.campaign = res.data?.campaign;
        if (res.errors) {
          this.errorMessages = res.errors.map((e: any) => e.message);
        }
      },
      error: err => {
        this.errorMessages.push('Failed to load campaign details.');
        console.error(err);
      }
    });

    // ✅ SignalR subscription للتبرعات الجديدة
    const sub = this.signalRService.donation$.subscribe(evt => {
      if (this.campaign && evt.campaignId === this.campaign.id) {
        this.campaign.currentAmount += evt.amount;
        this.campaign.donors.unshift({
          name: 'Anonymous',
          amount: evt.amount
        });
        // force re-render
        this.campaign = { ...this.campaign };
      }
    });

    this.subs.push(sub);
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }
}