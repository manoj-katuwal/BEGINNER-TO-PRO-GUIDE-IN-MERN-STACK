export const addProduct = (req, res) => {
    const { name, price } = req.body;
  
    if (!name || price === undefined) {
      return res.status(400).json({ message: "Product name and price are required" });
    }
  
    const parsedPrice = Number(price);
    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      return res.status(400).json({ message: "Product price must be a valid non-negative number" });
    }
  
    const product = {
      name,
      price: parsedPrice,
    };
  
    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  };