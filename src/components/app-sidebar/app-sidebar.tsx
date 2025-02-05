import Logo from "@/assets/icons/logo.svg";
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
import { useState } from "react";

import { Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";
import { FILTER_SECTION, FOLDER_SECTION } from "./mock-data";
import { MediaTypes } from "./types";

export function AppSidebar() {
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

  const handleParentChange = (checked: boolean) => {
    setChildChecked(
      Object.keys(childChecked).reduce(
        (acc, key) => {
          acc[Number(key)] = checked;
          return acc;
        },
        {} as Record<number, boolean>
      )
    );
  };

  const handleChildChange = (id: number) => (checked: boolean) => {
    setChildChecked((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

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
              {FOLDER_SECTION.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={`/$folderId`}
                      params={{ folderId: String(item.id) }}
                    >
                      {item.type === MediaTypes.FOLDER && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
}
