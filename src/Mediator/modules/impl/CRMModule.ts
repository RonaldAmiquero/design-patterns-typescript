import crypto from 'crypto'
import { AbstractModule } from '../AbstractModule'
import { Sale } from '../dto/Sale.dto'
import { SaleOrder } from '../dto/SaleOrder.dto'
import { ModuleMessage } from '../ModuleMessage'
import { ECommerceModule } from './ECommerceModule'
import { StockModule } from './StockModule'

export class CRMModule extends AbstractModule {
   static readonly MODULE_NAME: string = 'CRM'
   static readonly OPERATION_CREATE_ORDER: string = 'CreateOrder'

   getModuleName(): string {
      return CRMModule.MODULE_NAME
   }
   public notifyMessage(message: ModuleMessage): Object | null {
      switch (message.getMessageType) {
         case CRMModule.OPERATION_CREATE_ORDER:
            return this.createSaleOrder(message)
         default:
            throw new Error(`Operation not supported ${message.getMessageType}`)
      }
   }
   createSaleOrder(message: ModuleMessage): Object | null {
      let sale: Sale = <Sale>message.getPayload
      const ID: string = crypto.randomUUID()
      let saleOrder: SaleOrder = new SaleOrder(ID)
      console.log('sales order successfully created')
      saleOrder.setProducts(sale.getProducts)

      let stockMessage = new ModuleMessage(
         CRMModule.MODULE_NAME,
         StockModule.MODULE_NAME,
         StockModule.OPERATION_DECREMENT_STOCK,
         saleOrder
      )
      if (this.mediator.mediate(stockMessage)) {
         let stockEvent = new ModuleMessage(
            CRMModule.MODULE_NAME,
            ECommerceModule.MODULE_NAME,
            ECommerceModule.OPERATION_COMPLETE_ORDER,
            saleOrder
         )
         this.mediator.mediate(stockEvent)
      }
      return null
   }
}
