import { Component, OnInit } from '@angular/core';
import { BoardStateService } from "../board-state.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private boardService: BoardStateService) { }

  ngOnInit() {
  }

  nextturn() {
    return this.boardService.current.currPlayer.name
  }

  getPlayer(num:number) {
    return this.boardService.current.getPlayer(num)
  }
  
getList() {
  return [1,2,3,4]
}

  getClass(n:number) {
    return "redtext text"+n;
  }

}
