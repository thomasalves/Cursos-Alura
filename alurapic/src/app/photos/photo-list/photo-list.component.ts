import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';


@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  filter: string = ' ';
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';
  

  constructor(
    private activetedRoute: ActivatedRoute,
    private photoService : PhotoService
    ) { }
   
  ngOnInit(): void {
    this.userName = this.activetedRoute.snapshot.params.userName;
    this.photos = this.activetedRoute.snapshot.data['photos']
   
  }
  

   load(): void {
     this.photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        this.filter = ''
        this.photos = this.photos.concat(photos)    
        if(!photos.length) this.hasMore = false
   })

   }

}
