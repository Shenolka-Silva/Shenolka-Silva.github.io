# Shenolka Silva — Cyber Security Portfolio

A responsive, static portfolio for a Cyber Security undergraduate at SLIIT. Built with semantic HTML, CSS, and vanilla JavaScript for GitHub Pages. No build step, backend, API keys, runtime dependencies, or external font requests.

## Run locally

Open `index.html` directly in Chrome, Edge, or Firefox. Classic deferred scripts work with `file://`; there are no fetch requests or ES modules requiring a server. Alternatively, from this folder:

```sh
python -m http.server 8000
```

Visit `http://localhost:8000`. Stop the server with Ctrl+C.

## Structure

```text
index.html                 Semantic sections, contact links, metadata
css/style.css              Responsive layout, theme, reduced motion
js/data.js                 Links, projects, skills, courses, academic work
js/main.js                 Rendering, menu and project dialogs
assets/icons/favicon.svg   Replaceable portfolio favicon
assets/images/             Your portrait and approved project screenshots
assets/documents/          Your CV, reports, and presentations
.nojekyll                  Serve directly without Jekyll processing
.gitignore                Local tooling and secret-file exclusions
README.md                 Customization and deployment guide
```

## Customize

Edit `js/data.js`. `links` contains empty placeholders for `github`, `linkedin`, `email`, and `cv`. Supply your real URLs; put only the email address in `email`, without `mailto:`. Empty links display **soon** as non-clickable text. The email link becomes available when you supply an email. No invented destinations or placeholder network requests are used.

1. **CV:** put your public PDF at `assets/documents/HSA-Silva-CV.pdf`; set `links.cv` to that relative path.
2. **Portrait:** your supplied image is stored at `assets/images/shenolka-silva.png`. Set `profileImage` to a different relative path to replace it; also update the fallback image in `index.html`. The complete portrait fits inside the profile card without cropping.
3. **Project screenshots:** set each project's `screenshot` and descriptive `screenshotAlt`. Empty screenshots display labeled concept diagrams, not fabricated product screenshots. Use sanitized images approved for public sharing. Aim for compressed images below 250 KB.
4. **Projects:** the project list is intentionally empty while work is in progress. Add your own entries to `projects` in `js/data.js` using the template below. Cards and accessible detail dialogs appear automatically. Update the Projects heading and introductory text in `index.html` when ready.
5. **Academic work:** add coursework to the `projects` list using the same project template. Label academic or fictitious scenarios clearly in the category and description.
6. **Certification/course:** confirm the ISC2 course date and completion status. Do not describe the course as an awarded certification unless verified. Add future entries to `certifications`; `url` enables the verification link and `logo` accepts an optional image path.
7. **Experience:** edit the experience section in `index.html`, including internship dates.
8. **SEO:** replace the title and descriptions if needed. Add `<link rel="canonical" href="https://YOUR-USERNAME.github.io/">` and `<meta property="og:url" content="https://YOUR-USERNAME.github.io/">` after confirming the actual URL. Social title/description and a summary-card declaration are already included. If you add a social image, use an absolute public URL in `og:image` and `twitter:image` and add `og:image:alt`.
9. **Design:** theme tokens are at the top of `css/style.css`; layout responds at 1200, 960, and 680 pixels. Motion is disabled when the visitor requests reduced motion.

Use relative asset URLs without a leading slash so the site works both at a user-site root and under a project subdirectory. External links should use HTTPS. All displayed dynamic text is escaped, and unsafe URL schemes are rejected.

## Contact behavior

The profile card contains direct email, LinkedIn, and GitHub links. There is no contact form, backend, or message storage. Configure your destinations in `js/data.js` and the profile card in `index.html`; the email link opens the visitor's email application.

## Deploy to GitHub Pages

Replace `YOUR-USERNAME` below with your exact GitHub username. GitHub user sites use a repository named **YOUR-USERNAME.github.io**.

1. On GitHub, create a new **public**, empty repository named `YOUR-USERNAME.github.io`. Leave README, license, and gitignore initialization unchecked when pushing these existing files.
2. In a terminal in this project folder, run:

   ```sh
   git init
   git add .
   git commit -m "Build cybersecurity portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
   git push -u origin main
   ```

   If already using a Git repository, skip `git init`. If an `origin` exists, inspect `git remote -v` and update it only if appropriate instead of adding it again. Authenticate with GitHub when prompted; never save access tokens in these files.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**. Select **main** and **/(root)**, then **Save**.
5. Wait for the Pages deployment to complete in the repository's **Actions** tab. The site URL is **https://YOUR-USERNAME.github.io/**. This project needs neither npm nor a custom Actions workflow.
6. Future changes: commit and push to `main`. Pages republishes the site.

Official instructions: [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart) and [publishing sources](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

### Custom domain later

Verify ownership in GitHub account settings, configure the domain under repository **Settings → Pages → Custom domain**, and follow GitHub's current DNS instructions for your chosen apex or subdomain. For a `www` subdomain, the DNS CNAME points to `YOUR-USERNAME.github.io` (no protocol or path). GitHub creates a repository `CNAME` file for branch deployments; retain it when updating the site. Enable **Enforce HTTPS** after certificate provisioning. Update canonical and Open Graph URLs to the new origin. See [GitHub's custom-domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) for current apex records and verification steps.

## Before publication

- Replace contact/CV links and confirm project statuses, course details, and internship dates.
- Review documents and images for private company/university data, student IDs, internal addresses, credentials, and confidential screenshots.
- Check all sections on desktop and narrow screens; open/close the mobile menu.
- Use the keyboard to open a project, tab through its links, press Escape, and confirm focus returns to the originating button.
- Verify configured resources and the direct email link in a real email client.
- Check 200% zoom, reduced motion, and browser console output.

The site uses native HTML dialogs and modern CSS supported in current Chrome, Edge, Firefox, and mobile browsers. JavaScript is needed for reusable content and dialogs; a noscript notice explains this. No personal links have been inferred.

## Add your own project

Replace `projects: []` in `js/data.js` with this structure, then replace the example text with your own information. Add more objects separated by commas for additional projects. Leave unavailable URLs empty. This is a source-file configuration, not a public submission form.

```js
projects: [
  {
    id: 'my-project',
    title: 'Your project title',
    subtitle: 'Your project summary',
    category: 'Your project category',
    status: 'In progress',
    description: 'Describe what you are building and why.',
    technologies: ['Your technology'],
    concepts: ['Your security concept'],
    diagram: ['Input', 'Processing', 'Output'],
    groups: [
      { title: 'Project scope', items: ['Describe your work here.'] }
    ],
    github: '',
    documentation: '',
    screenshot: '',
    screenshotAlt: ''
  }
],
```
