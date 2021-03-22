"use strict";

class GalleryController {
    // Campos privados

    #modelGallery;
    #modelManager;
    #viewGallery;

    constructor(modelGallery, modelManager, viewGallery) {
        this.#modelGallery = modelGallery;
        this.#modelManager = modelManager;
        this.#viewGallery = viewGallery;

        // Eventos iniciales del Controlador
        this.onLoad();
        this.onInit();
        
    }
    #loadGalleryObjects() {
        //relleno las categorias, los autores e imagenes
        let cat1 = new Category("animales");
        let cat2 = new Category("Atardeceres");
        let cat3 = new Category("sitios");

        let aut1 = new Author("Paco");
        let aut2 = new Author("Pedro");
        let aut3 = new Author("Pepe");

        let img1 = new Landscape("perros en parque", "https://media.mercola.com/ImageServer/Public/2018/June/Nonlead/parque-para-perros.jpg");
        let img2 = new Landscape("gatos en silo", "http://2.bp.blogspot.com/_xTkO8HYuN9k/R01tbGi-y5I/AAAAAAAAAF0/ELWj2jQvXGw/s320/gatoSM8.jpg");
        let img3 = new Portrait("pajaros volando", "https://us.123rf.com/450wm/mexitographer/mexitographer1509/mexitographer150900022/44966273-aves-silueta-volar-es-una-peque%C3%B1a-bandada-de-p%C3%A1jaros-volando-en-silueta-contra-un-hermoso-celaje-de-naran.jpg?ver=6");

        


        this.#modelGallery.addCategory(cat1)
            .addCategory(cat2)
            .addCategory(cat3)

        this.#modelGallery.addAuthor(aut1)
            .addAuthor(aut2)
            .addAuthor(aut3)
            //supongo que esto no esta optimizado pero para resumir, debo de rellenear tanto el
            //gallery como el manager porque del gallery cojo el array limpio y lo uso para mostrar las listas principales
            //y del manager lo cojo relacionado. Por falta de tiempo y por miedo a que
            //todo falle lo hice de esta forma
        this.#modelManager.addCategory(cat1)
        this.#modelManager.addCategory(cat2)
        this.#modelManager.addCategory(cat3)
            
        this.#modelManager.addAuthor(aut1)
        this.#modelManager.addAuthor(aut2)
        this.#modelManager.addAuthor(aut3)

        this.#modelManager.addImage(img1, cat1, aut1);
        this.#modelManager.addImage(img2, cat1, aut2);
        this.#modelManager.addImage(img3, cat2, aut3);
        
        console.log(this.#modelManager.allcategorias)

    }

    onInit = () => {
        this.#viewGallery.init();
        //accedo al metodo de la view y le paso la instancia del objeto gallery
        //el cual tiene las categorias
        this.#viewGallery.showCategories(this.#modelGallery.categorias);
        this.#viewGallery.showAutoresInMenu(this.#modelGallery.autores);
        
        //enlazo los handlers a un metodo de el controler
        this.#viewGallery.bindCategoryImageList(this.handleCategoryImageList);
        this.#viewGallery.bindAuthorImageList(this.handleAuthorImageList);
    }
    onLoad = () => {
        this.#loadGalleryObjects();

        this.#viewGallery.bindInit(this.handleInit)
       
    }


    // Manejadores para la gestión peticiones de la Vista
    handleInit = () => {
        this.onInit();
    }
    handleCategoryImageList = (category) => {
		//el showImagenes lo reutilizo y le paso la data recogida de los metodos del manager
        console.log(category);
		this.#viewGallery.showImagenes(this.#modelManager.getCategoryallImages(category),category);

		
	}
    handleAuthorImageList = (nick) => {
		
        console.log(nick);
		this.#viewGallery.showImagenes(this.#modelManager.getAuthorallImages(nick),nick);
        
		
	}

}


$(function () {
    const GalleryApp = new GalleryController(
        Gallery.getInstance(),
        Manager.getInstance(),
        new GalleryView());
});