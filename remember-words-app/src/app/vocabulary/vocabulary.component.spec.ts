import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AddWordComponent } from '../add-word/add-word.component';
import { MockShareService } from '../MockShareService';
import { ShareService } from '../share.service';
import { Location } from '@angular/common';

import { VocabularyComponent } from './vocabulary.component';
import { By } from '@angular/platform-browser';

describe('VocabularyComponent', () => {
  let component: VocabularyComponent;
  let fixture: ComponentFixture<VocabularyComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VocabularyComponent, AddWordComponent],
      imports: [
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
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabularyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render add new word button', () => {
    const fixture = TestBed.createComponent(VocabularyComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.textContent).toBe('add new word');
  });

  //   it('should show add new form after click button', fakeAsync(() => {
  //     router.navigate(['vocabulary']);
  //     tick();
  //     console.log('dsffsfsds', location.path());

  //     const fixture = TestBed.createComponent(VocabularyComponent);
  //     fixture.detectChanges();
  //     const compiled = fixture.nativeElement as HTMLElement;
  //     const button = compiled.querySelector('button');
  //     console.log(button);

  //     button?.click();
  //     fixture.detectChanges();

  //     expect(compiled.querySelector('.form')).toBeTruthy();
  //   }));

  // it('should remove word', () => {
  //   const fixture = TestBed.createComponent(VocabularyComponent);
  //   fixture.detectChanges();
  //   expect(fixture.componentInstance.shareService.words.length).toBe(4);
  //   const delButton =
  //     fixture.debugElement.nativeElement.querySelector('button[name="del"]');
  //   if (delButton) delButton.click();
  //   fixture.detectChanges();
  //   expect(fixture.componentInstance.shareService.words.length).toBe(3);
  // });
});
