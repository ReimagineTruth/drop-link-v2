# Droplink Design Guidelines

## 1. Brand Identity

* **Primary Colors:**

  * Droplink Blue: #1E40AF
  * Accent Purple: #7C3AED
  * Neutral Gray: #6B7280
  * Background Light: #F9FAFB
  * Text Primary: #111827

* **Typography:**

  * Font Family: 'Inter', sans-serif
  * Headings: Bold, sizes vary by hierarchy (H1=32px, H2=24px, H3=18px)
  * Body Text: Regular 16px, line-height 1.5

* **Logo Usage:**

  * Use SVG logo with transparent background.
  * Maintain minimum clear space equal to logo height around it.
  * Avoid stretching or altering logo colors.

---

## 2. Layout & Spacing

* Use a **12-column grid** for desktop layouts.
* Mobile: single column, padding 16px.
* Desktop: max width 1200px, centered content.
* Consistent spacing using multiples of 8px (8px, 16px, 24px, 32px).

---

## 3. Color Usage

* Primary buttons use Droplink Blue with white text.
* Secondary buttons use white background with blue border/text.
* Use Accent Purple for highlights, links, and interactive elements.
* Disabled elements should have 50% opacity.
* Error messages use red (#DC2626).

---

## 4. Components

### Buttons

* Rounded corners (6px radius)
* Padding: 12px vertical, 24px horizontal
* Hover: Slightly darker background
* Disabled: Grayed out with no pointer events

### Inputs

* Border: 1px solid #D1D5DB (gray-300)
* Focus: Border color changes to Droplink Blue (#1E40AF), outline none
* Padding: 10px 12px
* Placeholder: Gray (#9CA3AF)

### Modals

* Centered, with dark semi-transparent overlay
* Rounded corners (12px)
* Close icon top-right, accessible by keyboard

### Links List

* Each link as a card or list item with:

  * Icon (optional)
  * Title text
  * URL preview
  * Drag handle for reordering
  * Toggle switch for visibility
  * Edit and delete icons

### Analytics Charts

* Use simple, clean line/bar charts with consistent colors
* Provide tooltips on hover for data points
* Support date range selectors above charts

---

## 5. Accessibility

* All interactive elements must be keyboard navigable.
* Use ARIA labels and roles for icons, buttons, and inputs.
* Text contrast ratio minimum 4.5:1 for readability.
* Focus states visible and distinct.
* Provide alt text for all images and icons.

---

## 6. Responsive Design

* Mobile first approach.
* Navigation collapses into hamburger menu on small screens.
* Links list stacks vertically on mobile.
* Analytics charts resize or switch to simpler views on narrow screens.

---

## 7. Animation & Feedback

* Use subtle animations for hover states and toggles.
* Loading spinners or skeleton screens during data fetches.
* Confirmation modals or toasts on actions like link delete or profile update.
* Smooth drag-and-drop reordering animations.

---

## 8. Iconography

* Use a consistent icon set (e.g., Heroicons or Material Icons).
* Icons sized around 20-24px for buttons and controls.
* Use icons alongside text for clarity (e.g., pencil for edit).

