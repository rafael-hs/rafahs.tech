import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleNavButton() {
    let button = document.getElementById("mobileButton")
    console.log(button)
    if (button) {
      let nav = document.getElementById("mobileNav")
      if (nav?.classList.contains("show")) {
        nav.classList.add("hidden")
        nav.classList.remove("show")
      }
      else {
        if (nav) {
          nav.classList.add("show")
          nav.classList.remove("hidden")
        }
      }
    }
  }

}
