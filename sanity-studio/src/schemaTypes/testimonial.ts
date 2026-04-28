import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: '客户评价',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: '评价内容',
      type: 'text',
    }),
    defineField({
      name: 'author',
      title: '作者',
      type: 'string',
    }),
    defineField({
      name: 'tag',
      title: '标签',
      type: 'string',
    }),
  ],
})
