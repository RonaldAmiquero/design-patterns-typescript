import { Sale } from './Sale.dto'

export class SaleOrder extends Sale {
   private id: string
   constructor(id: string) {
      super()
      this.id = id
   }

   get getId(): string {
      return this.id
   }
   set setId(id: string) {
      this.id = id
   }
}
