import { Donor } from "./donor";

export interface Campaign {
  id: number;
  name: string;
  goal: number;
  currentAmount: number;
  imageUrl: string;
  description: string;
  donors: Donor[];
}