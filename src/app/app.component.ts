import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { UtilsService } from './services/utils.service';
import { Playlist, PlaylistOptions, RewindType, Video } from '@app/models/playlist';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  backgroundVideoId = "2v9_dUlHMxU";

  constructor(
    public authService: AuthService,
  ) {
  }

  ngOnInit() {

  }
  
}
