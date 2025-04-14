import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/header/header.component';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent {

  constructor(private header: HeaderComponent) { }

  activeButton(id: string) {
    this.header.activeButton(id)
  }
}
