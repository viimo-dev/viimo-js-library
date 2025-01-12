// components/dev/EventFormComponent.js
export class EventFormComponent {
  constructor(users, onSubmitCallback) {
    this.users = users;            // Lista de usuarios para el select
    this.onSubmitCallback = onSubmitCallback; // Callback para el envío del formulario
    this.element = this.createElement();
  }

  createElement() {
    const template = document.createElement("template");
    template.innerHTML = `
      <div class="dev-eventos-form w-form">
        <form id="dev-eventos-form" name="dev-eventos-form" data-name="dev-eventos-form" method="post">
          <div class="form-input-group">
            <label for="userId" class="paragraph">Usuario</label>
            <div class="padding-bottom xxs"></div>
            <select id="userId" name="userId" class="select-field w-select">
              <option value="">Select one...</option>
              ${this.users
                .map((user) => `<option value="${user.Id}">${user.Name}</option>`)
                .join("")}
            </select>
            <div class="padding-bottom"></div>
          </div>
          <div class="form-input-group">
            <label for="eventName" class="paragraph">Event name</label>
            <div class="padding-bottom xxs"></div>
            <input class="input-field w-input" id="eventName" name="eventName" type="text" placeholder="Event name">
            <div class="padding-bottom"></div>
          </div>
          <div class="form-input-group">
            <label for="internalName" class="paragraph">Internal name</label>
            <div class="padding-bottom xxs"></div>
            <input class="input-field w-input" id="internalName" name="internalName" type="text" placeholder="Internal name">
            <div class="padding-bottom"></div>
          </div>
          <div class="form-input-group">
            <label for="description" class="paragraph">Description</label>
            <div class="padding-bottom xxs"></div>
            <textarea class="input-field w-input" id="description" name="description" rows="3" placeholder="Event description"></textarea>
            <div class="padding-bottom"></div>
          </div>
          <div class="form-input-group">
            <label class="paragraph">Imagen</label>
            <div class="padding-bottom xxs"></div>
            <div class="form-wrapper-horizontal">
              <label class="dev-form-radio-img w-radio">
                <input type="radio" id="image1" name="image" value="https://cdn.prod.website-files.com/677e577ef5b94953b8c1831e/6780046890aebffffeff9458_products-bg4-p-500.png" class="radio-input">
                <span class="paragraph">Imagen 1</span>
              </label>
              <label class="dev-form-radio-img w-radio">
                <input type="radio" id="image2" name="image" value="https://cdn.prod.website-files.com/677e577ef5b94953b8c1831e/67800374aea567efe19215d2_products-bg2-p-500.png" class="radio-input">
                <span class="paragraph">Imagen 2</span>
              </label>
              <label class="dev-form-radio-img w-radio">
                <input type="radio" id="image3" name="image" value="https://cdn.prod.website-files.com/677e577ef5b94953b8c1831e/678004814684dc4d3384d095_products-bg3-p-500.png" class="radio-input">
                <span class="paragraph">Imagen 3</span>
              </label>
            </div>
            <div class="padding-bottom"></div>
          </div>
          <div class="form-input-group">
            <label class="paragraph">Fecha del evento</label>
            <div class="padding-bottom xxs"></div>
            <div class="form-wrapper-horizontal">
              <input class="input-field w-input" id="day" name="day" type="number" placeholder="Día">
              <select id="month" name="month" class="select-field w-select">
                <option value="01">Enero</option>
                <option value="02">Febrero</option>
                <option value="03">Marzo</option>
                <!-- Resto de los meses -->
              </select>
              <input class="input-field w-input" id="year" name="year" type="number" placeholder="Año">
            </div>
            <div class="padding-bottom"></div>
          </div>
          <div class="form-input-group">
            <label class="paragraph">Recurrencia</label>
            <label class="w-checkbox">
              <input type="checkbox" id="isRecurrent" name="isRecurrent" class="checkbox-input">
              <span class="paragraph">Recurrente</span>
            </label>
          </div>
          <div class="form-input-group">
            <label class="paragraph">Activo</label>
            <label class="w-checkbox">
              <input type="checkbox" id="isActive" name="isActive" class="checkbox-input">
              <span class="paragraph">Activo</span>
            </label>
          </div>
          <div class="padding-bottom"></div>
          <button type="button" id="submitEvent" class="submit-button w-button">Crear evento</button>
        </form>
      </div>
    `.trim();

    const element = template.content.firstChild;

    // Agregar evento de envío
    const submitButton = element.querySelector("#submitEvent");
    submitButton.addEventListener("click", () => this.handleSubmit());

    return element;
  }

  handleSubmit() {
    // 1. Recopilar los datos del formulario
    const formData = {
      userId: this.element.querySelector("#userId").value,
      eventName: this.element.querySelector("#eventName").value,
      internalName: this.element.querySelector("#internalName").value,
      description: this.element.querySelector("#description").value,
      image: this.element.querySelector("input[name='image']:checked")?.value || null,
      day: this.element.querySelector("#day").value,
      month: this.element.querySelector("#month").value,
      year: this.element.querySelector("#year").value,
      isRecurrent: this.element.querySelector("#isRecurrent").checked,
      isActive: this.element.querySelector("#isActive").checked,
    };

    // 2. Invocar callback
    if (this.onSubmitCallback) {
      this.onSubmitCallback(formData);
    }
  }

  getElement() {
    return this.element;
  }
}
