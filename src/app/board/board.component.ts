import { NotExpr, ThisReceiver } from '@angular/compiler';
import { Component, ViewChild, OnInit } from '@angular/core';
import { StickyNote } from '../models/stickyNote';
import { StickyNoteService } from '../services/stickyNote.service';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  selectedNote?: StickyNote;
  @ViewChild(ToolbarComponent) child;

  notes: StickyNote[];

  constructor(private noteService: StickyNoteService) {
    this.notes = this.noteService.getNotes();
  }

  ngOnInit(): void {}

  onSelect(note: StickyNote): void {
    this.selectedNote = note;
  }
}
