import { Project } from '@/stores/taskStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTaskStore } from '@/stores/taskStore';
import { CalendarDays, CheckCircle2, Clock, Circle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { tasks } = useTaskStore();
  
  const projectTasks = tasks.filter(task => task.projectId === project.id);
  const completedTasks = projectTasks.filter(task => task.status === 'done').length;
  const progressTasks = projectTasks.filter(task => task.status === 'progress').length;
  const todoTasks = projectTasks.filter(task => task.status === 'todo').length;
  
  const completionPercentage = projectTasks.length > 0 
    ? Math.round((completedTasks / projectTasks.length) * 100) 
    : 0;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Card className="gradient-card border-card-border hover:shadow-card-hover transition-smooth group cursor-pointer">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-4 h-4 rounded-full shadow-sm"
              style={{ backgroundColor: project.color }}
            />
            <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
              {project.name}
            </CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            {projectTasks.length} tasks
          </Badge>
        </div>
        
        {project.description && (
          <p className="text-sm text-muted-foreground mt-2">
            {project.description}
          </p>
        )}
      </CardHeader>
      
      <CardContent>
        {/* Progress Bar */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{completionPercentage}%</span>
          </div>
          <Progress 
            value={completionPercentage} 
            className="h-2"
          />
        </div>

        {/* Task Status Breakdown */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Circle className="h-4 w-4 text-status-todo" />
            <div className="text-sm">
              <div className="font-medium">{todoTasks}</div>
              <div className="text-xs text-muted-foreground">Todo</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-status-progress" />
            <div className="text-sm">
              <div className="font-medium">{progressTasks}</div>
              <div className="text-xs text-muted-foreground">Progress</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-status-done" />
            <div className="text-sm">
              <div className="font-medium">{completedTasks}</div>
              <div className="text-xs text-muted-foreground">Done</div>
            </div>
          </div>
        </div>

        {/* Project Metadata */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3" />
            Created {formatDate(project.createdAt)}
          </div>
          {projectTasks.length > 0 && (
            <div className="text-right">
              Last updated {formatDate(project.updatedAt)}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};