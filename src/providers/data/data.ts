//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

    fbid: string;
    username: string;
    picture: string;
    db: any;
    data: any;
    cloudantUsername: string;
    cloudantPassword: string;
    remote: string;

  constructor() {
    //console.log('Hello DataProvider Provider');
    this.db = new PouchDB('camperchat');
    this.cloudantUsername = 'ymt49324@ckoie.com';
    //this.cloudantUsername = 'ristockesingenevengeonsa';
    this.cloudantPassword = '3e92bbebad96bde4816d316aa1301ee3e482b5ff';
    this.remote = new PouchDB ('https://b6cd7d83-be0b-4719-b5d5-59ed4b331cae-bluemix.cloudant.com/camperchat');

    let options = {
        live: true,
        retry: true,
        continuous: true,
        auth: {
            username: this.cloudantUsername,
            password: this.cloudantPassword
        }
    };

    this.db.info().then(function (info) {
          console.log(info);
    });


    this.db.sync(this.remote, options);
    // this.db.sync(this.remote).on('complete', function () {
    //     let options = {
    //     live: true,
    //     retry: true,
    //     continuous: true,
    //     auth: {
    //         username: this.cloudantUsername,
    //         password: this.cloudantPassword
    //     }
    // };

    // });
    //this.db.replicate.to(this.remote);

  }

  addDocument(messgae){
      this.db.put(messgae);
  }

  getDocuments(){
      return new Promise(resolve => {
          this.db.allDocs({
              include_docs: true,
              limit: 30,
              descending: true
          }).then((result) => {
              this.data = [];

              let docs = result.rows.map((row) => {
                  this.data.push(row.doc);
              });

              this.data.reverse();
              resolve(this.data);
              this.db.changes({
                  live: true,
                  since: 'now',
                  include_docs: true

              }).on('change', (change) => {
                      this.handleChange(change);
                  });

         }).catch((error) => {
             console.log(error);
        });
      });
  }

  handleChange(change){
      let changedDoc = null;
      let changedIndex = null;

      this.data.forEach((doc, index) => {
          if(doc._id === change.id){
              changedDoc = doc;
              changedIndex = index;
          }
      });

      if(change.deleted){
          this.data.splice(changedIndex, 1);
      }
      else {

          if(changedDoc){
              this.data.push();
          }
          else {
              this.data.push(change.doc);
          }
      }

  }





}






