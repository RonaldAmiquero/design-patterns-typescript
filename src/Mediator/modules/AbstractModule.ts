import { ModuleMediator } from './ModuleMediator'
import { ModuleMessage } from './ModuleMessage'

export abstract class AbstractModule {
   public mediator: ModuleMediator = ModuleMediator.getInstance()
   abstract getModuleName(): string
   public activate(): void {
      this.mediator.registerModule(this)
   }

   public abstract notifyMessage(message: ModuleMessage): Object | null
}
