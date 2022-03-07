import { AddWordComponent } from './add-word/add-word.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VocabularyComponent } from './vocabulary/vocabulary.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
