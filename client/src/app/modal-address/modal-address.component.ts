import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CepServiceService } from 'src/services/cep-service.service';
import { HttpService } from 'src/services/http.service';

export interface DialogData {
  rua : string;
  bairro : string;
  cidade : string;
  estado : string;
  complemento : string;
  num : number;
  cep : number;
  pontoRef : string;
}
@Component({
  selector: 'app-modal-address',
  templateUrl: './modal-address.component.html',
  styleUrls: ['./modal-address.component.scss']
})
export class ModalAddressComponent implements OnInit {

  cep : number = 0;
  rua  : string = '';
  bairro : string = '';
  cidade : string = '';
  estado : string = '';
  complemento : string = '';
  num : number = 0;
  pontoRef : string = '';
  addresses : Array<any> = [];
  address : string = '';
  fkClient : number = 0;
  constructor(public dialogRef: MatDialogRef<ModalAddressComponent>, private httpService : HttpService,
    private cepsService : CepServiceService,
    @Inject(MAT_DIALOG_DATA) private data : {id : number}) { }

  ngOnInit(): void {
    console.log(this.data.id)
  }

  cancel(): void {
    this.dialogRef.close();
  }
  async addAddress(){
    this.addresses = await this.httpService.post('client',{rua : this.rua,bairro : this.bairro,
      cidade : this.cidade, estado : this.estado, complemento : this.complemento, numero : this.num, fkClient : this.data.id});
    this.cancel();
  }

  consultaCep(){
    this.cepsService.buscar(String(this.cep)).subscribe((dados) => this.populaForm(dados));
  }

  populaForm(dados : any){
    this.cep = dados.cep,
    this.bairro = dados.bairro,
    this.rua = dados.logradouro,
    this.cidade = dados.localidade,
    this.estado = dados.uf
}

}