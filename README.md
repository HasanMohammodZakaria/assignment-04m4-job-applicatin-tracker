## 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
**Answer:** 

## 📊 DOM Selection Methods Comparison

| Method                     | Select By      | Returns            | Multiple? | Live Collection? |
|----------------------------|---------------|--------------------|------------|------------------|
| `getElementById()`         | id            | Single Element     |    No      |      No          |
| `getElementsByClassName()` | class         | HTMLCollection     |    Yes     |      Yes         |
| `querySelector()`          | CSS selector  | Single Element     |    No      |      No          |
| `querySelectorAll()`       | CSS selector  | NodeList           |    Yes     |      No          |



## 2. How do you create and insert a new element into the DOM?
**Answer:** 
In JavaScript, you can create and insert a new element into the DOM using the following steps:

- Step 1: Create a New Element

Use document.createElement() to create a new HTML element.
```javascript
const newDiv = document.createElement("div");
```
- Step 2: Add Content to the Element

You can add text using innerText or textContent.
```javascript
newDiv.innerText = "Hello, I am a new element!";
```
- Step 3: Insert the Element into the DOM

Use appendChild() or append() to add it to a parent element.
```javascript
document.body.appendChild(newDiv);
```
## 3. What is Event Bubbling? And how does it work?
**Answer:** s a process in JavaScript where an event starts from the target element and then propagates (bubbles up) to its parent elements, all the way up to the document.
And when you click on a child element, the event first runs on that element, then on its parent, then on the parent's parent — and so on.

**How Does Event Bubbling Work?**
Suppose we have this HTML structure:

<div id="parent">
  <button id="child">Click Me</button>
</div>

Now we add event listeners:
```javascript
document.getElementById("child").addEventListener("click", function() {
  console.log("Button clicked");
});

document.getElementById("parent").addEventListener("click", function() {
  console.log("Div clicked");
});
```
## 4. What is Event Delegation in JavaScript? Why is it useful?
**Answe:** Event Delegation is a technique in JavaScript where instead of adding event listeners to multiple child elements, you add a single event listener to their parent element and use event bubbling to handle events.
It works because of Event Bubbling — when an event happens on a child element, it bubbles up to the parent, and the parent can detect which child triggered the event.

**Why is Event Delegation Useful?**
1. Better Performance

Only one event listener is added instead of many.

 2. Less Memory Usage Reduces the number of event listeners in the DOM.

 3. Works for Dynamic Elements

- If new <li> elements are added later, they will automatically work without adding new event listeners.

 4. Cleaner & Maintainable Code

 - Less repetitive code.

## 5. What is the difference between preventDefault() and stopPropagation() methods?

**Answer:**  difference between preventDefault() and stopPropagation()

| Method              | Stops                  | Example Use Case           |
|---------------------|------------------------|----------------------------|
| `preventDefault()`  | Default browser action | Stop form submission       |
| `stopPropagation()` | Event bubbling         | Prevent parent click event |
