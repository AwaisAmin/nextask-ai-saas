import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ORG_CREATE_SUB,
  ORG_CREATE_TITLE,
  ORG_FOOT_NOTE,
} from "@/constants/organizations";

export const OrgFooter = () => (
  <div className="w-full max-w-[620px] shrink-0 px-6 pt-[14px] pb-[26px]">
    <Button
      variant="ghost"
      className="flex items-center gap-3 p-[13px] rounded-[13px] border-[1.5px] border-dashed border-(--border-2) bg-(--bg-0) hover:border-(--primary) hover:bg-(--primary-soft) w-full h-auto justify-start"
    >
      <span className="size-[38px] rounded-[11px] bg-(--bg-3) grid place-items-center text-(--primary) shrink-0">
        <Plus size={18} />
      </span>
      <span className="text-left">
        <span className="block [font-family:var(--font-display)] text-[13.5px] font-semibold text-(--text-0)">
          {ORG_CREATE_TITLE}
        </span>
        <span className="block text-[11.5px] text-(--text-3) mt-px">
          {ORG_CREATE_SUB}
        </span>
      </span>
    </Button>
    <p className="mt-3 text-[12px] text-(--text-3) text-center">
      {ORG_FOOT_NOTE}
    </p>
  </div>
);
