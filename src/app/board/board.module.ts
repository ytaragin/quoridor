import { BoardStateService } from './board-state.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { FooterComponent } from './footer/footer.component';
import { PlayerStatusComponent } from './player-status/player-status.component';
import { GridComponent } from './grid/grid.component';
import { WallComponent } from './wall/wall.component';
import { SpotComponent } from './spot/spot.component';
import {DialogModule} from 'primeng/primeng';



@NgModule({
  imports: [
    CommonModule,
    DialogModule
  ],
  providers: [BoardStateService],
  declarations: [BoardComponent, FooterComponent, PlayerStatusComponent, GridComponent, WallComponent, SpotComponent],
  exports: [BoardComponent]
})
export class BoardModule { }
