import { useDndContext } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cva } from 'class-variance-authority';
import { GripVertical } from 'lucide-react';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ColumnActions } from './column-action';
import { TaskCard } from './task-card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export function BoardColumn({ column, tasks, isOverlay }) {
  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: { type: 'Column', column },
    attributes: { roleDescription: `Column: ${column.title}` },
  });

  const style = { transition, transform: CSS.Translate.toString(transform) };

  const variants = cva(
    'h-[75vh] max-h-[75vh] w-[350px] max-w-full bg-secondary flex flex-col flex-shrink-0 snap-center overflow-y-auto',
    {
      variants: {
        dragging: {
          default: 'border-2 border-transparent',
          over: 'ring-2 opacity-30',
          overlay: 'ring-2 ring-primary',
        },
      },
    }
  );

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({ dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined })}
    >
      <CardHeader className="space-between flex flex-row items-center border-b-2 p-4 text-left font-semibold">
        <Button
          variant={'ghost'}
          {...attributes}
          {...listeners}
          className="relative -ml-2 h-auto cursor-grab p-1 text-primary/50"
        >
          <span className="sr-only">{`Move column: ${column.title}`}</span>
          <GripVertical />
        </Button>
        <ColumnActions id={column.id} title={column.title} />
      </CardHeader>
      <CardContent className="flex flex-grow flex-col gap-4 overflow-y-auto p-2">
        <ScrollArea className="h-full">
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export function BoardContainer({ children }) {
  const dndContext = useDndContext();

  const variations = cva('px-2 pb-4 md:px-0 flex lg:justify-start overflow-auto', {
    variants: {
      dragging: {
        default: '',
        active: 'snap-none',
      },
    },
  });

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md overflow-auto">
      <div
        className={variations({ dragging: dndContext.active ? 'active' : 'default' })}
        style={{ minWidth: '100%' }}
      >
        <div className="flex flex-row items-start justify-start gap-4">
          {children}
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
