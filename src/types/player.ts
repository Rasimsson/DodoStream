export type PlayerType = 'vlc' | 'exoplayer';

export interface PlayerRef {
    seekTo: (time: number, duration: number) => void;
}

export interface AudioTrack {
    index: number;
    title?: string;
    language?: string;
    type?: string;
}

export interface TextTrack {
    index: number;
    title?: string;
    language?: string;
    type?: string;
}

export interface PlayerProps {
    source: string;
    paused: boolean;
    onProgress?: (data: { currentTime: number; duration?: number }) => void;
    onLoad?: (data: { duration: number }) => void;
    onBuffer?: (buffering: boolean) => void;
    onEnd?: () => void;
    onError?: (message: string) => void;
    onAudioTracks?: (tracks: AudioTrack[]) => void;
    onTextTracks?: (tracks: TextTrack[]) => void;
    selectedAudioTrack?: AudioTrack;
    selectedTextTrack?: TextTrack;
}
