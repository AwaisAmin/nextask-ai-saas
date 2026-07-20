import { OrgPendingItem } from "./OrgPendingItem";
import { OrgNormalItem } from "./OrgNormalItem";
import type { OrgListItem } from "../types";

export const OrgItem = ({ org }: { org: OrgListItem }) =>
  org.is_pending ? <OrgPendingItem org={org} /> : <OrgNormalItem org={org} />;
