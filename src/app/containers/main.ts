import { Component } from '@angular/core';
import {AppBar,AppFooter} from '../ui';
import {Graph} from './graph';

@Component({
  selector: 'main-container',
  directives: [
      AppBar,
      Graph,
      AppFooter
  ],
  template: `
    <div>
    <app-bar></app-bar>
      <main class="main"> 
      <graph-container></graph-container>
        <app-footer></app-footer>
      </main>
  
    </div>
  `
})
export class Main {}
