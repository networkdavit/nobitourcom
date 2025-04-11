import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { CookieService } from 'ngx-cookie-service';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-dialog-saves',
  templateUrl: './dialog-saves.component.html',
  styleUrls: ['./dialog-saves.component.css']
})
export class DialogSavesComponent implements OnInit {

  description: string;
  hideIt: boolean = false;
  favorites: any;
  clientId: string;

  showLoader: boolean = true;

  constructor(private data: FavoriteService, private dialogRef: MatDialogRef<DialogSavesComponent>, @Inject(MAT_DIALOG_DATA) dialogData, private cookieService: CookieService) {
    // this.description = data.description;
  }

  ngOnInit() {
    this.clientId = this.cookieService.get('clientId');
    this.onGetAllFavorite();
  }

  onGetAllFavorite(){
    console.log("VLEZE");
    this.data.getAllFavorite(parseInt(this.clientId)).subscribe(
      data => {
        console.log('datapons data', data)
        this.favorites = data;
        this.showLoader = false;
      }
    );
  }

  save() {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
    window.location.reload();
  }

  onDeleteFavorite(favoriteId, productType){

    this.data.deleteFavorite(parseInt(this.clientId), productType, favoriteId).subscribe(
      data => {
        this.onGetAllFavorite();
        console.log('datapons data', data)
      }
    );
  }

}
