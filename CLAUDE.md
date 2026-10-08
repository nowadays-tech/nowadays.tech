# nowadays.tech

Jekyll site for the Nowadays venture studio. A push to `main` deploys it to
GitHub Pages, and the repo is public. Build locally with Ruby 3.2.2:
`JEKYLL_ENV=development bundle exec jekyll build`.

## Portfolio items

One file per project in `_ventures/NN_<name>.md`. The home page lists them
newest first. `<name>` is the folder under `assets/images/` whose files fill
the right column.

- **Show the product, never its website.** No screenshots of a landing page.
  Use the real thing: artwork the app generated, output it made, the app's own UI.
- **Take real output from Daniel's own account (d@friis.me) in production.**
  Render it with the app's own code. Do not mock it up.
- **Logo is a text-only wordmark of the product's domain**, in the brand
  colours, with no icon. Outline the letters so it renders without the font.
- **Name the project after its domain** when it has one (e.g. `readout.fm`).
- **Left column holds text only.** Title, description, a few short paragraphs.
- **Something playable or usable goes in its own tile, first** in the right
  column (e.g. readout's latest episode via the `episode:` front matter).
- **Every tile is square, with the same gray, padding and corners.** One
  `tile` class string in `index.html` serves all of them. Image size comes from
  the filename: default fills 80% of the tile, `-small` fills 50%, `-bordered`
  adds a border.
- **Send screenshots of a local build before shipping.** Push only on approval.
