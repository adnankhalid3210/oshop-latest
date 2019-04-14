import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }
  create(product) {
    this.db.list('/products').push(product);
  }
  update(key, product) {
    // this.db.list('/products').update()
    this.db.object('/products/' + key) // /products/656767ch76
      .update(product);
  }
  get(productId) {
    return this.db.object('/products/' + productId).valueChanges();

  }
  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }
  //myProducts;
//   search(){
//     this.myProducts = this.db.list('/books', {
//       query: {
//           orderByChild: 'title',
//           equalTo: 'My book #1',
//       }
//   });
// }
  

  getAll() {
    return this.db.list('/products').snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    )
  }
}
