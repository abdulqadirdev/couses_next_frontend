import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  message?: string;
  modalTitle: string;
  children?: React.ReactNode;
  open: boolean;
  onClose: () => void;
  btnText?: string;
  onClick?: () => void;
  loader?: boolean;
  loaderMessage?: string;
}

export function DialogModal({
  message = "",
  modalTitle = "Edit Profile",
  children,
  open,
  onClose,
  btnText = "Save changes",
  onClick,
  loader = false,
  loaderMessage = "",
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription className="text-lg">{message}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{children}</div>
        <DialogFooter>
          <Button type="submit" onClick={onClick}>
            {loader ? loaderMessage : btnText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
