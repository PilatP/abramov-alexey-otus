import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AddWordComponent } from './add-word/add-word.component';
import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { VocabularyComponent } from './vocabulary/vocabulary.component';
import { Location } from '@angular/common';

describe('AppComponent', () => {
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'vocabulary',
            component: VocabularyComponent,
            children: [
              { path: 'add', component: AddWordComponent },
              { path: ':id', component: AddWordComponent },
            ],
          },
          {
            path: 'settings',
            component: SettingsComponent,
          },
        ]),
      ],
    }).compileComponents();
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render nav panel', () => {
    const fixture = TestBed.createComponent(AppComponent);

    const compiled = fixture.nativeElement as HTMLElement;
    const nav = compiled.querySelector('nav');

    expect(nav).toBeTruthy();
  });

  it('should render nav items', () => {
    const fixture = TestBed.createComponent(AppComponent);

    const compiled = fixture.nativeElement as HTMLElement;
    const nav = compiled.querySelector('nav')?.querySelectorAll('a') || [];
    expect(nav[0]?.textContent).toContain('Home');
    expect(nav[1]?.textContent).toContain('Vocabulary');
    expect(nav[2]?.textContent).toContain('Settings');
  });

  it('should navigate to /vocabulary', fakeAsync(() => {
    router.navigate(['vocabulary']);
    tick();

    expect(location.path()).toBe('/vocabulary');
  }));

  it('should navigate to /settings', fakeAsync(() => {
    router.navigate(['settings']);
    tick();

    expect(location.path()).toBe('/settings');
  }));

  it('should navigate to /vocabulary/add', fakeAsync(() => {
    router.navigate(['vocabulary/add']);
    tick();

    expect(location.path()).toBe('/vocabulary/add');
  }));
});
