import type { PageComponent } from "@/lib/docs/schema";
import { pageBlockRegistry } from "@/components/page-renderer/registry";
import type { PageBlockComponent } from "@/components/page-renderer/types";

function resolveBlockComponent<T extends PageComponent>(
  component: T,
): PageBlockComponent<T> {
  return pageBlockRegistry[component.type] as PageBlockComponent<T>;
}

export function renderComponent(component: PageComponent) {
  const Block = resolveBlockComponent(component);

  return <Block key={component.id} component={component} />;
}
