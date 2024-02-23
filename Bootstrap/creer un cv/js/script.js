$(function(){
    $(".navbar a, footer a").on("click",function(event){
        event.preventDefault();
        var hash = this.hash;

        $('body').animate({scrollTop: $(hash/OffscreenCanvasRenderingContext2D().top)},900,function(){window.location.hash = hash;})
    })
}) 