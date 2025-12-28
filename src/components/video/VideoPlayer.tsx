import { FC, useState } from 'react';
import { useProfileStore } from '@/store/profile.store';
import {
  DEFAULT_PROFILE_PLAYBACK_SETTINGS,
  useProfileSettingsStore,
} from '@/store/profile-settings.store';
import { VideoPlayerSession, type VideoPlayerProps } from './VideoPlayerSession';
import { getVideoSessionId } from '@/utils/stream';

export const VideoPlayer: FC<VideoPlayerProps> = (props) => {
  const activeProfileId = useProfileStore((state) => state.activeProfileId);

  const { player: playerType, automaticFallback } = useProfileSettingsStore((state) => ({
    player:
      (activeProfileId ? state.byProfile[activeProfileId]?.player : undefined) ??
      DEFAULT_PROFILE_PLAYBACK_SETTINGS.player,
    automaticFallback:
      (activeProfileId ? state.byProfile[activeProfileId]?.automaticFallback : undefined) ??
      DEFAULT_PROFILE_PLAYBACK_SETTINGS.automaticFallback,
  }));

  const [usedPlayerType, setUsedPlayerType] = useState(playerType);
  const sessionKey = getVideoSessionId(props.source, props.metaId, props.videoId, usedPlayerType);

  return (
    <VideoPlayerSession
      key={sessionKey}
      {...props}
      usedPlayerType={usedPlayerType}
      setUsedPlayerType={setUsedPlayerType}
      playerType={playerType}
      automaticFallback={automaticFallback}
    />
  );
};
