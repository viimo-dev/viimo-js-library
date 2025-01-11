export class UserCardComponent {
    constructor(userData) {
      this.userData = userData;
      this.element = this.createElement();
    }
  
    // Crear el componente del User Card
    createElement() {
      const template = document.createElement("template");
      template.innerHTML = `
        <div class="dev-user-card">
        <div class="dev-user-card-info">
          <div data-field="name" class="dev-user-data">${user.Name || "Nombre no disponible"}</div>
          <div class="filters-separator"></div>
          <div data-field="email" class="dev-user-data">${user.Email || "Email no disponible"}</div>
          <div class="filters-separator"></div>
          <div class="dev-user-data">Admin:&nbsp;</div>
          <div data-field="isAdmin" class="dev-user-data">${user.isUserAdmin ? "Sí" : "No"}</div>
          <div class="filters-separator"></div>
          <div data-field="age" class="dev-user-data">${user.getAge() || "Edad no disponible"}</div>
          <div class="filters-separator"></div>
        </div>
        <article class="dev-delete">
          <div class="paragraph">Eliminar</div>
          <img src="https://cdn.prod.website-files.com/677e577ef5b94953b8c1831e/6781491bf42c0aa629f3ceb3_delete.svg" loading="lazy" alt="">
        </article>
      </div>
      `.trim();
      return template.content.firstChild;
    }
  
    // Método para establecer un mensaje de error en el botón de eliminar
    setErrorText(text) {
      const deleteButton = this.element.querySelector(".dev-delete-user");
      const paragraph = deleteButton.querySelector(".paragraph");
      if (paragraph) {
        paragraph.innerText = text;
        deleteButton.disabled = true; // Opcional: desactiva el botón
      }
    }
  
    // Método para asignar un evento de eliminación
    setDeleteAction(action) {
      const deleteButton = this.element.querySelector(".dev-delete-user");
      if (deleteButton) {
        deleteButton.addEventListener("click", () => action(this.userData.Id));
      }
    }
  
    // Obtener el elemento HTML del componente
    getElement() {
      return this.element;
    }
  }
  