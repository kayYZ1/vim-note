import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { db } from "./db";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentDate() {
  return new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export async function totalStorageUsed() {
  let totalSizeInBytes = 0;
  const notes = await db.notes.toArray();

  for (const note of notes) {
    const serializedNote = JSON.stringify(note);
    const noteSizeInBytes = new Blob([serializedNote]).size;
    totalSizeInBytes += noteSizeInBytes;
  }

  const totalSizeInMb = Math.floor(totalSizeInBytes / 2048);

  return totalSizeInMb;
}