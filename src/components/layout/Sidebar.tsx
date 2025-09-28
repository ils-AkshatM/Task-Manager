import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import { useTaskStore } from '@/stores/taskStore';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Plus, 
  Settings, 
  LogOut,
  User,
  Calendar
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const { user, logout } = useAuthStore();
  const { projects, tasks } = useTaskStore();
  
  const todoCount = tasks.filter(task => task.status === 'todo').length;
  const progressCount = tasks.filter(task => task.status === 'progress').length;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={cn("pb-12 bg-sidebar-bg border-r border-card-border", className)}>
      <div className="space-y-4 py-4">
        {/* Header */}
        <div className="px-4 py-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <LayoutDashboard className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold">TaskManager</h2>
          </div>
          
          {/* User Info */}
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-3">
          <div className="space-y-1">
            <Button 
              variant="ghost" 
              className="w-full justify-start"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Calendar
            </Button>
          </div>
        </div>

        {/* Task Status Overview */}
        <div className="px-3">
          <div className="mb-2">
            <h3 className="text-sm font-medium text-muted-foreground px-2">Tasks</h3>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between px-2 py-1 text-sm">
              <span className="text-muted-foreground">Todo</span>
              <Badge variant="secondary" className="status-todo">
                {todoCount}
              </Badge>
            </div>
            <div className="flex items-center justify-between px-2 py-1 text-sm">
              <span className="text-muted-foreground">In Progress</span>
              <Badge variant="secondary" className="status-progress">
                {progressCount}
              </Badge>
            </div>
            <div className="flex items-center justify-between px-2 py-1 text-sm">
              <span className="text-muted-foreground">Completed</span>
              <Badge variant="secondary" className="status-done">
                {tasks.filter(task => task.status === 'done').length}
              </Badge>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="px-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground px-2">Projects</h3>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="space-y-1">
            {projects.map((project) => {
              const projectTasks = tasks.filter(task => task.projectId === project.id);
              return (
                <Button 
                  key={project.id}
                  variant="ghost" 
                  className="w-full justify-start group"
                >
                  <div 
                    className="mr-2 h-3 w-3 rounded-full"
                    style={{ backgroundColor: project.color }}
                  />
                  <span className="flex-1 text-left truncate">{project.name}</span>
                  <Badge variant="outline" className="ml-2 opacity-70 group-hover:opacity-100">
                    {projectTasks.length}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="px-3 pt-4 border-t border-border">
          <div className="space-y-1">
            <Button 
              variant="ghost" 
              className="w-full justify-start"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};