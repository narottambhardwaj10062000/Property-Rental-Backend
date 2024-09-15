import PropertyModel from "../../model/property.model.js";

//------- list all properties -------
const listProperties = async (req, res) => {
  try {
    const { price, city, availableFrom, propertyType } = req.query;

    const query = {};

    if (price) {
      // Assuming price is in a range (price=500-1000)
      const [minPrice, maxPrice] = price.split("-");
      query.price = { $gte: minPrice, $lte: maxPrice };
    }

    if (city) {
      query.city = city;
    }

    if (availableFrom) {
      query.availableFrom = { $gte: new Date(availableFrom) };
    }

    if (propertyType) {
      query.propertyType = propertyType;
    }

    query.status = "available";

    const properties = await PropertyModel.find(query);
    if (!properties) {
      return res.status(400).json({ msg: "No properties found" });
    }

    return res.status(200).json({ msg: "List of properties", properties });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
};

export { listProperties };
