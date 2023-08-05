import { Component,TemplateRef,ViewChild } from '@angular/core';

@Component({
  selector: 'app-konfiguration',
  templateUrl: './konfiguration.component.html',
  styles: [
  ]
})
export class KonfigurationComponent {

  currentChild: string = '';

  @ViewChild('contentToReplace') contentToReplace: TemplateRef<any>; 


  chargerComposant(child: string) {
    this.currentChild = child;
  }


}
