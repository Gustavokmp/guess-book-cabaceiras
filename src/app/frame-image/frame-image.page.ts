import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frame-image',
  templateUrl: './frame-image.page.html',
  styleUrls: ['./frame-image.page.scss'],
})
export class FrameImagePage implements OnInit {

  imageSrc: string = '';

  constructor() { }

  ngOnInit() {
  }

  handleFileSelect(event: any) {
    let { files } = event.target;
    let file = files[0];
    if (files && file) {
      let reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt: any) {
    let binaryString = readerEvt.target.result;
    this.imageSrc = 'data:image/png;base64,' + btoa(binaryString);
  }

}
