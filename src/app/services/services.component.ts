import { Component } from '@angular/core';
import {
  faCode,
  faMobile,
  faGamepad,
  faCodeCompare,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent {
  faCode = faCode;
  faMobile = faMobile;
  faGamepad = faGamepad;
  faCodeCompare = faCodeCompare;
}
