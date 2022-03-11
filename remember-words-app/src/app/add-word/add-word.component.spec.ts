import {
  ComponentFixture,
  TestBed,
  ComponentFixtureAutoDetect,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockShareService } from '../MockShareService';
import { ShareService } from '../share.service';
import { VocabularyComponent } from '../vocabulary/vocabulary.component';

import { AddWordComponent } from './add-word.component';

describe('AddWordComponent', () => {
  let component: AddWordComponent;
  let fixture: ComponentFixture<AddWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddWordComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          {
            path: 'vocabulary',
            component: VocabularyComponent,
            children: [{ path: 'add', component: AddWordComponent }],
          },
        ]),
      ],
      providers: [
        AddWordComponent,
        { provide: ShareService, useClass: MockShareService },
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWordComponent);
    component = fixture.componentInstance;
    component.item = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render placeholder', () => {
    const fixture = TestBed.createComponent(AddWordComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input')?.placeholder).toContain('en');
  });

  it('should render save button', () => {
    const fixture = TestBed.createComponent(AddWordComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.textContent).toBe('Save');
  });

  it('should render save button disabled', () => {
    const fixture = TestBed.createComponent(AddWordComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.disabled).toBeTruthy();
  });

  // it('enable button after filling inputs', () => {
  //   const fixture = TestBed.createComponent(AddWordComponent);
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   const inputEn = compiled.querySelector('[placeholder=en]');
  //   if (inputEn) {
  //     inputEn.textContent = 'a word';
  //     inputEn.dispatchEvent(new Event('input'));
  //   }
  //   const inputRu = compiled.querySelector('[placeholder=ru]');
  //   if (inputRu) {
  //     inputRu.textContent = 'a ru word';
  //     inputRu.dispatchEvent(new Event('input'));
  //   }
  //   fixture.detectChanges();

  //   const button = compiled.querySelector('button');
  //   if (button) {
  //     console.log(button);
  //     expect(button.disabled).toBeFalsy();
  //   }
  // });
});
