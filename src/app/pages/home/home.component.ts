import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  toggleNavButton() {
    let button = document.getElementById("resumeButton")
    if (button) {
      let nav = document.getElementById("resumes")
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
