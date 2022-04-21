export class ModuleMessage {
   private source: string
   private target: string
   private messageType: string
   private payload: Object

   constructor(source: string, target: string, messageType: string, payload: Object) {
      this.source = source
      this.target = target
      this.messageType = messageType
      this.payload = payload
   }
   /**getters and setters */

   get getTarget(): string {
      return this.target
   }
   get getSource(): string {
      return this.source
   }

   get getMessageType(): string {
      return this.messageType
   }
   get getPayload(): Object {
      return this.payload
   }
}
