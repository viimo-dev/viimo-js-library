export class UserCardComponent {
    constructor(userData) {
      this.userData = userData;
      this.element = this.createElement();
    }
  
    // Crear el componente del User Card
    createElement() {
      const template = document.createElement("template");
      template.innerHTML = `
        <div class="dev-card">
          <div class="dev-card-info">
            <div data-field="name" class="dev-user-data">${this.userData.Name || "Nombre no disponible"}</div>
            <div class="filters-separator"></div>
            <div data-field="email" class="dev-user-data">${this.userData.Email || "Email no disponible"}</div>
            <div class="filters-separator"></div>
            <div class="dev-user-data">Admin:&nbsp;</div>
            <div data-field="isAdmin" class="dev-user-data">${this.userData.isUserAdmin ? "Sí" : "No"}</div>
            <div class="filters-separator"></div>
            <div data-field="age" class="dev-user-data">${this.userData.getAge() || "Edad no disponible"}</div>
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
      const deleteButton = this.element.querySelector(".dev-delete");
      const paragraph = deleteButton.querySelector(".paragraph");
      if (paragraph) {
        paragraph.innerText = text;
        deleteButton.classList.add("disabled"); // Opcional: aplica una clase para desactivar
      }
    }
  
    // Método para asignar un evento de eliminación
    setDeleteAction(action) {
      const deleteButton = this.element.querySelector(".dev-delete");
      if (deleteButton) {
        deleteButton.addEventListener("click", () => action(this.userData.Id));
      }
    }
  
    // Obtener el elemento HTML del componente
    getElement() {
      return this.element;
    }
  }
  