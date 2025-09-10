import { Routes } from '@angular/router';
import { ListComponent } from './modules/campaigns/list/list.component';
import { DetailsComponent } from './modules/campaigns/details/details.component';
import { MainLayoutComponent } from './core/compoents/main-layout/main-layout.component';

export const routes: Routes = [
  {
    
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'campaigns', pathMatch: 'full' },
      { path: 'campaigns', component: ListComponent },
      { path: 'campaign/:id', component: DetailsComponent },
    ]
  }
];
