# Week 1 reflection
1. What is the difference between building a UI imperatively (plain DOM code) and
declaratively (React)?
=building imperatively is like manually building the code step by step while declaratively use components based approach to automatically handle the UI building.
2. Why must a component name start with a capital letter?
=to diffrentiate between the existing component in the coding environment with the custom component that user create.
3. What does a fragment <>...</> do, and why not just use a <div>?
=<> is to start a section like header or maybe a size writing using <h> and the </> is to close the section. <div> is to group several components.
4. Name one benefit of splitting the UI into small components.
=easier to manage each section of the code.

# Week 6 reflection
1. Explain, step by step, what happens from the moment you click Place order until the new order appears on your Orders page. Name the functions in your own code that run, and say why you never call setOrders yourself.
=When I click Place Order, handlePlaceOrder() sends the order to Firestore through placeOrders(). After that, my cart is cleared and I go to the Orders page. The page uses onSnapshot() to listen for new orders and updates automatically. That's why I don't need to update setOrders() manually.
2. Why is orders a top-level collection, and why does each order copy vendorName and each item’s name and price instead of storing only IDs?
=I keep orders in a separate collection so they're easier to manage and find. Each order also saves the vendor name, item names and prices instead of just their IDs. This makes it easier to see what the customer ordered without having to look up the menu again. Even if the vendor changes the menu or updates the prices, the original order details will still be saved. This way, I can easily check past orders whenever I need to.
3. Your personal feature: which Firestore path and fields hold its data, and which line of your code reads it? Paste that line.
=My Favourite Items are stored in favourites/{uid} in Firestore. The document contains an items array with each item's itemId and vendorId. I use onSnapshot() to listen for changes in real time. The data is read in src/services/favourites.js, line 20-22:

    snapshot.exists() ? snapshot.data().items ?? [] : []

This allows my favourites to stay updated even after refreshing or logging in from another browser.
