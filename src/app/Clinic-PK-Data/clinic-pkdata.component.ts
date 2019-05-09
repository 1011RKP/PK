import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { Compound, CompletedStudies, OngoingStudies, NCAPBCAPK, Constents, NCA, PBPK, PopPK } from '../data';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppService } from '../app.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clinic-pkdata',
  templateUrl: './clinic-pkdata.component.html',
  styleUrls: ['./clinic-pkdata.component.css']
})
export class ClinicPKDataComponent implements OnInit {
  selectedData: Compound;
  ctdItem: CompletedStudies;
  ncapbcapkItem: NCAPBCAPK;
  NCAItem: NCA;
  NCALength: number;
  PBPKItem: PBPK;
  PBPKLength: number;
  PopPKItem: PopPK;
  PopPKLength: number;
  ongItem: OngoingStudies;
  delOngItem: OngoingStudies;
  delctdItem: CompletedStudies;
  delncapbcapkItem: NCAPBCAPK;
  delNCAItem: NCA;
  delPBPKItem: PBPK;
  delPopPKItem: PopPK;
  ongoingStudiesdata: OngoingStudies;
  EventType: string;
  isAdminTrue: boolean = false;
  Compound: string;
  CompoundTitle: string;
  error: string;
  loading: boolean;
  adminURL = "https://incytedev.sharepoint.com/sites/ClinPK/Pages/ClinikPKAdmin.aspx"
  studiesobjLength: number; completedStudiesobjLength: number;
  title: string;
  routeType: string;
  CompoundID: string;
  type: string;



  constructor(
    public toastr: ToastrService,
    vcr: ViewContainerRef,
    private router: Router,
    private dynamicRoute: ActivatedRoute,
    private _appService: AppService) {
    this.dynamicRoute.params.subscribe(params => {
      this.CompoundID = params['id'];
      this.type = params['type'];
      this.title = params['title'];
      this.routeType = "Edit";
      this.initializePage(params['id']);
    });
  }

  ngOnInit() {

  }

  setongItemseletedItem(data: OngoingStudies): void {
    this.delOngItem = data;
  }
  setctdItemseletedItem(data: CompletedStudies): void {
    this.delctdItem = data;
  }
  setNCASeletedItem(data: NCA): void {
    this.delNCAItem = data;
  }
  setPBPKSeletedItem(data: PBPK): void {
    this.delPBPKItem = data;
  }
  setPopPKSeletedItem(data: PopPK): void {
    this.delPopPKItem = data;
  }

  OnStdOngingChange(response): void {
    this.getOngoingStudiesData(this.CompoundID);
    response = (response === 'deleted') ? this.ConformMessage() : this.ErrorMessage();
  }

  OnCtdOngingChange(response): void {
    this.getCompletedStudiesData(this.CompoundID);
    response = (response === 'deleted') ? this.ConformMessage() : this.ErrorMessage();
  }

  OnNCAChange(response): void {
    this.getNCA(this.CompoundID);
    response = (response === 'deleted') ? this.ConformMessage() : this.ErrorMessage();
  }

  OnPBPKBChange(response): void {
    this.getPBPK(this.CompoundID);
    response = (response === 'deleted') ? this.ConformMessage() : this.ErrorMessage();
  }

  OnPopPKChange(response): void {
    this.getPopPK(this.CompoundID);
    response = (response === 'deleted') ? this.ConformMessage() : this.ErrorMessage();
  }

  naviateToonGoingStudies(): void {
    this.router.navigate(['/editStdStudies', "NA", "New", this.CompoundID]);
  }
  naviateToCompletedStudies(): void {
    this.router.navigate(['/editCtdStudies', "NA", "New", this.CompoundID]);
  }

  naviateToNCA(): void {
    this.router.navigate(['/editNCA', "NA", "New", this.CompoundID]);
  }

  naviateToPBPK(): void {
    this.router.navigate(['/editPBPK', "NA", "New", this.CompoundID]);
  }

  naviateToPopPK(): void {
    this.router.navigate(['/editPopPK', "NA", "New", this.CompoundID]);
  }

  initializePage(id: string) {
    //const ID = id;
    this.getClinkPKAdmin(id);
    this.getOngoingStudiesData(id);
    this.getCompletedStudiesData(id);
    this.getNCA(id);
    this.getPBPK(id);
    this.getPopPK(id);
  }

  getClinkPKAdmin(id: string) {
    const url = "/_api/web/currentUser/groups?$select=title,Id&$filter=title+eq+'Clink PK Admin'";
    this._appService.getListItem(url)
      .subscribe(
        (res) => {
          console.log(res);
          if (res) {
            let userLength = res.d.results.length;
            this.isAdminTrue = (userLength !== 0) ? true : false;
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
        });
  }

  getOngoingStudiesData(compound: string): void {
    const select = '?$select=Id,Title,ongStudyName,ongClinicalPKrep,ongClinicalPKreport,ongClinPharmRep,Created,ongProtocol,Editor/Title,Modified,Compound/Id,Compound/Title';
    const expand = '&$expand=Compound/Id,Editor/Title,Compound/Title';
    const filter = '&$filter=(Compound/Id eq ' + compound + ')';
    const order = '&$orderby=Created desc';
    const url = '/_api/web/lists/getbytitle(\'OngoingStudies\')/items' + select + expand + filter + order;
    this._appService.getListItem(url)
      .subscribe(
        (ongItem) => {
          this.loading = true;
          if ((ongItem == null) || (ongItem.d.results.length === 0)) {
            this.studiesobjLength = ongItem.d.results.length;
            this.getCompound();
          } else {
            console.log(ongItem);
            this.CompoundTitle = ongItem.d.results[0].Compound.Title;
            this.ongItem = ongItem.d.results;
            this.studiesobjLength = ongItem.d.results.length
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
        });
  }

  getCompletedStudiesData(compound: string): void {
    const select = '?$select=Id,Title,ctdStudyName,ctdClinicalPKrep,ctdClinPharmRep,ctdProtocol,ctdClinicalPKreport,ctdStudyConclusion,Compound/Title,Editor/Title,Modified,Compound/Id';
    const expand = '&$expand=Compound/Id,Editor/Title,Compound/Title';
    const filter = '&$filter=(Compound/Id eq ' + compound + ')';
    const order = '&$orderby=Created desc';
    const url = '/_api/web/lists/getbytitle(\'CompletedStudies\')/items' + select + expand + filter + order;
    // console.log(url);
    this._appService.getListItem(url)
      .subscribe(
        (ctdItem) => {
          if ((ctdItem == null) || (ctdItem.d.results.length === 0)) {
            this.completedStudiesobjLength = ctdItem.d.results.length
          } else {
            console.log(ctdItem);
            this.ctdItem = ctdItem.d.results;
            this.completedStudiesobjLength = ctdItem.d.results.length
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
        });
  }

  getNCA(compound: string): void {
    const select = '?$select=Id,Title,ncaSource,ncaFormalAnalysis,ncaSecondarydrug,ncaStudypopulation,ncaCmax,ncaTmax,ncaToneandhalf,ncaCminorCtau,ncaAUC0t,ncaAUC0inf,Modified,Editor/Title,Compound/Id';
    const expand = '&$expand=Compound/Id,Editor/Title,Compound/Title';
    const filter = '&$filter=(Compound/Id eq ' + compound + ')';
    const order = '&$orderby=Created desc';
    const url = '/_api/web/lists/getbytitle(\'NCA\')/items' + select + expand + filter + order;
    // console.log(url);
    this._appService.getListItem(url)
      .subscribe(
        (NCA) => {
          if ((NCA == null) || (NCA.d.results.length === 0)) {
            this.NCALength = NCA.d.results.length
          } else {
            this.NCAItem = NCA.d.results;
            this.NCALength = NCA.d.results.length
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
        });
  }

  getPBPK(compound: string): void {
    const select = '?$select=Id,Title,pbpkSource,pbpkFormalAnalysis,pbpkSecondarydrug,pbpkStudypopulation,pbpkCmax,pbpkTmax,pbpkToneandhalf,pbpkCminorCtau,pbpkAUC0t,pbpkAUC0inf,Modified,Editor/Title,Compound/Id';
    const expand = '&$expand=Compound/Id,Editor/Title,Compound/Title';
    const filter = '&$filter=(Compound/Id eq ' + compound + ')';
    const order = '&$orderby=Created desc';
    const url = '/_api/web/lists/getbytitle(\'PBPK\')/items' + select + expand + filter + order;
    // console.log(url);
    this._appService.getListItem(url)
      .subscribe(
        (PBPK) => {
          if ((PBPK == null) || (PBPK.d.results.length === 0)) {
            this.PBPKLength = PBPK.d.results.length
          } else {
            this.PBPKItem = PBPK.d.results;
            this.PBPKLength = PBPK.d.results.length
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
        });
  }

  getPopPK(compound: string): void {
    const select = '?$select=Id,Title,poppkSource,poppkFormalAnalysis,poppkSecondarydrug,poppkStudypopulation,poppkCmax,poppkTmax,poppkToneandhalf,poppkCminorCtau,poppkAUC0t,poppkAUC0inf,Modified,Editor/Title,Compound/Id';
    const expand = '&$expand=Compound/Id,Editor/Title,Compound/Title';
    const filter = '&$filter=(Compound/Id eq ' + compound + ')';
    const order = '&$orderby=Created desc';
    const url = '/_api/web/lists/getbytitle(\'PopPK\')/items' + select + expand + filter + order;
    // console.log(url);
    this._appService.getListItem(url)
      .subscribe(
        (PopPK) => {
          if ((PopPK == null) || (PopPK.d.results.length === 0)) {
            this.PopPKLength = PopPK.d.results.length
          } else {
            this.PopPKItem = PopPK.d.results;
            this.PopPKLength = PopPK.d.results.length
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
        });
  }

  getCompound(): void {
    const select = '?$select=Id,Title';
    const filter = '&$filter=(Id eq ' + this.CompoundID + ')';
    const url = '/_api/web/lists/getbytitle(\'Compound\')/items' + select + filter;

    this._appService.getListItem(url)
      .subscribe(
        (compoundData) => {
          if (compoundData == null) {
            console.log('NO Data');
          } else {
            this.CompoundTitle = compoundData.d.results[0].Title;
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
          console.log(this.error);
        });
  }

  //*! Helper Classes
  ConformMessage(): void {
    this.toastr.error('Record Deleted Successfully');
  }
  ErrorMessage(): void {
    this.toastr.error('Something Went Wrong please contact IT');
  }

}

// const select = '?$select=Id,Title,ncaSource,ncaFormalAnalysis,ncaSecondarydrug,ncaStudypopulation,ncaCmax,ncaTmax,ncaToneandhalf,ncaCminorCtau,ncaAUC0t,ncaAUC0inf,pbpkStudyNumber,pbpkSource,pbpkFormalAnalysis,pbpkSecondarydrug,pbpkStudypopulation,pbpkCmax,pbpkTmax,pbpkToneandhalf,pbpkCminorCtau,pbpkAUC0t,pbpkAUC0inf,poppkStudyNumber,poppkSource,poppkFormalAnalysis,poppkSecondarydrug,poppkStudypopulation,poppkCmax,poppkTmax,poppkToneandhalf,poppkCminorCtau,poppkAUC0t,poppkAUC0inf,Modified,Editor/Title,Compound/Id';
