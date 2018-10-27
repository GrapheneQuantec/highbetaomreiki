import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AffirmationsComponent } from '@app/components/affirmations/affirmations.component';
import { MatrixcollectionComponent } from '@app/components/matrixcollection/matrixcollection.component';
import { SymbolsComponent } from '@app/components/symbols/symbols.component';

export const appRoutes: Routes = [
  // Affirmations
  { path: 'meditation/affirmation', component: AffirmationsComponent },
  // Individual affirmation
  { path: 'meditation/affirmation/:affid', component: AffirmationsComponent },

  { path: 'meditation/symbols', component: SymbolsComponent },
  // Matrix
  { path: 'matrix', component: MatrixcollectionComponent },
  // Default
  { path: '', component: SymbolsComponent },
  // catch unmatched
  { path: '**', redirectTo: '/affirmation', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
