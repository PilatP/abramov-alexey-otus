import { Injectable } from '@angular/core';
import { IWord, Word } from './IWord';
import { nanoid } from 'nanoid';

const initWords = [
  { id: '1', en: 'Cat', ru: 'Кошка' },
  { id: '2', en: 'Dog', ru: 'Собака' },
  { id: '3', en: 'Pen', ru: 'Ручка' },
  { id: '4', en: 'Phone', ru: 'Телефон' },
];

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  private _words: IWord[];

  get words(): IWord[] {
    return this._words;
  }

  constructor() {
    const lsWords = JSON.parse(
      localStorage.getItem('words') || '[]'
    ) as IWord[];
    this._words = lsWords && lsWords.length ? lsWords : initWords;
  }

  add(word: IWord) {
    word.id = this.generateId();
    this._words.push(word);
    localStorage.setItem('words', JSON.stringify(this._words));
  }

  delete(word: IWord) {
    this._words = this._words.filter((w) => w.id !== word.id);
    localStorage.setItem('words', JSON.stringify(this._words));
  }

  getWord(id: string) {
    return this._words.find((w) => w.id === id);
  }

  private _langs = Object.keys(new Word()).map((lng) => ({
    key: lng,
    value: true,
  }));

  get langs() {
    return this._langs;
  }

  get enabledLangs() {
    return this._langs.filter((l) => l.value);
  }

  toggleLang(lng: keyof IWord, value: boolean) {
    const _lng = this._langs.find((l) => l.key === lng);
    if (_lng) _lng.value = value;
    console.log(this._langs);
  }

  generateId = () => nanoid();
}
