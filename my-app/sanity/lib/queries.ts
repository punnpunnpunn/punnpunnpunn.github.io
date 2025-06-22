import {defineQuery} from 'next-sanity'

export const POSTS_QUERY = defineQuery(`*[_type == "post"] | order(publishedAt desc){
  title,
  mainImage,
  "authorName": author->name,
  slug,
  _id,
  description,
  publishedAt
}`)

export const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  title, body, mainImage, author, publishedAt
}`)