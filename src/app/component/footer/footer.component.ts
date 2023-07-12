import { Component } from '@angular/core';
import {
  faTwitter,
  faFacebook,
  faInstagramSquare,
  faLinkedin,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagramSquare = faInstagramSquare;
  faLinkedin = faLinkedin;
  faYoutube = faYoutube;
}
