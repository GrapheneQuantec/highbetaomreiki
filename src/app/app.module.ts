import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from '@app/app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AffirmationsComponent } from './components/affirmations/affirmations.component';
import { MatrixcollectionComponent } from './components/matrixcollection/matrixcollection.component';
import { AuthService } from './core/auth.service';
import { AuthGuard} from './core/auth.guard';
import { AngularFireDatabaseModule } from '@angular/fire/database';

// services
import { AffirmationService } from './services/affirmation.service';
import { MatrixcollectionService } from './services/matrixcollection.service';

// third party
import { DragulaModule } from 'ng2-dragula';
import { SymbolsComponent } from './components/symbols/symbols.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { WaveComponent } from './components/elements/wave/wave.component';
import { CheckboxComponent } from './components/elements/checkbox/checkbox.component';
import { VideoPlayerComponent } from './components/elements/video-player/video-player.component';
import { FactomComponent } from './components/factom/factom.component';
import { CoinComponent } from './components/elements/coin/coin.component';
import { InvocationComponent } from './components/liomreiki/invocation/invocation.component';
import { HologramComponent } from './components/pages/hologram/hologram.component';
import { ItemService } from './services/item.service';
import { CoinsComponent } from './components/coins/coins.component';
import { HttpClientModule } from '@angular/common/http';
import { MemberAreaComponent } from './components/member-area/member-area.component';

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
    SymbolsComponent,
    NavigationComponent,
    WaveComponent,
    CheckboxComponent,
    VideoPlayerComponent,
    FactomComponent,
    CoinComponent,
    InvocationComponent,
    HologramComponent,
    CoinsComponent,
    MemberAreaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    DragulaModule.forRoot(),
    AppRoutingModule,
    YoutubePlayerModule,
    HttpClientModule,
  ],
  providers: [
    AffirmationService, 
    ItemService, 
    MatrixcollectionService, 
    AuthService,
    AuthGuard,
    AngularFirestore,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
