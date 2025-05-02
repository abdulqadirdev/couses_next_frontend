import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataProp {
  title: string;
}
export function SelectInp({ className, data, value, onChange, ...props }: any) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`w-full ${className || ""}`} {...props}>
        <SelectValue placeholder="Select a level" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Level</SelectLabel>
          {data.map((elem: DataProp, i: number) => (
            <SelectItem key={i} value={elem.title}>
              {elem.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
