export const addProduct = (req, res) => {
    const { name, price } = req.body;
  
    const product = {
      name,
      price,
      
    };
  
    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  };