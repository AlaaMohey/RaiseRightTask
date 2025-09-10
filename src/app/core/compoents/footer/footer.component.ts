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
  productList = [
  { name: 'Overview', link: '#' ,'isNew':false },
  { name: 'Features', link: '#' ,'isNew':false },
  { name: 'Solutions', link: '#' ,'isNew':true },
  { name: 'Tutorials', link: '#' ,'isNew':false },
  { name: 'Pricing', link: '#' ,'isNew':false },
  { name: 'Releases', link: '#' ,'isNew':false }
  ];
companyList = [
  { name: 'About us', link: '#' ,'isNew':false },
  { name: 'Careers', link: '#' ,'isNew':false },
  { name: 'Press', link: '#' ,'isNew':false },
  { name: 'News', link: '#' ,'isNew':false },
  { name: 'Media kit', link: '#' ,'isNew':false },
  { name: 'Contact', link: '#' ,'isNew':false }
];
resourcesList = [
  { name: 'Blog', link: '#' ,'isNew':false },
  { name: 'Newsletter', link: '#' ,'isNew':false },
  { name: 'Events', link: '#' ,'isNew':false },
  { name: 'Help centre', link: '#' ,'isNew':false },
  { name: 'Tutorials', link: '#' ,'isNew':false },
  { name: 'Support', link: '#' ,'isNew':false }
];
legalList = [ 
  { name: 'Terms', link: '#' ,'isNew':false },
  { name: 'Privacy', link: '#' ,'isNew':false },
  { name: 'Cookie', link: '#' ,'isNew':false },
  { name: 'Licenses', link: '#' ,'isNew':false },
  { name: 'Settings', link: '#' ,'isNew':false },
  { name: 'Contact', link: '#' ,'isNew':false }
];
}
