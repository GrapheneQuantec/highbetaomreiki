import { Injectable } from '@angular/core';
import { Playlist } from '@app/models/playlist';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  
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
      name: "QT Tech",
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

    // 2018 12 28
    {
      name: "2018 12 28",
      value: "20181228",
      videos: [
        { videoId: "6vYdXbIdWHo", caption: "Square" },
        { videoId: "yKxYw2X8z5U", caption: "South" },
        { videoId: "DPPilgwplPc", caption: "East" },
        { videoId: "5pUwazPHRQ0", caption: "North East" },
        { videoId: "-7CjY8Zx8HI", caption: "North" },
        { videoId: "mtpRJYrVgZY", caption: "North West" },
      ],
    },

    // 2018 12 28 O27
    {
      name: "2018 12 28 ~ O27",
      value: "20181228",
      videos: [
        { videoId: "dfxHM838AKI", caption: "Square" },
        { videoId: "OMe79aJhg3Y", caption: "South" },
        { videoId: "2qUYK3oJRnY", caption: "East" },
        { videoId: "6pX8DL34WSo", caption: "North East" },
        { videoId: "E1XwY1RMk0c", caption: "North" },
        { videoId: "9UJmX87I5x8", caption: "North West" },
      ],
    },

  ]


  constructor() { }
}
