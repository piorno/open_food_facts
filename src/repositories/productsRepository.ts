
import { Products } from '../models/products';

export default class ProductsRepository {
    async  getAllProducts() {
        const products = await Products.find();
        return  products   
    }

    async  getProducts(paginate: number) {
        const products = await Products.find().limit(20).skip(paginate);
        return  products   
    }
    
    async  getProductsByCode(code: string) {
        const products = await Products.findOne({code: code});
        return  products   
    }
    
    async  deleteProducts(code: string) {
        const products = await Products.findOneAndUpdate({code: code}, {$set: {status: 'trash'}});
        
        return  products   
    }

    async scheduledProducts(product: any) {
        const products = await Products.findOne({code: product.code})        
        products ? await Products.updateOne({_id: products._id}, {$set: product} ) : await Products.create(product)
        
    } 

    async updateProduct(code: string, product: any) {
        console.log("products");
        const products = await Products.findOneAndUpdate({code: code}, {$set: product});
        console.log(products);
        
        return  products 
    }
}