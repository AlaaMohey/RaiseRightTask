import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "../header/header.component";
import { HeroComponent } from '../hero/hero.component';
import { NewsSectionComponent } from "../news-section/news-section.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HeroComponent, NewsSectionComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
