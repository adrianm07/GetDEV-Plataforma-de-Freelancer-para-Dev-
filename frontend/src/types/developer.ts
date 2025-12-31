import type { Project } from "./project";

export interface Developer {
  name: string;
  email: string;
  phone: string;
  photo: string;
  skills: string[];
  projects?: Project[];
}