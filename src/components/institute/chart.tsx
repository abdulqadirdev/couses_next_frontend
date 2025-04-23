"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Updated chart data (Pending vs Approved applications over months)
const chartData = [
  { month: "January", pending: 186, approved: 80 },
  { month: "February", pending: 305, approved: 200 },
  { month: "March", pending: 237, approved: 120 },
  { month: "April", pending: 73, approved: 190 },
  { month: "May", pending: 209, approved: 130 },
  { month: "June", pending: 214, approved: 140 },
];

const chartConfig = {
  pending: {
    label: "Pending",
    color: "#ef4444", 
  },
  approved: {
    label: "Approved",
    color: "#22c55e", 
  },
} satisfies ChartConfig;

export function Chart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="pending" fill="var(--color-pending)" radius={4} />
        <Bar dataKey="approved" fill="var(--color-approved)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
