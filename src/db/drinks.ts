export interface DrinkDay {
  id: string;
  glasses: number;
  goal?: number; // Frozen at time of logging so historical views stay accurate.
}
