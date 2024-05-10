import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DROP_DOWN } from 'src/assets/svg-icons';

@Component({
  selector: 'app-bookcontainer',
  templateUrl: './bookcontainer.component.html',
  styleUrls: ['./bookcontainer.component.scss']
})
export class BookcontainerComponent implements OnInit {

  page:boolean=true;
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral("dropdown-icon", sanitizer.bypassSecurityTrustHtml(DROP_DOWN))
   }

  ngOnInit(): void {
  }

}
