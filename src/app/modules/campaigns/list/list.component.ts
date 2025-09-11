import { Component } from '@angular/core';
import { Campaign } from '../../../core/models/campaign';
import { Subscription } from 'rxjs';
import { CampaignService } from '../../../core/services/campaign.service';
import { SignailRService } from '../../../core/services/singalr.service';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { HeroComponent } from "../../../core/compoents/hero/hero.component";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, CommonModule, HeroComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
campaigns: Campaign[] = [];
  private map = new Map<number, Campaign>();
  private subs: Subscription[] = [];

  constructor(private campagnService:CampaignService, 
    private signalRService: SignailRService) {}

  ngOnInit() {
    this.campagnService.getAllCampaigns().subscribe(data => {
      this.campaigns = data;
      data.forEach(c => this.map.set(c.id, c));
    });
    const sub = this.signalRService.donation$.subscribe(evt => {
      const c = this.map.get(evt.campaignId);
      if (c) {
        c.currentAmount += evt.amount;
        this.campaigns = [...this.campaigns];
      }
    });

    this.subs.push(sub);
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }
}