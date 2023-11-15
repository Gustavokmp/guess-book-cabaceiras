import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BRAZIL_STATES_AND_CITIES, CONTRIES } from '../info';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-guest-book',
  templateUrl: './guest-book.page.html',
  styleUrls: ['./guest-book.page.scss'],
})
export class GuestBookPage implements OnInit {

  formGuestBook: FormGroup;

  listCoutries = CONTRIES;

  listState = BRAZIL_STATES_AND_CITIES.estados;
  listCities: Array<any> = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private fs: Firestore,
    private loadingCtrl: LoadingController,
    private toastController: ToastController
  ) {
    this.createForm();
  }

  ngOnInit() {

  }

  ionViewWillEnter(): void {
    this.createForm();
    let object = '' + localStorage.getItem('attraction');
    let touristAttractionSelected: any = JSON.parse(object);
    if (!touristAttractionSelected) {
      this.goBack();
    }
    this.formGuestBook.get('touristAttraction')?.setValue(touristAttractionSelected.nome);
  }

  createForm() {
    this.formGuestBook = this.fb.group({
      name: ['', [Validators.required]],
      contrie: ['Brazil', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      reasonForTheTrip: ['', [Validators.required]],
      touristAttraction: ['', []],
      date: ['', []]

    });
    this.formGuestBook.get('city')?.disable();
  }

  onSubmit() {
    this.showLoading();
    this.formGuestBook.get('date')?.setValue(new Date().toLocaleString());
    const collectionInstance = collection(this.fs, 'visitas');
    addDoc(collectionInstance, this.formGuestBook.value).then(() => {
      this.loadingCtrl.dismiss();
      this.presentToast();
      this.goBack();
    }).catch((err) => {
      console.log(err);
    })
  }

  selectedContrie() {
    if (this.formGuestBook.get('contrie')?.valid) {
      if (this.formGuestBook.value.contrie == "Brazil") {
        this.formGuestBook.get('state')?.enable();
      } else {
        this.formGuestBook.get('state')?.reset();
        this.formGuestBook.get('city')?.reset();
        this.formGuestBook.get('state')?.disable();
        this.formGuestBook.get('city')?.disable();

      }
    }
  }

  selectedState() {
    this.formGuestBook.get('city')?.reset();
    this.formGuestBook.get('city')?.enable();
    if (this.formGuestBook.get('state')?.valid) {
      this.listCities = this.listState.filter((state) => state.nome == this.formGuestBook.get('state')?.value)[0].cidades;
    }

  }

  goBack() {
    this.router.navigateByUrl('/home')
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Salvando por favor aguarde!',
    });

    loading.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Visita registrada!',
      duration: 3000,
      position: 'middle',
      cssClass:'custom-toast'
    });

    await toast.present();
  }

}
