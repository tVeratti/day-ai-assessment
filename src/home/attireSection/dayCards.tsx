import styled from "@emotion/styled";
import { useMemo } from "react";
import type { DayCardProps } from "./dayCard";
import DayCard from "./dayCard";

export interface DayCardsProps {
  days: Array<DayCardProps>;
}

export const formatAttireResponse = (
  daysJson: string,
): DayCardsProps | null => {
  try {
    const attireData = JSON.parse(daysJson);
    return attireData;
  } catch (err) {
    return null;
  }
};

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 1rem;
  margin: 2rem 0;
`;

export function DayCards({ days }: DayCardsProps) {
  const cardNodes = useMemo(
    () =>
      days.map((day: DayCardProps, index: number) => (
        <DayCard key={day.date} {...day} index={index} />
      )),
    [days],
  );
  return <Root>{cardNodes}</Root>;
}
