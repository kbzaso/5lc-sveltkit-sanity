import { UsersIcon } from "@sanity/icons";

export const myStructure = (S) =>
  S.list()
    .title("Contenido")
    .items([
      S.listItem()
        .title("Próximos Eventos")
        .schemaType("event")
        .child(
          S.documentList()
            .title("Próximos Eventos")
            .filter("active == true")
            .defaultOrdering([{ field: "date", direction: "asc" }])
        ),
      S.listItem()
        .title("Eventos Pasados")
        .schemaType("event")
        .child(
          S.documentList()
            .title("Eventos Pasados")
            .filter("date <= now()")
            .defaultOrdering([{ field: "date", direction: "desc" }])
        ),
      S.divider(),
      S.listItem()
        .title("Team")
        .icon(UsersIcon)
        .child(
          /* Create a list of all posts */
          S.list()
            .title("Team")
            .items([
              S.listItem()
                .title("Luchadores")
                .icon(UsersIcon)
                .child(
                  S.documentList()
                    .title("Luchadores")
                    .filter('_type == "staff" && staffType == "wrestler"')
                ),
              S.listItem()
                .title("Arbitros")
                .icon(UsersIcon)
                .child(
                  S.documentList()
                    .title("Arbitros")
                    .filter('_type == "staff" && staffType == "referee"')
                ),
              S.listItem()
                .title("Presentadores")
                .icon(UsersIcon)
                .child(
                  S.documentList()
                    .title("Presentadores")
                    .filter('_type == "staff" && staffType == "annonceurs"')
                ),
            ])
        ),
        ...S.documentTypeListItems().filter(
          (listItem) =>
            !["staff", "settings", "welcome", "event"].includes(listItem.getId())
        ),
      S.listItem()
        .title("Settings")
        .child(S.document().schemaType("settings").documentId("settings")),
      S.listItem()
        .title("Welcome")
        .child(S.document().schemaType("welcome").documentId("welcome")),
    ]);
