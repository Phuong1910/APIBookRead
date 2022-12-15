    const Product = require('../models/productModel')
    const { getPostData } = require('../utils')

    async  function getProducts(req, res) {
        try {
            const products = await Product.findAll()
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(products))
        } catch (error) {
            console.log(error)
        }

    }

    async  function getProductById(req, res, id) {
        try {
            const product = await Product.findById(id)

            if (!product)
            {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({message: 'Product Not Found'}))
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(product))
            }
        } catch (error) {
            console.log(error)
        }

    }

    async  function getProductByTitle(req, res, title) {
        try {
            const product = await Product.findByTitle(title)

            if (!product)
            {
                res.writeHead(401, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({message: 'Product Not Found'}))
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(product))
            }
        } catch (error) {
            console.log(error)
        }

    }

    async  function getProductByNhanVat(req, res, descriptionNhanVat) {
        try {
            const product = await Product.findByNhanVat(descriptionNhanVat)

            if (!product)
            {
                res.writeHead(401, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({message: 'Product Not Found'}))
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(product))
            }
        } catch (error) {
            console.log(error)
        }

    }

    async  function getProductByAuthor(req, res, author) {
        try {
            const product = await Product.findByAuthor(author)

            if (!product)
            {
                res.writeHead(401, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({message: 'Product Not Found'}))
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(product))
            }
        } catch (error) {
            console.log(error)
        }

    }

    async  function createProduct(req, res) {
        try {
            const body = await getPostData(req)
            let { title, author , description, descriptionNhanVat, descriptionCauNoi, img } = JSON.parse(body)
            const product = {
                title,
                author,
                description,
                descriptionNhanVat,
                descriptionCauNoi,
                img
            }
            const newProduct = await Product.create(product)
            res.writeHead(201, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify(newProduct))
        } catch (error) {
            console.log(error)
        }

    }

    async  function updateProduct(req, res, id) {
        try {
            const product = await Product.findById(id)
            if (!product) {
                res.writeHead(402, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({message: 'Product Not Found'}))
            } else {
                const body = await getPostData(req)
            const { title, author,  description, descriptionNhanVat, descriptionCauNoi, img } = JSON.parse(body)
            const productData = {
                title: title || product.title,
                author: author || product.author,
                description: description || product.description,
                descriptionNhanVat: descriptionNhanVat || product.descriptionNhanVat,
                descriptionCauNoi: descriptionCauNoi || product.descriptionCauNoi,
                img: img || product.img
            }
            const updProduct = await Product.update(id, productData)
            res.writeHead(201, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify(updProduct))
            }
        } catch (error) {
            console.log(error)
        }

    }

    async  function deleteProduct(req, res, id) {
        try {
            const product = await Product.findById(id)

            if (!product)
            {
                res.writeHead(403, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({message: 'Product Not Found'}))
            } else {
                await Product.remove(id)
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: `Product ${id} removed`}))
            }   
        } catch (error) {
            console.log(error)
        }

    }

    module.exports = {
        getProducts,
        getProductById,
        getProductByTitle,
        getProductByNhanVat,
        getProductByAuthor,
        createProduct,
        updateProduct,
        deleteProduct
    }