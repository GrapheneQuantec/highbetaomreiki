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
  isConfirmDelete: boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public affirmationService: AffirmationService) {

  }

  ngOnInit() {
    this.route.url.subscribe((u) => {
      if (u[1]) {
        this.affirmationService.getAffirmationById(u[1].path).then(affirmation => {
          if (affirmation) {
            this.selectedAffirmation = affirmation.data();
            this.activeAffirmationId = affirmation.id;
          }
        })
      }
    });

    this.affirmationService.getAffirmations().subscribe(affirmations => {
      this.affirmations = affirmations;
      if (affirmations.length > 0) {
        this.selectedAffirmation = affirmations[0];
        this.activeAffirmationId = affirmations[0].id;
      }
    })

  }

  addAffirmation() {
    var item: Affirmation = {
      id: 'sextantra',
      title: 'Title',
      content: 'Affirmation content',
      fontSettings: {
        fontSize: 12,
        lineHeight: 1.5,
        letterSpacing: 0,
      }
    }

    this.affirmationService.addItem(item).then((doc: Affirmation) => {
      this.selectAffirmation(doc.id);
    });
  }

  getAffirmationStyle(): object {
    if (this.selectedAffirmation.fontSettings) {
      return {
        'font-size': this.selectedAffirmation.fontSettings.fontSize + 'px',
        'line-height': this.selectedAffirmation.fontSettings.lineHeight,
        'letter-spacing': this.selectedAffirmation.fontSettings.letterSpacing + 'px'
      };
    }
  }

  selectAffirmation(id) {
    this.router.navigate(['/affirmation/' + id]);
    this.isBeingEdited = false;
    this.isConfirmDelete = false;
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

  deleteAffirmation() {
    this.isConfirmDelete = true;
  }

  confirmedDeleteAffirmation(affirmation: Affirmation) {
    this.isConfirmDelete = false;
    this.affirmationService.deleteItem(affirmation);
  }

  revokedDeleteAffirmation() {
    this.isConfirmDelete = false;
  }

}
