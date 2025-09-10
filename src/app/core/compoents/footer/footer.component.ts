import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
companyList = [
  { name: 'About us', link: '#' },
  { name: 'Careers', link: '#' },
  { name: 'Press', link: '#' },
  { name: 'News', link: '#' },
  { name: 'Media kit', link: '#' },
  { name: 'Contact', link: '#' }
];
resourcesList = [
  { name: 'Blog', link: '#' },
  { name: 'Newsletter', link: '#' },
  { name: 'Events', link: '#' },
  { name: 'Help centre', link: '#' },
  { name: 'Tutorials', link: '#' },
  { name: 'Support', link: '#' }
];
legalList = [ 
  { name: 'Terms', link: '#' },
  { name: 'Privacy', link: '#' },
  { name: 'Cookie', link: '#' },
  { name: 'Licenses', link: '#' },
  { name: 'Settings', link: '#' },
  { name: 'Contact', link: '#' }
];
}
