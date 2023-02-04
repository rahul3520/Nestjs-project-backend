import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';



@Module({
  imports: [ProductsModule,MongooseModule.forRoot('mongodb+srv://Rahul:5kKQxaeNr0oooXV1@cluster0.fjkks6r.mongodb.net/Ecommerce?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
