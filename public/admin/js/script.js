// Lấy tất cả các phần tử có thuộc tính "button-status"
const buttonStatus = document.querySelectorAll("[button-status]");

if (buttonStatus.length > 0) {
    // Tạo đối tượng URL từ URL hiện tại
    let currentUrl = new URL(window.location.href);

    // Thêm sự kiện click cho mỗi nút
    buttonStatus.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault(); // Ngăn hành vi mặc định của nút submit
            const status = button.getAttribute("button-status"); // Lấy giá trị của button-status
           

            // Thêm hoặc xóa tham số "status" trong URL
            if (status) {
                currentUrl.searchParams.set("status", status); // Thêm hoặc cập nhật tham số "status"
            } else {
                currentUrl.searchParams.delete("status"); // Xóa tham số "status" nếu không có giá trị
            }

          

            // Điều hướng tới URL mới
            window.location.href = currentUrl.href;
        });
    });
}

//formsearch
const formsearch=document.querySelector('#form-search');
if (formsearch){
    let url=new URL(window.location.href);
    formsearch.addEventListener("submit",(e)=>{
        e.preventDefault();
        const keyword=e.target.elements.keyword.value;
        if (keyword){
            url.searchParams.set("keyword",keyword);
        }else
        {
            url.searchParams.delete("keyword");
        }
        window.location.href=url.href;
    });
}
//endformsearch