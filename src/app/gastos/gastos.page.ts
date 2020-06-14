import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from '../../providers/api-provider';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {

 lista : any = [];
 limit : number = 10;
 start : number = 0;
 valor: string = "";
 motivo: string = "";
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
    this.provider.Api(dados, 'apiGastos.php').subscribe(data => {
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
    this.provider.Api(dados, 'apiGastos.php').subscribe(data => {
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
  this.router.navigate(['/add-gastos'])
}


editar(id, motivo, valor){
  this.router.navigate(['/add-gastos/' + id + '/' + motivo + '/' + valor]);
}


excluir(id){
  let dados = {
    requisicao : 'excluir',
    id : id  
  }  
   
    this.provider.Api(dados, 'apiGastos.php').subscribe(data => {
      this.ionViewWillEnter();
      
    });
    
  }



}
