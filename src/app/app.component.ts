import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'German Traffic Sign Classifier In Angular';
  imageSrc: string;
  @ViewChild('img') imageEl: ElementRef;
  predictions: any;
  model: any;
  loading = true;
  numbers: Array<number>;
  prediction: { id: number, signName: string };
  modelClasses: { id: number, signName: string }[] = [
    {"id": 0, "signName": "Speed limit (20km/h)"},
    {"id": 1, "signName": "Speed limit (30km/h)"},
    {"id": 2, "signName": "Speed limit (50km/h)"},
    {"id": 3, "signName": "Speed limit (60km/h)"},
    {"id": 4, "signName": "Speed limit (70km/h)"},
    {"id": 5, "signName": "Speed limit (80km/h)"},
    {"id": 6, "signName": "End of speed limit (80km/h)"},
    {"id": 7, "signName": "Speed limit (100km/h)"},
    {"id": 8, "signName": "Speed limit (120km/h)"},
    {"id": 9, "signName": "No passing"},
    {"id": 10, "signName": "No passing for vehicles over 3.5 metric tons"},
    {"id": 11, "signName": "Right-of-way at the next intersection"},
    {"id": 12, "signName": "Priority road"},
    {"id": 13, "signName": "Yield"},
    {"id": 14, "signName": "Stop"},
    {"id": 15, "signName": "No vehicles"},
    {"id": 16, "signName": "Vehicles over 3.5 metric tons prohibited"},
    {"id": 17, "signName": "No entry"},
    {"id": 18, "signName": "General caution"},
    {"id": 19, "signName": "Dangerous curve to the left"},
    {"id": 20, "signName": "Dangerous curve to the right"},
    {"id": 21, "signName": "Double curve"},
    {"id": 22, "signName": "Bumpy road"},
    {"id": 23, "signName": "Slippery road"},
    {"id": 24, "signName": "Road narrows on the right"},
    {"id": 25, "signName": "Road work"},
    {"id": 26, "signName": "Traffic signals"},
    {"id": 27, "signName": "Pedestrians"},
    {"id": 28, "signName": "Children crossing"},
    {"id": 29, "signName": "Bicycles crossing"},
    {"id": 30, "signName": "Beware of ice/snow"},
    {"id": 31, "signName": "Wild animals crossing"},
    {"id": 32, "signName": "End of all speed and passing limits"},
    {"id": 33, "signName": "Turn right ahead"},
    {"id": 34, "signName": "Turn left ahead"},
    {"id": 35, "signName": "Ahead only"},
    {"id": 36, "signName": "Go straight or right"},
    {"id": 37, "signName": "Go straight or left"},
    {"id": 38, "signName": "Keep right"},
    {"id": 39, "signName": "Keep left"},
    {"id": 40, "signName": "Roundabout mandatory"},
    {"id": 41, "signName": "End of no passing"},
    {"id": 42, "signName": "End of no passing by vehicles over 3.5 metric tons"}
  ];

  async ngOnInit() {
    this.model = await tf.loadLayersModel('/assets/traffic_signs_model/model.json');
  }

  async fileChangeEvent(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (res: any) => {
        this.imageSrc = res.target.result;
        setTimeout(async () => {
          const imgEl = this.imageEl.nativeElement;
          var temp = await this.model.predict(tf.browser.fromPixels(imgEl).expandDims());
          this.predictions = temp.dataSync();
          this.prediction = this.modelClasses.find(mc => mc.id == this.predictions.findIndex((p: number) => p == 1));
        }, 0);

      };
    }

  }
}
