declare enum CarouselType {Images, Videos};
export type RewindType = "fast_backward" | "backward" | "pause" | "play" | "forward" | "fast_forward";

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
    caption?: string;
    start?: number;
    paused?: boolean;
}

export interface Image {
    pictureUrl: string;
    caption: string;
}