import { Component, Output, EventEmitter } from '@angular/core';
import { StickyNoteService } from '../services/stickyNote.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  @Output() noteEvent = new EventEmitter<boolean>();

  constructor(private noteService: StickyNoteService) {}

  addNote() {
    this.noteService.addNote();
  }
}
