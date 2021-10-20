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
    var x = document.getElementById(id);
    if (x?.className.indexOf(" show") == -1) {
      x.className += " show";
    } else {
      if (x) {
        x.className = x.className.replace(" show", "");
      }
    }
  }

}
