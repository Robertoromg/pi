import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/api-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-add-gastos',
  templateUrl: './add-gastos.page.html',
  styleUrls: ['./add-gastos.page.scss'],
})
export class AddGastosPage implements OnInit {

  motivo: string = "";
  valor: string = "";
 
  id: number;

  dadosLogin: any;
  usuario : string = "Hugo Vasconcelos"; 

  constructor(
    private router: Router,  
    private provider: PostProvider,
    public toastController: ToastController,
    private storage: NativeStorage,
    private actRoute: ActivatedRoute
  ) { }



  voltar(){
    this.router.navigate(['/gastos'])
  }


  ionViewWillEnter(){
    this.storage.getItem('session_storage').then((res)=>{
      this.dadosLogin = res;
      this.usuario = this.dadosLogin.nome;
      console.log(res);
    });
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Dados Salvo',
      duration: 2000,
      color: "success"
    });
    toast.present();
  }

  
  
  ngOnInit() {
    this.actRoute.params.subscribe((data: any)=>{
      this.id = data.id;
      this.motivo = data.motivo;
      this.valor = data.valor;
      this.usuario = data.funcionario;
      console.log(data);
    });
  }

 

  cadastrar(){
    return new Promise(resolve => {
      let dados = {
        requisicao : 'add',
        motivo: this.motivo,
        valor: this.valor,
        usuario: this.usuario
      };
      this.provider.Api(dados, 'apiGastos.php')
      .subscribe(data => {
       
        this.router.navigate(['/gastos']);
        this.presentToast();
      });
     
     

    });
  }



  editar(){
    return new Promise(resolve => {
      let dados = {
        requisicao : 'editar',
        motivo: this.motivo,
               
        id: this.id
      };
      this.provider.Api(dados, 'apiGastos.php')
      .subscribe(data => {
       
        this.router.navigate(['/gastos']);
        this.presentToast();
      });
     
     

    });
  }





}
