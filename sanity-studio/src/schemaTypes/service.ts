import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: '服务项目',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
    }),
    defineField({
      name: 'name',
      title: '服务名称',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: '价格',
      type: 'string',
    }),
    defineField({
      name: 'duration',
      title: '时长',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: '服务描述',
      type: 'text',
    }),
    defineField({
      name: 'features',
      title: '服务特点',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'icon',
      title: '图标',
      type: 'string',
      options: {
        list: [
          {title: '皇冠', value: '👑'},
          {title: '机器人', value: '🤖'},
          {title: '建筑', value: '🏢'},
        ],
      },
    }),
  ],
})
