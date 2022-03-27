## Database schema

- collections
  - id: `string`
  - name: `string`
  - users
    - userId: `string`
    - owner: `boolean`
- groups
  - name: `string`
  - collectionId: `string`
  - todos
    - content: `string`
    - done: `boolean`
