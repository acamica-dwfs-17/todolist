class Tarea {
    constructor(titulo) {
        this.titulo = titulo
        this.descripcion = ''
        this.terminada = false
        this.id = 0
    }

    dibujar() {
        let className = ''

        if (this.terminada)
            className = 'tachado'
        let li = $('<li>').text(this.titulo).attr('title', this.descripcion).addClass(className).attr('data-id', this.id)
        let button = $('<button>').text('borrar').addClass('btn-delete')
        li.append(button)
        li.click((e) => {
            // $(e.currentTarget).hasClass('tachado')
            $(e.currentTarget).toggleClass('tachado')
            this.terminada = !this.terminada
        })
        return li
    }

    eliminar() {
        $(`li[data-id="${this.id}"]`).remove()
    }
}

class Lista {
    constructor(container, input) {
        this.tareas = []
        this.containerTareas = container
        this.inputElement = input
    }

    init() {
        this.dibujar()
        this.inputElement.on('keypress', (e) => {
            if (e.keyCode == 13) {
                let taskTitulo = e.target.value
                let tarea = new Tarea(taskTitulo)
                this.agregar(tarea)
                e.target.value = ''
            }
        })

    }

    dibujar() {
        for (let index = 0; index < this.tareas.length; index++) {
            let html = this.tareas[index].dibujar(index)
            this.containerTareas.append(html);
        }

        $(`li button`).click((e) => {
            let idABorrar = $(e.target).parent().attr('data-id')
            this.eliminar(idABorrar)
        })
    }



    agregar(tarea) {
        tarea.id = this.lastId() + 1
        this.tareas.push(tarea)

        this.containerTareas.append(tarea.dibujar());
        $(`li[data-id=${tarea.id}] button`).click((e) => {
            let idABorrar = $(e.target).parent().attr('data-id')
            this.eliminar(idABorrar)
        })
    }

    eliminar(idTarea) {
        let indexAEliminar = this.indexOf(idTarea)
        this.tareas[indexAEliminar].eliminar()
        this.tareas.splice(indexAEliminar, 1)
    }

    indexOf(idTarea) {
        for (let index = 0; index < this.tareas.length; index++) {
            const element = this.tareas[index];
            if (element.id == idTarea)
                return index

        }
        return -1
    }

    lastId() {
        let indice = 0

        if (this.tareas.length > 0)
            indice = this.tareas[this.tareas.length - 1].id
        
        return indice
    }


}