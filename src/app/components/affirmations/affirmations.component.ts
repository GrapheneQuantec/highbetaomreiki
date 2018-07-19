import { Component, OnInit } from '@angular/core';
import { AffirmationService } from '../../services/affirmation.service';
import { Affirmation } from '../../models/affirmation';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-affirmations',
  templateUrl: './affirmations.component.html',
  styleUrls: ['./affirmations.component.css']
})
export class AffirmationsComponent implements OnInit {

  affirmations: Affirmation[];
  activeAffirmationId: string;
  selectedAffirmation: Affirmation = {
    id: '',
    title: '',
    content: '',
  };
  copyAffirmation: Affirmation;
  isBeingEdited: boolean = false;

  constructor(private router: Router, 
    private route: ActivatedRoute,
    public affirmationService: AffirmationService) {

     }

  ngOnInit() {
    this.route.url.subscribe((u) => {
      if(u[1]) {
        this.affirmationService.getAffirmations(u[1].path).subscribe(affirmations => {
          this.selectedAffirmation = affirmations[0];
          this.activeAffirmationId = affirmations[0].title;
        })
      }
    });

    this.affirmationService.getAffirmations().subscribe(affirmations => {
      this.affirmations = affirmations;
      console.log(affirmations)

      this.selectedAffirmation = affirmations[0];
      this.activeAffirmationId = affirmations[0].title;

      console.log(this.selectedAffirmation)
    })
    
  }

  selectAffirmation(title) {
    this.router.navigate(['/affirmation/' + title]);
    this.isBeingEdited = false;
  }

  updateItem() {
    this.affirmationService.updateItem(this.selectedAffirmation);
    this.isBeingEdited = false;
  }

  startEdit() {
    // copy current affirmation without its references
    this.copyAffirmation = JSON.parse(JSON.stringify(this.selectedAffirmation));
    this.isBeingEdited = true;
  }

  cancelEdit() {
    this.selectedAffirmation = this.copyAffirmation
    this.isBeingEdited = false;
  }

}
