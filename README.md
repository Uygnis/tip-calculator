# Frontend Mentor - Tip calculator app solution

This is a solution to the [Tip calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Calculate the correct tip and total cost of the bill per person

### Links

- Solution URL: [GitHub](https://github.com/Uygnis/tip-calculator/tree/code)
- Live Site URL: [Click here](https://uygnis.github.io/tip-calculator/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flex
- CSS Grid
- [React](https://reactjs.org/) - JS library
- [Styled Components](https://styled-components.com/) - For styles

### What I learned

1. If ToNumber(number) is NaN, return true.
Otherwise, return false. Instead of using parseInt, use Number

2. OnClick function not working even after enabling button in ReactJS
-It is because your button is always disabled as in your button, the disabled property is always true. You should use state for manipulation instead.
https://stackoverflow.com/questions/64632456/onclick-function-not-working-even-after-enabling-button-in-reactjs

3. Learnt to use useRef react hook
```js
 const inputElement = useRef()
  {buttons.map((btns, index) => {
                return (
                  <button type='button' key={index} value={btns} className={active === index ? 'btn active' : 'btn'} onClick={e => {
                    handleBtn(e.target.value);
                    handleOnClick(index);
                    disabledBtn();
                    inputElement.current.value = '';
                    console.log(active)
                  }
                  }>{btns}%</button>
                )
              })}
 ```
```html
 <input type='text' placeholder='Custom' size='3' maxLength='3' ref={inputElement} onChange={e => handleTip(e.target.value)} className={invalid ? 'invalid' : ''} />
```
4. Learnt to use useReducer react hook

## Author

- Website - [John Ling](https://uygnis.github.io/uygnis/)
- Frontend Mentor - [@Uygnis](https://www.frontendmentor.io/profile/Uygnis)
