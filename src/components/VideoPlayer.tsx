import { DefaultUi, Player, Youtube } from '@vime/react'

interface VideoPlayerProps {
  videoId: string
}

const VideoPlayer = ({ videoId }: VideoPlayerProps) => {
  return (
    <Player>
      <Youtube videoId={videoId} />
      <DefaultUi />
    </Player>
  )
}

export default VideoPlayer
