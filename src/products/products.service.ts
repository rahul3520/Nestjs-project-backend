import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { Product } from "./product.model";
import { NotFoundException } from "@nestjs/common/exceptions";
import { timeStamp } from "console";

import { InjectModel } from "@nestjs/mongoose/dist/common";
import { Model } from 'mongoose';
import { title } from "process";

@Injectable()
export class ProductsService
{
    // private products:Product[]=[];

    constructor(@InjectModel('Product') private readonly productModel:Model<Product>){}

    async insertProduct(title:string,desc:string,price:number)
    {
        // const prodId=Math.random().toString();

        const newProduct=new this.productModel({
            title,
            description:desc,
            price
        });
        
        // this.products.push(newProduct);

        const result = await newProduct.save();
        console.log(result);
        return result.id as string;
    }

    async getProducts()
    {
        const products=await this.productModel.find().exec();
        return products.map((prod) => ({id:prod.id,title:prod.title,description:prod.description,price:prod.price}));
    }

    async getSingleProduct(productId:string)
    {
        const product=await this.findProduct(productId);

        return {
            id:product.id,
            title:product.title,
            description:product.description,
            price:product.price
        };
    }

    async updateProduct(productId:string,title:string,description:string,price:number)
    {
        const updatedProduct=await this.findProduct(productId);

        // const updatedProduct={...product};

        if(title)
        {
            updatedProduct.title=title;
        }
        if(description)
        {
            updatedProduct.description=description;
        }
        if(price)
        {
            updatedProduct.price=price;
        }

        // this.products[index]=updatedProduct;

        updatedProduct.save();

    }

    async deleteProduct(prodId:string)
    {
        // const index=this.findProduct(prodId)[1];

        // this.products.splice(index,1);

        const result=await this.productModel.deleteOne({_id:prodId}).exec();
        console.log(result);

        // let n:any;

        if(result.deletedCount === 0)
        {
            throw new NotFoundException('Could Not find product');
        }
    }

    private async findProduct(id:string):Promise<Product>
    {
        // const productIndex=this.products.findIndex(prod => prod.id === productId)
        // const product=this.products[productIndex];

        let product;

        try
        {
            product=await this.productModel.findById(id);
        }
        catch(error)
        {
            throw new NotFoundException('Could not find product');

        }
        if(!product)
        {
            throw new NotFoundException('Could not find product');
        }

        // return {
        //     id:product.id,
        //     title:product.title,
        //     description:product.description,
        //     price:product.price
        // };

        return product;

    }
}