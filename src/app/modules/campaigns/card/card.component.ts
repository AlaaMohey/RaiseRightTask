import { Component, Input } from '@angular/core';
import { Campaign } from '../../../core/models/campaign';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CurrencyPipe, CardModule, CommonModule, ProgressBarModule, ButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  providers: [CurrencyPipe]
})
export class CardComponent {
  @Input() campaign!: Campaign;

  constructor(private router: Router) {}
  ngOnInit() {
    console.log(this.campaign);
  }
  get percent() {
    const percent = (this.campaign.currentAmount / this.campaign.goal) * 100;
    console.log(percent);
    return percent;
  }

  goDetail() {
    this.router.navigate(['/campaign', this.campaign.id]);
  }
}