import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.sass']
})
export class WorkComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openAccordion(id: string) {
    let elem = document.getElementById(id)
    if (elem?.className.indexOf(" show") == -1) {
      elem.className += " show"
    } else {
      if (elem) {
        elem.className = elem.className.replace(" show", "")
      }
    }
  }

  activeButton(id: string) {
    let elem = document.getElementById(id)
    if (elem?.className == "accordion") {
      elem.className += " active"
    } else {
      if (elem) {
        elem.className = elem.className.replace(" active", "")
      }
    }
  }

}
