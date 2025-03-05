"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { fetchWebPostItems } from "../../../features/web-posts/webPostsThunks"
import { selectWebPostItems, selectWebPostsLoading, selectWebPostsError } from "../../../features/web-posts/webPostsSelectors"
import { WebItem } from "./WebItem"
import { WebItemsSkeleton } from "../skeletons/web-items-skeleton"

export function WebItemFeed() {
  const dispatch = useAppDispatch()
  const postItems = useAppSelector(selectWebPostItems)
  const loading = useAppSelector(selectWebPostsLoading)
  const error = useAppSelector(selectWebPostsError)

  useEffect(() => {
    dispatch(fetchWebPostItems())
  }, [dispatch])

  if (loading) {
    return <WebItemsSkeleton />
  }

  if (error) {
    return (
      <div className="w-full max-w-3xl mx-auto p-4">
        <div className="text-red-500">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto divide-y">
      {postItems.map((item) => (
        <WebItem
          key={item.id}
          item={item}
          onLike={(id) => console.log("Like:", id)}
          onBookmark={(id) => console.log("Bookmark:", id)}
        />
      ))}
    </div>
  )
}

