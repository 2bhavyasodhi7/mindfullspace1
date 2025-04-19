
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  url: string;
  title: string;
}

const VideoPlayer = ({ url, title }: VideoPlayerProps) => {
  return (
    <div className="aspect-video w-full rounded-xl overflow-hidden bg-black/5">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls={true}
        playing={false}
        light={true}
        title={title}
      />
    </div>
  );
};

export default VideoPlayer;
