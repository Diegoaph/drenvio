const { Product, User } = require("../db");

const getProducts = async () => {
    const dbProducts = await Product.find({ enStock: true });
    return dbProducts;
};

const getPrice = async (user_id, product_name) => {
    const user = await User.findById(user_id);
    //!---

    const productFound = await Product.findOne({ name: product_name });
    //!---

    console.log(`user:`, user);
    console.log(`productFound:`, productFound);

    if (user && productFound) {
        if (user.brandMember && productFound.brand) {
            if (user.brandMember.toString() === productFound.brand.toString()) {
                return { price: productFound.specialPrice };
            }
        }
        return { price: productFound.basePrice };
    } else {
        return { price: null };
    }
};

module.exports = { getProducts, getPrice };
