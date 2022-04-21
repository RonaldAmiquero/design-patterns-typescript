interface IObservable {
   addObserver(observer: IObserver): void
   removeObserver(observer: IObserver): void
   notifyAllObservers(command: string, observable: IObservable): void
}

interface IObserver {
   notifyObserver(command: string, observable: IObservable): void
}

class YoutuveChannel implements IObservable {
   private suscriptors: Suscriptor[]
   private lastVideoTitle: string

   constructor() {
      this.suscriptors = []
      this.lastVideoTitle = ''
   }

   /**setter and getter */
   getLastVideoTitle(): string {
      return this.lastVideoTitle
   }

   addObserver(observer: Suscriptor): void {
      this.suscriptors.push(observer)
   }
   removeObserver(observer: IObserver): void {}

   notifyAllObservers(command: string, observable: YoutuveChannel): void {
      for (const suscriptor of this.suscriptors) {
         suscriptor.notifyObserver(command, observable)
      }
   }

   addNewVideo(title: string) {
      this.lastVideoTitle = title
      this.notifyAllObservers('newVideo', this)
   }
}

class Suscriptor implements IObserver {
   private userName
   constructor(userName: string) {
      this.userName = userName
   }
   notifyObserver(command: string, youtuveChannel: YoutuveChannel): void {
      console.log(
         `youtuveChannel: ${this.userName} \n`,
         `${command}: `,
         youtuveChannel.getLastVideoTitle()
      )
   }
   /**getters and setters */
   getUserName(): string {
      return this.userName
   }
}

const youtuveChannelRonald = new YoutuveChannel()
const suscriptor1 = new Suscriptor('ronald')
const suscriptor2 = new Suscriptor('messi')
youtuveChannelRonald.addObserver(suscriptor1)
youtuveChannelRonald.addObserver(suscriptor2)

youtuveChannelRonald.addNewVideo('Dios es Amor')
youtuveChannelRonald.addNewVideo('Design patterns')
