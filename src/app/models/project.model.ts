import { Team } from './team.model';

export interface Project {
  id: number;
  name: string;
  description?: string;
  teamId: number;
  created_at: string;
}
export interface ProjectRequest {
  name: string;
  teamId: number;
  description?: string;
}
