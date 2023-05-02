/*Carousel*/
$(function () {
  $(".owl-topbar").slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    prevArrow: "<i class='fa fa-chevron-left'></i>",
    nextArrow: "<i class='fa fa-chevron-right'></i>",
  });
});
/* Fim Carousel*/

const menuPrincipal = document.querySelectorAll(".menu-open");
const menusecundario = document.querySelectorAll(".menu-secundario");

menuPrincipal.forEach((open) => {
  open.addEventListener("touchstart", function () {
    const classeFack = !this.classList.contains("fack");

    OpenNav(menuPrincipal, "remove", "fack");
    OpenNav(menusecundario, "remove", "activo");

    if (classeFack) {
      this.classList.toggle("fack");
      this.nextElementSibling.classList.toggle("activo");
    }
  });
});

function OpenNav(tagHtml, tipoClasslist, classe) {
  tagHtml.forEach((element) => {
    element.classList[tipoClasslist](classe);
  });
}

/*Excluir Produto Carrinho */

$(window).on("orderFormUpdated.vtex", function (evt, orderForm) {
  const ListaProdutos = document.querySelectorAll(
    ".portal-minicart-ref table tr"
  );
  let produtosMiniCard = Array.from(ListaProdutos);

  produtosMiniCard.forEach((tr, index) => {
    tr.addEventListener("click", () => {
      vtexjs.checkout.getOrderForm().then(function (orderForm) {
        var itemsToRemove = [
          {
            index: index - 1,
            quantity: 0,
          },
        ];
        return vtexjs.checkout.removeItems(itemsToRemove);
      });
    });
  });
});

function corProdSimilar() {
  if ($("body").hasClass("tb-prod")) {
    $("#produtoDiv-direita .variantes-sku .tb-cores ul li").each(function () {
      if ($(this).find(".img-cor").html().trim().length > 0) {
        $(this).find(".img-prod").hide();
      }
    });
    $("#produtoDiv-direita .variantes-sku .tb-cores").fadeIn();
  }
}

corProdSimilar();

function send() {
  var usuario = {
    email: $("#email").val(),
    isNewsletterOptIn: true,
  };

  $("#mensagem").html("Enviando...");

  $.ajax({
    url: "/api/dataentities/NW/documents",
    type: "put",
    dataType: "json",
    contentType: "application/json",
    success: function (data) {
      $("#mensagem").html("Enviado!");
    },
    data: JSON.stringify(usuario),
  });
}

$(document).on("click", ".newsletter button", function () {
  send();
});

const btComprarShow = document.querySelectorAll(".buy--showcase");

btComprarShow.forEach((bt) => {
  bt.innerHTML = "COMPRAR AGORA";
});

const btComprarProduto = document.querySelectorAll(".buy-button");

window.addEventListener("load", () => {
  btComprarProduto.forEach((bt) => {
    bt.innerHTML = "COMPRAR AGORA";
  });
});
