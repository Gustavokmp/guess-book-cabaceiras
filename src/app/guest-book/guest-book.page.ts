import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Brasil_STATES_AND_CITIES, CONTRIES } from '../info';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-guest-book',
  templateUrl: './guest-book.page.html',
  styleUrls: ['./guest-book.page.scss'],
})
export class GuestBookPage implements OnInit {

  formGuestBook: FormGroup;

  listCoutries = CONTRIES;

  listState = Brasil_STATES_AND_CITIES.estados;
  listCities: Array<any> = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private fs: Firestore,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private translate: TranslateService
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
    this.formGuestBook.get('pontoTuristico')?.setValue(touristAttractionSelected.nome);
  }

  createForm() {
    this.formGuestBook = this.fb.group({
      nomeDoVisitante: ['', [Validators.required]],
      pais: ['Brasil', [Validators.required]],
      estado: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      motivoDaViagem: ['', [Validators.required]],
      pontoTuristico: ['', []],
      data: ['', []]

    });
    this.formGuestBook.get('cidade')?.disable();
  }

  onSubmit() {
    this.showLoading();
    this.formGuestBook.get('data')?.setValue(new Date().toLocaleString());
    const collectionInstance = collection(this.fs, 'visitas');
    addDoc(collectionInstance, this.formGuestBook.value).then(() => {
      this.loadingCtrl.dismiss();
      this.presentToast();
      this.goBack();
    }).catch((err) => {
      this.loadingCtrl.dismiss();
      this.presentToastError();
      console.log(err);
    })
  }

  selectedContrie() {
    if (this.formGuestBook.get('pais')?.valid) {
      if (this.formGuestBook.value.pais == "Brasil") {
        this.formGuestBook.get('estado')?.enable();
      } else {
        this.formGuestBook.get('estado')?.reset();
        this.formGuestBook.get('cidade')?.reset();
        this.formGuestBook.get('estado')?.disable();
        this.formGuestBook.get('cidade')?.disable();

      }
    }
  }

  selectedState() {
    this.formGuestBook.get('cidade')?.reset();
    this.formGuestBook.get('cidade')?.enable();
    if (this.formGuestBook.get('estado')?.valid) {
      this.listCities = this.listState.filter((state) => state.nome == this.formGuestBook.get('estado')?.value)[0].cidades;
    }

  }

  goBack() {
    this.router.navigateByUrl('/home')
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: this.getTranslateText('loading-text'),
    });

    loading.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.getTranslateText('toast-text'),
      duration: 3000,
      position: 'middle',
      cssClass: 'custom-toast'
    });

    await toast.present();
  }

  async presentToastError() {
    const toast = await this.toastController.create({
      message: this.getTranslateText('toast-text-error'),
      duration: 3000,
      position: 'middle',
    });

    await toast.present();
  }

  getTranslateText(text: string) {
    return this.translate.instant(text);
  }

}
