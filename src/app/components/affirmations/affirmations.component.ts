import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { AffirmationService } from '../../services/affirmation.service';
import { Affirmation } from '../../models/affirmation';
import { Router, ActivatedRoute, ParamMap, Event } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from '../../core/auth.service';
import { UtilsService } from '@app/services/utils.service';
import { Playlist, Video, Image } from '@app/models/playlist';
import { Subject } from 'rxjs';
import { CarouselService } from '@app/services/carousel.service';
import { VideoPlayerComponent } from '../elements/video-player/video-player.component';
import { ItemService } from '@app/services/item.service';
import { environment } from '@env/environment';

declare var initCarousel: any;

@Component({
  selector: 'app-affirmations',
  templateUrl: './affirmations.component.html',
  styleUrls: ['./affirmations.component.css']
})
export class AffirmationsComponent implements OnInit {

  @Output() selectedVideoId: string;
  @ViewChild('bgvideoplayer') videoPlayer: VideoPlayerComponent;

  

  affirmations: Affirmation[];
  activeAffirmationId: string;
  selectedAffirmation: Affirmation = {};
  copyAffirmation: Affirmation;
  isBeingEdited: boolean = false;
  isCategoryAdded: boolean = false;
  isConfirmDelete: boolean = false;
  user;
  selectedOmega = 'OmegaSubaru';
  private player;
  videos: Video[] = [];
  images: Image[] = [];
  globalVolume: number = 10;
  videosVisible: boolean = false;
  factomVisible: boolean = false;
  controlsVisible: boolean = false;
  affirmationVisible: boolean = true;
  optionsVisible: boolean = false;
  affirmationsVisible: boolean = false;
  affirmationsEditionVisible: boolean = false;
  carouselVisible: boolean = false;
  loopAllAffirmations: boolean = true;
  playlists: Playlist[];
  affirmationCategories: string[];
  karaokeText: string;
  coloredAffirmationText: string;
  normalAffirmationText: string;
  karaokeLetterCount: number = 0;
  karaokeSpeed: number = 80;
  karaokeInterval;
  factomInterval;
  factomSpeed: number = 780;
  factomCounter: number = 0;
  factomAffirmations: Array<Affirmation> = [];
  factomAffirmationIndex: number = 0;
  karaokeRunning: boolean = true;
  affirmationCounter: number = 1;
  affirmationCount: number = 16;
  affirmationBackground: string;
  carouselShown: boolean = true;
  karaokeState: Subject<string> = new Subject<string>();
  showBlow: boolean = false;
  isFactom: boolean = false;
  isPaused: boolean = false;
  omReikiStarted: boolean = false;
  startNextAutomatically: boolean = false;
  isAffirmationZoomed: boolean = false;
  environmentName: string;

  backgroundVideos = [
    { id: "eKFTSSKCzWA", title: "Nature" },
    { id: "3co7V1xdthA", title: "Quantum Holopedia" },
    { id: "4XT5PsazYcM", title: "House build" },
    { id: "xPbPtwL9V30", title: "Lungs" },
    { id: "r3WxYr6NA18", title: "Michelli" },
  ];
  backgroundVideoId = this.backgroundVideos[0].id;
  
  public invocationPlayer: any;
  public symbolsPlayer: any;

  factomZindices = [
    [10, -10, -10, -10],
    [-10, -10, -10, -10],
    [-10, 10, -10, -10],
    [-10, -10, 10, -10],
    [-10, -10, -10, 10],
  ]

  omegas;
  bgVideos;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public affirmationService: AffirmationService,
    private itemService: ItemService,
    public authService: AuthService,
    private utilService: UtilsService,
    private carouselService: CarouselService,
  ) {
  }

  ngOnInit() {

    this.environmentName = environment.name;
    console.log('en: ~~', this.environmentName)

    this.authService.user$.subscribe(user => {
      this.user = user;
    });

    this.route.url.subscribe((u) => {
      if (u.length > 0) {
        if (this.affirmations) {
          this.setSelectedAffirmation(this.affirmations.find(aff => aff.id === u[u.length - 1].path));
        } else {
          this.affirmationService.getAffirmationById(u[u.length - 1].path).then(affirmation => {
            if (affirmation) {
              this.setSelectedAffirmation(affirmation.data());
            }
          });
        }
      }
    });
    
    this.itemService.getItems('omegas').subscribe(omegas => this.omegas = omegas);
    this.itemService.getItems('bg_videos').subscribe(bgVideos => this.bgVideos = bgVideos);

    this.affirmationService.getAffirmations().subscribe(affirmations => {
      this.affirmations = affirmations;
      this.affirmationCategories = this.removeDuplicates(affirmations.filter(aff => aff.category).map(aff => aff.category));
      if (affirmations.length > 0 && !this.activeAffirmationId) {
        const sisters = this.affirmations.find(aff => aff.id === 'Hd9vAvZ7SfJQNdF7t4sj');
        const selectedAff = (sisters) ? sisters : this.affirmations[0];
        this.setSelectedAffirmation(selectedAff);
      }
    });

    this.utilService.videoState.subscribe(state => {
      if (!this.affirmationVisible) {
        this.isPaused = state.data == YT.PlayerState.PAUSED || state.data == YT.PlayerState.CUED;
      }
    });

  }

  changeVideo(event) {
    this.backgroundVideoId = event.target.value; 
    this.videoPlayer.loadVideoFromId(this.backgroundVideoId);
  }
  
  affirmationSwitch() {
    this.closeAllMenus();
    this.affirmationsVisible = true;
  }

  affirmationEditionSwitch() {
    this.closeAllMenus();
    this.affirmationsEditionVisible = true;
  }

  carouselSwitch(event) {
    this.closeAllMenus();
    this.carouselVisible = true;
    if (event.ctrlKey && event.shiftKey) {
      this.playlists = this.carouselService.carouselVideos.concat(this.carouselService.advancedCarouselVideos);
    } else {
      this.playlists = this.carouselService.carouselVideos;
    }
  }

  optionsSwitch() {
    this.closeAllMenus();
    this.optionsVisible = true;
  }

  factomSwitch() {
    this.closeAllMenus();
    this.factomVisible = true;
  }

  closeAllMenus() {
    this.videosVisible = false;
    this.factomVisible = false;
    this.affirmationsVisible = false;
    this.affirmationsEditionVisible = false;
    this.carouselVisible = false;
    this.optionsVisible = false;
  }

  changedCarouselVideos(event) {
    if (event.target.selectedIndex > 0) {
      let playlist: Playlist = this.playlists[event.target.selectedIndex - 1];
      let carouselCount: number = 0;
      if (playlist.videos) {
        this.videos = playlist.videos;
        carouselCount = this.videos.length
      }
      if (playlist.images) {
        this.images = playlist.images;
        carouselCount = this.images.length
      }
      initCarousel(carouselCount);
      this.utilService.setBackgroundPlaylist(playlist);
    } else {
      this.videos = [];
      this.images = [];
    }
  }

  videoSelected(video) {
    this.utilService.setBackgroundVideo(video.videoId);
  }

  setPlaylistOptions(event) {
    this.utilService.setBackgroundPlaylistOptions({ loopAll: event });
  }

  volumeChanged(event) {
    this.videos.forEach(video => video["player"].setVolume(this.globalVolume));
    this.utilService.setBackgroundVolume(this.globalVolume);
  }

  karaokeSpeedChanged() {
    clearInterval(this.karaokeInterval);
    this.karaokeInterval = setInterval(() => this.progressKaraoke(), this.karaokeSpeed);
  }

  toggleFactomMode(event) {
    this.isFactom = event;
  }

  toggleAutomaticProgression(event) {
    this.startNextAutomatically = event;
  }

  toggleAffirmation(event) {
    this.affirmationVisible = event;
  }
  

  backwardKaraoke() {
    if (this.karaokeLetterCount != 0) {
      this.karaokeLetterCount = 0;
    }
    else {
      this.affirmationCounter = (this.affirmationCounter > 1) ? this.affirmationCounter - 1 : 1;
      this.updateOmegaCounter();
    }
    this.updateKaraoke();
  }

  forwardKaraoke() {
    let texts = this.selectedAffirmation.content;
    if (this.karaokeLetterCount < texts.length) {
      this.karaokeLetterCount = texts.length;
    }
    else {
      this.affirmationCounter = (this.affirmationCounter < this.affirmationCount) ? this.affirmationCounter + 1 : this.affirmationCounter;
      this.updateOmegaCounter();
    }
    this.updateKaraoke();
  }

  resetKaraoke() {
    clearInterval(this.karaokeInterval);
    this.karaokeInterval = null;
    this.isPaused = true;
    this.karaokeLetterCount = 0;
    this.updateKaraoke();
    this.affirmationCounter = 1;
    this.updateOmegaCounter();
  }

  finishKaraoke() {
    let texts = this.selectedAffirmation.content;
    this.karaokeLetterCount = texts.length;
    this.updateKaraoke();
    this.affirmationCounter = this.affirmationCount;
    this.updateOmegaCounter();
  }

  playKaraoke() {
    clearInterval(this.karaokeInterval);
    this.karaokeInterval = setInterval(() => this.progressKaraoke(), this.karaokeSpeed);
    this.isPaused = false;
  }

  pauseKaraoke() {
    clearInterval(this.karaokeInterval);
    this.karaokeInterval = null;
    this.isPaused = true;
  }

  play() {
    if (this.affirmationVisible) {
      this.playKaraoke();
    } else {
      this.utilService.rewindVideo("play");
    }
  }

  pause() {
    if (this.affirmationVisible) {
      this.pauseKaraoke();
    } else {
      this.utilService.rewindVideo("pause");
    }
  }

  fastBackward(){
    if (this.affirmationVisible) {
      this.resetKaraoke();
    } else {
      this.utilService.rewindVideo("fast_backward");
    }
  }

  backward(){
    if (this.affirmationVisible) {
      this.backwardKaraoke();
    } else {
      this.utilService.rewindVideo("backward");
    }
  }

  forward(){
    if (this.affirmationVisible) {
      this.forwardKaraoke();
    } else {
      this.utilService.rewindVideo("forward");
    }
  }

  fastForward(){
    if (this.affirmationVisible) {
      this.finishKaraoke();
    } else {
      this.utilService.rewindVideo("fast_forward");
    }
  }

  savePlayer(player, videoId) {
    let video = this.videos.find(vid => vid.videoId == videoId);
    video["player"] = player;
    player.playVideo();
    player.setVolume(this.globalVolume);
  }

  onStateChange(event, videoId) {
    if (event.data == YT.PlayerState.ENDED) {
      let video = this.videos.find(vid => vid.videoId == videoId);
      video["player"].seekTo(0);
    }
  }

  onPlayerStateChange(event, player) {
    if (event.data == YT.PlayerState.ENDED) {
      player.seekTo(0);
    }
  }

  saveInvocationPlayer(player) {
    this.invocationPlayer = player;
    this.invocationPlayer.playVideo();
  }

  saveSymbolsPlayer(player) {
    this.symbolsPlayer = player;
    this.symbolsPlayer.playVideo();
  }

  rotationPause() {
    document.getElementById("carousel").setAttribute('style', 'animation-play-state: ' + 'pause');
  }

  rotationResume() {

  }

  spinRight(entered: boolean) {
    let animationDuration = (entered) ? "running" : "paused";
    document.getElementById("carousel-outer").setAttribute('style', 'animation-play-state: ' + animationDuration)
  }

  spinLeft(entered: boolean) {
    let animationDuration = (entered) ? "running" : "paused";
    document.getElementById("carousel-outerer").setAttribute('style', 'animation-play-state: ' + animationDuration)
  }

  setSelectedAffirmation(affirmation: Affirmation) {
    if (affirmation) {
      this.selectedAffirmation = affirmation;

      this.activeAffirmationId = affirmation.id;
      this.selectedOmega = this.getOmegaBackgroundPath(affirmation.omegaBackground);
      this.updateOmegaCounter();
      this.normalAffirmationText = affirmation.content;
      this.karaokeLetterCount = 0;
      clearInterval(this.karaokeInterval);
      this.karaokeInterval = setInterval(() => this.progressKaraoke(), this.karaokeSpeed);
    }
  }

  addAffirmation() {
      const item: Affirmation = {
      title: 'New',
      content: '',
      fontSettings: {
        fontSize: 12,
        lineHeight: 1.5,
        letterSpacing: 0,
      },
      omegaBackground: this.omegas[0].name
    };

    this.affirmationService.addItem(item).then((doc: Affirmation) => {
      item.id = doc.id;
      this.affirmationService.updateItem(item);
      this.selectAffirmationById(doc.id);
    });
  }

  getAffirmationStyle(): object {
    if (this.selectedAffirmation && this.selectedAffirmation.fontSettings) {
      return {
        'font-size': this.selectedAffirmation.fontSettings.fontSize + 'px',
        'line-height': this.selectedAffirmation.fontSettings.lineHeight,
        'letter-spacing': this.selectedAffirmation.fontSettings.letterSpacing + 'px'
      };
    }
  }

  getOmegaBackgroundPath(omegaValue) {
    // select omega from the omegas array by its value
    const omega = this.omegas.filter(obj => obj.name === omegaValue);
    let omegaPath;

    if (omega[0]) {
      omegaPath = omega[0].url;
    } else {
      omegaPath = this.omegas[0].url;
    }
    // set path to omega background
    return omegaPath;
  }

  updateOmegaCounter() {
    this.affirmationBackground = `url(../../../assets/images/starpoints/active_star_${this.affirmationCounter}.png), url(${this.selectedOmega})`;
  }

  markAffirmation(event) {
    if(event.target.value != "_default_" && !this.factomAffirmations.find(aff => aff.id == event.target.value)) {
      this.factomAffirmations.push(this.affirmations.find(aff => aff.id == event.target.value));
    }
  }

  unmarkAffirmation(affirmation: Affirmation) {
    this.factomAffirmations = this.factomAffirmations.filter(aff => aff !== affirmation);
  }

  selectAffirmation(event) {
    let id = event.target.value;
    this.selectAffirmationById(id);
  }

  selectAffirmationById(id) {

    // this.router.navigate(['/meditation/affirmation/' + id]);
    if (this.affirmations) {
      this.setSelectedAffirmation(this.affirmations.find(aff => aff.id === id));
    }
    this.resetKaraoke();
    this.isBeingEdited = false;
    this.isConfirmDelete = false;
  }

  changeOmega(event: any) {
    this.selectedOmega = this.getOmegaBackgroundPath(event.target.value);
  }

  updateItem() {
    this.affirmationService.updateItem(this.selectedAffirmation);
    this.isBeingEdited = false;
    this.isCategoryAdded = false;
  }

  startEdit() {
    // copy current affirmation without its references
    this.copyAffirmation = JSON.parse(JSON.stringify(this.selectedAffirmation));
    this.isBeingEdited = true;
  }

  cancelEdit() {
    this.selectedAffirmation = this.copyAffirmation;
    this.selectedOmega = this.getOmegaBackgroundPath(this.copyAffirmation.omegaBackground);
    this.isBeingEdited = false;
  }

  deleteAffirmation() {
    this.isConfirmDelete = true;
  }

  confirmedDeleteAffirmation() {
    this.isConfirmDelete = false;
    this.affirmationService.deleteItem(this.selectedAffirmation);
  }

  revokedDeleteAffirmation() {
    this.isConfirmDelete = false;
  }

  removeDuplicates(array) {
    let unique = {};
    array.forEach(function (i) {
      if (!unique[i]) {
        unique[i] = true;
      }
    });
    return Object.keys(unique);
  }

  updateKaraoke() {
    let texts = this.selectedAffirmation.content; //.replace(/<br\s*[\/]?>/gi, "")
    this.coloredAffirmationText = texts.substring(0, this.karaokeLetterCount);
    this.normalAffirmationText = texts.substring(this.karaokeLetterCount, texts.length);
  }

  progressKaraoke() {

    if (this.selectedAffirmation) {
      let texts = this.selectedAffirmation.content; //.replace(/<br\s*[\/]?>/gi, "")
      this.updateKaraoke();
      if (this.karaokeLetterCount < texts.length) {
        this.karaokeLetterCount = this.karaokeLetterCount + 1;
      }
      else {
        this.karaokeLetterCount = 0;
        if (this.affirmationCounter < this.affirmationCount) {
          this.affirmationCounter = this.affirmationCounter + 1;
        }
        else {
          this.affirmationCounter = 1;
          if (this.isFactom) {
            this.factomAffirmationIndex = (this.factomAffirmationIndex + 1) % this.factomAffirmations.length;
            this.selectedAffirmation = this.factomAffirmations[this.factomAffirmationIndex];
          } else {
            this.karaokeState.next("finished");
          }
        }
        this.updateOmegaCounter();
      }
    }
  }

  factomCount() {
    this.factomCounter = (this.factomCounter + 1) % 5;
  }

  startFactom() {
    if (this.factomAffirmations.length != 0) {
      this.closeAllMenus();
      clearInterval(this.factomInterval);
      this.factomInterval = setInterval(() => this.factomCount(), this.factomSpeed);
      this.selectedAffirmation = this.factomAffirmations[this.factomAffirmationIndex];
      this.isFactom = true;
      this.resetKaraoke();
      this.playKaraoke();
    }
  }

  startOmReiki() {
    this.closeAllMenus();

    this.omReikiStarted = true;

    // open fullscreen view
    this.fullscreenView(document.getElementsByTagName("body")[0]);

    // clear elements on the website
    this.affirmationVisible = false;
    this.carouselVisible = false;
    this.showBlow = false;
    this.resetKaraoke();
    this.closeAllMenus();

    // start invocation, masters ~> NMTfMRi2fJk
    let invocationObservable = this.utilService.setBackgroundVideo({videoId: "J3nlkcMx2BA", paused: !this.startNextAutomatically && !this.isFactom});
    let invoSub = invocationObservable.subscribe(state => {

      if (state.data == YT.PlayerState.ENDED) {
        invoSub.unsubscribe();

        // start affirmation
        this.utilService.setBackgroundVideo({videoId: "eKFTSSKCzWA", start: 3});
        this.affirmationVisible = true;
        this.isPaused = true;
        if ( this.startNextAutomatically || this.isFactom ) {
          this.playKaraoke();
        }

        this.karaokeState.subscribe(state => {
          if (state == "finished") {
            this.resetKaraoke();
            this.affirmationVisible = false;

            let symbolsCounter = 0;
            let symbolsObservable = this.utilService.setBackgroundVideo({videoId: "f5ALvqqv4wI", paused: !this.startNextAutomatically && !this.isFactom});
            let symbSub = symbolsObservable.subscribe(state => {
              if (state.data == YT.PlayerState.ENDED) {
                symbolsCounter = symbolsCounter + 1;
                if (symbolsCounter < 8) return
                
                symbSub.unsubscribe();

                let grailObservable = this.utilService.setBackgroundVideo({videoId: "VfBS_fHWt00", paused: !this.startNextAutomatically && !this.isFactom});
                let grailSub = grailObservable.subscribe(state => {
                  if (state.data == YT.PlayerState.ENDED) {
                    grailSub.unsubscribe();

                    let songObservable = this.utilService.setBackgroundVideo({videoId: "xxMShqH2IRY", paused: !this.startNextAutomatically && !this.isFactom});
                    let songSub = songObservable.subscribe(state => {
                      if (state.data == YT.PlayerState.ENDED) {
                        songSub.unsubscribe();
                        if (this.isFactom) {
                          this.startOmReiki();
                        } else {
                          this.utilService.setBackgroundVideo({videoId: "eKFTSSKCzWA", start: 300});
                          this.showBlow = true;
                        }
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }


    });

    // TODO
    // finish all reiki steps in the simplest series
    // introduce delays between the steps
    // create the option between manual and automatic change
    // make the option to choose amout of repetitions
    // arrange all the buttons nicely and intuitively
    // synchroniczne play i synchronizacja w trakcie

    // { videoId: "NMTfMRi2fJk", caption: "Invocation" },
    // { videoId: "dx-UJ-Xkr1M", caption: "Symbols" },
    // { videoId: "VfBS_fHWt00", caption: "Grail" },
    // { videoId: "xxMShqH2IRY", caption: "Song" },

  }

  newOmReiki() {
    this.omReikiStarted = false;
    this.utilService.setBackgroundVideo({videoId: "eKFTSSKCzWA", start: 300});
    this.showBlow = false;
  }

  fullscreenView(element) {
    if (element.requestFullscreen)
      element.requestFullscreen();
    else if (element.mozRequestFullScreen)
      element.mozRequestFullScreen();
    else if (element.webkitRequestFullscreen)
      element.webkitRequestFullscreen();
    else if (element.msRequestFullscreen)
      element.msRequestFullscreen();
  }

  openAppearIn() {
    this.router.navigate([]).then(result => {  window.open('https://appear.in/liomreiki', '_blank'); });
  }

}
