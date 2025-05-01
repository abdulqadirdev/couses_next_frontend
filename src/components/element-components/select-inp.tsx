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
export function SelectInp({ className, data, ...props }: any) {
  return (
    <Select>
      <SelectTrigger className={`w-full ${className || ""}`} {...props}>
        <SelectValue placeholder="Select a level" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Level</SelectLabel>
          {data.map((elem: DataProp, i: number) => (
            <SelectItem key={i} value={elem.title.toLowerCase()}>
              {elem.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
