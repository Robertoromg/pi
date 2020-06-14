import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from '../../providers/api-provider';
import { ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string;
  senha: string;
  nomeUsuario: string;

  constructor(
    private router: Router,
    private provider: PostProvider,
    private storage: NativeStorage,
    public toast: ToastController
  ) { }

  ngOnInit() {
  }


  async login(){
    
    if(this.usuario == "" ){
          const toast = await this.toast.create({
          message: 'Campo Email é obrigatório',
          duration: 2000,
          color: 'danger'
        });
        
        toast.present();
        return;
      }

      if(this.senha == "" ){

        const toast = await this.toast.create({
        message: 'Campo Senha é obrigatório',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      return;
    }


    let dados = {
      requisicao : 'login',
      usuario: this.usuario,
      senha: this.senha,
      nomeUsuario : this.nomeUsuario
    };

    console.log(dados);

    this.provider.Api(dados, 'login.php').subscribe(async data => {
     var alert = data['msg'];
     if(data['success']){
       this.storage.setItem('session_storage', data['result']);
       this.router.navigate(['/home']);
       const toast = await this.toast.create({
         message: 'Logado com sucesso',
         duration: 2000,
         color: 'success'
       });
       toast.present();
       this.usuario = "";
       this.senha = "";
       console.log(data);
     }else{
      const toast = await this.toast.create({
        message: alert,
        duration: 2000,
        color: 'danger'
      });
      toast.present();
     }
      
    })

    }




}
