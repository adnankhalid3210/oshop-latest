import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products = [];
  categories$;
  category: string;
  filteredProducts;


  constructor(private productService: ProductService, private categoryService: CategoryService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();

    this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.productService.getAll().subscribe(ayaz => {
        this.products = ayaz;
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category.toLowerCase() === this.category) :
          this.products;
      })
    })
  }

}
