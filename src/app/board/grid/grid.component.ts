import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Locate, WallDirection } from "../board-parts";
import { BoardStateService } from "../board-state.service";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css', '../board.module.css']

})
export class GridComponent implements OnInit {

 @Input() width:number;
 @Input() height:number;
  
   @Output() spotClicked = new EventEmitter<Locate>()
  @Output() wallClicked = new EventEmitter<[Locate, WallDirection]>()


  
  private vertDirection = WallDirection.VERT;
  private horizDirection = WallDirection.HORIZ;
  private crossDirection = WallDirection.CROSS;

  constructor(private boardService: BoardStateService) { 
    console.log("Grid Started")
    
}

  ngOnInit() {
  }


  getPieceLocations() {
 //   console.log("Getting Piece Location width="+this.width+" height="+this.height)
    let locs = []
    for (let x:number = 0; x<this.width; x++) {
      for (let y:number = 0; y<this.height; y++) {
        let l = new Locate(x,y)

  //      console.log("creating "+l)
        locs.push(l)
      }
    }

  //  console.log("Piece Count:"+locs.length)
    return locs;


  }

  getVerticalWallLocations() {
    let locs = []
    for (let x = 0; x<this.width-1; x++) {
      for (let y = 0; y<this.height; y++) {
        locs.push(new Locate(x,y))
      }
    }
   // console.log("Vert Wall Count:"+locs.length)

    return locs;
  }

  getHorizWallLocations() {
    let locs = []
      for (let y = 0; y<this.height-1; y++) {
        for (let x = 0; x<this.width; x++) {
        locs.push(new Locate(x,y))
      }
    }
  //  console.log("Horiz Wall Count:"+locs.length)

    return locs;
  }

  getPieceRow(loc:Locate):string {
    return ""+(2*loc.y+1)
  }
  getPieceCol(loc:Locate):string {
        return ""+(2*loc.x+1)
  }

  getVertWallRow(loc:Locate):string {
    return ""+(2*loc.y+1)
  }
  getVertWallCol(loc:Locate):string {
        return ""+(2*loc.x+2)
  }

  getHorizWallRow(loc:Locate):string {
    return ""+(2*loc.y+2)
  }
  getHorizWallCol(loc:Locate):string {
        return ""+(2*loc.x+1)
  }


  getRowSpan():string {
    return "span 3"
  }

  getColSpan():string {
    return "span 3"
  }


  



wasClick() {
  console.log("Clicekd")
}

mouseEnt(ev: any, loc:Location) {
  console.log("mouse"+loc)
  console.log(ev)
  ev.stopPropagation();
}


}
