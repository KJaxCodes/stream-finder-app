// after clicking 'add to watchlist' button, this file handles the
// api requests to the server related to the user's watchlist
// general GET route to get the user's watchlist or nothing
// POST route to add a movie to the user's watchlist
// if movie is already in the watchlist, prevent user from adding it again
// DELETE route to remove a movie from the user's watchlist 
// button to refresh movie data from external api
// protect routes with auth middleware

// step 1 : write the logic steps out in comments
// LOGIC:
// 1. Get the user's ID from the request (from the auth middleware)
// 2. Connect to the database
// 3. Find the user by ID
// 4. If user not found, return error
// 5. For GET request, return the user's watchlist
// 6. For POST request, get movie data from request body
//    a. Check if movie is already in watchlist, if so return error "Cannot add movie twice"
//    b. If not, add movie to watchlist and save user
//    c. Return success message and updated watchlist



// GET /api/watchlist



