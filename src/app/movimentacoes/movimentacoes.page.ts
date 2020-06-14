import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from '../../providers/api-provider';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-movimentacoes',
  templateUrl: './movimentacoes.page.html',
  styleUrls: ['./movimentacoes.page.scss'],
})
export class MovimentacoesPage implements OnInit {

  lista : any = [];
  limit : number = 10;
  start : number = 0;
  
  data: string = "";
   dataBuscarInicial: Date;
   dataBuscarFinal: Date;

  constructor(
    private router: Router,  
    private provider: PostProvider,
    public toastController: ToastController
  ) { }

  ngOnInit() {
  }

  async MensagemErro() {
    const toast = await this.toastController.create({
      message: 'Registro não encontrado!',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }
  

  ionViewWillEnter(){
    this.lista = [];
    this.start = 0;
    this.carregar();
  }


  //atualizar o list view

  doRefresh(event) {
    
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }


//barra de rolagem
loadData(event) {
  
    this.start += this.limit;

    setTimeout(() => {
      this.carregar().then(()=>{ 
        event.target.complete();
       });
     
    }, 500);
    
  
}


carregar(){
  return new Promise(resolve => {
    let dados = {
      requisicao : 'listar',
      limit : this.limit,
      start : this.start
     
    };
    this.provider.Api(dados, 'apiMovimentacoes.php').subscribe(data => {
      for(let dado of data['result']){
        this.lista.push(dado);
      }
      resolve(true);
    });

  });

}




buscar(dataBuscarInicial:Date, dataBuscarFinal:Date){
 
  return new Promise(resolve => {
    let dados = {
      requisicao : 'buscar',
      limit : this.limit,
      start : this.start,
      dataBuscarInicial : dataBuscarInicial,
      dataBuscarFinal : dataBuscarFinal
     
    };
    console.log(dataBuscarInicial);
    this.provider.Api(dados, 'apiMovimentacoes.php').subscribe(data => {
      this.lista = [];
      if(data['success']){
        for(let dado of data['result']){
          this.lista.push(dado);
        }
        resolve(true);
      }else{
        this.MensagemErro();
        this.carregar();
      }
      
     
    });

  });

}


}
