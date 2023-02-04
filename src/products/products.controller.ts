import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body } from "@nestjs/common/decorators/http/route-params.decorator";
import { ProductsService } from "./products.service";
import { Get,Param, Patch,Delete } from "@nestjs/common";

@Controller('products')
export class ProductsController{

    constructor(private readonly productService: ProductsService){}

    @Post()
    async addProduct
    ( @Body('title') prodTitle:string,
      @Body('description') prodDesc:string,
      @Body('price') prodPrice:number 
    )
    {
        const generatedId= await this.productService.insertProduct(
            prodTitle,
            prodDesc,
            prodPrice
        );
        
        return {id:generatedId};
    }

    @Get()
    async getAllProducts()
    {
        const products=await this.productService.getProducts();
        return products;
    }

    @Get(':id')
    getProduct(@Param('id') prodId:string)
    {
        return this.productService.getSingleProduct(prodId);
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') prodId:string,
        @Body('title') prodTitle:string,
        @Body('description') prodDesc:string,
        @Body('price') prodPrice:number    
    )
    {
        await this.productService.updateProduct(prodId,prodTitle,prodDesc,prodPrice);
        return "product updated";
    }

    @Delete(':id')
    async deleteProduct(@Param('id') prodId:string)
    {
        await this.productService.deleteProduct(prodId);
        return "product deleted";
    }



}