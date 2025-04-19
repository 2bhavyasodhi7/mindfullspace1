
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Video, Music } from "lucide-react";

interface MediaToggleProps {
  showVideo: boolean;
  onToggle: (enabled: boolean) => void;
}

const MediaToggle = ({ showVideo, onToggle }: MediaToggleProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Music className={`h-4 w-4 ${!showVideo ? 'text-mindful' : 'text-gray-400'}`} />
      <Switch
        checked={showVideo}
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-mindful"
      />
      <Video className={`h-4 w-4 ${showVideo ? 'text-mindful' : 'text-gray-400'}`} />
      <Label className="text-sm text-gray-600">
        {showVideo ? 'Video' : 'Audio'} mode
      </Label>
    </div>
  );
};

export default MediaToggle;
