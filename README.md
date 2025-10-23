# Homepage Update Guide

This guide will help you update your academic homepage and deploy changes to GitHub Pages.

## Quick Reference

### File Locations (all in `my-homepage/` folder)
- **Publications**: `my-homepage/app/page.tsx` (lines 33-113)
- **Profile Info**: `my-homepage/app/page.tsx` (lines 13-30)
- **Styling/Colors**: `my-homepage/app/globals.css`
- **Configuration**: `my-homepage/next.config.ts`

## Common Updates

### 1. Adding/Updating Publications

Edit `my-homepage/app/page.tsx` and find the relevant section:

**Working Papers** (line 33):
```typescript
const WORKING_PAPERS = [
  {
    year: "2025+",
    title: "Your Paper Title",
    authors: ["Author 1", "Author 2", "Your Name"],
    venue: "Working Paper",
    links: { arxiv: "https://arxiv.org/abs/xxxxx" }, // optional
  },
  // Add more papers here
]
```

**Journal Papers** (line 50):
```typescript
const JOURNAL_PAPERS = [
  {
    year: 2025,
    title: "Your Paper Title",
    authors: ["Your Name", "Co-Author"],
    venue: "Journal Name",
    note: "Optional note about the paper", // optional
    links: {
      arxiv: "https://arxiv.org/abs/xxxxx",
      pdf: "https://link-to-pdf.com", // optional
      doi: "https://doi.org/xxxxx" // optional
    },
  },
]
```

**Conference Papers** (line 83):
```typescript
const CONFERENCE_PAPERS = [
  {
    year: 2025,
    title: "Your Paper Title",
    authors: ["Your Name", "Co-Author"],
    venue: "Conference Name (ACRONYM)",
    award: "Award Name (if any)", // optional, displays in purple
    links: { arxiv: "https://arxiv.org/abs/xxxxx" },
  },
]
```

### 2. Updating Profile Information

Edit `my-homepage/app/page.tsx` lines 13-30:

```typescript
const PROFILE = {
  name: "Your Name",
  email: "your.email@university.edu",
  avatar: "URL to your photo",
  blurb1: "Your bio paragraph 1...",
  blurb2: "Your bio paragraph 2...",
}

const LINKS = {
  cv: "URL to your CV",
  scholar: "Your Google Scholar URL",
  linkedin: "Your LinkedIn URL",
}
```

## Build and Deploy

After making any changes, follow these steps:

### Step 1: Navigate to the homepage directory
**Run from: repository root**
```bash
cd my-homepage
```

### Step 2: Build the site
**Run from: my-homepage directory**
```bash
npm run build
```

### Step 3: Copy build output to repository root
**Run from: my-homepage directory**
```bash
cp -r out/* ..
```

### Step 4: Navigate back to repository root
**Run from: my-homepage directory**
```bash
cd ..
```

### Step 5: Commit and push changes
**Run from: repository root**
```bash
git add -A
git commit -m "Update homepage - describe your changes here"
git push origin hp
```

## One-Line Command

For convenience, you can run all steps at once:

**Run from: repository root**
```bash
cd my-homepage && npm run build && cp -r out/* .. && cd .. && git add -A && git commit -m "Update homepage" && git push origin hp
```

## Testing Locally (Optional)

Before deploying, you can preview your changes:

**Run from: my-homepage directory**
```bash
npm run dev
```

Then open http://localhost:3000 (or the one shown in the terminal) in your browser. Press Ctrl+C to stop.

## GitHub Pages Settings

Make sure your GitHub Pages is configured correctly:
1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `hp`
4. Folder: `/ (root)`

## Troubleshooting

### Changes not showing up?
- Wait 1-2 minutes for GitHub Pages to rebuild
- Hard refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Check if your commit was pushed (run from root): `git log --oneline -5`

### Build errors?
- Make sure you're in the `my-homepage` directory
- Run `npm install` (from my-homepage directory) if dependencies are missing
- Check for syntax errors in `my-homepage/app/page.tsx`

### Dark mode not working?
- Make sure `suppressHydrationWarning` is on the `<html>` tag in `my-homepage/app/layout.tsx`
- Default mode is set in `my-homepage/app/page.tsx` line 117: `useState(false)` = light, `useState(true)` = dark

## Tips

- Always test your changes locally first by running `npm run dev` from the my-homepage directory
- Keep backups of your `my-homepage/app/page.tsx` file before making major changes
- Papers are automatically sorted by year (newest first)
- The site supports both light and dark modes - users can toggle with the sun/moon button

## Need Help?

- Check the Next.js documentation: https://nextjs.org/docs
- Review recent commits (from root): `git log --oneline -10`
- See what changed (from root): `git diff my-homepage/app/page.tsx`
