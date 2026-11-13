# Graduation Boarding Pass — Design

Static one-page invitation for Vũ Đăng Khôi's graduation, hosted on GitHub Pages (repo `graduation`).

## Concept
A "Graduation Air" boarding pass. Guest opens the page, tears the ticket stub, then sees the full ticket.

## Content
- Passenger: VŨ ĐĂNG KHÔI — Cử nhân Khoa học Dữ liệu, ĐH Khoa học Tự nhiên (HCMUS)
- Date: Thứ Bảy 21.11.2026, boarding 10:30–11:30 (UTC+7)
- Gate: main path between building I and GĐ1, near the flag pole (cơ sở 1, 227 Nguyễn Văn Cừ)
- Thank-you message, school map with red arrow (`assets/map.jpg`), portrait (`assets/khoi.jpg`)

## Features
- Tear-to-open intro (starts music, confetti)
- Countdown to 2026-11-21 10:30 +07:00; shows "đã cất cánh" after
- Google Maps link + Google Calendar link
- Background music `assets/music.mp3` (user supplies), toggle button

## Tech
Plain `index.html` + `style.css` + `app.js`, no build. Mobile first.
Photos become public once hosted.
