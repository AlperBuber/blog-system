const db = require("../data/db");


exports.addBlog = (req, res) => {
    const { title, content, users_id } = req.body;

    
    if (!title || !content) {
        return res.status(400).send("Title ve Content alanları zorunludur.");
    }

    const query = "INSERT INTO blogs (title, content, users_id) VALUES (?, ?, 1)";
    db.query(query, [title, content], (err, result) => {
        if (err) {
            console.error("Veritabanına eklenirken hata oluştu: ", err);
            return res.status(500).send("Veritabanına eklenirken bir hata oluştu.");
        }

        console.log("Blog başarıyla eklendi: ", result);

        
        res.render('/')
    });
};