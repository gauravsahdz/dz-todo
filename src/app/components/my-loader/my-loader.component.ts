// my-loader.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-my-loader',
  templateUrl: './my-loader.component.html',
  styleUrls: ['./my-loader.component.scss']
})
export class MyLoaderComponent implements OnInit {

  loader: any;

  constructor(private api: ApiService) {

    this.api.loader.subscribe((res) => {
      this.loader = res;
    });

  }
  ngOnInit() {
  }

}
