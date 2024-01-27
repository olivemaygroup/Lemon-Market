



<!--

 ROUTES:


---------------------------------------------------------------------------------------------------------------------
GET propertyCards:

Client: '/'  
        >>>> At landing and search
        >>>> Royal mail API to drop down addresses
        >>>> on click, message sent to router

Router: '/checkAddress'    
        >>>> Controller: check if exists  
        >>>> YES: return full property object
        >>>> NO: Client renders placeholder propertyCard

---------------------------------------------------------------------------------------------------------------------

POST SIGNUP:

Client: '/signup'
        >>>> user navs to signup page 

Router: '/signup' 
        >>>> response - session token in cookie

---------------------------------------------------------------------------------------------------------------------

POST ADD PROFILE:

Client: '/addprofile'
        >>>> user navs to profile form

Router: '/addprofile
        >>>> Requires AuthMiddleware

---------------------------------------------------------------------------------------------------------------------

GET PROFILE:

Client: '/myprofile'
        >>>> user navs to their profile page

Router: '/myprofile
        >>>> object contianing user info
        >>>> requires Auth middleware
---------------------------------------------------------------------------------------------------------------------

POST LOGIN:

Client: '/login'
        >>>> user navs to login page

Router: '/login
        >>>> response - session token in cookie

---------------------------------------------------------------------------------------------------------------------

POST ADD A FAVORITE:

client: '/' or '/propertydetail'
        >>>> Either at the home page or at the property detail page, user will be able to save a property


router: '/addFavorite'
        >>>> Return added success
        >>>> requires Auth middleware

---------------------------------------------------------------------------------------------------------------------

GET FAVORITE PROPERTY:

client: '/'
        >>>> When user logs in, previously saved properties will render below the search bar


router: '/getFavorites'
        >>>> Return saved property object
        >>>> requires Auth middleware




---------------------------------------------------------------------------------------------------------------------

PUT EDIT PROFILE:

Client: '/myprofile'
        >>>> user edits profile

Router: '/editprofile/:id
        >>>> Requires AuthMiddleware


---------------------------------------------------------------------------------------------------------------------

GET PROPERTY DETAIL:

Client: '/propertydetail'
        >>>> client clicks on property card to nav to the property detail

Router: '/propertydetail
        >>>> response - object containing the details/reviews/pics

---------------------------------------------------------------------------------------------------------------------

POST ADD REVIEW:

Client: '/addreview
        >>>> user nav to the review form

Router: '/addreview
        >>>> add success
        >>>> Requires AuthMiddleware

---------------------------------------------------------------------------------------------------------------------

GET MY REVIEWS:

Client: '/myreviews'
        >>>> user navs to the myreviews page

Router: '/myreviews
        >>>> response - object of all the reviews made by the current user
        >>>> Requires AuthMiddleware

---------------------------------------------------------------------------------------------------------------------

PUT EDIT REVIEW:

Client: '/myreviews'
        >>>> user edits review

Router: '/editreview/:id
        >>>> response success
        >>>> Requires AuthMiddleware
        









 -->