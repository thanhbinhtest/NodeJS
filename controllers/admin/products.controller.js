const Product = require("../../models/products.models");
const filterStatusHelper=require("../../helpers/filterStatus");
const searchHelper=require("../../helpers/search");
const paginationHelper=require("../../helpers/pagination");
module.exports.index = async (req, res) => {
    try {
        // Bộ lọc trạng thái
        const filterStatus=filterStatusHelper(req.query);
        // Điều kiện tìm kiếm
        let find = { deleted: false };
        if (req.query.status ) {
            find.status = req.query.status;
        }
        //Search
        const objectSearch=searchHelper(req.query)
        if (objectSearch.regex ) {
            
            find.title = objectSearch.regex;
        }
        //Pagination
        const countProducts=await Product.countDocuments(find);
        let objectPagination=paginationHelper({ currentPage:1,
            limitItems:4},req.query,countProducts);

        const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);
        
        // Gửi dữ liệu vào view
        res.render("admin/pages/products/index", {
            pageTitle: "Danh sách sản phẩm",    
            products: products, // Truyền danh sách sản phẩm vào view
            filterStatus: filterStatus, // Đồng bộ tên biến
            keyword:objectSearch.keyword,
            pagination:objectPagination
        });
    } catch (error) {
        console.error("Lỗi khi truy vấn sản phẩm:", error.message);
        res.status(500).render("admin/pages/error", {
            message: "Không thể tải danh sách sản phẩm. Vui lòng thử lại sau."
        });
    }
};
