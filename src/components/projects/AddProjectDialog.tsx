import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Palette } from 'lucide-react';
import { useTaskStore } from '@/stores/taskStore';
import { useToast } from '@/hooks/use-toast';

const projectColors = [
  'hsl(217, 91%, 60%)', // Blue
  'hsl(262, 83%, 58%)', // Purple
  'hsl(142, 76%, 36%)', // Green
  'hsl(45, 93%, 58%)',  // Yellow
  'hsl(0, 84%, 60%)',   // Red
  'hsl(24, 95%, 53%)',  // Orange
  'hsl(280, 100%, 70%)', // Magenta
  'hsl(200, 98%, 39%)', // Cyan
];

export const AddProjectDialog = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState(projectColors[0]);
  
  const { addProject } = useTaskStore();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Project name is required",
        variant: "destructive",
      });
      return;
    }

    addProject({
      name: name.trim(),
      description: description.trim() || undefined,
      color: selectedColor,
    });

    toast({
      title: "Project Created",
      description: "Your project has been created successfully.",
    });

    // Reset form
    setName('');
    setDescription('');
    setSelectedColor(projectColors[0]);
    setOpen(false);
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setSelectedColor(projectColors[0]);
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-dashed border-2 hover:border-primary transition-colors">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] gradient-card border-card-border">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Add a new project to organize your tasks. Choose a name and color.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              placeholder="Enter project name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add project description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <Label>Project Color</Label>
            </div>
            <div className="grid grid-cols-8 gap-2">
              {projectColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === color 
                      ? 'border-foreground scale-110' 
                      : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: selectedColor }}
              />
              Selected color preview
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="gradient-primary hover:opacity-90 transition-smooth"
            >
              Create Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};