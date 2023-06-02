export const myStructure = (S) =>
  S.list()
    .title("Contenido")
    .items([
      S.listItem()
        .title("Equipo")
        .child(
          /* Create a list of all posts */
          S.list()
            .title("Equipo")
            .items([
              S.listItem()
                .title("Luchadores")
                .child(
                  S.documentList()
                    .title("Luchadores")
                    .filter('_type == "staff" && staffType == "wrestler"')
                ),
              S.listItem()
                .title("Arbitros")
                .child(
                  S.documentList()
                    .title("Arbitros")
                    .filter('_type == "staff" && staffType == "referee"')
                ),
              S.listItem()
                .title("Presentadores")
                .child(
                  S.documentList()
                    .title("Presentadores")
                    .filter('_type == "staff" && staffType == "annonceurs"')
                ),
              S.listItem()
                .title("Produccion")
                .child(
                  S.documentList()
                    .title("Produccion")
                    .filter('_type == "staff" && staffType == "production"')
                ),
            ])
        ),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["staff", "settings", "welcome"].includes(listItem.getId())
      ),

      S.listItem()
        .title("Settings")
        .child(S.document().schemaType("settings").documentId("settings")),
      S.listItem()
        .title("Home")
        .child(S.document().schemaType("welcome").documentId("welcome")),
    ]);
