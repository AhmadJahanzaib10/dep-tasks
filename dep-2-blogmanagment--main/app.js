const express = require("express");
const app = express();
const path = require("path")
const port = 3000;
const db = require("./server/connection")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const connection = require("./server/connection");
const session = require('express-session');

app.use(session({
    secret: 'your_session_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        maxAge: 24 * 60 * 60 * 1000 
    }
}));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const SECRET_KEY = 'ahmad';

app.get('/', (req, res) => {
    res.render("index");
})
app.get('/register', (req, res) => {
    res.render("register");
})
app.get('/blogs', (req, res) => {
    const user = req.session.user;

    if (!user) {
        return res.redirect('/'); // Or handle unauthorized access
    }

    connection.query('SELECT * FROM blogs', (err, results) => {
        if (err) throw err;

        // Pass the blogs and user data to the blogs.ejs template
        res.render('blogs', {
            username: req.session.user.username,
            userid: req.session.user.id,
            email: req.session.user.email,
            blogs: results // Pass the retrieved blogs to the template
        });
    });
})

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    connection.query('SELECT * FROM Users WHERE email = ?', [email], async (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }
        console.log(username,password,email)
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Insert new user into the database
        connection.query('INSERT INTO Users (username, email, password) VALUES (?, ?, ?)', 
            [username, email, hashedPassword], 
            (err, result) => {
                if (err) throw err;
                res.status(201).json({ message: 'User registered successfully' });
            });
    });
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    connection.query('SELECT * FROM Users WHERE email = ?', [email], async (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = result[0];

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        // Setting the session of user
        req.session.user = {
            id: user.userid,
            username: user.username,
            email: user.email
        };

        req.session.save((err) => { // Force save session
            if (err) throw err;
            res.redirect('/blogs');
        });
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Failed to logout' });
        }
        res.redirect('/'); // Redirect to the login page or any other page
    });
});

app.post("/addblog",(req,res)=>{
    const {title, description} = req.body;
    if (!req.session.user || !req.session.user.id) {
        return res.status(401).json({ message: 'Unauthorized: Please log in' });
    }
    connection.query("INSERT INTO blogs (userid, title, description) VALUES (?, ?, ?)",[req.session.user.id,title, description],
        (err, result)=>{
            if (err) throw err;
                res.redirect("/blogs");
        })
})

app.get("/blog/:blogid",(req,res)=>{
    const blogId = req.params.blogid;

    const blogQuery = 'SELECT * FROM blogs WHERE id = ?';

    // SQL query to fetch all comments for the given blogid
    const commentsQuery = 'SELECT * FROM comments WHERE blogid = ?';

    const user = req.session.user;

    if (!user) {
        return res.redirect('/'); // Or handle unauthorized access
    }

    // Execute the query
    // Execute the blog query first
    connection.query(blogQuery, [blogId], (err, blogResults) => {
        if (err) {
            console.error('Error fetching blog:', err);
            return res.status(500).send('Error fetching blog');
        } else if (blogResults.length === 0) {
            return res.status(404).send('Blog not found');
        }

        const blog = blogResults[0];

        // Execute the comments query
        connection.query(commentsQuery, [blogId], (err, commentsResults) => {
            if (err) {
                console.error('Error fetching comments:', err);
                return res.status(500).send('Error fetching comments');
            }

            // Render the blog page with the blog and comments data
            res.render("blog", {
                blog: blog,
                username: user.username,
                comments: commentsResults
            });
        });
    });
})

app.post("/comment/:blogid",(req, res)=>{
    const blogid = req.params.blogid;
    const user = req.session.user;
    const {text} = req.body;
    console.log(user);
    // Check if the user is logged in
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized: Please log in' });
    }

    // Insert the comment into the comments table
    connection.query(
        'INSERT INTO comments (blogid, userid, text) VALUES (?, ?, ?)',
        [blogid, user.id, text],
        (err, result) => {
            if (err) throw err;

            // Redirect back to the blog page or send a success response
            res.redirect(`/blog/${blogid}`);
            // Alternatively, you can redirect to the specific blog page:
            // res.redirect(`/blog/${blogid}`);
        }
    );
})

  
app.listen(port,()=>{
    console.log("App Listening at " + port);
})