import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface contentProp {
  id: number;
  value: string;
  label: string;
}

interface filterProps {
  trigger: string;
  content: contentProp[];
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = ({
  trigger,
  content,
  otherClasses,
  containerClasses,
}: filterProps) => {
  return (
    <Select>
      <SelectTrigger
        className={`${otherClasses} body-regular background-light800_dark300 text-dark400_light500 min-h-[56px] px-5
         py-2.5 focus-visible:outline-none`}
      >
        <div className="line-clamp-1 flex-1  text-left">
          <SelectValue placeholder={trigger} />
        </div>
      </SelectTrigger>
      <SelectContent className="background-light800_dark300 text-dark400_light500 border-none outline-none">
        {content.map((item) => (
          <SelectItem value={item.value} key={item.id}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Filter;
