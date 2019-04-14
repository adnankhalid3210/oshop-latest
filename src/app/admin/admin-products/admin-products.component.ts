import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';

import { Sort, PageEvent } from '@angular/material';

// export interface Dessert {
//   calories: number;
//   carbs: number;
//   fat: number;
//   name: string;
//   protein: number;
// }


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {
  products: { title: string }[];
  filteredProducts: any[];
  sortedData;
  length;


  searchValue: string = "";
  results: any;
  pagesize;
  currentPage;
  constructor(private productService: ProductService, public afs: AngularFirestore) {
    this.productService.getAll().subscribe((products: any) => {
      this.filteredProducts = this.products = products
      this.currentPage = 0;
      this.pagesize = 5;
      this.iterator();

    })
    this.sortedData = this.filteredProducts;
  }


  filter(query: string) {
    this.filteredProducts = (query) ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }
  ngOnInit() {
    console.log(this.filteredProducts)
    // this.length = this.filteredProducts.length;
  }



  sortData(sort: Sort) {
    const data = this.filteredProducts;
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'price': return compare(a.price, b.price, isAsc);

        default: return 0;
      }
    });
  }

  public handlePage(e: any) {
    console.log(e.pageIndex)
    this.currentPage = e.pageIndex;
    this.pagesize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pagesize;
    const start = this.currentPage * this.pagesize;
    const part = this.products.slice(start, end);
    this.filteredProducts = part;
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}