import { Injectable } from '@angular/core';
import { StickyNote } from '../models/stickyNote';

@Injectable({
  providedIn: 'root',
})
export class StickyNoteService {
  notes = [];

  constructor() {}

  addNote() {
    if (this.notes.length > 0) {
      //add note to the right of the last note
      let lastPos = this.notes.length - 1;

      this.notes.push({
        id: this.notes[lastPos].id + 1,
        width: 100,
        height: 100,
        top: this.notes[lastPos].top,
        left: this.notes[lastPos].left + this.notes[lastPos].width + 5,
        content: '',
      });
    } else {
      this.notes.push({
        id: 1,
        width: 100,
        height: 100,
        top: 200,
        left: 300,
        content: '',
      });
    }
  }

  getNotes(): StickyNote[] {
    this.addNote();
    return this.notes;
  }

  updateNotePos(id: number, top, left) {
    let pos = this.notes.findIndex((note) => note.id == id);
    this.notes[pos].top = top;
    this.notes[pos].left = left;
  }

  updateNoteSize(id: number, width, height) {
    let pos = this.notes.findIndex((note) => note.id == id);
    this.notes[pos].width = width;
    this.notes[pos].height = height;
  }

  updateNoteContent(id: number, content) {
    let pos = this.notes.findIndex((note) => note.id == id);
    this.notes[pos].content = content;
  }
}
