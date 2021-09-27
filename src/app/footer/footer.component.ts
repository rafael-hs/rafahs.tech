import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  socialMediaLinks = ["https://cdn-icons-png.flaticon.com/512/1051/1051374.png", "https://cdn-icons-png.flaticon.com/512/1051/1051360.png"]
}
