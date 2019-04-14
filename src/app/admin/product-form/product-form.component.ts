import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
categories$;
product;
productForm: FormGroup;
id;
getId$;

  constructor(private categoryService:CategoryService,private productService:ProductService,private router:Router,private route:ActivatedRoute) { 
  }
  ngOnInit() {
    this.productForm = new  FormGroup({
      title: new FormControl(''),
      price: new FormControl(''),
      category: new FormControl(''),
      imageUrl: new FormControl(''),
    });
    this.id=this.route.snapshot.paramMap.get('id');
    

// this.getId$= this.productService.get(this.id);


//  if(id) this.product$=this.productService.get(id);
this.productService.get(this.id).subscribe(res => {
  
  this.productForm.setValue(res);

})
// this.categories$=this.categoryService.getCategories(); 
   this.categories$= this.categoryService.getCategories();
   }
   save(product){
    this.productService.create(product);
     
  }

  update() {
    
    // this.productService.update(this.id, this.productForm.value)
    this.productService.update(this.id,this.productForm.value)
  }
delete(){
  // if(!confirm('Are you sure you want to delete this')) return;
  this.productService.delete(this.id);
  this.router.navigate(['/admin/products/']);
}

}

  // this.ngOnInit
    
// this.productService.get(id).subscribe(res=> {
//   console.log(res)
// })

    