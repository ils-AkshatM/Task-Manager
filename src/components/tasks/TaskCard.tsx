import { Task, TaskStatus } from '@/stores/taskStore';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MoreHorizontal, 
  Calendar, 
  Clock,
  CheckCircle2,
  Circle,
  PlayCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTaskStore } from '@/stores/taskStore';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
}

const statusConfig = {
  todo: {
    label: 'Todo',
    icon: Circle,
    className: 'status-todo',
  },
  progress: {
    label: 'In Progress',
    icon: PlayCircle,
    className: 'status-progress',
  },
  done: {
    label: 'Done',
    icon: CheckCircle2,
    className: 'status-done',
  },
};

export const TaskCard = ({ task }: TaskCardProps) => {
  const { updateTaskStatus, deleteTask, projects } = useTaskStore();
  
  const project = projects.find(p => p.id === task.projectId);
  const statusInfo = statusConfig[task.status];
  const StatusIcon = statusInfo.icon;
  
  const handleStatusChange = (newStatus: TaskStatus) => {
    updateTaskStatus(task.id, newStatus);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';

  return (
    <Card className="group gradient-card border-card-border hover:shadow-card-hover transition-smooth">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2 flex-1">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto"
              onClick={() => {
                if (task.status === 'done') {
                  handleStatusChange('todo');
                } else if (task.status === 'todo') {
                  handleStatusChange('progress');
                } else {
                  handleStatusChange('done');
                }
              }}
            >
              <StatusIcon className={cn(
                "h-5 w-5 transition-colors",
                task.status === 'done' && "text-status-done",
                task.status === 'progress' && "text-status-progress",
                task.status === 'todo' && "text-muted-foreground hover:text-status-progress"
              )} />
            </Button>
            
            <div className="flex-1">
              <h3 className={cn(
                "font-medium text-sm leading-tight",
                task.status === 'done' && "line-through text-muted-foreground"
              )}>
                {task.title}
              </h3>
              {task.description && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {task.description}
                </p>
              )}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleStatusChange('todo')}>
                <Circle className="mr-2 h-4 w-4" />
                Mark as Todo
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('progress')}>
                <PlayCircle className="mr-2 h-4 w-4" />
                Mark as In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('done')}>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Mark as Done
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleDelete}
                className="text-destructive focus:text-destructive"
              >
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={statusInfo.className}
            >
              {statusInfo.label}
            </Badge>
            
            {project && (
              <div className="flex items-center gap-1">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                <span className="text-xs text-muted-foreground">
                  {project.name}
                </span>
              </div>
            )}
          </div>
          
          {task.dueDate && (
            <div className={cn(
              "flex items-center gap-1 text-xs",
              isOverdue ? "text-destructive" : "text-muted-foreground"
            )}>
              <Calendar className="h-3 w-3" />
              {formatDate(task.dueDate)}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};