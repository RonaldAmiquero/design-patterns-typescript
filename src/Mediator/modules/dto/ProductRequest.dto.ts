import { Product } from './Product.dto'

export class ProductRequest {
   private products: Array<Product> = []

   get getProducts(): Array<Product> {
      return this.products
   }
   set setProducts(products: Array<Product>) {
      this.products = products
   }
}
