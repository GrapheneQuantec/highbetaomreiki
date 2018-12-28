import { Component, OnInit, Output } from '@angular/core';
import { AffirmationService } from '../../services/affirmation.service';
import { Affirmation } from '../../models/affirmation';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from '../../core/auth.service';
import { UtilsService } from '@app/services/utils.service';
import { Playlist, Video, Image } from '@app/models/playlist';

declare var initCarousel: any;

@Component({
    selector: 'app-affirmations',
    templateUrl: './affirmations.component.html',
    styleUrls: ['./affirmations.component.css']
})
export class AffirmationsComponent implements OnInit {

    @Output() selectedVideoId: string;

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
    affirmationVisible: boolean = true;
    optionsVisible: boolean = false;
    loopAllAffirmations: boolean = true;
    playlists: Playlist[];
    affirmationCategories: string[];
    karaokeText: string;
    coloredAffirmationText: string;
    normalAffirmationText: string;
    karaokeLetterCount: number = 0;

    omegas = [
        { value: "OmegaSubaru", text: "Omega Subaru", url: "OmegaSubaru3.gif" },
        { value: "OmegaMultipleString", text: "Omega Multiple String", url: "omega_multiple_string.png" }
    ];

    carouselVideos: Playlist[] = [

        // Liomreiki
        {
            name: "Li Om Reiki",
            value: "liomreiki",
            videos: [
                { videoId: "NMTfMRi2fJk", caption: "Invocation" },
                { videoId: "dx-UJ-Xkr1M", caption: "Symbols" },
                { videoId: "VfBS_fHWt00", caption: "Grail" },
                { videoId: "xxMShqH2IRY", caption: "Song" },
            ],
        },

        // Poli Brains
        {
            name: "Poli",
            value: "poli",
            videos: [
                { videoId: "op4bkI9TRLU", caption: "Poli" },
                { videoId: "sVSfhE-g1EU", caption: "Systema Nervosum" },
                { videoId: "2pRCp9YyfyU", caption: "Nervous System" },
                { videoId: "YHD2sk4O13g", caption: "Polmoni" },
                { videoId: "knyAfmz0kBs", caption: "Renibus" },
                { videoId: "mX2o6JLFXwg", caption: "Zatoki" },
                { videoId: "6IrLyCTSJRI", caption: "Poli Маріє" },
            ],
        },

        //QT Tech & Research
        {
            name: "QT Tech & Research",
            value: "qttr",
            images: [
                { pictureUrl: "QFCenter_en.png", caption: "Quantum Foundation Modalities" },
                { pictureUrl: "QF3DNMR_en.png", caption: "Quantum Foundation 3D NMR" },
                { pictureUrl: "QFAen.png", caption: "Quantum Foundation Applications" },
                { pictureUrl: "QFD_en.png", caption: "Quantum Foundation Devices" },
                { pictureUrl: "QFK_en.png", caption: "Quantum Foundation Knowledge" },
                { pictureUrl: "QFR_en.png", caption: "Quantum Foundation Research" },
                { pictureUrl: "QFT_en.png", caption: "Quantum Foundation Technology" },
            ],
        },
    ]

    advancedCarouselVideos: Playlist[] = [

        // AnaAna

        {
            name: "AnaAna",
            value: "ana",
            videos: [

                { videoId: "9Wgm59jVZ9g", caption: "Santos" },
                { videoId: "fxCIwxeQkLs", caption: "Santos" },
                { videoId: "zR9-KR1PbJ4", caption: "AnaAna & Jesper" },
                { videoId: "TMDkAVlNPL8", caption: "AnaAna Orgy" },
                { videoId: "WznVXaV1b90", caption: "AnaAna & Monia" },
                { videoId: "7jR7HIBY168", caption: "AnaAna Triptych" },
                { videoId: "2Rvb1nv7oNQ", caption: "AnaAna Holo" },
                { videoId: "SSAJG_N2fmU", caption: "AnaAna & Sisisi" },
                { videoId: "GUWkrx5Tl7Q", caption: "AnaAna Zuberec" },
                { videoId: "qpWosird7l4", caption: "AnaAna & Mae" },
                { videoId: "vQNGP_0JkLc", caption: "AnaAna in Gaj" },
                { videoId: "3I5lbhlmRGQ", caption: "Maria" },
                { videoId: "qmzQyOcZYDM", caption: "Maria" },
                { videoId: "BtAezHra1O8", caption: "Maria" },
            ],
        },
        // Monia
        {
            name: "Monia",
            value: "monia",
            videos: [
                { videoId: "lElk0ZDeimA", caption: "Monia Gangbang" },
                { videoId: "J1GfrpA533M", caption: "Monia Trois" },
                { videoId: "ZpbaJ5n9dDI", caption: "Monia & Jeremy" },
                { videoId: "g_2EYNEi39c", caption: "Monia & Jeremy" },
                { videoId: "D2KxRiUM12Y", caption: "Monia & Jeremy" },
                { videoId: "jvxrLjsmPGs", caption: "Monia Minette" },
                { videoId: "xGQKqk7H72U", caption: "Monia with Two" },
            ],
        },
        // Joanna
        {
            name: "Joanna",
            value: "joanna",
            videos: [
                { videoId: "v72fr_7ZW2M", caption: "Red couch 23rd 1" },
                { videoId: "60xtzglV1MA", caption: "Red couch 23rd 2" },
                { videoId: "E0b3_Q8oUTs", caption: "Red couch 23rd 3" },
                { videoId: "N-8ZlWWehtk", caption: "Red couch 26th 1" },
                { videoId: "Hy6IM9Yjjeo", caption: "Red couch 26th 2" },
                { videoId: "0R4ACtHUVjg", caption: "Red couch 26th 3a" },
                { videoId: "hBlUDMBs3Lw", caption: "Red couch 26th 3b" },
                { videoId: "7TUhUeOC1uo", caption: "Red couch 26th 3c" },
            ],
        },
    ]

    constructor(private router: Router,
        private route: ActivatedRoute,
        public affirmationService: AffirmationService,
        public authService: AuthService,
        private utilService: UtilsService,
    ) {
    }

    ngOnInit() {

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

        this.affirmationService.getAffirmations().subscribe(affirmations => {
            this.affirmations = affirmations;
            this.affirmationCategories = this.removeDuplicates(affirmations.filter(aff => aff.category).map(aff => aff.category));
            if (affirmations.length > 0 && !this.activeAffirmationId) {
                this.setSelectedAffirmation(affirmations[0]);
            }
        });

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

    toggleAffirmation(event) {
        this.affirmationVisible = event;
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

            this.normalAffirmationText = affirmation.content;
            this.karaokeLetterCount = 0;
            setInterval(() => this.progressKaraoke(), 60);
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
            omegaBackground: this.omegas[0].value
        };

        this.affirmationService.addItem(item).then((doc: Affirmation) => {
            item.id = doc.id;
            this.affirmationService.updateItem(item);
            this.selectAffirmation(doc.id);
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
        const omega = this.omegas.filter(obj => obj.value === omegaValue);
        let omegaPath;

        if (omega[0]) {
            omegaPath = omega[0].url;
        } else {
            omegaPath = this.omegas[0].url;
        }
        // set path to omega background
        return omegaPath;
    }

    openOptions(event) {
        this.optionsVisible = true;
        if (event.ctrlKey && event.shiftKey) {
            this.playlists = this.carouselVideos.concat(this.advancedCarouselVideos);
        } else {
            this.playlists = this.carouselVideos;
        }
    }

    selectAffirmation(id) {
        // this.router.navigate(['/meditation/affirmation/' + id]);
        if (this.affirmations) {
            this.setSelectedAffirmation(this.affirmations.find(aff => aff.id === id));
        }
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

    progressKaraoke() {
        if (this.selectedAffirmation) {
            let texts = this.selectedAffirmation.content; //.replace(/<br\s*[\/]?>/gi, "")
            this.coloredAffirmationText = texts.substring(0, this.karaokeLetterCount);
            this.normalAffirmationText = texts.substring(this.karaokeLetterCount, texts.length);
            this.karaokeLetterCount = (this.karaokeLetterCount < texts.length)? this.karaokeLetterCount + 1: 0;
        }
    }

}
