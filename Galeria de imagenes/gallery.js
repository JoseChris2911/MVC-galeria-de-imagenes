"use strict";
//excepciones
class GalleryException extends BaseException {
	constructor(fileName, lineNumber) {
		super("Error: Gallery Exception.", fileName, lineNumber);
		this.name = "GalleryException";
	}
}

class CategoryException extends GalleryException {
	constructor(fileName, lineNumber) {
		super("Error: The method needs a Category parameter.", fileName, lineNumber);
		this.name = "CategoryException";
	}
}
class AuthorException extends GalleryException {
	constructor(fileName, lineNumber) {
		super("Error: The method needs a Author parameter.", fileName, lineNumber);
		this.name = "AuthorException";
	}
}

class CategoryNotExistException extends GalleryException {
	constructor(category, fileName, lineNumber) {
		super("Error: The category doesn't exist in the gallery. " + category.title, fileName, lineNumber);
		this.name = "CategoryException";
		this.category = category;
	}
}

class PositionOutBoundsException extends GalleryException {
	constructor(category, fileName, lineNumber) {
		super("Error: The position is out of bounds.", fileName, lineNumber);
		this.name = "PositionOutBoundsException";
		this.category = category;
	}
}

//creacion de la clase con el patron singleton la galeria, basandome en algunos ejemplos
let Gallery = (function () {

	let instancia;

	function init() {
		//como la relacion entre objetos no esta determinada por una base de datos
		//no se pueden recoger facilmente un array de un objeto en concreto, por lo que en
		//la clase gallery guardo los arrays de forma independiente con el unico proposito de
		//mostrarlos en la view. Asi puede el usuario que autor o categoria elegir facilmente
		class Gallery {

			#autores = [];
			#categorias = [];
			//el array de imagenes no es necesario puesto que estas dependen del autor y categoria para
			//mostrarse, igualmente lo dejaria puesto como view default si no se elige nada
			

			constructor() {
				//La función se invoca con el operador new
				if (!new.target) throw new InvalidAccessConstructorException();
			}
			//los gets devuelven iterativos para que se puedan mostrar de uno en uno usando .next en la view.js
			get autores() {
				let nextIndex = 0;
				// referencia para habilitar el closure en el objeto
				let array = this.#autores;
				return {
					next: function () {
						return nextIndex < array.length ? {
							value: array[nextIndex++],
							done: false
						} : {
							done: true
						};
					}
				}
			}
			set autores(value) {
				this.#autores = value;
			}

			get categorias() {
				let nextIndex = 0;
				// referencia para habilitar el closure en el objeto
				let array = this.#categorias;
				return {
					next: function () {
						return nextIndex < array.length ? {
							value: array[nextIndex++],
							done: false
						} : {
							done: true
						};
					}
				}
			}
			set categorias(value) {
				this.#categorias = value;
			}

			
			//metodos para los arrays de categorias
			getCategoryPosition(category) {
				if (!(category instanceof Category)) {
					throw new CategoryException();
				}
				return this.#categorias.findIndex(x => x.title === category.title);
			}
			addCategory(category) {
				if (!(category instanceof Category)) {
					throw new CategoryException();
				}
				let position = this.getCategoryPosition(category);
				if (position === -1) {
					this.#categorias.push(category);
				}
				return this;
			}
			getNumberCategory() {
				return this.#categorias.length;
			}
			getCategory(position) {
				console.log("get categories");
				if (position === 'undefined') throw new EmptyValueException("position");
				if (position >= this.#categorias.length || position < 0) throw new PositionOutBoundsException();
				return this.#categorias[position];
			}

			removeCategory(category) {
				if (!(category instanceof Category)) {
					throw new CategoryException();
				}
				let position = this.getCategoryPosition(category);
				if (position !== -1) {
					this.#categorias.splice(position, 1);
				} else {
					throw new CategoryNotExistException(product);
				}
				return this;
			}
			removeCategoryPosition(position) {
				if (position === 'undefined') throw new EmptyValueException("position");
				if (position >= this.#categorias.length || position < 0) throw new PositionOutBoundsException();

				this.#categorias.splice(position, 1);


				return this;
			}
			cleanCategories(){
				this.#categorias.length = 0;
			}
			//Muestra el carrito en formato string
			toStringCategory (separator = "\n"){
				let str = "";
				let categorias = this.categorias;
				
				let categoria = categorias.next();
				
				while (!categoria.done){
					str = str + categoria.value.toString() + separator;
					categoria = categorias.next();
					
				}
				return str;
			}
			//metodos para los arrays de autor
			getAuthorPosition(author) {
				if (!(author instanceof Author)) {
					throw new AuthorException();
				}
				return this.#autores.findIndex(x => x.nickname === author.nickname);
			}
			addAuthor(author) {
				if (!(author instanceof Author)) {
					throw new AuthorException();
				}
				let position = this.getAuthorPosition(author);
				if (position === -1) {
					this.#autores.push(author);
				}
				return this;
			}
		}
		Object.defineProperty(Gallery.prototype, "categorias", {enumerable: true});
		Object.defineProperty(Gallery.prototype, "autores", {enumerable: true});
		let gal = new Gallery();//Devolvemos el objeto Gallery para que sea una instancia única.
		Object.freeze(gal);
		return gal;
	}
	return {
		// Devuelve un objeto con el método getInstance
		getInstance: function () {
			if (!instancia) { //Si la variable instantiated es undefined, priemera ejecución, ejecuta init.
				instancia = init(); //instantiated contiene el objeto único
			}
			return instancia; //Si ya está asignado devuelve la asignación.
		}
	};
})();