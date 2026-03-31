# 🏨 Hotel Booking Frontend

A modern and responsive hotel booking web application built with **Next.js**, **TypeScript**, and **React Query**.

---

## 🚀 Features

- Browse and search rooms
- View detailed room information
- Book rooms with date selection
- Authentication system (Login/Register)
- Customer dashboard
- Admin dashboard
- Booking management
- Payment success flow
- Fully responsive design

---

## 🧰 Tech Stack

- Next.js (App Router)
- TypeScript
- React
- Tailwind CSS
- TanStack React Query
- Axios
- Lucide React
- Date-fns

---

## 📁 Project Structure


src/
app/
components/
services/
hooks/
lib/
providers/
types/
utils/


---

## 🔐 Authentication & Authorization

- Cookie-based authentication
- Role-based access control

Roles:
- ADMIN
- CUSTOMER

---

## 🌐 Environment Variables

Create a `.env.local` file in the root directory:


NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1

NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000


---

## ⚙️ Installation & Setup

### 1. Clone the repository


git clone https://github.com/osmangonirabbi13/hotel-booking-frontend.git

cd hotel-booking-frontend


### 2. Install dependencies


pnpm install


or


npm install


### 3. Run development server


pnpm dev


---

## 📌 Available Scripts


pnpm dev # Start development server
pnpm build # Build for production
pnpm start # Start production server
pnpm lint # Run linter


---

## 🔗 API Configuration

The frontend communicates with backend API:


http://localhost:5000/api/v1


---

## 📄 Pages Overview

### Public Routes

- `/`
- `/rooms`
- `/rooms/[id]`
- `/login`
- `/register`
- `/forgot-password`
- `/reset-password`

### Customer Routes

- `/dashboard`
- `/my-bookings`
- `/my-profile`
- `/change-password`

### Admin Routes

- `/admin/dashboard`
- `/admin/rooms`
- `/admin/bookings`
- `/admin/users`

---

## ✨ UI Features

- Clean and modern UI
- Fully responsive layout
- Reusable components
- Optimized images with Next.js Image
- Dashboard charts and stats

---

## 🚧 Future Improvements

- Wishlist / favorite rooms
- Reviews & ratings
- Coupon system
- Booking cancellation
- Email notifications
- Invoice generation

---

## 👨‍💻 Author

**Osman Goni**

---

## 📄 License

This project is licensed under the MIT License.
