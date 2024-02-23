class Carousel{
    
/**
 * 
 * @param {HTMLElement} element 
 * @param {object} option 
 * @param{object}  option.slidesToScroll Nombre d'element à faire défile
 * @param{object} option.slidesVisibles Nombre d'élement visible dans un slides
 * @param{boolean} option.loop doit - boucler slide en fin du carousel
*/
    
    constructor (element,options = { }){
        
        this.element = element
        this.options = Object.assign({},{
             slidesToScroll:1, 
             slidesVisible:1,
             loop : false
            }, options)
        
        let children = [].slice.call(element.children)
        this.isMobile = false
        this.currentItem = 0
        this.movecallbacks = []

       // Modifiacation de la Dom
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__container')
        this.root.setAttribute('tabindex','0')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root) 
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__item')
            item.appendChild(child)
            this.container.appendChild(item)  

            return item
                      
        })

        this.setStyle()
        this.creacteNavigation()
        // Evenements
        this.movecallbacks.forEach(cb => cb(0))
        this.onWindowResize()
        window.addEventListener('resize', this.onWindowResize.bind(this))
        this.root.addEventListener('keyup', e => {
            if (e.key === 'ArrowRight' || e.key === 'Right'){
                this.next()
            } else if (e.key === 'ArrowLeft' || e.key === 'Left'){
                this.prev()
            }
        })
    } 
    /**
    * applique les bonnes dimensions aux elements du carousel
     * 
     */
    setStyle (){
        let ratio = this.items.length / this.slidesVisible
        this.container.style.width = (ratio * 100) + "%"
        this.items.forEach(item => {item.style.width = ((100 / this.slidesVisible) / ratio) + "%"

            
        });

    }
/**
 * creer les fleches de naviguation de la Dom
 */
    creacteNavigation(){
        let nextButton = this.createDivWithClass('carousel__next')
        let prevButton = this.createDivWithClass('carousel__prev')
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click',this.prev.bind(this))
        if(this.options.loop === true){
            return
        }
        this.onMove(index => {
            if (index=== 0){
                prevButton.classList.add('carousel__prev--hidden')
            } else {
                prevButton.classList.remove('carousel__prev--hidden')
            }

            if (this.items[this.currentItem + this.slidesVisible] === undefined){
                nextButton.classList.add('carousel__next--hidden')
            } else {
                nextButton.classList.remove('caorousel__next--hidenn')
            }
        })
    }

    next(){
        this.gotoItem(this.currentItem + this.slidesToScroll)
        
    }

    prev(){
        this.gotoItem(this.currentItem - this.slidesToScroll)
        
        
    }
    
/**
 * Deplace le carousel vers l'element ciblé
 * @param {number} index 
 */
    gotoItem (index) {
        if (index < 0){
            if (this.options.loop ){
                index = this.items.length - this.slidesVisible
            } else {
                return
            }
        } else if ( index >= ( this.items.length * 3) || (this.items[this.currentItem + this.slidesVisible]=== undefined && index > this.currentItem)){
            if(this.options.loop){
                index = 0     
            } else {
                return
            }
        }
        let translatex = index * ((-100 / this.items.length)/1.3)
        this.container.style.transform = 'translate3d('+ translatex + '%, 0, 0)'
        this.currentItem = index
        this.movecallbacks.forEach(cb => cb(index))
        
    }
    /**
     * rajoute un ecouteur un ecouteu le deplacement du carousel 
     * @param {movecallbacks} cb 
     */
    onMove (cb){
        this.movecallbacks.push(cb)
    }
/***
 * ecouteur pour le remendisionnement de la fenetre 
 */
    onWindowResize(){
        let mobile = window.innerWidth < 800
        if (mobile !== this.isMobile){
            this.isMobile = mobile
            this.setStyle()
            this.movecallbacks.forEach(cb => cb (this.currentItem))

        }
    }
/**
 * helper pour creer un div avec une classe
 * @param {string} className 
 * @returns {HTMLElement}
 */
    createDivWithClass (className){
        let div = document.createElement('div')
        div.setAttribute('class',className)
        return div
    } 
/**
 * @param(number)
 */
    get slidesToScroll(){
        return this.isMobile ? 1 : this.options.slidesToScroll
    }

    get slidesVisible (){
        return this.isMobile ? 1 : this.options.slidesVisible
    }
}



    new Carousel (document.querySelector('#carousel1'),{
        slidesToScroll:3,
        slidesVisible: 2,
        loop : true
        
    })

    new Carousel (document.querySelector('#carousel2'),{
        slidesVisible:2,
        slidesToScroll : 2,
        loop : true
    })

    new Carousel (document.querySelector('#carousel3'))


