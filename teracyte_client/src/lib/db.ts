import Dexie from "dexie";
import type { Table } from "dexie";

export interface ImageRecord {
  image_id: string;
  intensity_average: number;
  focus_score: number;
  classification_label: string;
  timestamp: number;
}

class TeraCyteDB extends Dexie {
  images!: Table<ImageRecord>;

  constructor() {
    super("TeraCyteDB");
    this.version(1).stores({
      images: "image_id,timestamp",
    });
  }
}

export const db = new TeraCyteDB();
