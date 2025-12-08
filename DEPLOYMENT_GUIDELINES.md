# Ski MBTI - Deployment & Security Guidelines

## 1. Security Checklist
- [ ] **Input Validation**: Ensure Zod schemas in `LeadForm.tsx` cover all edge cases.
- [ ] **Rate Limiting**: Implement rate limiting on the N8n webhook endpoint (or use a middleware in Next.js if proxying).
- [ ] **Data Privacy**: Ensure the N8n webhook handles personal data (PII) securely and complies with GDPR/CCPA if applicable.
- [ ] **CORS**: If the N8n webhook is on a different domain, ensure CORS headers are configured correctly.

## 2. Performance Checklist
- [ ] **Image Optimization**: Replace placeholder emojis/divs with optimized images using `next/image`.
- [ ] **Font Optimization**: Verify `next/font` is correctly loading only used subsets (Latin, Korean).
- [ ] **Bundle Size**: Run `npm run build` and check for large chunks. Use `next/bundle-analyzer` if needed.
- [ ] **Code Splitting**: Ensure heavy components (like Lottie animations if added) are lazy loaded.

## 3. SEO & Analytics
- [ ] **Metadata**: Update `src/app/layout.tsx` with the final production URL and OG images.
- [ ] **Sitemap**: Add `sitemap.ts` and `robots.ts` for search engine indexing.
- [ ] **Analytics**: Integrate GA4 or similar for tracking conversion rates (Lead Form submissions).

## 4. Environment Variables
- [ ] **NEXT_PUBLIC_N8N_WEBHOOK_URL**: Set this in Vercel/Netlify project settings.
