const messages = require("dote/src/messages");
const db = require("../data/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



exports.register = (req, res) => {
    console.log(req.body);

    const { name, email, password, passwordConfirm, role } = req.body;
    
    const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

    
    db.query(query, [name, email, password, role], (err, result) => {
        if (err) {
            console.error("Error inserting data: ", err);
            return res.status(500).send("Veritabanına veri eklenirken hata oluştu.");
        }n

        console.log("Data inserted successfully: ", result);
        return res.status(201).send("Kullanıcı başarıyla kaydedildi.");
    });

    /* jwt teknolojisini de kullanarak bu işlemi denedim ancak aşağıdaki kodu bir türlü doğru çalıştıramadım
    
    
    
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
            return res.render('register', {
                message: 'Database error occurred'
            });
        }
        

        if (results.length > 0) {
            
            return res.render('register', {
                message: 'That email is taken'
            });
        } else if (password !== passwordConfirm) {
            return res.render('register', {
                message: 'The passwords did not match'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query(query, values, (err, result) => {
            
            if (err) {
                console.error("Error inserting data: ", err);
                return res.render('register', {
                    message: 'Error inserting data into the database'
                });
            }

            console.log("Data inserted successfully: ", result);
            return res.render('register', {
                message: 'User registered successfully'
            });
        });

    });*/
};