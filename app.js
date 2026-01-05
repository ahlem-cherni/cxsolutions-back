import express from 'express';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSMongoose from '@adminjs/mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDatabase } from './config/database.js';
import { setupMiddleware } from './config/middleware.js';
import { createAdminJS } from './admin/config.js';
import { scrubMiddleware } from './middleware/scrubIds.js';
import { requireAuth } from './middleware/auth.js';

import authRoutes from './routes/auth.js';
import newsRoutes from './routes/news.js';
import uploadRoutes from './routes/upload.js';
import pagesRoutes from './routes/pages.js';
import syncRoutes from './routes/sync.js';
import teamRoutes from './routes/team.js';
import projectRoutes from './routes/project.js';
import projectAltRoutes from './routes/project-alt.js';
import internalEventRoutes from './routes/internal-event.js';
import newsletterRoutes from './routes/newsletter.js';
import homepageHighlightRoutes from './routes/homepage-highlight.js';

AdminJS.registerAdapter(AdminJSMongoose);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

setupMiddleware(app);

connectDatabase().catch(() => {});

app.use('/api/upload', uploadRoutes);
app.use('/api', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/project-alt', projectAltRoutes);
app.use('/api/internal-event', internalEventRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/homepage-highlight', homepageHighlightRoutes);
app.use('/api', syncRoutes);
app.use('/', pagesRoutes);

const adminJs = createAdminJS();
const router = AdminJSExpress.buildRouter(adminJs);

app.get('/admin/custom-script', (req, res) => {
  res.send(`
    <script src="/js/custom-admin.js"></script>
    <link rel="stylesheet" href="/css/custom-admin.css">
  `);
});

app.use(adminJs.options.rootPath, scrubMiddleware, (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.redirect('/login');
  }
  res.locals.user = req.session.user;
  next();
}, router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\n✓ Server running on port ${PORT}`);
  console.log(`  Local:   http://localhost:${PORT}`);
  console.log(`  Admin:   http://localhost:${PORT}/admin\n`);
});

export default app;
