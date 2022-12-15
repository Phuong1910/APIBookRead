const http = require ('http')
const { getProducts, getProductById, getProductByTitle, getProductByAuthor, getProductByNhanVat, createProduct, updateProduct, deleteProduct } = require('./controllers/productController')

const server = http.createServer((req,res) => {
    if (req.url === '/api/products' && req.method === 'GET'){
          getProducts(req, res)
   } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET' ){
          const id = req.url.split('/')[3]
          getProductById(req,res,id)
   } else if (req.url.match(/\/api\/products\/title\/([a-zA-Z]+)/) && req.method === 'GET' ){
          const title = decodeURI(req.url.split('/')[4]).toLowerCase()
          getProductByTitle(req,res,title)
   } else if (req.url.match(/\/api\/products\/author\/([a-zA-Z ]+)/) && req.method === 'GET' ){
          const author = decodeURI(req.url.split('/')[4]).toLowerCase()
          getProductByAuthor(req,res,author)
   } else if (req.url.match(/\/api\/products\/character\/([a-zA-Z ]+)/) && req.method === 'GET' ){
          const descriptionNhanVat = decodeURI(req.url.split('/')[4]).toLowerCase()
          getProductByNhanVat(req,res,descriptionNhanVat)
   } else if (req.url === '/api/products/add' && req.method === 'POST' ){
          createProduct(req,res)
   } else if (req.url.match(/\/api\/products\/([a-z0-9]+)/) && req.method === 'PUT' ){
        const id = req.url.split('/')[3]
        updateProduct(req,res,id)
   } else if (req.url.match(/\/api\/products\/([a-z0-9]+)/) && req.method === 'DELETE' ){
        const id = req.url.split('/')[3]
        deleteProduct(req,res,id)
   } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({message: 'Product Not Found'}))
   }
})

const PORT =  process.env.PORT || 5000

server.listen(PORT,() => console.log(`Server running on port ${PORT}`))