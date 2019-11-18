//Nếu chưa Login thì trở về trang đăng nhập
module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    else{
        if(req.session.token && req.session.role=="admin"){
            return res.redirect('/adminTin')
        }
        else{
            return res.redirect('/');
        }
    }
    next();
}