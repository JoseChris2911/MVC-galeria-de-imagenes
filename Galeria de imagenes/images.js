"use strict";
(function () {
    let abstractCreateLock = true; //con un poco de ayuda creo la clase de imagen la cual debe llevar 
    //otras dos que son landscape y portrait
    class Imagen {

        #title;
        #url;
        #description;
        
        #coords;

        constructor(title, url ,description , coords) {
            if (!new.target) throw new InvalidAccessConstructorException();
            if (abstractCreateLock)
                throw new AbstractClassException("Imagen");
            abstractCreateLock = true; //Reactivamos el cerrojo.
            if (!title) throw new EmptyValueException("title");
            //if (!description) throw new EmptyValueException("description");
            if (!url) throw new EmptyValueException("url");
            //if (!coords) throw new EmptyValueException("coords");

            this.#title = title;
            this.#description = description;
            this.#url = url;
            this.#coords = coords;
        }
        get title() {
            return this.#title;
        }
        set title(value) {
            if (!value) throw new EmptyValueException("title");
            this.#title = value;


        }
        get description() {
            return this.#description;
        }
        set description(value) {
            if (!value) throw new EmptyValueException("description");
            this.#description = value;
        }
        get url() {
            return this.#url;
        }
        set url(value) {
            if (!value) throw new EmptyValueException("url");
            this.#url = value;
        }
        get coords() {
            return this.#coords;
        }
        set coords(value) {
            if (!value) throw new EmptyValueException("coords");
            this.#coords = value;


        }
    }
    Object.defineProperty(Imagen.prototype, "title", {enumerable: true});
    Object.defineProperty(Imagen.prototype, "description", {enumerable: true});
    Object.defineProperty(Imagen.prototype, "url", {enumerable: true});
    //Object.defineProperty(Imagen.prototype, "title", {enumerable: true});
    class Landscape extends Imagen {
        constructor(title, url ,description , coords) {
            if (!new.target) throw new InvalidAccessConstructorException();

            abstractCreateLock = false; //Desactivamos el cerrojo.
            super(title,  url ,description, coords);
        }
        
    }
    class Portrait extends Imagen {
        constructor(title, url ,description , coords) {
            if (!new.target) throw new InvalidAccessConstructorException();

            abstractCreateLock = false; //Desactivamos el cerrojo.
            super(title, url ,description , coords);
        }

        
    }
    window.Imagen = Imagen;
    window.Landscape = Landscape;
    window.Portrait = Portrait;

})(); //Invocamos la función global.