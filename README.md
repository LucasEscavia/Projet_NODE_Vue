# Projet_NODE_Vue

Ce blog permet de consulter des articles et d'en créer/modifier/supprimer seulement si on est connecté.
Il est également possible de se créer un compte.



Liste des routes pour CRUD Article : 

  Obtenir les articles : /getArticles
  
  Obtenir un article : /getArticle/ID_ARTICLE
  
  Ajouter un articles : /insertArticle/TITRE_ARTICLE.DESCRIPTION_ARTICLE
  
  Mettre à jour un article : /updateArticle/ID_ARTICLE.NOUVEAU_TITRE_ARTICLE.NOUVELLE_DESCRIPTION_ARTICLE
  
  Supprimer un article : /deleteArticle/ID_ARTICLE
  



Liste des routes pour CRUD User : 

  Se loger : /login (Param en POST : login : LOGIN_USER & password : MDP_USER)
  
  Créer un compte : /insertUtilisateur (Param en POST : login : LOGIN_USER & password : MDP_USER)




Pour installer le projet, il suffit de faire un "npm install" puis un "node index.js" dans le répertoire du projet.
Ensuite, il faut créer un utilisateur, puis se loger afin de récupérer le jwt, pour ensuite le mettre dans les headers des requetes HTTP pour insert, update ou delete un article.


URL GitHub : https://github.com/LucasEscavia/Projet_NODE_Vue

URL Projet : https://projet-node-vue.herokuapp.com
