import { DayCards, formatAttireResponse } from "./dayCards";

export interface AttireSectionProps {
  isLoading: boolean;
  attireResponseJson: string;
}

export default function AttireSection({
  attireResponseJson,
  isLoading,
}: AttireSectionProps) {
  if (isLoading) {
    return null;
  }

  const attireData = formatAttireResponse(attireResponseJson);
  if (attireData) {
    return <DayCards days={attireData.days} />;
  }

  return null;
}
