export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
  } | null;
  due_date: string | null;
  project: string;
  created_at: string;
  updated_at: string;
}

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  assignee?: string;
  search?: string;
  sort_by?: "created_at" | "due_date" | "priority" | "title";
  order?: "asc" | "desc";
}
