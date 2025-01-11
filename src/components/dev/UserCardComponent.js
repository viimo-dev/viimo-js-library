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
          <div data-field="name" class="dev-user-data">${this.userData.Name}</div>
          <div class="filters-separator"></div>
          <div data-field="email" class="dev-user-data">${this.userData.Email}</div>
          <div class="filters-separator"></div>
          <div class="dev-user-data">Admin: ${this.userData.isUserAdmin ? "Sí" : "No"}</div>
          <div class="filters-separator"></div>
          <div data-field="age" class="dev-user-data">${this.userData.getAge() || "N/A"}</div>
          <div class="filters-separator"></div>
          <article class="dev-delete-user" data-user-id="${this.userData.Id}">
            <div class="paragraph">Eliminar usuario</div>
            <img src="https://cdn.prod.website-files.com/677e577ef5b94953b8c1831e/6781491bf42c0aa629f3ceb3_delete.svg" alt="Eliminar">
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
  