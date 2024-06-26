import fs from 'fs'
import path from 'path'
import type { Payload } from 'payload'

import { eventsPage } from './events-page'
import { home } from './home'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'
import { postsPage } from './posts-page'
import { event1 } from './project-1'
import { event2 } from './project-2'
import { event3 } from './project-3'

const collections = ['categories', 'media', 'pages', 'posts', 'events']
const globals = ['header', 'settings', 'footer']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async (payload: Payload): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not

  payload.logger.info(`— Clearing media...`)

  const mediaDir = path.resolve(__dirname, '../../media')
  if (fs.existsSync(mediaDir)) {
    fs.rmdirSync(mediaDir, { recursive: true })
  }

  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  await Promise.all([
    ...collections.map(async collection =>
      payload.delete({
        collection: collection as 'media',
        where: {},
      }),
    ), // eslint-disable-line function-paren-newline
    ...globals.map(async global =>
      payload.updateGlobal({
        slug: global as 'header',
        data: {},
      }),
    ), // eslint-disable-line function-paren-newline
  ])

  payload.logger.info(`— Seeding demo author and user...`)

  await Promise.all(
    ['demo-author@payloadcms.com', 'demo-user@payloadcms.com'].map(async email => {
      await payload.delete({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      })
    }),
  )

  let [{ id: demoAuthorID }] = await Promise.all([
    await payload.create({
      collection: 'users',
      data: {
        email: 'demo-author@payloadcms.com',
        name: 'Demo Author',
        password: 'password',
        roles: ['admin'],
      },
    }),
    await payload.create({
      collection: 'users',
      data: {
        email: 'demo-user@payloadcms.com',
        name: 'Demo User',
        password: 'password',
        roles: ['user'],
      },
    }),
  ])

  payload.logger.info(`— Seeding media...`)

  const [image1Doc, image2Doc] = await Promise.all([
    await payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, 'image-1.jpg'),
      data: image1,
    }),
    await payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, 'image-2.jpg'),
      data: image2,
    }),
  ])

  payload.logger.info(`— Seeding categories...`)

  const [
    technologyCategory,
    newsCategory,
    financeCategory,
    designCat,
    softwareCat,
    engineeringCat,
  ] = await Promise.all([
    await payload.create({
      collection: 'categories',
      data: {
        title: 'Technology',
      },
    }),
    await payload.create({
      collection: 'categories',
      data: {
        title: 'News',
      },
    }),
    await payload.create({
      collection: 'categories',
      data: {
        title: 'Finance',
      },
    }),
    await payload.create({
      collection: 'categories',
      data: {
        title: 'Design',
      },
    }),
    await payload.create({
      collection: 'categories',
      data: {
        title: 'Software',
      },
    }),
    await payload.create({
      collection: 'categories',
      data: {
        title: 'Engineering',
      },
    }),
  ])

  let image1ID = image1Doc.id
  let image2ID = image2Doc.id

  if (payload.db.defaultIDType === 'text') {
    image1ID = `"${image1Doc.id}"`
    image2ID = `"${image2Doc.id}"`
    demoAuthorID = `"${demoAuthorID}"`
  }

  payload.logger.info(`— Seeding posts...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const post1Doc = await payload.create({
    collection: 'posts',
    data: JSON.parse(
      JSON.stringify({ ...post1, categories: [technologyCategory.id] })
        .replace(/"\{\{IMAGE\}\}"/g, image1ID)
        .replace(/"\{\{AUTHOR\}\}"/g, demoAuthorID),
    ),
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    data: JSON.parse(
      JSON.stringify({ ...post2, categories: [newsCategory.id] })
        .replace(/"\{\{IMAGE\}\}"/g, image1ID)
        .replace(/"\{\{AUTHOR\}\}"/g, demoAuthorID),
    ),
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    data: JSON.parse(
      JSON.stringify({ ...post3, categories: [financeCategory.id] })
        .replace(/"\{\{IMAGE\}\}"/g, image1ID)
        .replace(/"\{\{AUTHOR\}\}"/g, demoAuthorID),
    ),
  })

  // update each post with related posts

  await Promise.all([
    await payload.update({
      collection: 'posts',
      id: post1Doc.id,
      data: {
        relatedPosts: [post2Doc.id, post3Doc.id],
      },
    }),
    await payload.update({
      collection: 'posts',
      id: post2Doc.id,
      data: {
        relatedPosts: [post1Doc.id, post3Doc.id],
      },
    }),
    await payload.update({
      collection: 'posts',
      id: post3Doc.id,
      data: {
        relatedPosts: [post1Doc.id, post2Doc.id],
      },
    }),
  ])

  payload.logger.info(`— Seeding events...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const project1Doc = await payload.create({
    collection: 'events',
    data: JSON.parse(
      JSON.stringify({ ...event1, categories: [designCat.id] }).replace(
        /"\{\{IMAGE\}\}"/g,
        image2ID,
      ),
    ),
  })

  const project2Doc = await payload.create({
    collection: 'events',
    data: JSON.parse(
      JSON.stringify({ ...event2, categories: [softwareCat.id] }).replace(
        /"\{\{IMAGE\}\}"/g,
        image2ID,
      ),
    ),
  })

  const project3Doc = await payload.create({
    collection: 'events',
    data: JSON.parse(
      JSON.stringify({ ...event3, categories: [engineeringCat.id] }).replace(
        /"\{\{IMAGE\}\}"/g,
        image2ID,
      ),
    ),
  })

  // update each project with related projects

  await Promise.all([
    await payload.update({
      collection: 'events',
      id: project1Doc.id,
      data: {
        relatedEvents: [project2Doc.id, project3Doc.id],
      },
    }),
    await payload.update({
      collection: 'events',
      id: project2Doc.id,
      data: {
        relatedEvents: [project1Doc.id, project3Doc.id],
      },
    }),
    await payload.update({
      collection: 'events',
      id: project3Doc.id,
      data: {
        relatedEvents: [project1Doc.id, project2Doc.id],
      },
    }),
  ])

  payload.logger.info(`— Seeding posts page...`)

  const postsPageDoc = await payload.create({
    collection: 'pages',
    data: JSON.parse(JSON.stringify(postsPage).replace(/"\{\{IMAGE\}\}"/g, image1ID)),
  })

  payload.logger.info(`— Seeding events page...`)

  const eventsPageDoc = await payload.create({
    collection: 'pages',
    data: JSON.parse(JSON.stringify(eventsPage).replace(/"\{\{IMAGE\}\}"/g, image1ID)),
  })

  let postsPageID = postsPageDoc.id
  let eventsPageID = eventsPageDoc.id

  if (payload.db.defaultIDType === 'text') {
    postsPageID = `"${postsPageID}"`
    eventsPageID = `"${eventsPageID}"`
  }

  payload.logger.info(`— Seeding home page...`)

  await payload.create({
    collection: 'pages',
    data: JSON.parse(
      JSON.stringify(home)
        .replace(/"\{\{IMAGE_1\}\}"/g, image1ID)
        .replace(/"\{\{IMAGE_2\}\}"/g, image2ID)
        .replace(/"\{\{POSTS_PAGE_ID\}\}"/g, postsPageID)
        .replace(/"\{\{EVENTS_PAGE_ID\}\}"/g, eventsPageID),
    ),
  })

  payload.logger.info(`— Seeding settings...`)

  await payload.updateGlobal({
    slug: 'settings',
    data: {
      postsPage: postsPageDoc.id,
      eventsPage: eventsPageDoc.id,
    },
  })

  payload.logger.info(`— Seeding header...`)

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        {
          link: {
            type: 'reference',
            reference: {
              relationTo: 'pages',
              value: postsPageDoc.id,
            },
            label: 'Posts',
          },
        },
        {
          link: {
            type: 'reference',
            reference: {
              relationTo: 'pages',
              value: eventsPageDoc.id,
            },
            label: 'Events',
          },
        },
      ],
    },
  })

  payload.logger.info('Seeded database successfully!')
}
