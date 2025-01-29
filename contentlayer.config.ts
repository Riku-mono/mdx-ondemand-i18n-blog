import { defineDocumentType, makeSource } from 'contentlayer2/source-files';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.md`,
  bodyType: 'markdown',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'string',
      required: true,
    },
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `posts/${post._raw.flattenedPath}` },
  },
}));

export default makeSource({ contentDirPath: 'src/contents/posts', documentTypes: [Post] });
