import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: string[] | Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  className?: string;
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  disabled = false,
  className = "",
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const formattedOptions: Option[] = options.map((opt) => {
    if (typeof opt === "string") {
      return { value: opt, label: opt };
    }
    return opt;
  });

  const selectedOption = formattedOptions.find((opt) => opt.value === value);

  const filteredOptions = formattedOptions.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setOpen(!open);
      setSearch("");
    }
  };

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
    setSearch("");
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        className={`flex w-full items-center justify-between rounded-xl border border-border/60 bg-background/50 px-3 py-2 text-sm text-left shadow-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#07284a] dark:focus:ring-blue-500 h-11 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <span className={selectedOption ? "text-foreground" : "text-muted-foreground"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className="size-4 opacity-50 shrink-0 ml-2" />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-hidden rounded-xl border border-border/60 bg-popover text-popover-foreground shadow-lg flex flex-col">
          <div className="flex items-center border-b border-border/40 px-2 py-1 bg-background/20">
            <Search className="size-4 opacity-50 shrink-0 mr-1.5 ml-1 text-muted-foreground" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
              autoFocus
            />
          </div>
          <div className="overflow-y-auto flex-1 py-1 max-h-48 scrollbar-thin">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-xs text-muted-foreground text-center">
                No results found.
              </div>
            ) : (
              filteredOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`flex w-full items-center justify-between px-3 py-2 text-sm text-left hover:bg-accent hover:text-accent-foreground transition-colors ${
                    value === opt.value ? "bg-accent/40 font-medium" : ""
                  }`}
                >
                  <span>{opt.label}</span>
                  {value === opt.value && (
                    <Check className="size-4 text-[#07284a] dark:text-blue-400" />
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
