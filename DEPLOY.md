# Netlify Deployment Guide

This project is configured for easy deployment on Netlify.

## Prerequisites
- A Netlify account (free).
- Your project pushed to GitHub (or Drag & Drop manual upload).

## Option 1: Deploy via GitHub (Recommended)
1.  **Push** your latest code to a GitHub repository.
2.  Log in to **Netlify**.
3.  Click **"Add new site"** -> **"Import an existing project"**.
4.  Select **GitHub**.
5.  Choose your repository (`anvora-interactive`).
6.  **Verify Build Settings** (Netlify should auto-detect these):
    *   **Build command**: `npm run build`
    *   **Publish directory**: `dist`
7.  Click **Deploy site**.

## Option 2: Drag & Drop (Manual)
1.  Run `npm run build` locally (I have already done this).
2.  Locate the `dist` folder in your project directory:
    `c:\Mugi\Projects\anvora-interactive\dist`
3.  Log in to Netlify and drag the `dist` folder onto the "Sites" page.

## Important Note regarding `netlify.toml`
I have already created a `netlify.toml` file in the root directory. This file handles the Single Page Application (SPA) routing, ensuring that refreshing pages like `/about` or `/contact` works correctly on the live site.
