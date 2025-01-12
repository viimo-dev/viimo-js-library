export class EventFormComponent {
    constructor(users = [], onSubmit) {
      this.users = users; // Lista de usuarios para el select
      this.onSubmit = onSubmit; // Callback para manejar el submit
      this.element = this.createElement();
    }
  
    createElement() {
      const template = document.createElement("template");
  
      template.innerHTML = `
        <div class="dev-eventos-form w-form">
          <form id="event-form" name="event-form">
            <div class="form-input-group">
              <label for="user" class="paragraph">Usuario</label>
              <select id="user" class="select-field w-select">
                <option value="">Selecciona un usuario...</option>
                ${this.users
                  .map((user) => `<option value="${user.Id}">${user.Name}</option>`)
                  .join("")}
              </select>
            </div>
            <div class="form-input-group">
              <label for="event-name" class="paragraph">Event name</label>
              <input id="event-name" type="text" class="input-field w-input" placeholder="Nombre del evento" required>
            </div>
            <div class="form-input-group">
              <label for="internal-name" class="paragraph">Internal name</label>
              <input id="internal-name" type="text" class="input-field w-input" placeholder="Nombre interno" required>
            </div>
            <div class="form-input-group">
              <label for="description" class="paragraph">Description</label>
              <input id="description" type="text" class="input-field w-input" placeholder="Descripción" required>
            </div>
            <div class="form-input-group">
              <label class="paragraph">Imagen</label>
              <div class="form-wrapper-horizontal">
                <label>
                  <input type="radio" name="image" value="img1" required>
                  Imagen 1
                </label>
                <label>
                  <input type="radio" name="image" value="img2">
                  Imagen 2
                </label>
                <label>
                  <input type="radio" name="image" value="img3">
                  Imagen 3
                </label>
              </div>
            </div>
            <div class="form-input-group">
              <label class="paragraph">Fecha del evento</label>
              <div class="form-wrapper-horizontal">
                <input id="day" type="number" placeholder="Día" class="input-field w-input" required>
                <select id="month" class="select-field w-select" required>
                  ${[
                    "Enero",
                    "Febrero",
                    "Marzo",
                    "Abril",
                    "Mayo",
                    "Junio",
                    "Julio",
                    "Agosto",
                    "Septiembre",
                    "Octubre",
                    "Noviembre",
                    "Diciembre",
                  ]
                    .map((month, index) => `<option value="${index}">${month}</option>`)
                    .join("")}
                </select>
                <input id="year" type="number" placeholder="Año" class="input-field w-input" required>
              </div>
            </div>
            <div class="form-input-group">
              <label for="recurrent" class="paragraph">Recurrencia</label>
              <input id="recurrent" type="checkbox">
            </div>
            <div class="form-input-group">
              <label for="active" class="paragraph">Activo</label>
              <input id="active" type="checkbox" checked>
            </div>
            <button type="submit" class="submit-button">Crear Evento</button>
          </form>
        </div>
      `.trim();
  
      const element = template.content.firstChild;
      this.addEventListeners(element);
      return element;
    }
  
    addEventListeners(form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = this.getFormData();
        if (this.onSubmit) this.onSubmit(formData);
      });
    }
  
    getFormData() {
      const user = this.element.querySelector("#user").value;
      const eventName = this.element.querySelector("#event-name").value;
      const internalName = this.element.querySelector("#internal-name").value;
      const description = this.element.querySelector("#description").value;
      const image = this.element.querySelector('input[name="image"]:checked')?.value;
      const day = this.element.querySelector("#day").value;
      const month = this.element.querySelector("#month").value;
      const year = this.element.querySelector("#year").value;
      const recurrent = this.element.querySelector("#recurrent").checked;
      const active = this.element.querySelector("#active").checked;
  
      const startDate = new Date(year, month, day).toISOString();
  
      return {
        userId: user,
        eventName,
        internalName,
        eventDescription: description,
        eventImage: image,
        eventStart: startDate,
        isRecurrent: recurrent,
        active,
      };
    }
  
    getElement() {
      return this.element;
    }
  }
  