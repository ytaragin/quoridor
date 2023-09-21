import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Locate, WallDirection } from "../board-parts";
import { BoardStateService } from "../board-state.service";

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css', '../board.module.css']
})
export class WallComponent implements OnInit {

  @Input() location: Locate;
  @Input() direction: WallDirection;

  @Output() wallClicked = new EventEmitter<[Locate, WallDirection]>();

  private highlightLegalWall: boolean;

  constructor(private boardService: BoardStateService) { }

  ngOnInit() {
  }
  wallClick() {
    console.log("Wall click: "+this.location+" direct: "+this.direction)
    this.wallClicked.emit([this.location, this.direction])
  }

  legalWallMove(): boolean {

    return this.boardService.current.isALegalWall(this.location, this.direction);
  }

  playedWallSpot(): boolean {
    return this.boardService.current.isAWall(this.location, this.direction)
  }

}
