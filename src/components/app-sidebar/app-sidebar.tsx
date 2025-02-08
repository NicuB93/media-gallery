import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";

import Logo from "@/assets/icons/logo.svg";
import { cn } from "@/lib/utils";
import { FILTER_SECTION } from "@/mock/mock-data";
import { useMediaStore } from "@/stores/media-store";
import { MediaTypes } from "../../mock/types";
import { DroppableFolder } from "../drag-and-drop/droppable-media";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";
import { AddNewFolderDialog } from "./components/add-new-folder-dialog";

export const AppSidebar = () => {
  const { folderId } = useParams({ strict: false });
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate({ from: `/$folderId` });

  const handleOpenAddFolder = (open: boolean) => {
    setIsOpen(open);
  };

  const mediaStore = useMediaStore();
  const folders = mediaStore.folders;

  const [childChecked, setChildChecked] = useState<Record<number, boolean>>(
    () =>
      FILTER_SECTION.reduce(
        (acc, item) => {
          acc[item.id] = false;
          return acc;
        },
        {} as Record<number, boolean>
      )
  );

  const allChecked = Object.values(childChecked).every(Boolean);
  const noneChecked = Object.values(childChecked).every((checked) => !checked);

  const parentCheckboxValue: boolean | "indeterminate" = allChecked
    ? true
    : noneChecked
      ? false
      : "indeterminate";

  // change the parent checkbox value based on the child checkboxes
  const handleParentChange = (checked: boolean) => {
    const selectedTypes = checked
      ? FILTER_SECTION.map((item) => item.type)
      : [];

    setChildChecked(
      Object.keys(childChecked).reduce(
        (acc, key) => {
          acc[Number(key)] = checked;
          return acc;
        },
        {} as Record<number, boolean>
      )
    );

    navigate({
      to: `/$folderId`,
      search: {
        types: selectedTypes,
      },
    });
  };

  const handleChildChange = (id: number) => (checked: boolean) => {
    setChildChecked((prev) => ({
      ...prev,
      [id]: checked,
    }));

    const updatedSelectedTypes = FILTER_SECTION.filter((item) =>
      id === item.id ? checked : !!childChecked[item.id]
    ).map((item) => item.type);

    navigate({
      to: `/$folderId`,
      search: {
        types: updatedSelectedTypes,
      },
    });
  };

  const accumulatedTypes: Record<
    Exclude<MediaTypes, MediaTypes.FOLDER>,
    number
  > = {
    [MediaTypes.IMAGES]: 0,
    [MediaTypes.GIFS]: 0,
    [MediaTypes.VIDEOS]: 0,
  };

  const filteredMediaAggregation =
    folders
      .find((f) => f.id === Number(folderId))
      ?.children?.reduce((accum, child) => {
        if (child.type) {
          accum[child.type] += 1;
        }
        return accum;
      }, accumulatedTypes) || accumulatedTypes;

  return (
    <Sidebar collapsible="none">
      <SidebarHeader>
        <Logo />
        <span className="text-lg text-shadow text-shadow-gray-400 text-shadow-y-lg text-shadow-blur-4">
          Media gallery
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm mb-2 text-black">
            Folders
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {folders.map((item) => (
                <DroppableFolder key={item.id} folderId={item.id}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      className={cn(
                        folderId === String(item.id) && "bg-slate-100"
                      )}
                      asChild
                    >
                      <Link
                        to={`/$folderId`}
                        params={{ folderId: String(item.id) }}
                      >
                        {item.type === MediaTypes.FOLDER && <item.icon />}
                        <span>{item.title}</span>
                        <span className="text-gray-400">
                          {item.children?.length}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </DroppableFolder>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <AddNewFolderDialog
                    isOpen={isOpen}
                    handleOpenAddFolder={handleOpenAddFolder}
                  />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sm mb-1 text-black">
            Filters
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <div className="flex gap-2 items-center justify-between px-2">
                  <AccordionTrigger className="gap-2 text-[#878C91] text-xs">
                    Media Filter
                  </AccordionTrigger>
                  <Checkbox
                    id="media-filter-parent"
                    checked={parentCheckboxValue}
                    onCheckedChange={(checked) => {
                      if (typeof checked === "boolean") {
                        handleParentChange(checked);
                      }
                    }}
                  />
                </div>
                <AccordionContent>
                  <SidebarMenu>
                    {FILTER_SECTION.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton asChild>
                          <button className="flex justify-between items-center">
                            <span className="flex gap-2 items-center">
                              {item.isFilter === true && <item.icon />}
                              <span>{item.title}</span>
                              <span className="text-gray-400">
                                {item.type &&
                                  filteredMediaAggregation[item.type]}
                              </span>
                            </span>
                            <Checkbox
                              id={`child-${item.id}`}
                              checked={childChecked[item.id]}
                              onCheckedChange={(checked) => {
                                if (typeof checked === "boolean") {
                                  handleChildChange(item.id)(checked);
                                }
                              }}
                            />
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};
