export interface CalendarDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  events: PlanningEvent[];
}

export type CalendarWeek = CalendarDay[];

export interface PlanningEvent {
  id: string;
  from: Date;
  to: Date;
  label: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface SectionConfig {
  color: string;
  relativeWidth: number;
}
