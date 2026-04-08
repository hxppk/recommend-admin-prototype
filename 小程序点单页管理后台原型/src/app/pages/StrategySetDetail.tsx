import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Save, GripVertical, Trash2, Plus, MoreHorizontal, Settings, Info, AlertCircle } from "lucide-react";
import { MOCK_STRATEGY_SETS, MOCK_INSTANCES, MOCK_SPUS, StrategySet, SlotConfig } from "../lib/mockData";
import { Button, Badge, Card } from "../components/ui/Base";
import { SpuSelector } from "../components/SpuSelector";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { cn } from "../lib/utils";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

interface StrategySetDetailProps {
  setId: string | null;
  onBack: () => void;
}

const ItemType = "POS_CARD";

interface DraggablePosCardProps {
  slot: SlotConfig;
  index: number;
  moveSlot: (dragIndex: number, hoverIndex: number) => void;
  onDropComplete: () => void;
  handleSlotChange: (index: number, field: keyof SlotConfig, value: any) => void;
  onDelete: (index: number) => void;
  instances: typeof MOCK_INSTANCES;
  totalSlots: number;
}

function DraggablePosCard({ 
  slot, 
  index, 
  moveSlot, 
  onDropComplete,
  handleSlotChange, 
  onDelete, 
  instances,
  totalSlots 
}: DraggablePosCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemType,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) return;
      
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as any).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveSlot(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    drop() {
      onDropComplete();
    }
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemType,
    item: () => ({ id: slot.slot_id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.3 : 1;
  
  drag(dragHandleRef);
  drop(preview(ref));

  return (
    <div 
      ref={ref} 
      style={{ opacity }} 
      data-handler-id={handlerId}
      className={cn(
        "flex rounded-lg border border-border bg-card shadow-sm transition-all duration-200 group mb-4",
        isDragging && "scale-95 shadow-md ring-2 ring-primary/20"
      )}
    >
      {/* Left Sidebar: POS Indicator & Drag Handle */}
      <div className="w-14 flex-shrink-0 bg-muted/30 border-r border-border flex flex-col items-center justify-center gap-2 rounded-l-lg">
        <div className="text-xs font-bold text-muted-foreground/70 tracking-tight">POS</div>
        <div className="text-xl font-bold text-foreground font-mono">{index + 1}</div>
        <div 
          ref={dragHandleRef}
          className="p-1.5 cursor-grab active:cursor-grabbing text-muted-foreground/40 hover:text-foreground hover:bg-muted rounded transition-colors"
          title="拖拽排序"
        >
          <GripVertical className="w-4 h-4" />
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 p-5 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-3">
          {/* Title / Labels */}
          <div className="flex-1 space-y-1">
             <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-muted-foreground">素材位标签 (Labels)</label>
                <div className="sm:hidden">
                    {/* Mobile menu could go here */}
                </div>
             </div>
             <input
                type="text"
                value={slot.labels ? slot.labels.join(",") : ""}
                onChange={e => handleSlotChange(index, "labels", e.target.value.split(","))}
                className="w-full text-sm font-semibold text-foreground bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none py-0.5 transition-colors placeholder:font-normal"
                placeholder="例如: 首页推荐"
             />
          </div>

          {/* Action Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-muted-foreground hover:text-foreground">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
               <DropdownMenuItem onClick={() => onDelete(index)} className="text-destructive focus:text-destructive">
                 <Trash2 className="w-4 h-4 mr-2" />
                 删除素材位
               </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Strategy Instance Selection */}
        <div className="space-y-3">
           <div className="flex items-center gap-3 bg-muted/20 p-2 rounded border border-border/50">
              <Settings className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <select 
                className="w-full text-sm bg-transparent border-none focus:ring-0 cursor-pointer text-foreground"
                value={slot.instance_id}
                onChange={e => handleSlotChange(index, "instance_id", e.target.value)}
              >
                <option value="">-- 选择绑定策略实例 --</option>
                {instances.map(inst => (
                  <option key={inst.id} value={inst.id}>
                    {inst.name} ({inst.ranker})
                  </option>
                ))}
              </select>
           </div>
           
           <div className="flex justify-end">
             {slot.instance_id ? (
                 <a href="#" className="text-[11px] text-primary hover:underline flex items-center gap-1">
                   查看策略实例配置详情 <ArrowLeft className="w-3 h-3 rotate-180" />
                 </a>
             ) : (
                <span className="text-[11px] text-muted-foreground/50">未绑定策略</span>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}

export function StrategySetDetail({ setId, onBack }: StrategySetDetailProps) {
  const [data, setData] = useState<StrategySet | null>(null);

  useEffect(() => {
    if (setId) {
      const found = MOCK_STRATEGY_SETS.find(s => s.id === setId);
      if (found) setData(JSON.parse(JSON.stringify(found)));
    } else {
      setData({
        id: "set_new",
        name: "新建素材位组合",
        version: 1,
        dedup_enabled: true,
        global_blacklist_spu_ids: [],
        created_by: "current_user",
        updated_at: new Date().toISOString(),
        slots: [
          { slot_id: "pos1", labels: ["今日推荐"], instance_id: "inst_1" },
          { slot_id: "pos2", labels: ["热销榜单"], instance_id: "inst_2" },
          { slot_id: "pos3", labels: ["猜你喜欢"], instance_id: "" },
          { slot_id: "pos4", labels: ["新品尝鲜"], instance_id: "" },
        ]
      });
    }
  }, [setId]);

  if (!data) return <div className="p-10 text-center text-muted-foreground">加载配置中...</div>;

  const handleSlotChange = (index: number, field: keyof SlotConfig, value: any) => {
    const newSlots = [...data.slots];
    newSlots[index] = { ...newSlots[index], [field]: value };
    setData({ ...data, slots: newSlots });
  };

  const moveSlot = (dragIndex: number, hoverIndex: number) => {
    const dragSlot = data.slots[dragIndex];
    const newSlots = [...data.slots];
    newSlots.splice(dragIndex, 1);
    newSlots.splice(hoverIndex, 0, dragSlot);
    setData({ ...data, slots: newSlots });
  };

  const handleDropComplete = () => {
    toast.success("素材位排序已更新", {
      description: "新的展示顺序已生效",
      duration: 2000,
    });
  };

  const addSlot = () => {
    if (data.slots.length >= 5) return;
    const newSlot: SlotConfig = {
      slot_id: `pos_${Date.now()}`, // unique temp id
      labels: ["新素材位"],
      instance_id: ""
    };
    setData({ ...data, slots: [...data.slots, newSlot] });
    toast.success("素材位已添加");
  };

  const deleteSlot = (index: number) => {
    if (data.slots.length <= 1) {
        toast.error("至少保留一个素材位");
        return;
    }
    const newSlots = [...data.slots];
    newSlots.splice(index, 1);
    setData({ ...data, slots: newSlots });
    toast.success("素材位已删除", { description: "后续素材位已自动前移" });
  };

  const handleSave = () => {
    console.log("Saving:", data);
    toast.success("版本保存成功");
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full hover:bg-muted">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-foreground">{data.name}</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge variant="outline" className="text-[10px] h-5 border-primary/20 text-primary bg-primary/5">
                  v{data.version}
                </Badge>
                <span className="text-xs text-muted-foreground">最后编辑: {new Date(data.updated_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleSave} className="border-primary/20 hover:bg-primary/5 text-primary">
              <Save className="w-4 h-4 mr-2" />
              保存配置
            </Button>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-12 gap-8">
          
          {/* Left Sidebar: Global Config */}
          <div className="col-span-4 lg:col-span-3 space-y-6">
            <div className="sticky top-28 space-y-6">
                <div>
                    <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">全局规则</h2>
                    <Card className="p-4 space-y-5 border-border/60 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <label className="text-sm font-medium text-foreground block">去重规则</label>
                                <p className="text-[11px] text-muted-foreground mt-0.5">开启后，已在前序坑位展示的商品，不会在后续坑位重复出现</p>
                            </div>
                            <input 
                                type="checkbox" 
                                checked={data.dedup_enabled} 
                                onChange={e => setData({...data, dedup_enabled: e.target.checked})}
                                className="w-4 h-4 mt-1 accent-primary"
                            />
                        </div>

                        <div className="h-px bg-border/50" />

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">黑名单 SPU</label>
                            <SpuSelector 
                                spus={MOCK_SPUS}
                                selectedIds={data.global_blacklist_spu_ids || []}
                                onSelectionChange={(ids) => setData({...data, global_blacklist_spu_ids: ids})}
                                label=""
                                placeholder="排除商品..."
                            />
                        </div>
                    </Card>
                </div>
                
                <div className="bg-primary/5 border border-primary/10 rounded-md p-3 flex gap-2">
                    <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground/80 leading-relaxed">
                        此页仅配置 <span className="text-foreground font-medium">素材位呈现逻辑</span>。
                        <br/>
                        若需调整投放门店或人群，请前往投放计划。
                    </p>
                </div>
            </div>
          </div>

          {/* Right Content: POS Cards */}
          <div className="col-span-8 lg:col-span-9 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                    素材位编排
                    <Badge variant="neutral" className="ml-1 h-5 text-[10px]">Total {data.slots.length}</Badge>
                </h2>
                
                <Button 
                    size="sm" 
                    onClick={addSlot} 
                    disabled={data.slots.length >= 5}
                    className={cn(
                        "transition-all",
                        data.slots.length >= 5 ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/90"
                    )}
                >
                    <Plus className="w-4 h-4 mr-1.5" />
                    添加素材位
                </Button>
            </div>

            <div className="space-y-1">
                {data.slots.map((slot, index) => (
                    <DraggablePosCard 
                        key={slot.slot_id} // Use stable ID for DnD key
                        slot={slot}
                        index={index}
                        moveSlot={moveSlot}
                        onDropComplete={handleDropComplete}
                        handleSlotChange={handleSlotChange}
                        onDelete={deleteSlot}
                        instances={MOCK_INSTANCES}
                        totalSlots={data.slots.length}
                    />
                ))}
            </div>

            {data.slots.length < 5 && (
                 <div 
                    onClick={addSlot}
                    className="border-2 border-dashed border-border/60 rounded-lg p-4 flex flex-col items-center justify-center text-muted-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all cursor-pointer h-24"
                 >
                    <Plus className="w-5 h-5 mb-1" />
                    <span className="text-xs font-medium">点击添加下一个素材位 (POS {data.slots.length + 1})</span>
                 </div>
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
