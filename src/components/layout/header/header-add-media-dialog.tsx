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
import { ALL_SUPPORTED_MEDIA_TYPES } from "@/stores/constants";
import { addChild } from "@/stores/media-store";
import { useParams } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";

// Normally here, I would add a DB and some cloud storage to save the media files.
// Now only URL of the media is saved. (like https://fastly.picsum.photos/).
// Also I would add some proper form and regex validation for the URL and the name.

/**
 * AddMediaDialog component renders a dialog for adding media items.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Indicates whether the dialog is open.
 * @param {function} props.handleOpenAddFolder - Function to handle the dialog open state.
 *
 * @returns {JSX.Element} The rendered AddMediaDialog component.
 *
 * @remarks
 * This component uses the `useState` hook to manage the media name and URL input states,
 * and the `useParams` hook to get the folder ID from the URL parameters.
 *
 * The `handleAddMedia` function validates the media URL and adds the media item to the folder.
 * If the URL is invalid, an error message is displayed.
 *
 * The dialog contains input fields for the media name and URL, and a button to save the changes.
 * The save button is disabled if either the media name or URL is empty.
 */
export const AddMediaDialog = ({
  isOpen,
  handleOpenAddFolder,
}: {
  isOpen: boolean;
  handleOpenAddFolder: (open: boolean) => void;
}) => {
  const [mediaName, setMediaName] = useState<string>("");
  const [mediaUrl, setMediaUrl] = useState<string>("");
  const [urlError, setUrlError] = useState<boolean>(false);
  const { folderId } = useParams({ strict: false });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMediaName(e.target.value);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMediaUrl(e.target.value);
  };

  const handleAddMedia = () => {
    if (!ALL_SUPPORTED_MEDIA_TYPES.some((type) => mediaUrl.includes(type))) {
      setUrlError(true);
      return;
    }

    addChild(Number(folderId), { url: mediaUrl, title: mediaName });
    setMediaName("");
    setMediaUrl("");
    handleOpenAddFolder(false);
  };

  const isSubmitDisabled = !mediaName || !mediaUrl;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenAddFolder}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white hover:bg-blue-400">
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
          <Label htmlFor="url">
            Media URL (only the ones from picsum works now random or static,
            other links will throw CORS error)
          </Label>
          <Input
            placeholder="Media URL"
            id="url"
            onChange={handleUrlChange}
            value={mediaUrl}
          />
          {urlError && (
            <span className="text-red-600 text-xs">
              Please enter a valid media URL
            </span>
          )}
        </div>
        <DialogFooter>
          <Button disabled={isSubmitDisabled} onClick={() => handleAddMedia()}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
