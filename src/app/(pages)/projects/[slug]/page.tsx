import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import type { Event } from '../../../../payload/payload-types'
import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { RelatedPosts } from '../../../_blocks/RelatedPosts'
import { Blocks } from '../../../_components/Blocks'
import { EventHero } from '../../../_heros/EventHero'
import { generateMeta } from '../../../_utilities/generateMeta'

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../../../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic'

export default async function Event({ params: { slug } }) {
  const { isEnabled: isDraftMode } = draftMode()

  let event: Event | null = null

  try {
    event = await fetchDoc<Event>({
      collection: 'events',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }

  if (!event) {
    notFound()
  }

  const { layout, relatedEvents } = event

  return (
    <React.Fragment>
      <EventHero event={event} />
      <Blocks
        blocks={[
          ...layout,
          {
            blockType: 'relatedPosts',
            blockName: 'Related Events',
            relationTo: 'events',
            introContent: [
              {
                type: 'h4',
                children: [
                  {
                    text: 'Related events',
                  },
                ],
              },
              {
                type: 'p',
                children: [
                  {
                    text: 'The events displayed here are individually selected for this page. Admins can select any number of related events to display here and the layout will adjust accordingly. Alternatively, you could swap this out for the "Archive" block to automatically populate events by category complete with pagination. To manage related events, ',
                  },
                  {
                    type: 'link',
                    url: `/admin/collections/events/${event.id}`,
                    children: [
                      {
                        text: 'navigate to the admin dashboard',
                      },
                    ],
                  },
                  {
                    text: '.',
                  },
                ],
              },
            ],
            docs: relatedEvents,
          },
        ]}
      />
    </React.Fragment>
  )
}

export async function generateStaticParams() {
  try {
    const events = await fetchDocs<Event>('events')
    return events?.map(({ slug }) => slug)
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode()

  let event: Event | null = null

  try {
    event = await fetchDoc<Event>({
      collection: 'events',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {}

  return generateMeta({ doc: event })
}
