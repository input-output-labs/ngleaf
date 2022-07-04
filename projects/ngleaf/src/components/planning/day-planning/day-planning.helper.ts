import { PositionedPlanningEvent } from './day-planning.component';

function addColumn(slots: PositionedPlanningEvent[][]) {
  const newColumn = [];
  for(let i = 0; i < 24 ; i++) {
    newColumn.push(undefined);
  }
  slots.push(newColumn);
}

function columnCount(slots: PositionedPlanningEvent[][]) {
  return slots.length;
}

function createColumnIfNeeded(slots: PositionedPlanningEvent[][], columnIndex: number) {
  const columnToAdd = columnIndex + 1 - columnCount(slots);
  if (columnToAdd > 0) {
    for(let i = 0; i < columnToAdd ; i++) {
      addColumn(slots);
    }
  }
}

function getFirstFreeColumnIndexBetween(slots: PositionedPlanningEvent[][], from: number, to: number) {
  for(let i = 0; i < columnCount(slots); i++) {
    let free = true;
    for(let j = from; j <= to; j++) {
      if (!!slots[i][j]) {
        free = false;
      }
    }
    if (free) {
      return i;
    }
  }
  return columnCount(slots);
}

function insertEvent(slots: PositionedPlanningEvent[][], event: PositionedPlanningEvent, columnIndex: number, from: number, to: number) {
  for(let j = from; j <= to; j++) {
    slots[columnIndex][j] = event;
  }
  const pFrom = `${from/24}%`;
  const pTo = `${(to+1)/24}%`;
  event.position = {
    columnIndex,
    from,
    to,
    pFrom,
    pTo
  };
}

export function addEvent(slots: PositionedPlanningEvent[][], event: PositionedPlanningEvent, beginningOfDay: Date, endOfDay: Date) {
  let beginHour = 0;
  if (event.from.getTime() >= beginningOfDay.getTime()) {
    beginHour = event.from.getHours() - 1;
  }
  let endHour = 0;
  if (endOfDay.getTime() > event.to.getTime()) {
    endHour = event.to.getHours() - 1;
  }

  const columnIndex = getFirstFreeColumnIndexBetween(slots, beginHour, endHour);
  createColumnIfNeeded(slots, columnIndex);

  insertEvent(slots, event, columnIndex, beginHour, endHour);
}

export function createSlotsArray(): PositionedPlanningEvent[][] {
  const slots = [];
  addColumn(slots);
  return slots;
}

function eventIdsForHour(slots: PositionedPlanningEvent[][], hour: number) {
  const eventIds: PositionedPlanningEvent[] = [];
  for(let i = 0 ; i < columnCount(slots) ; i++) {
    if(slots[i][hour]) {
      eventIds.push(slots[i][hour]);
    }
  }
  return eventIds;
}

export interface ColumnSlot {
  event?: PositionedPlanningEvent;
  from?: number;
  to?: number;
}

export interface Column {
  index: number;
  slots: ColumnSlot[];
  from?: number;
  to?: number;
}

export interface Group {
  events: PositionedPlanningEvent[],
  from?: number;
  to?: number;
  columns?: Column[];
}

function findGroupWithEvent(groups: Group[], event: PositionedPlanningEvent): Group | undefined {
  return groups.find((group) => group.events.includes(event));
}

function getGroups(slots: PositionedPlanningEvent[][]): Group[] {
  const groups: Group[] = [];
  for (let i = 0 ; i < 24 ; i++) {
    const eventIds = eventIdsForHour(slots, i);
    const [first, ...others] = eventIds;
    if (first) {
      let group: Group = findGroupWithEvent(groups, first);
      if(!group) {
        group = {
          events: [first]
        };
        groups.push(group);
      }
      others.forEach(other => {
        if(!group.events.includes(other)) {
          group.events.push(other);
        }
      });
    }
  }
  return groups;
}

function determineBoundaries(group) {
  group.events.forEach(event => {
    if(!group.from || event.position.from < group.from) {
      group.from = event.position.from;
    }
    if(!group.to || event.position.to > group.to) {
      group.to = event.position.to;
    }
  });
}

function findSlotStartingAt(slots: ColumnSlot[], hour: number): ColumnSlot | undefined {
  return slots.find(slot => slot.event.position.from === hour);
}

function fillColumnGaps(column: Column) {
  const allSlots = [];
  console.log('------------------------');
  for (let i = column.from ; i <= column.to ; i++) {
    console.log(i);
    const currentSlot = findSlotStartingAt(column.slots, i);
    if(currentSlot) {
      allSlots.push(currentSlot);
      i = currentSlot.event.position.to;
    } else {
      const placeholder = {
        events: [],
        from: i,
        to: i
      };
      allSlots.push(placeholder);
    }
  }
  column.slots = allSlots;
}

function determineColumnBoundaries(column: Column) {
  column.slots.filter(s => s.event).map(s => s.event).forEach(event => {
    if(!column.from || event.position.from < column.from) {
      column.from = event.position.from;
    }
    if(!column.to || event.position.to > column.to) {
      column.to = event.position.to;
    }
  });
}

function organizeColumns(group: Group) {
  const columnIndexes = new Set<number>();
  group.events.forEach((event) => columnIndexes.add(event.position.columnIndex));
  const columns: Column[] = [];
  columnIndexes.forEach(columnIndex => {
    const column = {
      index: columnIndex,
      slots: group.events.filter(event => event.position.columnIndex === columnIndex).map(ev => ({
        event: ev,
        from: ev.position.from,
        to: ev.position.to
      })),
      from: group.from,
      to: group.to
    };
    // determineColumnBoundaries(column);
    fillColumnGaps(column);
    columns.push(column);
  });
  group.columns = columns;
}

function findGroupStartingAt(groups: Group[], hour: number): Group | undefined {
  return groups.find(group => group.from === hour);
}

function fillGroupsGaps(groups: Group[]) {
  const allGroups: Group[] = [];
  for (let i = 0 ; i < 24 ; i++) {
    const currentGroup = findGroupStartingAt(groups, i);
    if(currentGroup) {
      allGroups.push(currentGroup);
      i = currentGroup.to;
    } else {
      const placeholder = {
        events: [],
        from: i,
        to: i
      };
      allGroups.push(placeholder);
    }
  }
  return allGroups;
}

export function finetuneSlots(slots: PositionedPlanningEvent[][]) {
  const groups = getGroups(slots);
  groups.forEach(group => determineBoundaries(group));
  groups.forEach(group => organizeColumns(group));
  return fillGroupsGaps(groups);
}
