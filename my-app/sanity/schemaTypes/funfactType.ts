import {FaceHappyIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const funfactType = defineType({
  name: 'funfact',
  title: 'Fun Fact',
  type: 'document',
  icon: FaceHappyIcon,
  fields: [
    defineField({
      name: 'fact',
      type: 'string',
    }),
    defineField({
        name: 'image',
        type: 'image',
        options: {
            hotspot: true,
        }
    })
  ],
  preview: {
    select: {
      title: 'fact',
      media: 'image'
    },
  },
})