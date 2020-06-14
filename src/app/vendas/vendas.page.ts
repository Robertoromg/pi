import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from '../../providers/api-provider';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.page.html',
  styleUrls: ['./vendas.page.scss'],
})
export class VendasPage implements OnInit {

  lista : any = [];
  limit : number = 10;
  start : number = 0;
  valor: string = "";
  produto: string = "";
  data: string = "";
   dataBuscar: Date;

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
    this.provider.Api(dados, 'apiVendas.php').subscribe(data => {
      for(let dado of data['result']){
        this.lista.push(dado);
      }
      resolve(true);
    });

  });

}




buscar(dataBusca:Date){
 
  return new Promise(resolve => {
    let dados = {
      requisicao : 'buscar',
      limit : this.limit,
      start : this.start,
      dataBuscar : dataBusca
     
    };
    console.log(dataBusca);
    this.provider.Api(dados, 'apiVendas.php').subscribe(data => {
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



add(){
  this.router.navigate(['/add-vendas'])
}


editar(id, produto, valor){
  this.router.navigate(['/add-vendas/' + id + '/' + produto + '/' + valor]);
}


excluir(id){
  let dados = {
    requisicao : 'excluir',
    id : id  
  }  
   
    this.provider.Api(dados, 'apiVendas.php').subscribe(data => {
      this.ionViewWillEnter();
      
    });
    
  }



}

