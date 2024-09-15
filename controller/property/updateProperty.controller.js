import PropertyModel from "../../model/property.model.js";

import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../../utils/cloudinary.js";

//------- update property -------
const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
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
    } = req.query;
    // req.query;

    const query = {};

    if (name) query.name = name;
    if (bedRooms) query.bedRooms = bedRooms;
    if (bathrooms) query.bathrooms = bathrooms;
    if (length) query.length = length;
    if (width) query.width = width;
    if (city) query.city = city;
    if (price) query.price = price;
    if (status) query.status = status;
    if (availableFrom) query.availableFrom = new Date(availableFrom);
    if (propertyType) query.propertyType = propertyType;

    const updatedPropertyResponse = await PropertyModel.findByIdAndUpdate(
      id,
      query,
      { new: true }
    );

    if (!updatedPropertyResponse) {
      return res.status(400).json({ msg: "Property not found" });
    }

    return res
      .status(200)
      .json({ msg: "Property updated successfully", updatedPropertyResponse });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
};

const updatePropertyImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req.file.path;

    const property = await PropertyModel.findById(id);

    if (!property) {
      return res.status(400).json({ msg: "Property not found" });
    }

    const uploadResponse = await uploadOnCloudinary(image);

    if (uploadResponse.result !== "ok") {
      return res
        .status(400)
        .json({ msg: "Failed to upload image please try again" });
    }

    const deleteResponse = await deleteFromCloudinary(property.image.public_id);
    if (deleteResponse.result !== "ok") {
      console.log("Old image not found");
    }

    return res.status(200).json({ msg: "Property image updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
};

export { updateProperty, updatePropertyImage };
