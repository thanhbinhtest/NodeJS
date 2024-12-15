const Product = require("../../models/products.models");

module.exports.index = async (req, res) => {
    try {
        // Bộ lọc trạng thái
        let filterStatus = [
            {
                name: "Tất cả",
                status: "",
                class: ""
            },
            {
                name: "Hoạt động",
                status: "active",
                class: ""
            },
            {
                name: "Dừng hoạt động",
                status: "inactive",
                class: ""
            }
        ];
        if (req.query.status)
        {
            const index =filterStatus.findIndex(item => item.status==req.query.status);
            filterStatus[index].class="active";
           
        }
        else
        {
            const index =filterStatus.findIndex(item => item.status=="");
            filterStatus[index].class="active";
        }
        // Điều kiện tìm kiếm
        let find = { deleted: false };
        if (req.query.status ) {
            find.status = req.query.status;
        }
      
        // Lấy danh sách sản phẩm từ cơ sở dữ liệu
        const products = await Product.find(find);

        // Gửi dữ liệu vào view
        res.render("admin/pages/products/index", {
            pageTitle: "Danh sách sản phẩm",
            products: products, // Truyền danh sách sản phẩm vào view
            filterStatus: filterStatus // Đồng bộ tên biến
        });
    } catch (error) {
        console.error("Lỗi khi truy vấn sản phẩm:", error.message);
        res.status(500).render("admin/pages/error", {
            message: "Không thể tải danh sách sản phẩm. Vui lòng thử lại sau."
        });
    }
};
