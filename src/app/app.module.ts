import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from '@app/app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AffirmationsComponent } from './components/affirmations/affirmations.component';
import { MatrixcollectionComponent } from './components/matrixcollection/matrixcollection.component';
import { AuthService } from './core/auth.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// services
import { AffirmationService } from './services/affirmation.service';
import { MatrixcollectionService } from './services/matrixcollection.service';

// third party
import { DragulaModule } from 'ng2-dragula';
import { SymbolsComponent } from './components/symbols/symbols.component';

const appRoutes: Routes = [
  { path: '**', component: AffirmationsComponent },
  { path: 'affirmation', component: AffirmationsComponent },
  { path: 'affirmation/:id', component: AffirmationsComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    AffirmationsComponent,
    MatrixcollectionComponent,
    SymbolsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes),
    AngularFireDatabaseModule,
    DragulaModule.forRoot(),
    AppRoutingModule
  ],
  providers: [AffirmationService, MatrixcollectionService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
