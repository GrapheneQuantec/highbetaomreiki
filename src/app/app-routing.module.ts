import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AffirmationsComponent } from '@app/components/affirmations/affirmations.component';
import { MatrixcollectionComponent } from '@app/components/matrixcollection/matrixcollection.component';
import { SymbolsComponent } from '@app/components/symbols/symbols.component';
import { HologramComponent } from './components/pages/hologram/hologram.component';
import { MemberAreaComponent } from './components/member-area/member-area.component';

export const appRoutes: Routes = [
  // Affirmations
  { path: 'meditation/affirmation', component: AffirmationsComponent },
  // Individual affirmation
  { path: 'meditation/affirmation/:affid', component: AffirmationsComponent },

  { path: 'meditation/symbols', component: SymbolsComponent },


  { path: 'holo', component: HologramComponent },
  // Matrix
  { path: 'matrix', component: MatrixcollectionComponent },
  { path: 'member-area', component: MemberAreaComponent },
  // Default
  { path: '', component: AffirmationsComponent },
  // catch unmatched
  { path: '**', redirectTo: '/affirmation', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
