<h1 align="center">
  Website E-commerce
</h1>
<p align="center" style="font-size: 1.2rem;">Website bán hàng điện tử</p>
<p align="center">
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT License" /></a>
 
</p>

## Giới thiệu

* Ngày này trong nhịp sống hối hả của con người thì việc giành thời gian để mua sắm là vô cùng quan trọng đối với mỗi người. Những lo lắng về giao thông không an toàn và hạn chế trong việc mua hàng truyền thống có thể tránh được trong khi mua sắm trực tuyến. Với mua sắm trực tuyến(online), bạn cũng không cần phải lo lắng về điều kiện thời tiết. Người tiêu dùng và các khách hàng là những tổ chức, công ty,… đang dần chuyển sang mua sắm trực tuyến nhiều hơn nhằm tiết kiệm thời gian.
* Chính vì vậy, việc tạo ra **WebPhone** có thể giúp người dùng có thể hình dung được những dịch vụ mà một trang web bán hàng online hỗ trợ cho người dùng. **WebPhone** là một website bán hàng điện tử có thể đáp ứng những chức năng cần thiết cho một website e-commerce.


## Các phân hệ chính
*	Quản lý người dùng.
*	Quản lý đặt hàng.
*	Quản lý sản phẩm.
*	Quản lý giỏ hàng.
*   Xem thông tin tài khoản.
*	Xem sản phẩm và chi tiết sản phẩm.
*	Xem thông tin chi tiết giỏ hàng.
*	Đặt hàng.
*	Báo cáo thống kê.


  
## Chức năng
* Cập nhật thông tin tài khoản.
* Thêm, xóa, sửa sản phẩm trong giỏ hàng.
* Thêm, xóa, sửa, xem thông tin người dùng.
* Thêm, xóa, sửa, xem thông tin sản phẩm.
* Cập nhật số lượng sản phẩm trong giỏ hàng.
* Xem số liệu thống kê theo khoảng thời gian cố định và tùy chọn.
* Xem biểu đồ thống kê theo khoảng thời gian cố định và tùy chọn.

## Chức năng dự kiến phát triển trong tương lai
* Tra cứu thông tin sản phẩm.
* Xem tình trạng đặt hàng của khách hàng.
* Nhập xuất dữ liệu từ file `*.json`.

## Ngôn ngữ lập trình và công nghệ
* Ngôn ngữ: HTML, CSS, JavaScript.
* Công nghệ sử dụng: Node.js.
* Database: MongoDB.

## Môi trường phát triển
* NodeJS 10.15.3
* Microsoft Visual Code 1.41.1

## Cài đặt
* Tải và cài đặt [NodeJS](https://nodejs.org/en/).
* Tải và cài đặt [Microsoft Visual Code](https://code.visualstudio.com/).

* Clone repository Project-CNW về máy thông qua dòng lệnh sau:
```bash
> git clone https://github.com/DuongThanhTin/Project-CNW
```
* Khi đã clone về máy, tạo file .env trong thư mục chứa phần mềm. Trong file .env: SECRECT_KEY = 'PMCL_CNW'

* Chạy command line trong thư mục vừa được clone về, thực thi dòng lệnh sau:
```bash
> npm install
```
* Sau khi quá trình cài đặt hoàn tất, tiếp tục thực thi dòng lệnh sau:
```bash
> node app.js
```
* Sau khi quá trình biên dịch hoàn tất, truy cập vào địa chỉ `http://localhost:3000`.

## Thư viện
* [Export from JSON](https://www.npmjs.com/package/export-from-json)
* [File Saver](https://www.npmjs.com/package/file-saver)
* [express](https://www.npmjs.com/package/express)
* [nodemon](https://www.npmjs.com/package/nodemon)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [bcryptjs](https://www.npmjs.com/package/bcryptjs)
* [cookie-parser](https://www.npmjs.com/package/cookie-parser)
* [body-parser](https://www.npmjs.com/package/body-parser)
* [flash](https://www.npmjs.com/package/flash)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [express-session](https://www.npmjs.com/package/express-session)
* [body-parser](https://www.npmjs.com/package/body-parser)
* [connect-mongodb-session](https://www.npmjs.com/package/connect-mongodb-session)

## Đội ngũ phát triển
* [Dương Thạnh Tín](https://github.com/DuongThanhTin) (MSSV: 16521241 - Lớp: PMCL2016.3)
* [Nguyễn Phương Vương](https://github.com/phuongvuong98)

## Giấy phép
* [MIT](https://github.com/DuongThanhTin/Project-CNW/blob/master/LICENSE)
