com0
    set up the directory, the product list/card and the mixin file to be processed in angular.json
com1
    implemented the whole desktop view.    
com2
    added the transformations for when the button "add to cart" is clicked and the styles for selected products as well the quantity counter.
com3
    improved the transformation for the border in selected desserts by using ngClass instead of ngStyle and adding a transition.
    Also added a simple opacity animation to the button transformation from "add to cart" to the version with increment/decrement.
com4
    Finished the cart component, working on the cart service and their comunication. Added an EventManager as replacement for angular rxjs for now. 
com5
    Working on moving all cart_service communication from children components to the product list component in order to simplify communication and avoid mess.
    the cart and card emits custom events to the list. Then, the list proceeds with the cart_service. 
com6
    Implemented the confirmatation modal.
com7
   added _redirects to redirect requests in netlify.
com8
    Working on the mobile version. Implemented the product list for devices up to 390px.
com9    
    fixed the images to be responsive for screens smaller the 390px and ajusted the cart component as well. 
com10
    Learned how to use scss variables with angular and finished responsiveness for mobile, tablet, laptop and bigger monitors.
com11
    implemented the mobile animation of the confirmation modal slide in from the bottom.
com12
    what about checking the mixins? Animations?
    There is that bug where you decrease the quantity but it doesn't remove from cart as well.