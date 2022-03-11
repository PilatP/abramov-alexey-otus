import { Component, Input, OnInit } from '@angular/core';
import { IWord } from '../IWord';
import { ShareService } from '../share.service';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css'],
})
export class WordComponent implements OnInit {
  @Input() item: IWord = {};

  constructor(public shareService: ShareService) {}

  ngOnInit(): void {}

  public parseItem(item: any) {
    return this.shareService.langs
      .filter((lng) => lng.value)
      .map((lng) => ({
        key: lng,
        value: item[lng.key],
      }));
  }
}
