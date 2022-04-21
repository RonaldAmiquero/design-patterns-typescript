import { AbstractModule } from '../AbstractModule'
import { Sale } from '../dto/Sale.dto'
import { SaleOrder } from '../dto/SaleOrder.dto'
import { ModuleMessage } from '../ModuleMessage'
import { CRMModule } from './CRMModule'
import { NotifyModule } from './NotifyModule'

export class ECommerceModule extends AbstractModule {
   static readonly MODULE_NAME: string = 'Ecommerce'
   static readonly OPERATION_COMPLETE_ORDER: string = 'CompleteOrder'

   getModuleName(): string {
      return ECommerceModule.MODULE_NAME
   }
   public notifyMessage(message: ModuleMessage): Object | null {
      switch (message.getMessageType) {
         case ECommerceModule.OPERATION_COMPLETE_ORDER:
            return this.completeOrder(message)
         default:
            throw new Error(`Operation not supported ${message.getMessageType}`)
      }
   }
   completeOrder(message: ModuleMessage): Object | null {
      let saleOrder = <SaleOrder>message.getPayload
      console.log('Order completed successfully > ' + saleOrder.getId)

      let crmMessage = new ModuleMessage(
         ECommerceModule.MODULE_NAME,
         NotifyModule.MODULE_NAME,
         NotifyModule.OPERATION_NOTIFY,
         saleOrder
      )
      this.mediator.mediate(crmMessage)
      return null
   }
   public crearSale(sale: Sale): Object | null {
      let crmMessage: ModuleMessage = new ModuleMessage(
         ECommerceModule.MODULE_NAME,
         CRMModule.MODULE_NAME,
         CRMModule.OPERATION_CREATE_ORDER,
         sale
      )
      return this.mediator.mediate(crmMessage)
   }
}
