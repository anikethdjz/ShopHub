Fixes and notes

- 2025-11-08: Fixed a runtime error when navigating to `/checkout` caused by passing non-serializable data in `location.state`.
  - Cause: `homepage.jsx` called `navigate('/checkout', { state: { cart, setCart } })` which attempted to clone a function (`setCart`) and threw `BoundFunctionObject object could not be cloned`.
  - Fix: Now `navigate('/checkout', { state: { cart } })` — only serializable data is passed. The checkout page reads `location.state.cart`.
  - Recommendation: Use React Context or lifting state via route wrapper props to share setters or callbacks; do not pass functions via history state.
