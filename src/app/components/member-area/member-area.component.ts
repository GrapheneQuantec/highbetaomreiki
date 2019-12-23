import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/auth.service';

@Component({
  selector: 'app-member-area',
  templateUrl: './member-area.component.html',
  styleUrls: ['./member-area.component.css']
})
export class MemberAreaComponent implements OnInit {

  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.user$.subscribe(u=>console.log({dn: u.displayName}))
  }

}
