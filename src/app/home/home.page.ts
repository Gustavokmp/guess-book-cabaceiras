import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DATABASE_CABACEIRAS } from '../info';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  listOfTouristAttractions: Array<any> = [];

  constructor(private router: Router) { }

  ionViewWillEnter(): void {
    localStorage.removeItem('attraction');
    this.listOfTouristAttractions = DATABASE_CABACEIRAS.filter((item: any) => item.categoria === 'Pontos Turisticos');
  }


  goGuestBook(attraction: any) {
    localStorage.setItem('attraction', JSON.stringify(attraction))
    this.router.navigateByUrl('/guest-book')
  }

  getImage(listImagens: any) {
    return '../../assets/places/' + listImagens[0];
  }

}
