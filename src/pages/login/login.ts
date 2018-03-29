import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { MenuController, Platform, LoadingController } from 'ionic-angular';
//import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { DataProvider } from '../../providers/data/data';
import { Facebook } from '@ionic-native/facebook';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    loading: any;

  constructor(public navCtrl: NavController,
              public dataService: DataProvider,
              public platform: Platform,
              public alertCtrl: AlertController,
              public menu: MenuController,
              public Facebook: Facebook,
              public loadingCtrl: LoadingController) {

                  this.loading = this.loadingCtrl.create({
                    content: 'Authuntaction ...'
                  });
                  this.menu.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(): void {
      this.loading.present();
      this.Facebook.login(['public_profile']).then((response) => {
          this.getProfile();
      },
      (err) => {
          console.log(err);
          let alert = this.alertCtrl.create({
            title: 'Oops!',
            subTitle: 'Something went wrong, please try again later.',
            buttons: ['Ok']
          });

          this.loading.dismiss();
          alert.present();
      });
  }

  getProfile(): void {
      this.Facebook.api('/me?fields=id,name,picture', ['public_profile']).then(
          (response) =>{
              console.log(response);
              this.dataService.fbid = response.id;
              this.dataService.username = response.username;
              this.dataService.fbid = response.picture;

              this.menu.enable(true);
              this.navCtrl.setRoot(HomePage);
          },
          (err) => {
              console.log(err);
              let alert = this.alertCtrl.create({
                title: 'Oops!',
                subTitle: 'somethong went wrong',
                buttons: ['Ok']
              });

              this.loading.dismiss();
              alert.present();
        });
  }


}
