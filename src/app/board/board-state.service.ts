import { BoardComponent } from './board/board.component';
import { BoardGraph } from './board-graph';

import { Injectable } from "@angular/core";
import { Spot, Wall, Player, Locate, WallDirection } from "./board-parts";






export class BoardState {
    
     private spots: Spot[][];
     private playedWalls: Wall[];
     private playedSegments: Wall[];
     readonly width: number
     readonly height: number

     private players: Player[];
     private currturn: number;
     private winner: Player;


     private graph: BoardGraph


     constructor() {
         console.log("Creating a new board")
         this.width = 9
         this.height = 9

         this.players = []
         this.players[0] = new Player("Player 1", new Locate(4,0), 10, this.generateLocateForRow(8))
         this.players[1] = new Player("Player 2", new Locate(4,8), 10, this.generateLocateForRow(0))
        this.currturn = 0;

        this.playedWalls = []
        this.playedSegments = []

        this.winner = null


        this.graph = new BoardGraph(this.width, this.height)

         this.spots = [];

        for(let i: number = 0; i < this.width; i++) {
            this.spots[i] = [];
            for(let j: number = 0; j< this.height; j++) {
                this.spots[i][j] = new Spot(i,j);
            }
        }
     }

    

     get currPlayer(): Player {
         return this.players[this.currturn]
     }

    get nextPlayer(): Player {
         return this.players[this.nextTurnNumber()]
     }

     getPlayer(num: number) {
         return this.players[num]
     }


     getRow(rownum: number) {
         return this.spots[rownum]
     }

     private genNumArray(size: number) {
         var ret = [];
         for (let i:number =0; i < size; i++) {
            ret.push(i)
         }
         return ret;
     }

     p1Pos(): Locate {
         return this.players[0].location
     }
     p2Pos(): Locate {
         return this.players[1].location
     }

     playMovePiece(newLoc : Locate) {
        if (this.winner != null) {
            console.error("Game Over");
            return false;
        }
        if (!this.isLegalMove(newLoc)) {

             return;
         }

         if (this.isWinningLocation(newLoc)) {
             this.winner = this.currPlayer
             console.log("*********************************")
             console.log("* Winner: "+this.winner.name)
             console.log("*********************************")
         }


         this.currPlayer.location = newLoc;
         

         this.advanceTurn(newLoc[0]+","+newLoc[1])
 
     }

     playWall(location: Locate, direct:WallDirection) {

        if (this.winner != null) {
            console.error("Game Over");
            return false;
        }

        if (this.currPlayer.wallsLeft <= 0 ) {
            console.error("Invalid move")
            return false
        }
        if(direct == WallDirection.CROSS) {
            console.error("Invalid Direction")
            return false
        }

        if (!this.isALegalWall(location, direct)) {
            return false;
        }


        let w = new Wall(location, direct, this.currturn)

        let segments = this.mapWallToSegments(w)
        this.playedSegments = this.playedSegments.concat(segments)
        console.log("Graph EdgeCount "+this.graph.getEdgeCount())
        segments.forEach( s => {this.graph.putWall(s)} )
        console.log("After removal Graph EdgeCount "+this.graph.getEdgeCount())
        this.playedWalls.push(w);
        this.currPlayer.playWall()

        this.advanceTurn(w.toString())



     }

     canPlayWall(location: Locate, direct:WallDirection) {
         return ((this.currPlayer.wallsLeft > 0) && !this.isAWall(location, direct));
     }

     advanceTurn(turnRec: string) {
        this.currPlayer.addTurn(turnRec)
        this.currturn = this.nextTurnNumber()
     }

     private nextTurnNumber():number {
        return (this.currturn+1)%this.players.length

     }

     getRowNumArray() {
         return this.genNumArray(this.height)
     }

    getColNumArray() {
          return this.genNumArray(this.width)

     }

     private isWinningLocation(loc:Locate): boolean {
        return (this.currPlayer.winningSpots.find((l)=> {return l.equals(loc)}) != null  )
     }

     private isFinal(defined: number, toCheck: number) {
         return ((defined-toCheck) > 1)
     }

     isFinalColumn(col:number): boolean {
        return this.isFinal(this.width, col)

    }
    isFinalRow(row:number): boolean {
        return this.isFinal(this.height, row)

    }

    isAWall(loc:Locate, direct:WallDirection) {
        return (this.playedWalls.find(Wall.matchByParts(loc, direct)) != null)
    }

    

    isALegalWall(loc: Locate, direct:WallDirection): boolean {

        if (this.currPlayer.wallsLeft <= 0) {
            return false;
        }

        if (((loc.x + 1) == this.width) || 
            ((loc.y + 1) == this.height)) {
                return false;
            }

        let segments = this.mapWallToSegments(new Wall(loc, direct, this.currturn))
        let matched = false;
        segments.forEach( s => {
            matched = matched ||
                       (this.playedSegments.find( w => w.equals(s)  ) != null)  
        })

        let legal = !matched;

        if (legal) {
            segments.forEach( s => {this.graph.tempAddWall(s)} )
            
            legal = 
                 ((this.graph.getPathsToLocations(this.currPlayer.location, this.currPlayer.winningSpots) < Number.MAX_VALUE) &&
                 (this.graph.getPathsToLocations(this.nextPlayer.location, this.nextPlayer.winningSpots) < Number.MAX_VALUE))
            
            this.graph.revert()
        }

        return legal;
    }

    

    private mapWallToSegments(w: Wall): Wall[] {
        let ret:Wall[] = [];

        ret.push(w)
        ret.push(new Wall(w.location, WallDirection.CROSS, w.playedBy))
        let nextLoc:Locate
        if (w.direct == WallDirection.HORIZ) {
            nextLoc = new Locate(w.location.x+1, w.location.y)
        }
        else if (w.direct == WallDirection.VERT) {
            nextLoc = new Locate(w.location.x, w.location.y+1)
        }
        ret.push(new Wall(nextLoc, w.direct, w.playedBy))

        return ret;

    }

    isLegalMove(loc:Locate):boolean {
        return (this.graph.isConnected(this.currPlayer.location, loc) &&
                (!this.nextPlayer.location.equals(loc)))
    }   


    getMovesToWin(player: Player) : number {
        return this.graph.getPathsToLocations(player.location, player.winningSpots)
    }

    getWinner() :Player {
        return this.winner
    }

    generateLocateForRow(row: number) {
        let locs = []

        for (let x:number=0; x<this.width; x++) {
            locs.push(new Locate(x, row))
        }

        return locs;
    }
}




@Injectable()
export class BoardStateService {
    private _currView: BoardState

    get current() {
        return this._currView;
    }

    constructor() {
        console.log("Board State")        
        this._currView = new BoardState()
    }




    




}
