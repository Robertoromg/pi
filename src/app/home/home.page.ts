import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { PostProvider } from '../../providers/api-provider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  lista : any = [];
  limit : number = 10;
  start : number = 0;

  
dadosLogin: any;
usuario : string;

  constructor(
    private router:Router,
    private provider:PostProvider,
    private storage: NativeStorage,
    public toast: ToastController
  ) {}

  ionViewWillEnter(){
    this.storage.getItem('session_storage').then((res)=>{
      this.dadosLogin = res;
      this.usuario = this.dadosLogin.nome;
      console.log(res);

    
    });

    this.lista = [];
    this.start = 0;
    this.carregar();
  }


  async logout(){
    this.storage.clear();
    this.router.navigate(['/login']);
    const toast = await this.toast.create({
      message: 'Logout Efetuado',
      duration: 1000,
      color: 'success'
    });
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

}
