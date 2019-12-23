import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/auth.service';
import { ItemService } from '@app/services/item.service';

@Component({
  selector: 'app-member-area',
  templateUrl: './member-area.component.html',
  styleUrls: ['./member-area.component.css']
})
export class MemberAreaComponent implements OnInit {

  members;

  constructor(
    public authService: AuthService,
    private itemService: ItemService,
    ) { }

  ngOnInit() {
    this.itemService.getItems('users').subscribe(users => this.members = users);
  }

}
