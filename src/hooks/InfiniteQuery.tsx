import { RefObject, useEffect, useState } from "react";
// import { log } from "../../helpers/helpers";

export default function useInfiniteQuery(
  ref: RefObject<HTMLDivElement | null>,
  data: unknown[]
): readonly [number] {
  // State to prevent quick calls after already showing next items
  const [coolDown, setCoolDown] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(8);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (visibleCount >= data.length) return; // stop infinite querying
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting && !coolDown) {
          setCoolDown(true);
          setVisibleCount((prev) => prev + 8);

          // Reset cool down after 5 seconds
          setTimeout(() => setCoolDown(false), 5000);
        }
      },
      //   When the object comes into view
      { threshold: 1.0 }
    );

    const current = ref?.current;
    if (current) intersectionObserver.observe(current);

    return () => {
      if (current) intersectionObserver.unobserve(current);
    };
  }, [visibleCount, data.length, coolDown, ref]);

  return [visibleCount] as const;
}
