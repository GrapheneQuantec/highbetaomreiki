import { Component, OnInit } from '@angular/core';
import { AffirmationService } from '../../services/affirmation.service';
import { Affirmation } from '../../models/affirmation';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-affirmations',
  templateUrl: './affirmations.component.html',
  styleUrls: ['./affirmations.component.css']
})
export class AffirmationsComponent implements OnInit {

  affirmations: Affirmation[];
  activeAffirmationId: string;
  selectedAffirmation: Affirmation;
  copyAffirmation: Affirmation;
  isBeingEdited: boolean = false;
  isConfirmDelete: boolean = false;
  user;
  selectedOmega: string = 'OmegaSubaru';

  omegas = [
    {value : "OmegaSubaru", text : "Omega Subaru", url : "omega_subaru.gif"},
    {value : "OmegaMultipleString", text : "Omega Multiple String", url : "omega_multiple_string.png"}
  ];

  constructor(private router: Router,
    private route: ActivatedRoute,
    public affirmationService: AffirmationService,
    public authService: AuthService) {

  }

  ngOnInit() {
    
    this.authService.user$.subscribe(user => {
      this.user = user
    });

    this.route.url.subscribe((u) => {
    if (u[1]) {
        this.affirmationService.getAffirmationById(u[1].path).then(affirmation => {
          if (affirmation) {
            this.selectedAffirmation = affirmation.data();
            this.activeAffirmationId = affirmation.id;
            this.selectedOmega = this.getOmegaBackgroundPath(affirmation.data().omegaBackground);
          }
        })
      }
    });

    this.affirmationService.getAffirmations().subscribe(affirmations => {
      this.affirmations = affirmations;
      if (affirmations.length > 0) {
        this.selectedAffirmation = affirmations[0];
        this.activeAffirmationId = (this.activeAffirmationId)? this.activeAffirmationId : affirmations[0].id;
        this.selectedOmega = this.getOmegaBackgroundPath(affirmations[0].omegaBackground);
      }
    })

  }

  addAffirmation() {
    var item: Affirmation = {
      title: 'Title',
      content: 'Affirmation content',
      fontSettings: {
        fontSize: 12,
        lineHeight: 1.5,
        letterSpacing: 0,
      },
      omegaBackground: this.omegas[0].value
    }

    this.affirmationService.addItem(item).then((doc: Affirmation) => {
        item.id = doc.id;
        this.affirmationService.updateItem(item);
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

  getOmegaBackgroundPath(omegaValue) {
    // select omega from the omegas array by its value
    var omega = this.omegas.filter(obj => { return obj.value === omegaValue })
    var omegaPath;
    
    if (omega[0]) {
      omegaPath = omega[0].url;
    }
    else {
      omegaPath = this.omegas[0].url;
    }
    // set path to omega background
    return omegaPath;
  }

  selectAffirmation(id) {
    this.router.navigate(['/affirmation/' + id]);
    this.isBeingEdited = false;
    this.isConfirmDelete = false;
  }

  changeOmega(event: any) {
    this.selectedOmega = this.getOmegaBackgroundPath(event.target.value);
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
    this.selectedOmega = this.getOmegaBackgroundPath(this.copyAffirmation.omegaBackground);
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
