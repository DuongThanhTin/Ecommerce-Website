//Nếu chưa Login thì trở về trang đăng nhập
module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    next();
}