(function ($) {
  var cookieName = "ttwishlistList";

  $(document).ready(function () {
    initWishlist();
  });

  function initWishlist() {
    updateWishlistButtons();
    initWishlistButtons();
  }

  function initWishlistButtons() {
    if ($(".add-in-wishlist-js").length === 0) return;

    $(".add-in-wishlist-js").each(function () {
      $(this).off("click").on("click", function (event) {
        event.preventDefault();

        try {
          var id = $(this).attr("href");
          var wishlist = $.cookie(cookieName);

          if (!wishlist) {
            wishlist = id;
          } else if (wishlist.indexOf(id) === -1) {
            wishlist = wishlist + "__" + id;
          }

          $.cookie(cookieName, wishlist, {
            expires: 14,
            path: "/",
          });

          $(".default-wishbutton-" + id)
            .find("i")
            .addClass("mdi-spin mdi-refresh")
            .removeClass("mdi-heart-outline");

          $(".loadding-wishbutton-" + id).show();
          $(".default-wishbutton-" + id).remove();

          setTimeout(function () {
            $(".loadding-wishbutton-" + id).remove();
            $(".added-wishbutton-" + id).show();
          }, 2000);

          $(this).off("click");
        } catch (err) {
          console.error("Wishlist error:", err);
        }
      });
    });
  }

  function updateWishlistButtons() {
    try {
      var wishlist = $.cookie(cookieName);
      if (!wishlist) return;

      var items = wishlist.split("__");
      for (var i = 0; i < items.length; i++) {
        if (items[i]) {
          $(".added-wishbutton-" + items[i]).show();
          $(".default-wishbutton-" + items[i]).remove();
          $(".loadding-wishbutton-" + items[i]).remove();
        }
      }
    } catch (err) {
      console.error("Wishlist update error:", err);
    }
  }
})(jQuery);
