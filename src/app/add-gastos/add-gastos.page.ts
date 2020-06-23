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

  historico: string = "";
  valor: string = "";
 
  id_despesa: number;

  dadosLogin: any;
  usuario_logado : string = "TESTE"; 

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
      this.usuario_logado = this.dadosLogin.nome;
      console.log(res);
    });
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Despesa lançada',
      duration: 2000,
      color: "success"
    });
    toast.present();
  }

  
  
  ngOnInit() {
    this.actRoute.params.subscribe((data: any)=>{
      this.id_despesa = data.id_despesa;
      this.historico = data.historico;
      this.valor = data.valor;
      this.usuario_logado = data.usuario_logado;
      console.log(data);
    });
  }

 

  cadastrar(){
    return new Promise(resolve => {
      let dados = {
        requisicao : 'add',
        historico: this.historico,
        valor: this.valor,
        usuario_logado: this.usuario_logado
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
        historico: this.historico,
               
        id_despesa: this.id_despesa
      };
      this.provider.Api(dados, 'apiGastos.php')
      .subscribe(data => {
       
        this.router.navigate(['/gastos']);
        this.presentToast();
      });
     
     

    });
  }





}
