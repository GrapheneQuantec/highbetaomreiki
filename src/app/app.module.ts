import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AffirmationsComponent } from './components/affirmations/affirmations.component';

// services
import { AffirmationService } from './services/affirmation.service';

const appRoutes: Routes = [
  { path: '**', component: AffirmationsComponent },
  { path: 'affirmation', component: AffirmationsComponent },
  { path: 'affirmation/:id', component: AffirmationsComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    AffirmationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AffirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
