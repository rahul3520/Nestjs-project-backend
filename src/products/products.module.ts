import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

import { MongooseModule } from "@nestjs/mongoose/dist";
import { ProductSchema } from "./product.model";

@Module(
    {
        imports:[MongooseModule.forFeature([{name:'Product',schema:ProductSchema}])],
        controllers:[ProductsController],
        providers:[ProductsService]
    }
)

export class ProductsModule
{

}