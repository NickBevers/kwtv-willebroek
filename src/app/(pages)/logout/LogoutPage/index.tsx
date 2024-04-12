'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'

import { Settings } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'

export const LogoutPage: React.FC<{
  settings: Settings
}> = props => {
  const { settings } = props
  const { postsPage, EventsPage } = settings || {}
  const { logout } = useAuth()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout()
        setSuccess('Logged out successfully.')
      } catch (_) {
        setError('You are already logged out.')
      }
    }

    performLogout()
  }, [logout])

  const hasPostsPage = typeof postsPage === 'object' && postsPage?.slug
  const hasEventsPage = typeof eventsPage === 'object' && eventsPage?.slug

  return (
    <Fragment>
      {(error || success) && (
        <div>
          <h1>{error || success}</h1>
          <p>
            {'What would you like to do next? '}
            {hasPostsPage && hasEventsPage && <Fragment>{'Browse '}</Fragment>}
            {hasPostsPage && (
              <Fragment>
                <Link href={`/${postsPage.slug}`}>all posts</Link>
              </Fragment>
            )}
            {hasPostsPage && hasEventsPage && <Fragment>{' or '}</Fragment>}
            {hasEventsPage && (
              <Fragment>
                <Link href={`/${EventsPage.slug}`}>all events</Link>
              </Fragment>
            )}
            {` To log back in, `}
            <Link href="/login">click here</Link>
            {'.'}
          </p>
        </div>
      )}
    </Fragment>
  )
}
