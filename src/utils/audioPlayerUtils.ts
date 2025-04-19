
// Import the types properly from the react-h5-audio-player package
import AudioPlayer from 'react-h5-audio-player';

// Extract the prop types from the component type
type AudioPlayerProps = React.ComponentProps<typeof AudioPlayer>;

export const audioPlayerStyles = {
  background: 'transparent',
  boxShadow: 'none',
  width: '100%',
  '& .rhap_progress-bar': {
    background: 'linear-gradient(to right, #8FBC8F, #3CB371)',
    opacity: 0.7,
  },
  '& .rhap_progress-indicator': {
    backgroundColor: '#fff',
  },
  '& .rhap_controls-section': {
    backgroundColor: 'transparent',
  },
  '& .rhap_main-controls-button': {
    color: '#fff',
  },
  '& .rhap_time': {
    color: '#fff',
  },
  '& .rhap_progress-filled': {
    backgroundColor: '#fff',
  },
};

// Use the correct type for CustomUI modules
export const defaultControlsSection: NonNullable<AudioPlayerProps['customControlsSection']> = 
  ['MAIN_CONTROLS', 'VOLUME_CONTROLS'] as NonNullable<AudioPlayerProps['customControlsSection']>;

export const defaultProgressBarSection: NonNullable<AudioPlayerProps['customProgressBarSection']> = 
  ['PROGRESS_BAR', 'CURRENT_TIME', 'DURATION'] as NonNullable<AudioPlayerProps['customProgressBarSection']>;
