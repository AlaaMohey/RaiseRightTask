import { Component, Input } from '@angular/core';
import { Campaign } from '../../../core/models/campaign';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  providers: [CurrencyPipe]
})
export class CardComponent {
  @Input() campaign!: Campaign;

  constructor(private router: Router) {}

  get percent() {
    return (this.campaign.currentAmount / this.campaign.goal) * 100;
  }

  goDetail() {
    this.router.navigate(['/campaign', this.campaign.id]);
  }
}