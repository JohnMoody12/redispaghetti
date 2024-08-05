//Routes for
//home
//admin - update escalation metadata if admin for product group on admin page
//make this a component for "edit" on every escalation page taht only shows up if admin?
//analytics - filter by product group
//-ttr. average estimated effort. # per product group. avg comments.
//escalations - filter by product group

//endpoints are:
// / - buttons for escalations or analytics
// /escalations - should return lsit of product groups - click on the one you want
// /escalations/productGroup - should return lists of escalations with product group
// /escalations/productGroup/escalationId - should return an escalation. body & comments.

// /login - login then direct to /
// /analytics - select a product group and then multiple analytics display
// /admin - maybe?




//escalation looks like:
//title, body, product group, product, open date, close date, id?
//comments, imgs links?, cust name, ae name, responder name

//comments look like:
//data, post date, imgs links?

//users look like:
//name, product groups, admin?, id?, password hash

//stretch goals
//each user has access to only certain product groups
//filtering is done with a check on product group array and only returns what they
//have acces to
//pictures on posts and comments.
