import { Component, OnInit } from '@angular/core';
import { IWord } from '../IWord';
import { ShareService } from '../share.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  constructor(public shareService: ShareService) {}

  ngOnInit(): void {}

  onCheck(event: Event) {
    const input = event.target as HTMLInputElement;
    this.shareService.toggleLang(input.name as keyof IWord, input.checked);
  }
}
