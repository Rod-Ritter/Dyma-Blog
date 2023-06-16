import "./assets/styles/styles.scss";
import "./index.scss";

const articleContainerElement = document.querySelector(".articles-container");

const createArticles = (articles) => {
  const allArticlesDom = articles.map((item) => {
    const articleDOM = document.createElement("div");
    articleDOM.classList = "article";
    articleDOM.innerHTML = `
      <div class="article-image">
        <img src="${item.img}" alt="profile" />
      </div>
      <h2>${item.title}</h2>
        <div class="info-container">
          <p class="article-author">${item.author}</p>
          <p class="article-category">${item.category}
         Créé le :  ${new Date(item.createdAt).toLocaleDateString("fr-FR", {
           weekday: "long",
           day: "2-digit",
           month: "long",
           year: "numeric",
           hour: "numeric",
           minute: "numeric",
         })}</p>
        </div>
        <p class="article-content">${item.content}</p>
        <div class="article-actions">
          <button class="btn btn-danger" data-id=${item._id}>Supprimer</button>
          <button class="btn btn-primary" data-id=${item._id}>Modifier</button>
        </div>
    `;
    return articleDOM;
  });
  articleContainerElement.innerHTML = "";
  articleContainerElement.append(...allArticlesDom);
  const deleteButtons = articleContainerElement.querySelectorAll(".btn-danger");
  const editButtons = articleContainerElement.querySelectorAll(".btn-primary");

  editButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const target = event.target;
      const articleId = target.dataset.id;
      window.location.assign(`/form.html?id=${articleId}`);
    });
  });
  /*Parcour de la nodeList contenant les btn-danger pour ajouter sur chaqun d'entre eux 
  un listener qui va "écouter" l'événement click */
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      //Sockage d'une référence à l'objet qui a envoyé l'événement
      const target = event.target;
      //Récupération de l'id du boutton "cliqué"
      const articleId = target.dataset.id;
      try {
        const response = await fetch(
          `https://restapi.fr/api/articlesroro/${articleId}`,
          {
            method: "DELETE",
          }
        );
        // const body = await response.json();
        // console.log(body);
        fetchArticle();
      } catch (e) {
        console.log("error: ", e);
      }
    });
  });
};

const fetchArticle = async () => {
  try {
    const response = await fetch("https://restapi.fr/api/articlesroro");
    let articles = await response.json();
    if (!Array.isArray(articles)) {
      articles = [articles];
    }
    createArticles(articles);
  } catch (e) {
    console.error("Erreur: ", e);
  }
};

fetchArticle();
