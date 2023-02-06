/*import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CepServiceService } from 'src/services/cep-service.service';
import { HttpService } from 'src/services/http.service';
export interface DialogDataClient {
  clients : Array<any>;
  id : number;
  name : string,
  cnpj : string, 
  socialReason : string, 
  clienteDesde : Date,
  rua : string,
  bairro : string,
  cidade : string,
  estado : string,
  cep : string,
  num : string,
  complemento : string,
  pontoRef : string,
}

@Component({
  selector: 'app-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrls: ['./modal-client.component.scss']
})
export class ModalClientComponent implements OnInit {
  panelOpenState = false;
  panelOpenState2 = false; 
  name : string = '';
  cnpj : string = '';
  socialReason : string = '';
  clients : Array<any> = [];
  id: number | undefined;
  html: string = '';
  address: Array<any>=[];
  newAddress: Array<any>=[];
  rua: string='';
  bairro: string ='';
  cidade: string='';
  estado: string ='';
  pontoRef: string ='';
  complemento: string ='';
  num: number | undefined;
  cep: string = '';
  createdAt : Date | undefined;

  constructor(
    public dialogRef: MatDialogRef<ModalClientComponent>, private httpClient : HttpClient, private httpService : HttpService, 
    private cepsService : CepServiceService
  ) { }

  ngOnInit(): void {
    this.html = 'false';
  }
  public htmlAdd(){
    this.html = 'true';
  }

  consultaCep(){
    this.cepsService.buscar(String(this.cep)).subscribe((dados) => this.populaForm(dados));
  }

  consoile(){
    console.log(this.name);
    console.log(this.socialReason)
  }
  populaForm(dados : any){
      this.cep = dados.cep,
      this.bairro = dados.bairro,
      this.rua = dados.logradouro,
      this.cidade = dados.localidade,
      this.estado = dados.uf
  }

  cancel(): void {
    this.dialogRef.close();
  }

  async add(){
    this.addAddress();
    this.consoile();
    this.clients =  await this.httpService.post('client', {name : this.rua, cnpj : this.cnpj, socialReason : this.rua, clienteDesde : this.createdAt, address : this.newAddress});
    console.log('adicionado');
  }

  async clean(){
    this.name = '';
    this.cnpj = '';
    this.socialReason = '';
    this.id = undefined;
    this.rua = '';
    this.bairro = '';
    this.cidade = '';
    this.estado = '';
    this.cep = '';
    this.num = undefined;
    this.complemento = '';
    this.pontoRef = '';
  }

  async delete(){
    this.clients =  await this.httpService.patch(`client/${this.id}`, {});
    console.log('deletado!')
  }

  async edit(){
    this.clients =  await this.httpService.put('client', {id: this.id, name : this.name, cnpj : this.cnpj, socialReason : this.socialReason});
    console.log('editado!')
  }

  async addAddress(){
    this.newAddress.push({
    "rua":this.rua,
    "bairro":this.bairro,
    "cidade":this.cidade,
    "estado":this.estado,
    "cep":this.cep,
    "numero":this.num,
    "complemento":this.complemento,
    "pontoRef":this.pontoRef
  })
    console.log(this.newAddress);
    this.clean();
  }

}*/

import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
import { CepServiceService } from 'src/services/cep-service.service';
export interface DialogData {
  name : string;
  id : number;
  cnpj : string;
  socialReason : string;
}

@Component({
  selector: 'app-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrls: ['./modal-client.component.scss']
})
export class ModelClientComponent implements OnInit { 
  clients  : Array<any> = [];
  socialReason : string = '';
  name : string = '';
  cnpj : string = '';

  logradouro : string = '';
  bairro : string = '';
  localidade : string = '';
  uf : string = '';
  complemento : string = '';
  num : number = 0;
  cep : string = '';
  addresses : Array<any> = [];
  address : string = '';

  selectedG: number = 0;

  constructor(public dialogRef: MatDialogRef<ModelClientComponent>, private httpService : HttpService,
    @Inject(MAT_DIALOG_DATA) private data : {id : number, name : string,
       cnpj : string, socialReason : string}, public dialog: MatDialog, private cepService : CepServiceService) { }

  ngOnInit(): void {
    console.log(this.getAddress());
    console.log(this.data.id);
  }

  consultaCep(){
    this.cepService.buscar(this.cep).subscribe((dados) => this.populaForm(dados));
  }

  populaForm(dados : any){
   this.cep = dados.cep,
   this.logradouro = dados.logradouro,
   this.bairro = dados.bairro,
   this.localidade = dados.localidade,
   this.uf = dados.uf
  }

  async put(){
    this.putAddress();

    if(this.name == ''){
      this.name = this.data.name;
    }

    if(this.socialReason == ''){
      this.socialReason = this.data.socialReason;
    }

    this.clients = await this.httpService.put('client',{name : this.name, socialReason : this.socialReason,
      address: this.addresses, idCliente: this.data.id})

    this.clean();
  }

  async putAddress(){
    this.addresses.push({logradouro : this.logradouro, bairro : this.bairro, localidade : this.localidade,
       uf : this.uf, cep :this.cep, num : this.num, complemento :this.complemento, idEnd : this.selectedG})
  }

  async add(){
    console.log(this.addresses);
    this.clients = await this.httpService.post('client',{name : this.name, socialReason : this.socialReason,
    cnpj : this.cnpj, address: this.addresses})
    this.clean()
  }

  async addEndereco(){ 
    this.addresses.push({'logradouro' :this.logradouro, 'bairro' :this.bairro, 'localidade' :this.localidade, 'uf' :this.uf,
      'cep' :this.cep, 'numero' :this.num, 'complemento' :this.complemento})
      console.log(this.addresses);
      this.clean();
  }

  async deleteItens(){
    localStorage.setItem('idCliente', `${this.data.id}`)
    this.cancel();
  }

  async deleteAddress(){
    localStorage.setItem('idEndereco', `${this.selectedG}`)
    this.cancel();
  }

  async delete(){
    
  }

  async getAddress(){
    this.addresses = await this.httpService.get(`client/${this.data.id}`);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  clean(){
    this.logradouro = '';
    this.bairro = '';
    this.localidade = '';
    this.uf = '';
    this.complemento  = '';
    this.num = 0;
    this.cep = "";
  }
}