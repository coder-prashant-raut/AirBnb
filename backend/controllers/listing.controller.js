import uploadOnCloudinary from "../config/cloudinary.js";
import Listing from "../model/listing.model.js";
import User from "../model/user.model.js";

export const addListing = async (req, res) => {
  try {
    const host = req.userId;
    const { title, description, rent, city, landmark } = req.body;
    const image1 = await uploadOnCloudinary(res.files.image1[0].path);

    const image2 = await uploadOnCloudinary(res.files.image1[0].path);

    const image3 = await uploadOnCloudinary(res.files.image1[0].path);

    const listing = await Listing.create({
      title,
      description,
      rent,
      city,
      landmark,
      category,
      image1,
      image2,
      image3,
      host
    });

    const user = await User.findByIdAndUpdate(host,{$push:{listing:listing._id}},
        {new:true}  
    )

    if (!user) {
    res.status(404).json({message:"user not found"})    
    }
    res.status(201).json(listing)
    
      
  } catch (error) {
    res.status(500).json({message:`AddListing Eroor ${error}`})
  }
};
