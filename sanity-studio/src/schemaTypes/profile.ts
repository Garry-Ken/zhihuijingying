import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'profile',
  title: '个人信息',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '姓名',
      type: 'string',
    }),
    defineField({
      name: 'brand',
      title: '品牌名',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: '头衔',
      type: 'string',
    }),
    defineField({
      name: 'wechat',
      title: '微信号',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: '个人简介',
      type: 'text',
    }),
    defineField({
      name: 'philosophy',
      title: '核心理念',
      type: 'text',
    }),
    defineField({
      name: 'achievements',
      title: '成就数据',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'value', title: '数值', type: 'string'},
            {name: 'label', title: '标签', type: 'string'},
          ],
        },
      ],
    }),
  ],
})
