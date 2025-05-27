# 🧪 Take-Home Assignment: Product Feedback Board (1–2 hours)

## 📝 Overview

Build a simple **Product Feedback Board** where users can:

- View feedback posts
- Rate them from 1 to 5 stars ⭐
- Search feedback
- Filter feedback by category
- Add new feedback via a modal
- Sort feedbacks by rating or by date (default) - Optional

---

## Instructions

- Use shadcn ui for UI components
- Use react-hook-form and zod for form validation
- Use tailwind for styling
- Use useState hook to update the feedback data (Context API not needed)
- Add start and end commit by updating this readme file, add the start and end date time on the bottom

## 🧱 Requirements

### 1. Display Feedback Posts

Render a list of feedback posts with the following fields:

- `title` (string) required
- `description` (string) required
- `category` (string) e.g., "UI", "UX", "Feature"
- `rating` (number) 1–5 stars ✅
- `date` (number timestamp) MM/DD/YYYY

Posts sorted by date (desc)

---

### 2. ✅ Rating Functionality

- Each post shows a 1–5 star rating system
- Clicking a star updates the rating for that post

---

### 3. ✅ Search Feedback

- Include a search bar
- Filter feedback by `title` or `description` (case-insensitive)
- Results update in real-time as the user types

---

### 4. ✅ Categories

- Display Category (badge)
- Filter feedback by clicking on category
- Display selected category below the search bar

---

### 5. ✅ Add Feedback Modal

- “+ New Feedback” opens a modal or drawer
- Form includes: `title`, `description`, `category` and `rating`
- Adds new feedback to the list (no backend required)

---

### 6. Tailwind CSS Styling

- Responsive layout (mobile & desktop)
- Clean and accessible UI using **Tailwind**
- Use semantic HTML and accessible elements

---

## ✅ Bonus (Optional)

- Sort by date (default) or by rating (Dropdown Menu)
- Add smooth transitions (e.g. rating hover)

---

Good luck! Let us know if you have any questions. ✨

---

May 27, 2025
Start Time: 2:00PM

End Time: 4:00PM
