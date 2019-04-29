export class Constents {
  static readonly url = "https://incytedev.sharepoint.com/sites/ClinPK/"
}

export class Compound {
  Id: string;
  Title: string;
}

export class Created {
  Editor: string
}

export class OngoingStudies {
  Id: string;
  Title: string;
  ongStudyName: string;
  ongClinicalPKrep: string;
  ongClinPharmRep: string;
  ongProtocol: string;
  ongClinicalPKreport: string;
  Compound: Compound;
  Created: Created;
  Modified: string;
}

export class CompletedStudies {
  Id: string;
  Title: string;
  ctdStudyName: string;
  ctdClinicalPKrep: string;
  ctdClinPharmRep: string;
  ctdProtocol: string;
  ctdClinicalPKreport: string;
  ctdStudyConclusion: string
  Compound: Compound;
  Created: Created;
  Modified: string;
}

export class NCAPBCAPK {
  Id: string;

  Title: string;
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

  Compound: Compound;
  Created: Created;
  Modified: string;
}

