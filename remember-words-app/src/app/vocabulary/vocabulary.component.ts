import { Component, OnInit } from '@angular/core';
import { ShareService } from '../share.service';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.css'],
})
export class VocabularyComponent implements OnInit {
  constructor(public shareService: ShareService) {}

  ngOnInit(): void {}
}
