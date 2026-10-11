# ConnecFriend &bull; Light-Mode Social Connectivity Network

---

## Technical Constraints & Framework Compliance

* **Tech Stack**: HTML5, Vanilla JavaScript, and Tailwind CSS.
* **Strict CSS Rule**: **Zero plain CSS**. All layout, components, and interactions are crafted using Tailwind utility classes and Font Awesome icons via CDN.
* **Architecture**: Fully client-side Single-Page Application (SPA) with mock data and `localStorage` persistence.

---

## Overhaul Highlights

1. **Light Theme & Typography**:
   * Off-white canvas background (`bg-slate-50`).
   * Crisp white card containers (`bg-white`) with soft drop shadows (`shadow-md`, `rounded-xl`, `rounded-2xl`) and subtle borders (`border-slate-200`).
   * High-contrast, dark slate typography (`text-slate-900`, `text-slate-700`, `text-slate-500`) styled with Google's **Plus Jakarta Sans**.

2. **Visible Message Buttons**:
   * Replaced small icon buttons with large, highly visible, pill-shaped buttons containing both an icon and the word **"Message"** (`px-4 py-2 w-full bg-blue-600 text-white rounded-full hover:bg-blue-700`).

3. **Structured Messages Layout (No Overlapping)**:
   * Redesigned the Private Messages section using a **strict two-pane Flexbox layout**:
     * **Left Pane**: Fixed-width (`w-80`) contact directory with independent vertical scrolling (`overflow-y-auto`).
     * **Right Pane**: Flexible active chat window (`flex-1 min-w-0`) with scrollable message thread (`overflow-y-auto`) and bottom-docked input.

4. **Explicit Ignore/Block Feature**:
   * Added an explicit **"Ignore User"** ghost button (`border border-red-500 text-red-500 hover:bg-red-50 rounded-full`) next to the Invite button on every non-friend profile in the Friend Hub.
   * Directly triggers a mock notification reading: **"User Added to Ignore List"**, immediately adding the user to the active ignore list.

---

## Features & Simulation Checklist

* **Login Page**: Existing member credential validation.
* **Home Page**:
  * Friends list ordered strictly by login time (most recent first).
  * Post cards showing news content, friend's name, profile picture, and **time since their last login**.
  * Dedicated **Like** and **Dislike** buttons with live reactive counters.
* **Profile Page**: Personal bio, stats, and **1–3 friend rating matrix** with icons (1 = Stupid 🤪, 2 = Cool 😎, 3 = Trustworthy 🤝).
* **Friend Hub**: Member invites with ignore-list filtering and explicit ignore action.
* **News Sharing**: Broadcast composer with "All Friends" vs. "Some Friends" selector.
* **Private Messages**: Direct messages for both friends and non-friend network members.

