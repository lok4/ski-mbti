# Ski MBTI Deployment Manual (Vercel)

This guide will help you publish your "Ski MBTI" application to the internet using **Vercel**, the official hosting platform for Next.js.

## Prerequisites
1.  **GitHub Account**: [Sign up here](https://github.com/join)
2.  **Vercel Account**: [Sign up here](https://vercel.com/signup)

---

## Step 1: Push Code to GitHub
You need to upload your local code to a GitHub repository first.

1.  Log in to GitHub and create a **New Repository**.
    *   Name: `ski-mbti` (or any name you like)
    *   Public/Private: Either is fine.
    *   **Do not** initialize with README/gitignore (we already have them).

2.  Open your local terminal (where you are currently running `npm run dev`) and stop the server (`Ctrl + C`).

3.  Run the following commands provided by GitHub to push your code:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/ski-mbti.git
    git branch -M main
    git add .
    git commit -m "Initial deploy"
    git push -u origin main
    ```
    *(Replace `YOUR_USERNAME` and the URL with your actual repository URL)*

---

## Step 2: Deploy to Vercel
1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Select **"Import"** next to your `ski-mbti` repository from the list.

## Step 3: Configure Project
In the "Configure Project" screen:

1.  **Framework Preset**: Should automatically detect "Next.js".
2.  **Root Directory**: Leave as `./`.
3.  **Environment Variables**:
    *   Expand the "Environment Variables" section.
    *   Key: `NEXT_PUBLIC_N8N_WEBHOOK_URL`
    *   Value: `YOUR_ACTUAL_N8N_WEBHOOK_URL` (e.g., `https://n8n.your-domain.com/webhook/...`)
    *   Click **Add**.

4.  Click **"Deploy"**.

## Step 4: Verification
Vercel will build your project. Once finished (about 1-2 minutes):

1.  You will see a "Congratulations!" screen with a thumbnail of your site.
2.  Click the thumbnail to visit your live URL (e.g., `https://ski-mbti.vercel.app`).
3.  Test the quiz and ensure the form submission works.

---

## Important Notes
*   **Images**: Ensure your images (`polar-bear.png` etc.) are committed to GitHub and inside the `public/images` folder.
*   **Changes**: Any time you `git push` new changes to GitHub, Vercel will automatically redeploy your site.
