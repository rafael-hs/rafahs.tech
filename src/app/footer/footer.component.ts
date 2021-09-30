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

  switchCssClassLinkedin(event: any) {
    if (event.target.classList.contains("fa-linkedin") && event.target != null) {
      event.target.classList.remove("fa-linkedin")
      event.target.classList.add("fa-linkedin-in")
    }
    else {
      event.target.classList.remove("fa-linkedin-in")
      event.target.classList.add("fa-linkedin")
    }
  }

  switchCssClassGithub(event: any) {
    if (event.target.classList.contains("fa-github-square") && event.target != null) {
      event.target.classList.remove("fa-github-square")
      event.target.classList.add("fa-github")
    }
    else {
      event.target.classList.remove("fa-github")
      event.target.classList.add("fa-github-square")
    }
  }

  switchCssClassTwitter(event: any) {
    if (event.target.classList.contains("fa-twitter-square") && event.target != null) {
      event.target.classList.remove("fa-twitter-square")
      event.target.classList.add("fa-twitter")
    }
    else {
      event.target.classList.remove("fa-twitter")
      event.target.classList.add("fa-twitter-square")
    }
  }

  switchCssClassEmail(event: any) {
    if (event.target.classList.contains("fa-envelope-square") && event.target != null) {
      event.target.classList.remove("fa-envelope-square")
      event.target.classList.add("fa-envelope")
    }
    else {
      event.target.classList.remove("fa-envelope")
      event.target.classList.add("fa-envelope-square")
    }
  }

  switchCssClassMedium(event: any) {
    if (event.target.classList.contains("fa-medium") && event.target != null) {
      event.target.classList.remove("fa-medium")
      event.target.classList.add("fa-medium-m")
    }
    else {
      event.target.classList.remove("fa-medium-m")
      event.target.classList.add("fa-medium")
    }
  }

}
