# CLAUDE.md — Aziz Ghariani Portfolio

## What this is

Single index.html — 1990s IBM PC / MS-DOS themed personal portfolio.
Vanilla HTML/CSS/JS only. No frameworks, no libraries, no external assets
except Perfect DOS VGA 437 font from cdnfonts.com.
Deployed on Vercel.

## Design rules — never break these

* Font: Perfect DOS VGA 437 → fallback Courier New. No other fonts.
* Colors:
#000000  background
#AAAAAA  default text
#FFFFFF  bright white
#000080  panel background
#00AAAA  cyan accents
#FFFF55  active / highlight
#AA0000  dark red
* No border-radius, no box-shadow, no gradients, no modern CSS
* Content max-width: 680px centered
* ASCII chars only: ╔ ═ ╗ ║ ╚ ╝ ┌ ─ ┐ │ └ ┘ ► █ ░

## Boot sequence — 3.5s total, do not change timing without instruction

0.0s  Black screen + Web Audio beep (800hz, 150ms)
0.3s  Windows 95 CSS splash (clouds via radial-gradient, dots animation)
1.8s  CRT flicker → black
2.0s  POST text prints line by line (80ms/line)
3.0s  DOS typewriter → CV.EXE → loading bar
3.5s  CRT flicker → CV loads
All timing via setTimeout chains, not CSS delays.

## CV structure

* Single scrollable page, sections flow vertically
* Sticky F-key bar fixed at bottom (Norton Commander style)
* F1 PROFILE · F2 EXPERIENCE · F3 SKILLS · F4 PROJECTS · F5 CONTACT · F10 PDF
* F-keys smooth-scroll to anchors
* IntersectionObserver updates active F-key highlight on scroll
* ESC key = shutdown easter egg overlay

## Placeholders to fill before going live

* Email, LinkedIn, GitHub, Calendly → marked \[TODO] in HTML
* Demo project URL → marked \[TODO] in HTML

## When making changes

* Never touch boot sequence timing unless explicitly asked
* Never add modern CSS properties
* After any content change, update the \[TODO] placeholders if now resolved
* Always output the full index.html — no partial edits

