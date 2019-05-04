import { Component, Input } from '@angular/core';

@Component({
  selector: 'hll-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss']
})
export class PlayButtonComponent {

  @Input() invertColors: boolean;

}
