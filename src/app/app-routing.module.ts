import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AffirmationsComponent } from '@app/components/affirmations/affirmations.component';
import { MatrixcollectionComponent } from '@app/components/matrixcollection/matrixcollection.component';

export const appRoutes: Routes = [
  // Affirmations
  { path: 'affirmation',  component: AffirmationsComponent },
  // Individual affirmation
  { path: 'affirmation/:affid',  component: AffirmationsComponent},
  // Matrix
  { path: 'matrix',  component: MatrixcollectionComponent },
  // Default
  { path: '', component: AffirmationsComponent },
  // catch unmatched
  { path: '**', redirectTo: '/affirmation', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
