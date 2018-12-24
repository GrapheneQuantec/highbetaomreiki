export interface Playlist {
    name: string;
    value: string;
    videos: Video[];
}

export interface PlaylistOptions {
    loopAll: boolean;
}

export interface Video {
    videoId: string;
    caption: string;
}