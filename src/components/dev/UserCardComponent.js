// UserCardComponent.js

export function UserCardComponent(user) {
    return `
      <div id="w-node-_83a3b49f-615f-cb7a-a42e-34a77bd16b0b-8e9436d7" class="dev-user-card">
        <div data-field="name" class="dev-user-data">${user.Name}</div>
        <div class="filters-separator"></div>
        <div data-field="email" class="dev-user-data">${user.Email}</div>
        <div class="filters-separator"></div>
        <div class="dev-user-data">Admin:&nbsp;</div>
        <div data-field="isAdmin" class="dev-user-data">${user.isUserAdmin ? "Sí" : "No"}</div>
        <div class="filters-separator"></div>
        <div data-field="age" class="dev-user-data">${user.getAge() || "N/A"} años</div>
        <div class="filters-separator"></div>
        <article class="dev-delete-user" data-user-id="${user.Id}">
          <div class="paragraph">Eliminar usuario</div>
          <img 
            src="https://cdn.prod.website-files.com/677e577ef5b94953b8c1831e/6781491bf42c0aa629f3ceb3_delete.svg" 
            loading="lazy" 
            alt="Eliminar"
          >
        </article>
      </div>
    `;
  }
  