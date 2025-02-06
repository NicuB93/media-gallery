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
import { useMediaStore } from "@/stores/media-store";
import { useState } from "react";

// Normally here, I would add a DB and create a folder in the cloud storage to save the media files.

export function AddNewFolderDialog({
  isOpen,
  handleOpenAddFolder,
}: {
  isOpen: boolean;
  handleOpenAddFolder: (open: boolean) => void;
}) {
  const [folderName, setFolderName] = useState("");
  const mediaStore = useMediaStore();
  const addFolder = mediaStore.addFolder;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };

  const handleAddFolder = () => {
    addFolder(folderName);
    setFolderName("");
    handleOpenAddFolder(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenAddFolder}>
      <DialogTrigger asChild>
        <Button className="w-full" variant="ghost">
          New Folder
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Folder</DialogTitle>
          <DialogDescription>
            Please enter the name of the folder you want to create.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <Label htmlFor="name">Folder name</Label>
          <Input
            placeholder="Folder name"
            id="name"
            onChange={handleNameChange}
            value={folderName}
          />
        </div>
        <DialogFooter>
          <Button onClick={() => handleAddFolder()}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
