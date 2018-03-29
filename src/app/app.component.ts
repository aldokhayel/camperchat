import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
//import { StatusBar } from '@ionic-native/status-bar';
//import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { Nav, MenuController } from 'ionic-angular';
import { DataProvider } from '../../src/providers/data/data';
import { LoginPage } from '../../src/pages/login/login';
import { AboutPage } from '../../src/pages/about/about';
import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;
  homePage: any = HomePage;
  //rootPage:any = HomePage;
  //homePage: any = HomePage;
  aboutPage: any = AboutPage;

  constructor(public platform: Platform,
              public dataService: DataProvider,
              public menu: MenuController,
              public Facebook: Facebook) {

        platform.ready().then(() => {

        });
  }

  opnePage(page): void {
    this.menu.close();
    this.nav.setRoot(page);

  }

  logout(): void {
      this.menu.close();
      this.menu.enable(false);
      this.nav.setRoot(LoginPage);
      this.dataService.fbid = null;
      this.dataService.username = null;
      this.dataService.picture = null;
      this.Facebook.logout();
  }
}

