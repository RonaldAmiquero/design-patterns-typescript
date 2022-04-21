import { Product } from './modules/dto/Product.dto'
import { Sale } from './modules/dto/Sale.dto'
import { CRMModule } from './modules/impl/CRMModule'
import { ECommerceModule } from './modules/impl/ECommerceModule'
import { NotifyModule } from './modules/impl/NotifyModule'
import { PurchaseModule } from './modules/impl/PurchaseModule'
import { StockModule } from './modules/impl/StockModule'

new CRMModule().activate()
new NotifyModule().activate()
new StockModule().activate()
new PurchaseModule().activate()

let client = new ECommerceModule()

client.activate()

let sale = new Sale()

for (let i = 0; i < 5; i++) {
   sale.addProduct(new Product(`nameProduct  ${i + 1}`))
}

client.crearSale(sale)
