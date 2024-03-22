import { Skill } from "./Skill";

export interface Posting {
    id: number;
    score: number;
    title: string;
    skills: Skill[];
}