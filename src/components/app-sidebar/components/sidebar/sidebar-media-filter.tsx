import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarMediaFilterProps } from "./types";

/**
 * SidebarMediaFilter component renders a filter section within a sidebar using an accordion.
 * It allows users to filter media items based on various criteria.
 *
 * @param {boolean} parentCheckboxValue - The checked state of the parent checkbox.
 * @param {function} handleParentChange - Function to handle changes to the parent checkbox.
 * @param {Record<string, boolean>} childChecked - An object representing the checked state of child checkboxes.
 * @param {function} handleChildChange - Function to handle changes to the child checkboxes.
 * @param {Array<{ id: string, title: string, isFilter: boolean, icon?: React.ComponentType, type?: string }>} filterSection - Array of filter section items.
 * @param {Record<string, number>} filteredMediaAggregation - An object representing the aggregation of filtered media items.
 *
 * @returns {JSX.Element} The rendered SidebarMediaFilter component.
 */
export const SidebarMediaFilter = ({
  parentCheckboxValue,
  handleParentChange,
  childChecked,
  handleChildChange,
  filterSection,
  filteredMediaAggregation,
}: SidebarMediaFilterProps) => {
  return (
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
            {filterSection.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton asChild>
                  <button className="flex justify-between items-center">
                    <span className="flex gap-2 items-center">
                      {item.isFilter && item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <span className="text-gray-400">
                        {item.type && filteredMediaAggregation[item.type]}
                      </span>
                    </span>
                    <Checkbox
                      //   ref={checkboxRef}
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
  );
};
