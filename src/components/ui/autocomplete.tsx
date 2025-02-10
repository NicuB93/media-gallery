import { cn } from "@/lib/utils/cn";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

export interface AutocompleteItem {
  name: string | undefined;
  id: number | undefined;
}

export interface ControlledAutocompleteProps {
  /** The current input text (controlled by the parent). */
  value: string;
  /** Called when the user types in the input. */
  onChange: (newValue: string) => void;

  /** Whether the dropdown is currently open (controlled by the parent). */
  open: boolean;
  /** Called to update `open`. Child calls onOpenChange(false) to close. */
  onOpenChange: (nextOpen: boolean) => void;

  /** The list of items to display in the dropdown (already filtered). */
  items: AutocompleteItem[];

  /** Called when the user clicks or presses Enter on an item. */
  onSelectItem?: (itemName: string | undefined) => void;

  /** Called when the user presses Enter (e.g. to trigger a search with typed text). */
  onEnter?: (query: string) => void;

  /** If there are more results, show a "Show all results" item at the bottom. */
  hasMore?: boolean;
  onShowAll?: () => void;

  /** Placeholder in the input. */
  placeholder?: string;
  /** Additional classes for the container or input, if needed. */
  className?: string;
}

/**
 * Autocomplete component for providing suggestions as the user types.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.value - The current value of the input.
 * @param {function} props.onChange - Callback function to handle input value changes.
 * @param {boolean} props.open - Whether the dropdown is open.
 * @param {function} props.onOpenChange - Callback function to handle dropdown open state changes.
 * @param {Array} props.items - List of items to display in the dropdown.
 * @param {function} props.onSelectItem - Callback function to handle item selection.
 * @param {function} [props.onEnter] - Optional callback function to handle Enter key press with typed text.
 * @param {boolean} props.hasMore - Whether there are more items to show.
 * @param {function} [props.onShowAll] - Optional callback function to handle "Show all results" selection.
 * @param {string} [props.placeholder="Search..."] - Placeholder text for the input.
 * @param {string} [props.className] - Additional class names for the container.
 *
 * @returns {JSX.Element} The rendered Autocomplete component.
 */
export function Autocomplete({
  value,
  onChange,
  open,
  onOpenChange,
  items,
  onSelectItem,
  onEnter,
  hasMore,
  onShowAll,
  placeholder = "Search...",
  className,
}: ControlledAutocompleteProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track which item is currently highlighted via arrow keys
  // -1 means "no item" is highlighted
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  // Close if user clicks outside the container
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onOpenChange(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onOpenChange]);

  // Create a unified list for arrow navigation:
  // All normal items + maybe one extra "Show all results" item
  // We'll store them in `displayList` so we can reference them by `highlightedIndex`.
  // We'll mark the "Show all results" item with a special ID or object if hasMore = true.
  let displayList: (AutocompleteItem | { showAll: true })[] = [...items];
  if (hasMore) {
    // Append a special sentinel object for "Show all results"
    displayList.push({ showAll: true });
  }

  // Reset highlight when we close or if there are no items
  useEffect(() => {
    if (!open || displayList.length === 0) {
      setHighlightedIndex(-1);
    }
  }, [open, displayList]);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    // If dropdown is not open or empty, only handle Enter (with typed text)
    if (!open || displayList.length === 0) {
      if (e.key === "Enter") {
        e.preventDefault();
        onEnter?.(value.trim());
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => {
          // Move down, wrap around with modulo
          const next = (prev + 1) % displayList.length;
          return next;
        });
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => {
          // Move up, wrap around with modulo
          // + displayList.length ensures we don't go negative
          const next = (prev + displayList.length - 1) % displayList.length;
          return next;
        });
        break;

      case "Enter":
        e.preventDefault();
        // If something is highlighted
        if (highlightedIndex >= 0 && highlightedIndex < displayList.length) {
          const selected = displayList[highlightedIndex];
          if ("showAll" in selected) {
            // It's the "Show all results" item
            onShowAll?.();
          } else {
            // Normal item
            onSelectItem?.(selected.name);
          }
        } else {
          // If no highlight, just call onEnter with typed text
          onEnter?.(value.trim());
        }
        break;

      case "Escape":
        // Optionally close on Escape
        onOpenChange(false);
        break;

      default:
        break;
    }
  }

  // Optional: automatically open if there's text on focus
  function handleFocus() {
    if (!open && value.trim().length > 0) {
      onOpenChange(true);
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className ?? ""}`}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        className="w-72 border border-gray-300 rounded px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-blue-500"
        // ARIA attributes for combobox
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        aria-activedescendant={
          highlightedIndex >= 0 && highlightedIndex < displayList.length
            ? getItemId(displayList[highlightedIndex], highlightedIndex)
            : undefined
        }
      />

      {open && (
        <div
          className="absolute top-full left-0 w-72 mt-1
            bg-white border border-gray-200
            rounded shadow z-50"
          role="listbox"
        >
          {displayList.length === 0 ? (
            <div className="px-4 py-2 text-gray-500">No results found.</div>
          ) : (
            <ul className="max-h-60 overflow-auto">
              {displayList.map((entry, i) => {
                const isHighlighted = i === highlightedIndex;

                // Distinguish between normal items vs. "Show all results"
                if ("showAll" in entry) {
                  // "Show all results" item
                  return (
                    <li
                      key="show-all"
                      id={getItemId(entry, i)}
                      className={cn(
                        "px-4 py-2 cursor-pointer",
                        isHighlighted
                          ? "bg-blue-500 text-white"
                          : "hover:bg-gray-100 text-blue-500"
                      )}
                      role="option"
                      aria-selected={isHighlighted}
                      onMouseDown={() => onShowAll?.()}
                    >
                      Show all results
                    </li>
                  );
                } else {
                  // Normal item
                  return (
                    <li
                      key={entry.id}
                      id={getItemId(entry, i)}
                      className={`px-4 py-2 cursor-pointer ${
                        isHighlighted
                          ? "bg-blue-500 text-white"
                          : "hover:bg-gray-100"
                      }`}
                      role="option"
                      aria-selected={isHighlighted}
                      onMouseDown={() => onSelectItem?.(entry.name)}
                    >
                      {entry.name}
                    </li>
                  );
                }
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

/** Helper to generate an ID for each item. Used for aria-activedescendant. */
function getItemId(
  entry: AutocompleteItem | { showAll: true },
  index: number
): string {
  if ("showAll" in entry) {
    return "autocomplete-item-show-all";
  }
  return `autocomplete-item-${entry.id ?? `index-${index}`}`;
}
