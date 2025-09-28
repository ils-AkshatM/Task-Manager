import { Sidebar } from '@/components/layout/Sidebar';
import { TaskCard } from '@/components/tasks/TaskCard';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { AddTaskDialog } from '@/components/tasks/AddTaskDialog';
import { AddProjectDialog } from '@/components/projects/AddProjectDialog';
import { useTaskStore } from '@/stores/taskStore';
import { useAuthStore } from '@/stores/authStore';
import { Badge } from '@/components/ui/badge';
import { 
  CheckSquare, 
  Clock, 
  TrendingUp,
  Calendar,
  Target,
  Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Dashboard = () => {
  const { user } = useAuthStore();
  const { projects, tasks } = useTaskStore();
  
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const progressTasks = tasks.filter(task => task.status === 'progress');
  const doneTasks = tasks.filter(task => task.status === 'done');
  
  const recentTasks = tasks
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 6);

  const completionRate = tasks.length > 0 
    ? Math.round((doneTasks.length / tasks.length) * 100) 
    : 0;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="flex h-screen bg-dashboard-bg">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {getGreeting()}, {user?.name}!
              </h1>
              <p className="text-muted-foreground mt-1">
                Here's what's happening with your projects today.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <AddProjectDialog />
              <AddTaskDialog />
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="gradient-card border-card-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tasks.length}</div>
                <p className="text-xs text-muted-foreground">
                  Across {projects.length} projects
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card border-card-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                <Clock className="h-4 w-4 text-status-progress" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-status-progress">
                  {progressTasks.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Active tasks
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card border-card-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckSquare className="h-4 w-4 text-status-done" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-status-done">
                  {doneTasks.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Finished tasks
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card border-card-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completionRate}%</div>
                <p className="text-xs text-muted-foreground">
                  Overall progress
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="status-todo">
              {todoTasks.length} Todo
            </Badge>
            <Badge variant="outline" className="status-progress">
              {progressTasks.length} In Progress
            </Badge>
            <Badge variant="outline" className="status-done">
              {doneTasks.length} Done
            </Badge>
          </div>

          {/* Projects Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Projects</h2>
              <span className="text-sm text-muted-foreground">
                {projects.length} projects
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
              {projects.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No projects yet</h3>
                  <p className="text-sm mb-4">Create your first project to get started</p>
                  <AddProjectDialog />
                </div>
              )}
            </div>
          </div>

          {/* Recent Tasks */}
          {recentTasks.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent Tasks</h2>
                <span className="text-sm text-muted-foreground">
                  Latest updates
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}

          {tasks.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No tasks yet</h3>
              <p className="text-sm mb-4">Create your first task to get started</p>
              <AddTaskDialog />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};