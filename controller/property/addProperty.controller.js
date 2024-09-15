import PropertyModel from "../../model/property.model.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../../utils/cloudinary.js";

//------- add property -------
const addProperty = async (req, res) => {
  try {
    const {
      name,
      bedRooms,
      bathrooms,
      length,
      width,
      city,
      price,
      status,
      availableFrom,
      propertyType,
    } = req.body;
    const image = req.file.path;

    if (
      !name ||
      !bedRooms ||
      !bathrooms ||
      !length ||
      !width ||
      !city ||
      !price ||
      !status ||
      !availableFrom ||
      !propertyType ||
      !image
    ) {
      return res.status(400).json({ msg: "Please provide all fields" });
    }

    const response = await uploadOnCloudinary(image);

    const property = await PropertyModel.create({
      ...req.body,
      image: { public_id: response.public_id, link: response.url },
    });

    if (!property) {
      return res.status(400).json({ msg: "Failed to create property" });
    }

    return res
      .status(200)
      .json({ msg: "Property created successfully", property });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
};

export { addProperty };
