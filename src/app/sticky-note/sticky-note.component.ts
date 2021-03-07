import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { StickyNoteService } from '../services/stickyNote.service';

const enum Status {
  OFF = 0,
  RESIZE = 1,
  MOVE = 2,
}

@Component({
  selector: 'sticky-note',
  templateUrl: './sticky-note.component.html',
  styleUrls: ['./sticky-note.component.scss'],
})
export class StickyNoteComponent implements OnInit {
  @Input('id') public noteId: number;
  @Input('width') public width: number;
  @Input('height') public height: number;
  @Input('left') public left: number;
  @Input('top') public top: number;
  @Input('content') public content: number;
  @ViewChild('box') public box: ElementRef;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  private boxPosition: { left: number; top: number };
  private containerPos: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  };
  public mouse: { x: number; y: number };
  public status: Status = Status.OFF;
  private mouseClick: { x: number; y: number; left: number; top: number };
  public innerWidth: any;
  public innerHeight: any;

  constructor(private noteService: StickyNoteService) {}
  ngOnInit() {}

  ngAfterViewInit() {
    this.loadBox();
    this.loadContainer();
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  private loadBox() {
    const { left, top } = this.box.nativeElement.getBoundingClientRect();
    this.boxPosition = { left, top };
  }

  // load container(moveable space) for the stick note
  private loadContainer() {
    const left = 0;
    const top = 0;
    const right = innerWidth;
    const bottom = innerHeight;

    this.containerPos = { left, top, right, bottom };
  }

  // setStatus while mouse down
  setStatus(event: MouseEvent, status: number) {
    if (status === Status.RESIZE) event.stopPropagation();
    else if (status === Status.MOVE)
      this.mouseClick = {
        x: event.clientX,
        y: event.clientY,
        left: this.left,
        top: this.top,
      };
    else this.loadBox();
    this.status = status;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouse = { x: event.clientX, y: event.clientY };
    if (this.status === Status.RESIZE) this.resize();
    else if (this.status === Status.MOVE) this.move();
  }

  private resize() {
    if (this.resizeCondMeet()) {
      this.width = Number(this.mouse.x > this.boxPosition.left)
        ? this.mouse.x - this.boxPosition.left
        : 0;
      this.height = Number(this.mouse.y > this.boxPosition.top)
        ? this.mouse.y - this.boxPosition.top
        : 0;
      this.noteService.updateNoteSize(this.noteId, this.width, this.height);
    }
  }

  private resizeCondMeet() {
    return (
      this.mouse.x < this.containerPos.right &&
      this.mouse.y < this.containerPos.bottom
    );
  }

  private move() {
    if (this.moveCondMeet()) {
      this.left = this.mouseClick.left + (this.mouse.x - this.mouseClick.x);
      this.top = this.mouseClick.top + (this.mouse.y - this.mouseClick.y);
      this.noteService.updateNotePos(this.noteId, this.top, this.left);
    }
  }

  private moveCondMeet() {
    const offsetLeft = this.mouseClick.x - this.boxPosition.left;
    const offsetRight = this.width - offsetLeft;
    const offsetTop = this.mouseClick.y - this.boxPosition.top;
    const offsetBottom = this.height - offsetTop;
    return (
      this.mouse.x > this.containerPos.left + offsetLeft &&
      this.mouse.x < this.containerPos.right - offsetRight &&
      this.mouse.y > this.containerPos.top + offsetTop &&
      this.mouse.y < this.containerPos.bottom - offsetBottom
    );
  }
}
