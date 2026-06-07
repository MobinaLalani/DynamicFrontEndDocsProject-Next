import { useEffect } from "react";

type OutsideRef = React.RefObject<HTMLElement | null>;

export function useClickOutside(
  refs: OutsideRef | OutsideRef[],
  handler: () => void,
) {
  useEffect(() => {
    const refList = Array.isArray(refs) ? refs : [refs];

    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;

      if (!target) {
        return;
      }

      const clickedInside = refList.some((ref) => {
        const element = ref.current;
        return element ? element.contains(target) : false;
      });

      if (clickedInside) {
        return;
      }

      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [handler, refs]);
}
