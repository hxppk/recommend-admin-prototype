import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Card, Badge } from "../components/ui/Base";
import { ArrowUpRight, ArrowDownRight, MousePointer, Eye, ShoppingBag } from "lucide-react";

const DATA = [
  { time: "00:00", imp: 4000, click: 240, gmv: 2400 },
  { time: "04:00", imp: 3000, click: 139, gmv: 1398 },
  { time: "08:00", imp: 20000, click: 980, gmv: 9800 },
  { time: "12:00", imp: 27800, click: 3908, gmv: 39080 },
  { time: "16:00", imp: 18900, click: 4800, gmv: 48000 },
  { time: "20:00", imp: 23900, click: 3800, gmv: 38000 },
  { time: "23:59", imp: 34900, click: 4300, gmv: 43000 },
];

export function Monitoring() {
  return (
    <div className="space-y-8 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-foreground">效果监控看板</h1>
        <p className="text-muted-foreground mt-1">菜单 Tab 推荐系统的实时表现指标。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="总曝光量 (Impressions)" 
          value="132,590" 
          trend="+12.5%" 
          trendUp={true} 
          icon={<Eye className="w-5 h-5 text-blue-500" />} 
        />
        <MetricCard 
          title="点击率 (CTR)" 
          value="4.8%" 
          trend="-0.2%" 
          trendUp={false} 
          icon={<MousePointer className="w-5 h-5 text-purple-500" />} 
        />
        <MetricCard 
          title="归因 GMV" 
          value="¥182,058" 
          trend="+8.4%" 
          trendUp={true} 
          icon={<ShoppingBag className="w-5 h-5 text-emerald-500" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-foreground mb-6">流量趋势 (24h)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: "var(--muted-foreground)"}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: "var(--muted-foreground)"}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", color: "var(--card-foreground)" }}
                  itemStyle={{ color: "var(--card-foreground)" }}
                />
                <Line type="monotone" dataKey="imp" stroke="var(--primary)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="click" stroke="var(--chart-2)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-foreground mb-6">GMV 贡献分布 (24h)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: "var(--muted-foreground)"}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: "var(--muted-foreground)"}} />
                <Tooltip 
                   contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", color: "var(--card-foreground)" }}
                />
                <Bar dataKey="gmv" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
         <h3 className="font-semibold text-foreground mb-4">坑位效果表现</h3>
         <div className="overflow-x-auto">
           <table className="w-full text-sm text-left">
             <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border">
               <tr>
                 <th className="px-6 py-3 font-medium">坑位名称</th>
                 <th className="px-6 py-3 font-medium">曝光量</th>
                 <th className="px-6 py-3 font-medium">点击量</th>
                 <th className="px-6 py-3 font-medium">点击率</th>
                 <th className="px-6 py-3 font-medium">空置率</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-border">
               {[
                 { name: "坑位 1 (推荐)", imp: "45,000", click: "3,200", ctr: "7.1%", empty: "0.0%" },
                 { name: "坑位 2 (热销)", imp: "42,000", click: "1,800", ctr: "4.2%", empty: "0.1%" },
                 { name: "坑位 3 (新品)", imp: "30,000", click: "900", ctr: "3.0%", empty: "0.5%" },
                 { name: "坑位 4 (更多)", imp: "15,590", click: "200", ctr: "1.2%", empty: "2.3%" },
               ].map((row, i) => (
                 <tr key={i}>
                   <td className="px-6 py-4 font-medium text-foreground">{row.name}</td>
                   <td className="px-6 py-4 text-foreground">{row.imp}</td>
                   <td className="px-6 py-4 text-foreground">{row.click}</td>
                   <td className="px-6 py-4 text-emerald-600 font-medium">{row.ctr}</td>
                   <td className="px-6 py-4 text-muted-foreground">{row.empty}</td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
      </Card>
    </div>
  );
}

function MetricCard({ title, value, trend, trendUp, icon }: { title: string, value: string, trend: string, trendUp: boolean, icon: React.ReactNode }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-muted/50 rounded-lg">{icon}</div>
        <Badge variant={trendUp ? "success" : "danger"}>
          <span className="flex items-center gap-1">
            {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {trend}
          </span>
        </Badge>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold text-foreground mt-1">{value}</h3>
      </div>
    </Card>
  );
}
