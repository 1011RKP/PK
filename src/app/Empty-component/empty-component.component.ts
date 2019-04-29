import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { Compound, CompletedStudies, OngoingStudies, NCAPBCAPK, Constents } from '../data';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppService } from '../app.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-empty-component',
  templateUrl: './empty-component.component.html',
  styleUrls: ['./empty-component.component.css']
})
export class EmptyComponentComponent implements OnInit {

  constructor(
    private router: Router,
    private dynamicRoute: ActivatedRoute,
    private _appService: AppService) {
  }

  ngOnInit() {
  }

}
