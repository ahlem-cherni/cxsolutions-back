import AdminJS from 'adminjs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  User,
  Post,
  News,
  Team,
  InternalEvent,
  HomepageHighlight,
  Project,
  ProjectAlt
} from '../models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createAdminJS = () => {
  return new AdminJS({
    resources: [
      {
        resource: User,
        options: {
          navigation: 'Application',
          listProperties: ['email', 'name', 'role', 'createdAt'],
          editProperties: ['email', 'name', 'role'],
          filterProperties: ['email', 'name', 'role'],
          showProperties: ['email', 'name', 'role', 'createdAt']
        }
      },
      {
        resource: Post,
        options: {
          navigation: null,
          actions: {
            list: { isAccessible: false, isVisible: false },
            new: { isAccessible: false, isVisible: false },
            edit: { isAccessible: false, isVisible: false },
            show: { isAccessible: false, isVisible: false },
            delete: { isAccessible: false, isVisible: false }
          },
          listProperties: ['title', 'author', 'published', 'createdAt'],
          editProperties: ['title', 'content', 'author', 'published'],
          filterProperties: ['title', 'author', 'published'],
          showProperties: ['title', 'content', 'author', 'published', 'createdAt']
        }
      },
      {
        resource: News,
        options: {
          navigation: 'Application',
          listProperties: ['title', 'authorName', 'date', 'published', 'tags'],
          editProperties: ['title', 'authorName', 'date', 'body', 'tags', 'published'],
          filterProperties: ['title', 'authorName', 'date', 'published', 'tags'],
          showProperties: ['title', 'authorName', 'date', 'body', 'tags', 'published', 'createdAt', 'updatedAt'],
          properties: {
            body: {
              type: 'richtext'
            },
            tags: {
              type: 'string',
              isArray: true
            }
          }
        }
      },
      {
        resource: Team,
        options: {
          navigation: 'Application',
          listProperties: ['teamName', 'members', 'createdAt'],
          editProperties: ['teamName', 'members', 'description'],
          filterProperties: ['teamName'],
          showProperties: ['teamName', 'members', 'description', 'createdAt', 'updatedAt'],
          properties: {
            members: {
              type: 'mixed',
              isArray: true
            },
            'members.$.photo': {
              type: 'string',
              components: {
                edit: AdminJS.bundle(path.join(__dirname, '..', 'components', 'MemberPhotoEdit.jsx')),
                show: AdminJS.bundle(path.join(__dirname, '..', 'components', 'MemberPhotoShow.jsx'))
              }
            }
          }
        }
      },
      {
        resource: InternalEvent,
        options: {
          navigation: 'Application',
          listProperties: ['name', 'dateTime', 'pricingOptions', 'createdAt'],
          editProperties: ['name', 'description', 'dateTime', 'pricingOptions'],
          filterProperties: ['name', 'dateTime'],
          showProperties: ['name', 'description', 'dateTime', 'pricingOptions', 'createdAt']
        }
      },
      {
        resource: HomepageHighlight,
        options: {
          navigation: 'Application',
          listProperties: ['title', 'link', 'createdAt'],
          editProperties: ['title', 'description', 'image', 'link'],
          filterProperties: ['title', 'link'],
          showProperties: ['title', 'description', 'image', 'link', 'createdAt'],
          properties: {
            image: {
              type: 'string',
              components: {
                edit: AdminJS.bundle(path.join(__dirname, '..', 'components', 'MemberPhotoEdit.jsx')),
                show: AdminJS.bundle(path.join(__dirname, '..', 'components', 'MemberPhotoShow.jsx'))
              }
            }
          }
        }
      },
      {
        resource: Project,
        options: {
          navigation: 'Application',
          listProperties: ['title', 'timeline', 'link', 'createdAt'],
          editProperties: ['title', 'description', 'timeline', 'image', 'link'],
          filterProperties: ['title', 'timeline'],
          showProperties: ['title', 'description', 'timeline', 'image', 'link', 'createdAt'],
          properties: {
            image: {
              type: 'string',
              components: {
                edit: AdminJS.bundle(path.join(__dirname, '..', 'components', 'MemberPhotoEdit.jsx')),
                show: AdminJS.bundle(path.join(__dirname, '..', 'components', 'MemberPhotoShow.jsx'))
              }
            }
          }
        }
      },
      {
        resource: ProjectAlt,
        options: {
          navigation: 'Application',
          listProperties: ['name', 'type', 'website', 'createdAt'],
          editProperties: ['name', 'description', 'type', 'logo', 'website'],
          filterProperties: ['name', 'type'],
          showProperties: ['name', 'description', 'type', 'logo', 'website', 'createdAt'],
          properties: {
            logo: {
              type: 'string',
              components: {
                edit: AdminJS.bundle(path.join(__dirname, '..', 'components', 'MemberPhotoEdit.jsx')),
                show: AdminJS.bundle(path.join(__dirname, '..', 'components', 'MemberPhotoShow.jsx'))
              }
            }
          }
        }
      }
    ],
    rootPath: '/admin',
    dashboard: {
      component: AdminJS.bundle(path.join(__dirname, '..', 'empty-dashboard.jsx'))
    },
    branding: {
      companyName: 'CODEX OUTSOURCING SOLUTIONS',
      logo: '/images/téléchargement.png',
      softwareBrothers: false,
      withMadeWithLove: false
    },
    assets: {
      styles: ['/css/custom-admin.css'],
      scripts: ['/js/custom-admin.js']
    }
  });
};

