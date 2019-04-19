import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Compound, ADMEData, } from '../data';
import { AppService } from '../app.service';
import { parse } from 'url';

@Component({
  selector: 'app-add-compund',
  templateUrl: './add-compund.component.html',
  styleUrls: ['./add-compund.component.css']
})
export class AddCompundComponent implements OnInit {
  ongStudyNumber: string;
  ongStudyName: string;
  ongClinicalPKrep: string;
  ongClinicalPKreport: string;
  ongClinPharmRep: string;
  ongProtocol: string;

  ctdStudyNumber: string;
  ctdStudyName: string;
  ctdStudyConclusion: string;
  ctdClinicalPKrep: string;
  ctdClinPharmRep: string;
  ctdProtocol: string;
  ctdClinicalPKreport: string;

  ncaStudyNumber: string;
  ncaSource: string;
  ncaFormalAnalysis: string;
  ncaSecondarydrug: string;
  ncaStudypopulation: string;
  ncaCmax: string;
  ncaTmax: string;
  ncaToneandhalf: string;
  ncaCminorCtau: string;
  ncaAUC0t: string;
  ncaAUC0inf: string;

  poppkStudyNumber: string;
  poppkSource: string;
  poppkFormalAnalysis: string;
  poppkSecondarydrug: string;
  poppkStudypopulation: string;
  poppkCmax: string;
  poppkTmax: string;
  poppkToneandhalf: string;
  poppkCminorCtau: string;
  poppkAUC0t: string;
  poppkAUC0inf: string;

  pbpkStudyNumber: string;
  pbpkSource: string;
  pbpkFormalAnalysis: string;
  pbpkSecondarydrug: string;
  pbpkStudypopulation: string;
  pbpkCmax: string;
  pbpkTmax: string;
  pbpkToneandhalf: string;
  pbpkCminorCtau: string;
  pbpkAUC0t: string;
  pbpkAUC0inf: string;


  @Input()
  Type: string;

  constructor() { }

  ngOnInit() {
  }

}
