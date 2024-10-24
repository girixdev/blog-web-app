const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));

let posts = []; // Array to hold blog posts

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Route to display the homepage
app.get('/', (req, res) => {
    res.render('index', { posts: posts });
});

// Route to display the form for creating a new post
app.get('/new', (req, res) => {
    res.render('new'); // Render the new post form
});

// Route to handle creating a new post
app.post('/create', (req, res) => {
    const newPost = {
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost); // Add the new post to the posts array
    res.redirect('/'); // Redirect to the homepage
});

// Route to display the form for editing a post
app.get('/edit/:id', (req, res) => {
    const postId = req.params.id;
    const post = posts[postId]; // Get the post by its ID (index)
    res.render('edit', { post: post, id: postId }); // Render the edit form with the post data
});

// Route to handle updating a post
app.post('/update/:id', (req, res) => {
    const postId = req.params.id;
    const updatedPost = {
        title: req.body.title,
        content: req.body.content
    };
    posts[postId] = updatedPost; // Update the post in the posts array
    res.redirect('/'); // Redirect to the homepage
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
