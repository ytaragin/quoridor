import { Component, OnInit, Input } from '@angular/core';
import { Player } from "../board-parts";
import { BoardStateService } from "../board-state.service";

@Component({
  selector: 'app-player-status',
  templateUrl: './player-status.component.html',
  styleUrls: ['./player-status.component.css']
})
export class PlayerStatusComponent implements OnInit {

  @Input() player:Player

  constructor(private boardService: BoardStateService) { }

  ngOnInit() {
  }

  getMovesToWin() : number {
    return this.boardService.current.getMovesToWin(this.player);
  }

}
