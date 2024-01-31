import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent {
  @Input() guessedWord: string;
  @Input() word: string;
  @Input() showHint: string;
}
