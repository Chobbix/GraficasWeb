window.fbAsyncInit = function() {
    FB.init({
      appId      : '290240696346453',
      xfbml      : true,
      version    : 'v2.9'
    });
    FB.AppEvents.logPageView();
  };
  
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk')); 
  

  function shareScore(score) {
    
    FB.ui({

        method: 'feed',
        hashtag: "#UniverseDefendersGame",
        quote: "He defendido al universo con un total de: "+ score +" puntos ¿crees que puedes superarme? Entra a https://pruebabasededatosporfajala.000webhostapp.com/",
        picture: 'https://i.postimg.cc/qMtYwrvW/Banner.png',
        redirect_uri: 'https://developers.facebook.com/docs/dialogs/'
        //link: 'https://google.com', //Link de nuestra pagina, o pones un link o pones una imagen, no hay dos
        //redirect_uri: 'https://developers.facebook.com/docs/dialogs/' Se supone que es una redireccion al darle click al link de arriba, se supone, segun yo
    }, function(response){});
}