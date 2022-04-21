import { AbstractModule } from './AbstractModule'
import { ModuleMessage } from './ModuleMessage'

export class ModuleMediator {
   private modules = new Map<string, AbstractModule>()
   private static mediator: ModuleMediator

   public static getInstance() {
      if (!ModuleMediator.mediator) {
         return (ModuleMediator.mediator = new ModuleMediator())
      }
      return ModuleMediator.mediator
   }
   registerModule(module: AbstractModule): void {
      this.modules.set(module.getModuleName(), module)
   }

   mediate(moduleMessage: ModuleMessage): Object | null {
      if (!this.modules.has(moduleMessage.getTarget)) {
         throw new Error(`El Module no esta registrado`)
      }
      const targetModule = this.modules.get(moduleMessage.getTarget)
      if (!targetModule) {
         throw new Error(`Ocurrio un error en hasMap`)
      }
      console.log(
         "Mediate source > '" +
            moduleMessage.getSource +
            "', target > '" +
            moduleMessage.getTarget +
            "', messagetType > '" +
            moduleMessage.getMessageType +
            "'"
      )
      return targetModule.notifyMessage(moduleMessage)
   }
}
