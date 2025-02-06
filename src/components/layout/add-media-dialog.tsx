import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addChild } from "@/stores/media-store";
import { useParams } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";

// Normally here, I would add a DB and some cloud storage to save the media files.
// Now only URL of the media is saved. (like https://fastly.picsum.photos/).

export function AddMediaDialog({
  isOpen,
  handleOpenAddFolder,
}: {
  isOpen: boolean;
  handleOpenAddFolder: (open: boolean) => void;
}) {
  const [mediaName, setMediaName] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const { folderId } = useParams({ strict: false });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMediaName(e.target.value);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMediaUrl(e.target.value);
  };

  const handleAddMedia = () => {
    addChild(Number(folderId), { url: mediaUrl, title: mediaName });
    setMediaName("");
    handleOpenAddFolder(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenAddFolder}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Plus />
          Add Media
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Media</DialogTitle>
          <DialogDescription>
            Please enter the name of the media you want to add.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <Label htmlFor="name">Media title</Label>
          <Input
            placeholder="Media name"
            id="name"
            onChange={handleNameChange}
            value={mediaName}
          />
          <Label htmlFor="url">Media URL</Label>
          <Input
            placeholder="Media url"
            id="url"
            onChange={handleUrlChange}
            value={mediaUrl}
          />
        </div>
        <DialogFooter>
          <Button onClick={() => handleAddMedia()}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
