import { Module } from 'module'
import { AbstractModule } from '../AbstractModule'
import { ProductRequest } from '../dto/ProductRequest.dto'
import { SaleOrder } from '../dto/SaleOrder.dto'
import { ModuleMessage } from '../ModuleMessage'
import { PurchaseModule } from './PurchaseModule'

export class StockModule extends AbstractModule {
   static readonly MODULE_NAME: string = 'StockModule'
   static readonly OPERATION_DECREMENT_STOCK: string = 'decrementStock'

   getModuleName(): string {
      return StockModule.MODULE_NAME
   }
   public notifyMessage(message: ModuleMessage): Object | null {
      switch (message.getMessageType) {
         case StockModule.OPERATION_DECREMENT_STOCK:
            return this.decrementStock(message)
         default:
            throw new Error(`Operation not supported: ${message.getMessageType}`)
      }
   }
   decrementStock(message: ModuleMessage): Object | null {
      let saleOrder = <SaleOrder>message.getPayload
      for (const product of saleOrder.getProducts) {
         console.log(`Decrement product > ${product.getName}`)
      }

      let productRequest = new ProductRequest()
      productRequest.setProducts = saleOrder.getProducts

      let purchaseMessage = new ModuleMessage(
         StockModule.MODULE_NAME,
         PurchaseModule.MODULE_NAME,
         PurchaseModule.OPERATION_PURCHASE_REQUEST,
         productRequest
      )
      this.mediator.mediate(purchaseMessage)
      return true
   }
}
