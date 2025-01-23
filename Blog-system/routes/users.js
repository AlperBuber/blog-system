
const express = require("express");
const router  = express.Router();
const db = require("../data/db");

router.post("/blogs/:id/comments", function (req, res) {
    const blogId = req.params.id;
    const comment = req.body.comment;

    if (!comment) {
        return res.status(400).send("Yorum boş olamaz.");
    }

    
    db.execute("INSERT INTO comments (blogs_id, content, users_id) VALUES (?, ?, 1)", [blogId, comment])
        .then(() => {
            
            res.redirect(`/blogs/${blogId}`);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Yorum eklenirken bir hata oluştu.");
        });
});


router.get("/blogs/:id", function (req, res) {
    const blogId = req.params.id;

    
    const blogQuery = "SELECT * FROM blogs WHERE id = ?";
    const commentsQuery = "SELECT * FROM comments WHERE blogs_id = ?";

    Promise.all([
        db.execute(blogQuery, [blogId]),
        db.execute(commentsQuery, [blogId]),
    ])
        .then(([blogResult, commentsResult]) => {
            if (blogResult[0].length > 0) {
                const blog = blogResult[0][0]; 
                const comments = commentsResult[0];
                res.render("blog-details", { blog, comments }); 
            } else {
                res.status(404).send("Blog bulunamadı.");
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Sunucu hatası.");
        });
});


router.use("/blogs", function (req, res){
    db.execute("select * from blogs")
        .then(result =>{
            console.log(result[0]);
            res.render("blogs",{blog:result[0]})
        })
        .catch()

    
})

router.get("/blog", function (req, res) {
    res.render("blog");
});

router.use("/register", function (req, res) {
    
    res.render("register");
});

// Ana sayfa route'u
router.use("/", function (req, res) {
    res.render("anasayfa");
});





module.exports = router;