import { Product } from './Product.dto'

export class Sale {
   private products: Array<Product> = []

   get getProducts(): Array<Product> {
      return this.products
   }

   addProduct(product: Product): void {
      this.products.push(product)
   }

   setProducts(products: Array<Product>): void {
      this.products = products
   }
}
