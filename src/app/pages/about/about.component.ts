import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/header/header.component';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {

  constructor(private header: HeaderComponent) { }

  ngOnInit(): void {
  }

  activeButton(id: string) {
    this.header.activeButton(id)
  }
}
