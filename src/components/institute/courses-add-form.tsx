import { Upload } from "lucide-react";
import TextArea from "../element-components/text-area";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SelectInp } from "../element-components/select-inp";

const CourseForm = () => {
  let levelData = [
    {
      title: "Beginner",
    },
    {
      title: "Intermediate",
    },
    {
      title: "Advanced",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">
          Title
        </Label>
        <Input
          id="title"
          name="title"
          defaultValue="Pedro Duarte"
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Description
        </Label>
        <TextArea
          id="description"
          name="description"
          defaultValue="Pedro Duarte"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">Image</Label>
        <Label
          htmlFor="image"
          className="text-right col-span-3 resize-none border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none"
        >
          <Upload size={16} /> Upload Image
        </Label>
        <Input
          type="file"
          id="image"
          hidden
          name="image"
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="level" className="text-right">
          Level
        </Label>
        <SelectInp className="col-span-3" data={levelData} />
      </div>
    </>
  );
};
export default CourseForm;
