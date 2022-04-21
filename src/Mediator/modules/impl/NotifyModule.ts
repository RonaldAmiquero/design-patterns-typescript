import { AbstractModule } from '../AbstractModule'
import { SaleOrder } from '../dto/SaleOrder.dto'
import { ModuleMessage } from '../ModuleMessage'

export class NotifyModule extends AbstractModule {
   static readonly MODULE_NAME: string = 'notifyModule'
   static readonly OPERATION_NOTIFY: string = 'notify'
   getModuleName(): string {
      return NotifyModule.MODULE_NAME
   }
   public notifyMessage(message: ModuleMessage): Object | null {
      switch (message.getMessageType) {
         case NotifyModule.OPERATION_NOTIFY:
            return this.notifyEmail(message)

         default:
            throw new Error(`Operation not supported ${message.getMessageType}`)
      }
   }
   notifyEmail(message: ModuleMessage): Object | null {
      let saleOrder = <SaleOrder>message.getPayload
      console.log(
         'Le notificamos atraves de este correo que su orden de compra fue completado exitosamente \nID de su orden de compra: ',
         saleOrder.getId
      )
      return null
   }
}
