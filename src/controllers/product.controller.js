import pool from '../database/database.js';


export const getProducts = async(req, res)=>{
    try {
        const allProducts = await pool.query('select * from products');
        res.status(200).json({
            allProducts : allProducts
        });
    } catch (error) {
        res.status(500).json(error.message)
    }
}
export const getProductById = async(req, res)=>{
    const {id} = req.params;
    try {
        const getById = await pool.query('select * from products where id = ?', [id]);
        if(getById.length==0) throw new Error('el producto no existe');
        res.status(200).json({
            product: getById[0]
        });
    } catch (error) {
        res.status(500).json(error.message);
    }

}
export const createProduct = async(req, res)=>{
    try {
        const {name, category, price, imgUrl} = req.body;

        const save_product = await pool.query('insert into products set ?', [{name, category, price, imgUrl}]);

        res.status(201).json({
            producto_guardado: save_product
        });
    } catch (error) {
        res.json(error.message);
    }
}
export const updateProductById = async(req, res)=>{
    try {
        const {id} = req.params;
        
        //const {name, category, price, imgUrl} = req.body;
        //const result = await pool.query('update products set ? where id =?', [{name,category, price, imgUrl}, id]);
        const result = await pool.query('update products set ? where id =?', [req.body, id]);
        res.status(200).json({
            product: 'se actualizaron productos',
            result
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
}
export const deleteProductById = async(req, res)=>{
    try {
        const {id} = req.params;
        
        const results = await pool.query('delete from products where id = ?',[id]);

        res.status(200).json({
            product: 'producto eliminado',
            results: results
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
}