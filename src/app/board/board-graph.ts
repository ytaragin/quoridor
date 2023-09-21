import { Locate, Wall, WallDirection } from './board-parts';
import { Graph, alg, Edge } from 'graphlib';

//import Graph from "graphlib"


//declare var Graph: any;

export class BoardGraph {

    graph: Graph
    tempRemEdge: [string,string][];
    tempAddedEdge: [string,string][];

    constructor(width:number, height:number) {
        console.log("Starting Graph")

        this.graph = new Graph({ directed: false });
        this.fillBaseGraph(width, height)

        this.clearTemp()

        console.log("Graph", this.graph)


    }

    getID(x: number, y: number) {
        return x+"-"+y
    }
    getIDFromLocate(l:Locate) {
        return l.x+"-"+l.y
    }

    getEdgeCount():number {
        return this.graph.edgeCount()
    }

    private fillBaseGraph(width:number, height:number){
        for (let x:number = 0; x<width; x++) {
            for (let y:number = 0; y<height; y++) {
                this.graph.setNode(this.getID(x,y))
           }
        }

        for (let x:number = 0; x<width; x++) {
            for (let y:number = 0; y<height; y++) {
                if (x<width) {
                    this.graph.setEdge(this.getID(x,y), this.getID(x+1,y))
                }
                if (y<height) {
                    this.graph.setEdge(this.getID(x,y), this.getID(x,y+1))
                }
           }
        }


    }

    getConnectedLocations(l: Locate) {
        console.log( this.graph.nodeEdges(this.getIDFromLocate(l)) )
        
        
    }

    isConnected(from:Locate, trgt:Locate): boolean {
        return this.graph.hasEdge(this.getIDFromLocate(from), this.getIDFromLocate(trgt))

    }
    
    putWall(w: Wall):[string, string] {
        
        if (w.direct == WallDirection.CROSS) {
            // can ignore these
            return null;
        }
        let x = w.location.x
        let y = w.location.y
        if (w.direct == WallDirection.HORIZ ) {
            y = y+1
        } else {
            x=x+1
        }


        let e1 = this.getIDFromLocate(w.location)
        let e2 = this.getID(x,y)
       // console.log("Graph has "+this.graph.edgeCount()+" edges. Removing "+e1+e2)
        this.graph.removeEdge(e1, e2)
       // console.log("Graph has "+this.graph.edgeCount()+" edges. Removed "+e1+e2)

        return [e1,e2]
    }



    tempAddWall(w:Wall) {
        let r = this.putWall(w)
        if (r != null) {
            this.tempRemEdge.push(r)
        }



    }


    revert() {
        this.tempRemEdge.forEach ( e =>  {this.graph.setEdge(e[0], e[1] )} )

        this.tempAddedEdge.forEach ( e =>  {this.graph.removeEdge(e[0], e[1] )} )

        this.clearTemp()
    } 

    clearTemp() {
        this.tempRemEdge = []
        this.tempAddedEdge = []

    }   

    getPathsToLocations(loc: Locate, winners: Locate[]) : number {
        let paths = alg.dijkstra(this.graph, this.getIDFromLocate(loc),
                                (e) => { return 1},
                               (v) => { 
                                    let y: Edge[] = [];
                                    let x:any = this.graph.nodeEdges(v);
                                    if (x != null) { y = x};
                                    return x;
                                    } 
                               );
        let shortest: number = Number.MAX_VALUE
         //console.log(paths)
         winners.forEach(l => {
             let rec = paths[this.getIDFromLocate(l)]
                if (shortest > rec.distance ) {
                    shortest = rec.distance
                } 
             

        })

        //console.log("Length: "+shortest)         


        return shortest;
    }




}