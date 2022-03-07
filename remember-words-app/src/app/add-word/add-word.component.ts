import { IWord } from './../IWord';
import { Component, Input, OnInit } from '@angular/core';
import { ShareService } from '../share.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

// interface Params {
//   id: string;
// }

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.css'],
})
export class AddWordComponent implements OnInit {
  form: FormGroup;
  item?: IWord;

  constructor(
    public shareService: ShareService,
    private route: ActivatedRoute
  ) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const itemId = params['id'];
      if (itemId) {
        this.item = this.shareService.getWord(itemId);
        console.log(this.item);
        this.form = this.createForm();
      }
    });
  }

  onSubmit() {
    const word = this.form.getRawValue() as IWord;
    this.shareService.add(word);
    this.form.reset();
  }

  createForm() {
    let group: Record<string, FormControl> = {};
    this.shareService.langs.forEach((lng) => {
      group[lng.key] = new FormControl(
        this.item ? this.item[lng.key as keyof IWord] : '',
        [Validators.required]
      );
    });
    return new FormGroup(group);
  }

  get isFormValid () {
    return this.form.valid;
  }
}
