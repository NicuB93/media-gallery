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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";
import { FILTER_SECTION, FOLDER_SECTION } from "./mock-data";

export function AppSidebar() {
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
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm mb-4 text-black">
            Filters
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <div className="flex gap-2 items-center justify-between px-2">
                  <AccordionTrigger className="gap-2">
                    Is it accessible?
                  </AccordionTrigger>
                  <Checkbox id="terms1" />
                </div>
                <AccordionContent>
                  <SidebarMenu>
                    {FILTER_SECTION.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <a
                            className="flex justify-between items-center"
                            href={item.url}
                          >
                            <span className="flex gap-2 items-center">
                              <item.icon />
                              <span>{item.title}</span>
                            </span>
                            <Checkbox id="terms1" />
                          </a>
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
