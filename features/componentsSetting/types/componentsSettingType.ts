import { AuthSession } from "@/lib/auth/types";
import type { DocPage } from "@/lib/docs/schema";
import type { DocsWorkspace } from "@/lib/docs/workspace";
import type { MenuGroup } from "@/lib/docs/workspace";

export type  componentsSettingSidebarType ={
    isOpen : boolean;
    menuGroups?: MenuGroup[];
    pages?: DocPage[];
    activePageSlug?: string;
    activeGroupId?: string;
    interactive?: boolean;
    onToggle?: () => void;
    onSelectPage?: (slug: string) => void;
    onCreatePage?: () => void;
}
export type componentsSettingNavbarType = {
  title?: string;
  session: AuthSession;
  subtitle?: string;
  className?: string;
};

 export type componentsSettingFooterType = {
  workspace: DocsWorkspace;
  activePage: DocPage;
};

 export type ComponentsSettingProps = {
  menuGroups?: MenuGroup[];
  pages?: DocPage[];
  activePageSlug?: string;
  activeGroupId?: string;
  session?: AuthSession;
  interactive?: boolean;
  onSelectPage?: (slug: string) => void;
  onCreatePage?: () => void;
  showSidebar?: boolean;
  content?: React.ReactNode;
};