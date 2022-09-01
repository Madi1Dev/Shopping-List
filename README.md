# Shopping-List
README file included

=== PROJECT DOCUMENTATION:

I created this project with two objectives in mind:
1. Practice working with arrays,
2. Practice working with DOM manipulation.

This app allows you to do the following things:
1. You can enter and remove items from the list.
- the list doesn't allow for duplicates (achieved via a hidden array (allFoods)
- you can also add or reduce (after the count is at least 2) the amount of said item 

2. You can add the items to either the Healthy Foods list or the Treats! list.
- neither list allows for duplicates (achieved via hidden arrays (healthyFoods and Treats)
- an item cannot be entered into both lists simultaneously.

3. You can add items back into the shopping list from either of the two lists.
- the app prevents you from adding an item that is already on the shopping list (allFoods)

4. The items assume the colour of the list to which they belong, and the colour is removed if the
item no longer belongs to either list.
- Presently, there is an unresolved issue whereby an item that was removed from the shopping list but was 
added back from either Healthy Foods or Treats! doesn't change colour to blank if its corresponding label was
removed from the Healthy Foods or Treats lists. 
- This happens because the div1 element that is created within the on-click event promptHealthyButtonAddToList
at line 232 and promptTreatsButtonAddToList at line 446 aren't the same as the div1 element created prior to
them, which is available to the promptHealthyButtonRemoveFromArray (395) and promptTreatsButtonRemoveFromArray
(613).
- This is an issue I aim to return to alongside other design changes I have in mind which may involve a large-scale overhaul 
of the app. 

These involve:
==== FUTURE CHANGES
1. Phone compatibility with media queries.
2. Spellcheck for entered items.
3. Code efficiency. Better function arrangements and callbacks.
4. Backend functionality. Presently, the app doesn't remember the items entered and restarts fresh on each reload.
5. Click off functionality on pop-up windows.
6. Animated background and various other flavours of animations. 
7. Various CSS flavour changes.
