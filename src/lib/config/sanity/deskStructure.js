export const myStructure = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem()
        .title('Settings')
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')),
      S.listItem()
          .title('Home')
          .child(
            S.document()
              .schemaType('welcome')
              .documentId('welcome')),
            ...S.documentTypeListItems().filter(listItem => !['settings', 'welcome'].includes(listItem.getId())),
])