
module.exports = {
    gettable: function (req, res, next) {
        res.render("admin/tables-data", {
            path: "/admin"
        });
    }
}