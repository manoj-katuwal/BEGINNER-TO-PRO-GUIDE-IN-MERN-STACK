 export const healthCheck = (req, res) => {
   res.status(200).json({
        success : true,
        message: "Server is running",
        data: {
            status: "UP",
            environment: process.env.NODE_ENV || "development",
            version: "1.0.0", 
            timestamp : new Date().toISOString()
         }
  
   })
}