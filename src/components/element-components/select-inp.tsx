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
import getSlug from "@/helper/get-slug";

interface DataProp {
  title: string;
  _id: string;
}
export function SelectInp({
  className,
  data,
  value,
  onChange,
  placeholder,
  valueId = false,
  ...props
}: any) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`w-full ${className || ""}`} {...props}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{placeholder}</SelectLabel>
          {data.map((elem: DataProp, i: number) => (
            <SelectItem
              key={i}
              value={valueId ? elem._id : getSlug(elem.title)}
            >
              {elem.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
