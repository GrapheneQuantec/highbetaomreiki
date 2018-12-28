declare enum CarouselType {Images, Videos};

export interface Playlist {
    name: string;
    value: string;
    type?: CarouselType;
    videos?: Video[];
    images?: Image[];
}

export interface PlaylistOptions {
    loopAll: boolean;
}

export interface Video {
    videoId: string;
    caption: string;
}

export interface Image {
    pictureUrl: string;
    caption: string;
}