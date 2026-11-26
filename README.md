# Claudius Angayen | Portfolio

Personal portfolio of Claudius Braylle O. Angayen, a first-year BS IT / CS student at CITCS.

## Pages
- `index.html` : home page (1 / 4)
- `about.html` : short bio and personal info (2 / 4)
- `achievements.html` : educational attainment plus certificates in three categories, click one to enlarge (3 / 4)
- `family-friends.html` : Family and Friends photo gallery, click a photo to zoom (4 / 4)

Each page fits one screen, so the page itself never scrolls. Use the Previous / Next buttons at the bottom to move between pages.

## Folders
- `css/style.css` : all styling, including the dark and light themes
- `js/main.js` : theme toggle, typing effect, phone switcher, cursor effect, certificate viewer, page transitions
- `images/` : `photo.jpg` (full portrait) and `logo.svg`
- `images/achievements/` : certificate photos
- `images/family-friends/` : photos for the Family & Friends page

## Editing
- Text: edit `index.html` or `about.html`.
- Colors: change the values at the top of `css/style.css`.
- Typing phrases: change the `phrases` list in `js/main.js`.
- Education: edit the four `edu-step` items near the top of `achievements.html`.
- Certificates: copy a new JPG into `images/achievements/`, then copy one `<li>` card in `achievements.html` inside the right category (Curricular, Co-curricular or Extra-curricular) and change its image path, title and subtitle. Also update the small number beside the category name.
- Family & Friends photos: copy a JPG into `images/family-friends/`, then copy one `<li>` in `family-friends.html` inside the Family or Friends list and change its image paths, caption (`data-title`, `ff-cap`) and `--ar` (photo width divided by height, for example `0.75` for a 3:4 portrait).
- Photo: replace `images/photo.jpg` with a new file of the same name.

## After you change CSS or JS
Browsers keep old copies. Change the `?v=11` at the end of the `style.css` and `main.js` links in all four HTML pages (for example to `?v=12`) so everyone gets the new files.

## Hosting
Turn on GitHub Pages in Settings, Pages, then choose the `main` branch and `/ (root)`.
