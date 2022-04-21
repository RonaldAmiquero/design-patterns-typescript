import { AbstractModule } from '../AbstractModule'
import { ModuleMessage } from '../ModuleMessage'

export class PurchaseModule extends AbstractModule {
   static readonly MODULE_NAME: string = 'purchaseModule'
   static readonly OPERATION_PURCHASE_REQUEST: string = 'purchaseRequest'

   getModuleName(): string {
      return PurchaseModule.MODULE_NAME
   }
   public notifyMessage(message: ModuleMessage): Object | null {
      switch (message.getMessageType) {
         case PurchaseModule.OPERATION_PURCHASE_REQUEST:
            return this.purchaseRequest(message)
         default:
            throw new Error(`Operation not supported: ${message.getMessageType}`)
      }
   }
   purchaseRequest(message: ModuleMessage): Object | null {
      //comprueba si el stock de los productos esta debajo del stock limit
      return null
   }
}
