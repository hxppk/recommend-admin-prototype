import React, { useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { cn } from "./ui/utils";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { SPU } from "../lib/mockData";

interface SpuSelectorProps {
  spus: SPU[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  label?: string;
  placeholder?: string;
}

export function SpuSelector({
  spus,
  selectedIds,
  onSelectionChange,
  label = "添加商品",
  placeholder = "搜索商品...",
}: SpuSelectorProps) {
  const [open, setOpen] = useState(false);

  const selectedSpus = spus.filter((spu) => selectedIds.includes(spu.spu_id));

  const handleSelect = (spuId: string) => {
    if (selectedIds.includes(spuId)) {
      onSelectionChange(selectedIds.filter((id) => id !== spuId));
    } else {
      onSelectionChange([...selectedIds, spuId]);
    }
  };

  const handleRemove = (spuId: string) => {
    onSelectionChange(selectedIds.filter((id) => id !== spuId));
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {selectedSpus.map((spu) => (
          <Badge
            key={spu.spu_id}
            variant="secondary"
            className="flex items-center gap-1 pl-2 pr-1 py-1 text-sm font-normal"
          >
            <span className="truncate max-w-[200px]">{spu.name}</span>
            <button
              onClick={() => handleRemove(spu.spu_id)}
              className="ml-1 rounded-full hover:bg-muted p-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <X className="w-3 h-3 text-muted-foreground hover:text-foreground" />
              <span className="sr-only">移除 {spu.name}</span>
            </button>
          </Badge>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpen(true)}
          className="h-7 text-xs border-dashed"
        >
          <Plus className="w-3 h-3 mr-1" />
          {label}
        </Button>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={placeholder} />
        <CommandList>
          <CommandEmpty>未找到相关商品。</CommandEmpty>
          <CommandGroup heading="可选商品">
            {spus.map((spu) => {
              const isSelected = selectedIds.includes(spu.spu_id);
              return (
                <CommandItem
                  key={spu.spu_id}
                  onSelect={() => handleSelect(spu.spu_id)}
                  className="cursor-pointer"
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible"
                    )}
                  >
                    <Check className={cn("h-4 w-4")} />
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={spu.image}
                      alt={spu.name}
                      className="w-8 h-8 rounded object-cover bg-muted"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{spu.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ID: {spu.spu_id} • ¥{spu.price}
                      </span>
                    </div>
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
