import { Request, Response, NextFunction } from 'express';
import ProductsRepository from '../repositories/productsRepository';

const productsRepository = new ProductsRepository();

const fs = require('fs');
const zlib = require('zlib');
const readline = require('readline');
const axios = require('axios');

export default class ProductsController {
    async getProducts(req: Request, res: Response, next: NextFunction) {
        const paginate: number = req.query?.page ? (parseInt(req.query?.page as string) - 1) : 0;
        const page = paginate * 20
        const products = await productsRepository.getProducts(paginate);
        return res.json(products);

    }

    async scheduleProducts() {
        try {
            const memoryUsage: number[]  = []
            const products = await productsRepository.getAllProducts();

            let i = 1;
            for await (const product of products) {
                // console.log(process.memoryUsage())
                console.log((i * 100) / products.length);
                
                memoryUsage.push(Math.round(process.memoryUsage().rss / 1024 / 1024 * 100) / 100);
                await axios.get('https://world.openfoodfacts.net/api/v2/product/' + product?.code).then(async (resp: any) => {
                    if (resp.data.status != 0) {
                        
                        const Product = {
                            code: resp.data.code,
                            status: 'published',
                            imported_t: new Date(),
                            url: "https://world.openfoodfacts.net/api/v2/product/" + resp.data.code,
                            creator: resp.data?.product?.creator,
                            created_t: resp.data?.product?.created_t,
                            last_modified_t: resp.data?.product?.last_modified_t,
                            product_name: resp.data?.product?.product_name,
                            quantity: resp.data?.product?.quantity,
                            brands: resp.data?.product?.brands,
                            categories: resp.data?.product?.categories,
                            labels: resp.data?.product?.labels,
                            cities: resp.data?.product?.cities,
                            purchase_places: resp.data?.product?.purchase_places,
                            stores: resp.data?.product?.stores,
                            ingredients_text: resp.data?.product?.ingredients_text,
                            traces: resp.data?.product?.traces,
                            serving_size: resp.data?.product?.serving_size,
                            serving_quantity: resp.data?.product?.serving_quantity,
                            nutriscore_score: resp.data?.product?.nutriscore_score,
                            nutriscore_grade: resp.data?.product?.nutriscore_grade,
                            main_category: resp.data?.product?.main_category,
                            image_url: resp.data?.product?.image_url,
                        }
                        await productsRepository.scheduledProducts(Product);
                    }




                }).catch(
                    function (error: any) {
                        console.log('Show error notification!')
                        // console.log(error);

                        //   return Promise.reject(error)
                    }
                );
                i++

            }

            var total = 0
            var qtd = 0
            memoryUsage.map(m => {
                total += m
                qtd++
            })

            const totalMemory = total / qtd;


            
            console.log('fim', totalMemory);
            
            return new Date()
        } catch (error: any) {
            console.log(error.message, 'aqwui');
            return new Date()
        }

    }

    async deleteProducts(req: Request, res: Response, next: NextFunction) {
        const code = req.params.code;
        const products = await productsRepository.deleteProducts(code);
        if (products) {
            return res.json("success");
        }
        else {
            return res.status(404).json('not found')
        }
    }

    async getProductsByCode(req: Request, res: Response, next: NextFunction) {
        const code = req.params.code;
        const product = await productsRepository.getProductsByCode(code);
        if (product) {
            return res.json(product);
        }
        else {
            return res.status(404).json('not found')
        }
    }

    async updateProduct(req: Request, res: Response, next: NextFunction) {
        const code = req.params.code;
        const product = req.body;
        console.log(code);
        
        const result = await productsRepository.updateProduct(code, product)
        if (result) {
            return res.json("success");
        }
        else {
            return res.status(404).json('not found')
        }
    }
}