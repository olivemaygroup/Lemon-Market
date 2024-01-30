**User Account Routes**
POST /signup
Input: Request body with user registration data (firstName, lastName, email, password).
Output: New user account created and logged in, or an error message.

POST /login
Input: Request body with user login credentials (email, password).
Output: User logged in with a JWT token or an error message.

GET /myprofile
Input: Authenticated user token in headers.
Output: User profile information for the authenticated user or an error message if not authenticated.

PUT /editprofile/:id
Input: Authenticated user token in headers and request body with updated user profile data.
Output: Updated user profile information or an error message.

DELETE /deleteaccount
Input: Authenticated user token in headers.
Output: User account deleted or an error message.


**User Review Routes**
POST /addreview/:property_id
Input: Authenticated user token in headers and request body with review data.
Output: New review added or an error message.

GET /myreviews
Input: Authenticated user token in headers.
Output: List of user's reviews or an error message.

PUT /editreview/:review_id
Input: Authenticated user token in headers and request body with updated review data.
Output: Updated review or an error message.

DELETE /deletereview/:review_id
Input: Authenticated user token in headers and review_id as a parameter.
Output: Review deleted or an error message.

Search Results Routes
GET /getsearchresults
Input: Authenticated user token in headers.
Output: Search results or an error message.

GET /addsearchresults
Input: Authenticated user token in headers.
Output: Search results added or an error message.


**User Favorites Routes**
GET /getfavourite
Input: Authenticated user token in headers.
Output: List of user's favorite properties or an error message.


POST /addfavourite/:property_id
Input: Authenticated user token in headers and property_id as a parameter.
Output: Property added to favorites or an error message.

DELETE /deletefavourite/:property_id/:favourite_id
Input: Authenticated user token in headers, property_id, and favourite_id as parameters.
Output: Property removed from favorites or an error message.


Property Get Commands Routes
POST /checkaddress
Input: Authenticated user token in headers and request body with property address data.
Output: Property information or an error message.