import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Locate } from "../board-parts";
import { BoardStateService } from "../board-state.service";

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.css', '../board.module.css']
})
export class SpotComponent implements OnInit {
  @Input() location: Locate;

  @Output() spotClicked = new EventEmitter<Locate>();

  private highlightLegalSpot: boolean;

  constructor(private boardService: BoardStateService) { }

  ngOnInit() {
  }

  player1Here():boolean {
    let p1Loc = this.boardService.current.p1Pos()
    return (this.location.equals(p1Loc))
  }

  player2Here():boolean {
    let p2Loc = this.boardService.current.p2Pos()
    return (this.location.equals(p2Loc))
  }


  wasClick(event) {

    this.spotClicked.emit(this.location)
  }

legalMove(): boolean {

    return this.boardService.current.isLegalMove(this.location);
  }

  onMouseEnterSpot() { 
    console.log("Mouse entered "+this.location)
    //this.highlightLegalSpot = this.boardService.current.isLegalMove(this.location); 
    this.highlightLegalSpot = true;
  }

  onMouseLeaveSpot() { 
    console.log("Mouse left "+this.location)

    this.highlightLegalSpot = false;
  }

  getID() {
    return "p"+this.location.toString()
  }

}
