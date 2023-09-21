import { Player } from './../board-parts';
import { BoardStateService } from './../board-state.service';
import { Component, OnInit } from '@angular/core';
import { Locate, WallDirection } from "../board-parts";



import {DialogModule} from 'primeng/primeng';


class Row {
  getSpots()  {

  }
}


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css', '../board.module.css']
})
export class BoardComponent implements OnInit {

  private winningPlayer:Player;

  constructor(private boardService: BoardStateService) { 

  }

  ngOnInit() {
  }

  getRowNums() {
      return this.boardService.current.getRowNumArray()
  }

  

  getRow(i:number){
    return this.boardService.current.getRow(i)
  }



  wallClicked(ev:[Locate, WallDirection]) {
    console.log("A "+ev[1]+" wall was clicked: "+ev[0])
    if (this.boardService.current.canPlayWall(ev[0], ev[1])) {
      this.boardService.current.playWall(ev[0], ev[1])
    }
  }
  spotClicked(loc:Locate) {
    console.log("A spot was clicked: "+loc)
    if (this.boardService.current.isLegalMove(loc)) {
      this.boardService.current.playMovePiece(loc)
    }


    this.winningPlayer = this.boardService.current.getWinner()
    if (this.winningPlayer != null) {
      console.log("Board sees winner");
      this.display = true;
      

    }
  }

   display: boolean = false;

    showDialog() {
        this.display = true;
    }

    showDlg() :boolean {
      return this.winningPlayer != null;
    }

}
