import ProductManager from "./ProductManager.js";
import express from "express";

const app = express();
const PORT = 4000;
const manager = new ProductManager("./src/data.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Desafío3 - Ignacio Lozano");
});

// ejemplo: http://localhost:4000/products?limit=1
app.get("/products", async (req, res) => {
    const products = await manager.getProducts();
    let { limit } = req.query;
    let data;
    if (!limit) {
        data = products;
    } else {
        data = products.slice(0, parseInt(limit));
    }
    res.send(data);
});

app.get("/products/:pid", async (req, res) => {
    const product = await manager.getProductByID(parseInt(req.params.pid));
    if(product) {
        res.send(`Juego: ${product.title} - Precio: ${product.price}`)
    }else {
        res.send(`No tenemos ese juego Reynaldo`)
    }
});

app.listen(PORT, () => {
    console.log(`Server created on localhost:${PORT}`);
});