export class Locate {
    constructor(readonly x:number, readonly y:number) {

    }

    equals(other:Locate) : boolean {
        return ((this.x==other.x)&&(this.y == other.y))
    }
    toString():string {
       // return "("+this.x+","+this.y+")";
        return ""+this.x+"_"+this.y;
    }

    static matchByParts(x:number, y:number)  {
        return function(l:Locate) { return ((x == l.x) && (y == l.y)) }
    }

    static matcher(other:Locate)  {
        return function(l:Locate) { return l.equals(other) }
    }

}

export enum WallDirection {
    HORIZ,
    VERT,
    CROSS
}


export class Wall {
    
    constructor(readonly location: Locate,  readonly direct:WallDirection, readonly playedBy: number){

    }
    toString():string {
        let v:string
        switch (this.direct) {
            case WallDirection.CROSS: {
                v = "c";
                break;
            }
            case WallDirection.HORIZ: {
                v = "h";
                break;
            }
            case WallDirection.VERT: {
                v = "v";
                break;
            }
            default: {
                console.error("Unknown direction")
                v="?";
                break;
            }
        }

        return this.location.x+","+this.location.y+","+v;
    }

    equals(other:Wall) : boolean {
        return (this.location.equals(other.location) && (this.direct == other.direct))
    }
    

    static matchByParts(l:Locate, direct:WallDirection)  {
        return function(w:Wall) { return (w.location.equals(l)&&(w.direct==direct)) } 
    }
   
}

export class Spot {
    pieceLocated: boolean
  

    constructor(readonly x: number, readonly y: number) {
        this.pieceLocated = false
    }


}

export class Player {

    private record: string[]

    constructor(private _name:string, private _location: Locate, 
                private _wallsLeft: number, 
                private _winningSpots: Locate[]) {
        this.record = []
    }

    get location():Locate {
        return this._location;
    }
    set location(theLoc:Locate) {
        this._location = theLoc;
    }

    get wallsLeft():number {
        return this._wallsLeft;
    }

    get name():string {
        return this._name;
    }

    get winningSpots(): Locate[] {
        return this._winningSpots;
    }

    addTurn(rec:string) {
        this.record.push(rec)
    }

    playWall() {
        if (this._wallsLeft > 0 ){
            this._wallsLeft--;
        }
        else {
            console.error("Player playing wall that doesnt have")
        }
    }

    
}
