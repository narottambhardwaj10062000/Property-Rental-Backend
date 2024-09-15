import PropertyModel from "../../model/property.model.js";

//------- delete property -------
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await PropertyModel.findByIdAndDelete({ _id: id });

    if (!property) {
      return res.status(400).json({ msg: "Property not found" });
    }

    const response = await deleteFromCloudinary(property.image.public_id);

    if (response.result == "ok") {
      return res.status(200).json({ msg: "deleted successfully" });
    }
    return res.status(400).json({ msg: "failed to delete try agian later" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
};

export { deleteProperty };
