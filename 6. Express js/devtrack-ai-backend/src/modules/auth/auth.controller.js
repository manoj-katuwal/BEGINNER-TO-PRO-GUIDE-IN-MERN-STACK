import asyncHandler from "../../shared/utils/asyncHandler.js";
import * as authService from "./auth.service.js";

export const register = asyncHandler(async (req, res) => {
 

  const user = await authService.register(req.body);

  res.status(201).json({
    success: true,
    message: "User registerd successfully",
    data: user,
  });
});


export const login = asyncHandler(async(req, res)=> {
  const result = await authService.loginUser(req.body);

  res.status(200).json({
    success : true , 
    message : "User Login Successfull",
    data : result

  })



})
