const grandparent = document.querySelector(".grandparent");
const parent = document.querySelector(".parent");
const child = document.querySelector(".child");

/** 
grandparent.addEventListener("click", (e) => {
  //console.log(e.target); //this will print <div class="grandparent">

  console.log("Grandparent 1");
});

//we can add multiple event listeners
//the event listener run in order defined by default 
grandparent.addEventListener("click", (e) => {
  console.log("Grandparent 2");
});
*/

/*when you click on child element ,it still runs the events defined on the grandparent element*/

//why????

//Reasons

/*
grandparent.addEventListener("click", (e) => {
  console.log("Grandparent 1");
});

parent.addEventListener("click", (e) => {
  console.log("Parent 1");
});

child.addEventListener("click", (e) => {
  console.log("Child 1");
});
*/
/**
 * when you click on grandparent element it will print Grandparent 1
 *
 * when you click on parent element it will print
 * Parent 1 then Grandparent 1
 *
 * when you click on child element it will print
 * Child 1 -> Parent 1 -> Grandparent 1
 */

//this works this way because technically we clicked on all of //them since the child is inside parent and the parent is inside //the grandparent and the grandparent is inside the body (document)

//Event bubbling - move from closest element to furthest away element

/**
 * Capturing phase(moves inwards): this happens first where it moves from document(body) to grandparent then parent the child then it swaps over to bubbling phase (moves upwards)
 */
/*
grandparent.addEventListener(
  "click",
  (e) => {
    console.log("Grandparent 1");
  },
  { capture: true }
);

parent.addEventListener("click", (e) => {
  console.log("Parent 1");
});

child.addEventListener("click", (e) => {
  console.log("Child 1");
});

document.addEventListener("click", (e) => {
  console.log("Document 1");
});
*/
/**
 * this will print
 * Grandparent 1
 *Child 1
 *Parent 1
 *Document 1
 *Because grandparent is in capturing phase
 */

/*Sometimes there are things that happen that prevent the event to go through the entire bubbling and capturing phases*/

//this happens when you stop the propagation of an event
/*
grandparent.addEventListener(
  "click",
  (e) => {
    console.log("Grandparent Capture");
  },
  { capture: true }
);
*/

/**
 * if we want to stop the event propagation once the parents event is executed when we click on the child .. no bubbling occurs
 */
/*
parent.addEventListener(
  "click",
  (e) => {
    //e.stopPropagation();
    console.log("parent Capture");
  },
  { capture: true }
);

child.addEventListener(
  "click",
  (e) => {
    console.log("Child Capture");
  },
  { capture: true }
);

document.addEventListener(
  "click",
  (e) => {
    console.log("Document capture");
  },
  { capture: true }
);

grandparent.addEventListener("click", (e) => {
  console.log("Grandparent Bubble");
});

parent.addEventListener("click", (e) => {
  console.log("Parent Bubble");
});

child.addEventListener("click", (e) => {
  console.log("Child Bubble");
  e.stopPropagation();
});

document.addEventListener("click", (e) => {
  console.log("Document Bubble");
});
*/

//Running an event only once using parameter once set to true , the event will run once and remove itself immediately
/*
grandparent.addEventListener("click", (e) => {
  console.log("Grandparent Bubble");
});

parent.addEventListener(
  "click",
  (e) => {
    console.log("Parent Bubble");
  },
  { once: true }
);

child.addEventListener("click", (e) => {
  console.log("Child Bubble");
});
*/

/* 
grandparent.addEventListener("click", (e) => {
  console.log("Grandparent Bubble");
});

parent.addEventListener("click", printHi);

//remove event listenter after 2 seconds

setTimeout(() => {
  parent.removeEventListener("click", printHi);
}, 2000);

child.addEventListener("click", (e) => {
  console.log("Child Bubble");
});

function printHi() {
  console.log("Hi");
}
*/

//Event Delegation- important to dynamically adding elements to page

const divs = document.querySelectorAll("div");
/*
divs.forEach((div) => {
  div.addEventListener("click", () => {
    console.log("Hi");
  });
});
*/

//instead of doing the above we can use the document //because eventually all our events end up on the document

//this will print hi every div we click or everywhere we click

/*
document.addEventListener("click", (e) => {
  console.log("Hi");
});*/

//so do delegate to specific div we can do this

addGlobalEventListener("click", "div", (e) => {
  console.log("Hi"); //this returns true if target match div
});

function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, (e) => {
    if (e.target.matches(selector)) {
      callback(e);
    }
  });
}
const newDiv = document.createElement("div");
newDiv.style.width = "200px";
newDiv.style.height = "200px";
newDiv.style.backgroundColor = "purple";

document.body.append(newDiv);

/*Here the event will not work on the new added div because the divs were selected before the new div was created*/
